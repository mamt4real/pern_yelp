import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../axios'
import AddReview from '../components/AddReview'
import Review from '../components/Reviews'
import StarRating from '../components/StarRating'

function RestaurantDetail() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState({
    name: '',
    location: '',
    price_range: 'Price Range',
    reviews: [],
    no_reviews: 0,
  })

  const addRestaurantCallback = (review) => {
    setRestaurant({
      ...restaurant,
      reviews: [...restaurant.reviews, review],
    })
  }
  const renderRating = (rest) =>
    rest.no_reviews ? (
      <>
        <StarRating rating={rest.rating} />
        <span className='text-warning ml-1'>({rest.no_reviews})</span>
      </>
    ) : (
      <span className='text-warning'>0 reviews</span>
    )
  useEffect(() => {
    instance({
      url: '/restaurants/' + id,
    })
      .then((res) => {
        if (res.status === 200) {
          setRestaurant(res.data.data)
        } else alert(res.data.message)
      })
      .catch((error) => {
        console.error(error.response?.data.message || error.message)
      })
  }, [id])
  return (
    <div className='container detailPage'>
      <h1 className='text-center display-3'>{restaurant.name}</h1>
      <h4 className='text-center'>{restaurant.location}</h4>
      <div className='text-center'>{renderRating(restaurant)}</div>
      <div className='mt-5'>
        <Review reviews={restaurant.reviews} />
        <AddReview rest_id={id} callback={addRestaurantCallback} />
      </div>
    </div>
  )
}

export default RestaurantDetail
