const express = require('express')
const { Router } = express
const router = Router()
const auth = require('./auth')
const todos = require('./todos')

//* Auth
router.use('/', auth)
//* Todos
router.use('/todos', todos)

module.exports = router