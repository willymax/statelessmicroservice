const express = require('express')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')

const API_PORT = 3000
const app = express()

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/login', (req, res, next) => {
  try {
    // get username and password from req body
    const { username, password } = req.body

    // validate the two fields
    // they are all required
    if (!username || !password) {
      return res.status(422).send({
        err: 'You must enter username and password',
      })
    }
    const user = { username }

    // this auth uses arbitrary username/password
    // create toke directly
    //process.env.TOKEN_KEY
    const token = jwt.sign({ username: username }, 'vdhjpazqit', {
      expiresIn: '2h',
    })

    // add the token created to the user object
    user.token = token

    // return response with the object
    res.status(200).json(user)
  } catch (err) {
    res.status(404).send('An error occurred while login. Try again')
  }
})

app.listen(API_PORT, () => {
  // for test
  console.log(`listening to API_PORT ${API_PORT}`)
})
module.exports = app
