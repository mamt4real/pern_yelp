const express = require('express')
const cors = require('cors')
require('./config')()
const restaurantRouter = require('./routes/restaurantRoutes')

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/api/v1/restaurants', restaurantRouter)

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong, please try again!',
  })
})
const port = process.env.PORT || 3006

app.listen(port, () => console.log(`Server started on port ${port}`))
