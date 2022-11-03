import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'
import UpdateRestaurant from './pages/UpdateRestaurant'
import { RestaurantsContextProvider } from './context/RestaurantsContext'
function App() {
  return (
    <RestaurantsContextProvider>
      <div className='container app'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path={'/restaurants/:id'} element={<RestaurantDetail />} />
            <Route
              path={'/restaurants/:id/update'}
              element={<UpdateRestaurant />}
            />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  )
}

export default App

