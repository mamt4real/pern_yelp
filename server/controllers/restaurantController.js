const catchasync = require('../utils/catchasync')

const { NotFound, BadRequest } = require('../errors')

const db = require('../db')

const createRestaurant = catchasync(async (req, res, next) => {
  const { name, location, price_range } = req.body

  if (!name || !location || !price_range) {
    return next(
      new BadRequest('name, location and price_range are all required!')
    )
  }
  const qry_result = await db.query(
    'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;',
    [name, location, price_range]
  )

  res.status(201).json({
    status: 'success',
    message: 'Created successfully',
    data: qry_result.rows[0],
  })
})

const getAllRestaurants = catchasync(async (req, res, next) => {
  const result = await db.query(
    `SELECT * FROM restaurants LEFT JOIN 
    (SELECT rest_id, COUNT(id) as no_reviews, TRUNC(AVG(rating), 1) as avg_rating FROM reviews GROUP BY rest_id) AS 
    review ON review.rest_id = restaurants.id;`
  )
  res.status(200).json({
    status: 'success',
    results: result.rowCount,
    data: result.rows,
  })
})

const getRestaurant = catchasync(async (req, res, next) => {
  const { restaurantID } = req.params
  let qry_result = await db.query(
    `SELECT * FROM restaurants LEFT JOIN 
    (SELECT rest_id, COUNT(id) as no_reviews, TRUNC(AVG(rating), 1) as avg_rating FROM reviews GROUP BY rest_id) AS 
    review ON review.rest_id = restaurants.id
    WHERE restaurants.id = $1;`,
    [restaurantID]
  )

  if (!qry_result.rowCount) {
    return next(new NotFound(`No restaurant with id=${restaurantID}`))
  }
  const restaurant = qry_result.rows[0]

  qry_result = await db.query('SELECT * FROM reviews WHERE rest_id = $1', [
    restaurantID,
  ])
  restaurant.reviews = qry_result.rows

  res.status(200).json({
    status: 'success',
    data: restaurant,
  })
})

const editRestaurant = catchasync(async (req, res, next) => {
  const { restaurantID } = req.params

  const { name, location, price_range } = req.body

  const qry_result = await db.query(
    'UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 RETURNING *;',
    [name, location, price_range, restaurantID]
  )

  if (!qry_result.rowCount) {
    return next(new NotFound(`No restaurant with id=${restaurantID}`))
  }

  res.status(200).json({
    status: 'successs',
    message: 'Updated Successfully',
    data: qry_result.rows[0],
  })
})

const deleteRestaurant = catchasync(async (req, res, next) => {
  const { restaurantID } = req.params

  const qry_result = await db.query(
    'DELETE  FROM restaurants WHERE id=$1 RETURNING *',
    [restaurantID]
  )

  if (!qry_result.rowCount) {
    return next(new NotFound(`No restaurant with id=${restaurantID}`))
  }

  res.status(204).send()
})

const reviewRestaurant = catchasync(async (req, res, next) => {
  const { restaurantID } = req.params
  const { name, rating, review } = req.body

  if (!name || !rating || !review) {
    return next(new BadRequest('name, review and rating are all required!'))
  }
  const qry_result = await db.query(
    'INSERT INTO reviews (name, review, rating, rest_id) VALUES ($1, $2, $3, $4) RETURNING *;',
    [name, review, rating, restaurantID]
  )
  res.status(201).json({
    status: 'success',
    message: 'Reviewed successfully',
    data: qry_result.rows[0],
  })
})

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  editRestaurant,
  deleteRestaurant,
  reviewRestaurant,
}
