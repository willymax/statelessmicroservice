const express = require('express')
const jwt = require('jsonwebtoken')
const loadData = require('./data/loadData')
const applyOperation = require('fast-json-patch').applyOperation
const applyReducer = require('fast-json-patch').applyReducer
var bodyParser = require('body-parser')

const API_PORT = 3000
const app = express()

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// add headers first before defining routes
app.use(function (req, res, next) {
  // allow all websites for testing/not good for production
  res.setHeader('Access-Control-Allow-Origin', '*')

  // the method the server will allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  // request headers the server can accept from the client
  res.setHeader('Access-Control-Allow-Headers', '*')

  // true if the server will include cookies else false
  res.setHeader('Access-Control-Allow-Credentials', false)

  // Pass to next layer of middleware/all the request to go next
  next()
})

app.get('/', (req, res) => {
  res.send('Hello world')
})
// protected
// patch endpoint
app.patch('/json-patch', (req, res, next) => {
  //get the authorization header
  var header = req.headers.authorization || ''
  //get the token which is after Bearer of the authorization header value
  var token = header.split(/\s+/).pop() || ''
  if (!token) {
    //check if has token
    return res.status(403).send({
      err: `You are not authrized to access this resource ${token}`,
    })
  } else {
    //verify token
    try {
      //process.env.TOKEN_KEY remember to fix
      var decoded = jwt.verify(token, 'vdhjpazqit')
      const { original, patch } = req.body
      var originalObject = JSON.parse(original)
      var patchObject = JSON.parse(patch)
      var updatedDocument = patchObject.reduce(applyReducer, originalObject)
      res.status(200).json(updatedDocument)
    } catch (err) {
      console.log(err)
      // err token not valid
      return res.status(403).send({
        err: 'Invalid token',
      })
    }
  }
})

// login endpoint
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
