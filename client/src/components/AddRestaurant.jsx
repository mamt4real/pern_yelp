import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import instance from '../axios'
import { RestaurantsContext } from '../context/RestaurantsContext'

function AddRestaurant() {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)
  const [details, setDetails] = useState({
    name: '',
    location: '',
    price_range: 'Price Range',
  })
  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await instance({
        method: 'POST',
        url: '/restaurants',
        data: details,
      })
      if (res.status === 201) {
        setRestaurants([...restaurants, res.data.data])
        setDetails({
          name: '',
          location: '',
          price_range: 'Price Range',
        })
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message)
    }
  }
  return (
    <div className='my-4'>
      <form action='' onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='col'>
            <input
              type='text'
              name='name'
              value={details.name}
              onChange={handleChange}
              className='form-control'
              placeholder='Name'
            />
          </div>
          <div className='col'>
            <input
              type='text'
              name='location'
              value={details.location}
              onChange={handleChange}
              className='form-control'
              placeholder='Location'
            />
          </div>
          <div className='col'>
            <select
              name='price_range'
              value={details.price_range}
              onChange={handleChange}
              className='custom-select  mr-sm-2'
              id=''
            >
              <option disabled> Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
