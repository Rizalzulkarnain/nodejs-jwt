const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: "http://localhost:8080"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// database
const db = require('./app/model')
const Role = db.role




db.sequelize.sync()
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }')
//   initial()
// })

// simple route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to jwt-auth application" })
})

// routes
require('./app/route/auth.route')(app)
require('./app/route/user.route')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

function initial() {
  Role.create({
    id: 1,
    name: "user"
  })

  Role.create({
    id: 2,
    name: "moderator"
  })

  Role.create({
    id: 3,
    name: "admin"
  })
}