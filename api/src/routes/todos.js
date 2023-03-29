const { Router } = require('express')
const router = Router()

router.get('/', (req,res)=>{})
router.get('/:id', (req,res)=>{})
router.post('/add', (req,res)=>{})
router.delete('/:id', (req,res)=>{})

module.exports = router