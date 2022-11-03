import React from 'react'
import StarRating from './StarRating'

function Review({ reviews }) {
  return (
    <div className='row row-cols-3 mb-2 mx-auto'>
      {reviews?.map((review, i) => (
        <div
          key={review.id || i + 1}
          className='card text-white bg-primary mb-3 mr-4'
          style={{ maxWidth: '30%', minWidth: '30%' }}
        >
          <div className='card-header d-flex justify-content-between'>
            <span>{review?.name}</span>
            <span>
              <StarRating rating={review?.rating} />
            </span>
          </div>
          <div className='card-body'>
            <p className='card-text'>{review?.review}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Review
