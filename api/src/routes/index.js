const express = require('express')
const { Router } = express
const router = Router()
const auth = require('./auth')
const todos = require('./todos/index')

//* Auth
router.use('/', auth)
//* Todos
router.use('/todo-app', todos)

module.exports = router