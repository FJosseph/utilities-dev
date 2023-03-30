const { Router } = require('express')
const router = Router()
const col = require('./col-todos')
const todos = require('./todos')
const all = require('./all')
//* ALL
router.use('/all', all)

//* COLUMNS TODOS
router.use('/col', col)

//* TODOS
router.use('/todo', todos)

module.exports = router