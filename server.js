const express = require('express')
const cors = require('cors')               // ⬅️ ADD THIS
const dotenv = require('dotenv')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

dotenv.config()
const dbConnection = require('./db')

// Enable CORS for frontend origin
app.use(cors({
  origin: 'http://localhost:3000',        // ⬅️ Allow only your frontend origin
  credentials: true
}))

app.use(express.json())

// Routes
app.use('/api/cars/', require('./routes/carsRoute'))
app.use('/api/users/', require('./routes/usersRoute'))
app.use('/api/bookings/', require('./routes/bookingsRoute'))

// Production deployment
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'))  // ⬅️ FIXED LINE
  })
}

// Default route
app.get('/', (req, res) => res.send('Hello World!'))

// Start server
app.listen(port, () => console.log(`Node JS Server Started on Port ${port}`))
