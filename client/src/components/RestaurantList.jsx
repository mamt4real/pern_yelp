import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../axios'
import { RestaurantsContext } from '../context/RestaurantsContext'
import StarRating from './StarRating'

function RestaurantList() {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)
  const navigate = useNavigate()
  useEffect(() => {
    instance({
      url: '/restaurants',
    })
      .then((res) => {
        if (res.status === 200) {
          setRestaurants(res.data.data)
        }
      })
      .catch((error) => {
        console.error(error.response?.data.message || error.message)
      })
  }, [])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      const res = await instance({
        url: `/restaurants/${id}`,
        method: 'DELETE',
      })
      if (res.status === 204) {
        setRestaurants(restaurants.filter((r) => r.id !== id))
      } else {
        alert(res.data.message)
      }
    } catch (error) {
      console.error(error)
      alert(error.response?.data.message || error.message)
    }
  }

  const handleUpdate = (e, id, isDetail = true) => {
    e.stopPropagation()
    navigate(`/restaurants/${id}${isDetail ? '' : '/update'}`)
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

  return (
    <div className='list-group'>
      <table className='table table-hover table-dark .auto-w'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>S/N</th>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Rating</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants?.map((r, i) => (
            <tr key={r.id} onClick={(e) => handleUpdate(e, r.id)}>
              <td>{i + 1}</td>
              <td>{r.name}</td>
              <td>{r.location}</td>
              <td>{'$'.repeat(r.price_range)}</td>
              <td>{renderRating(r)}</td>
              <td>
                <button
                  className='btn btn-warning'
                  onClick={(e) => handleUpdate(e, r.id, false)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={(e) => handleDelete(e, r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
