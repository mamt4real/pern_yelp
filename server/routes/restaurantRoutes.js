const express = require('express')
const {
  getAllRestaurants,
  createRestaurant,
  getRestaurant,
  editRestaurant,
  deleteRestaurant,
  reviewRestaurant,
} = require('../controllers/restaurantController')

const restaurantRouter = express.Router()

restaurantRouter.route('/').get(getAllRestaurants).post(createRestaurant)

restaurantRouter
  .route('/:restaurantID')
  .get(getRestaurant)
  .put(editRestaurant)
  .delete(deleteRestaurant)

restaurantRouter.route('/:restaurantID/reviews').post(reviewRestaurant)

module.exports = restaurantRouter
