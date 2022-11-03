import React, { createContext } from 'react'
import { useState } from 'react'

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([])

  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {props.children}
    </RestaurantsContext.Provider>
  )
}
