const { Router } = require('express')
const { addCol, getColsByUser, getAll } = require('../../controllers/todos')
const router = Router()

router.get('/', async (req, res)=>{
    const { idUser } = req.query
    try {
        const data = await getAll(idUser)
        res.json(data)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

module.exports = router