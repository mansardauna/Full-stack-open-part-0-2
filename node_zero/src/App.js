const morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const person = require('./person')

app.use(express.static('build'))

