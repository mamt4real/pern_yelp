import React from 'react'
import { useState } from 'react'
import instance from '../axios'

function AddReview({ rest_id, callback }) {
  const [review, setReview] = useState({
    name: '',
    review: '',
    rating: 'Rating',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) =>
    setReview({ ...review, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await instance({
        method: 'POST',
        url: `/restaurants/${rest_id}/reviews`,
        data: review,
      })
      if (res.status === 201) {
        setReview({
          name: '',
          review: '',
          rating: 'Rating',
        })
        callback(res.data.data)
        setMessage('Review submitted')
        setTimeout(() => setMessage(''), 1500)
      } else {
        setMessage(res.data.message)
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message)
      console.log(error)
    }
  }
  return (
    <div className='mb-2' style={{ maxWidth: '800px' }}>
      <h4 className='text-center'>Write your Review</h4>
      {message && <div className='text-center'>{message}</div>}
      <form action='' onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              id='name'
              name='name'
              value={review.name}
              onChange={handleChange}
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor=''>Name</label>
            <select
              id='rating'
              className='custom-select'
              value={review.rating}
              onChange={handleChange}
              name='rating'
            >
              <option disabled>Rating</option>
              {Array(5)
                .fill()
                .map((_, i) => (
                  <option value={i + 1} key={i + 10}>
                    {i + 1}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='review'>Review</label>
          <textarea
            name='review'
            id='review'
            value={review.review}
            onChange={handleChange}
            className='form-control'
          ></textarea>
        </div>
        <button className='btn btn-success' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddReview
