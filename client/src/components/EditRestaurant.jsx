import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import instance from '../axios'

function EditRestaurant() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState({
    name: '',
    location: '',
    price_range: 'Price Range',
  })
  const [message, setMessage] = useState('')

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

  const handleChange = (e) =>
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await instance({
        url: `/restaurants/${id}`,
        method: 'PUT',
        data: restaurant,
      })
      if (res.status === 200) {
        setRestaurant(res.data.data)
        setMessage('Updated Successfully')
        setTimeout(() => setMessage(''), 1500)
      } else setMessage(res.data.message)
    } catch (error) {
      setMessage(error.response?.data.message || error.message)
      console.log(error)
    }
  }

  return (
    <div className='container my-3'>
      {message && <div className='text-center'>{message}</div>}
      <form action='' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={restaurant.name}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            id='location'
            name='location'
            value={restaurant.location}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <select
            name='price_range'
            id='price_range'
            value={restaurant.price_range}
            onChange={handleChange}
            className='custom-select  mr-sm-2'
          >
            <option disabled> Price Range</option>
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$</option>
          </select>
        </div>
        <div
          className='actions d-flex'
          style={{ justifyContent: 'space-between' }}
        >
          <Link to={'/'}>
            <button className='btn btn-secondary'>Back</button>
          </Link>
          <button type='submit' className='btn btn-primary'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditRestaurant
