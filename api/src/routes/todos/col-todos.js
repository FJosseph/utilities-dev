const { Router } = require('express')
const { addCol, getColsByUser } = require('../../controllers/todos')
const router = Router()

//* COLUMNS TODOS
// Obtener col
router.get('/', async (req,res)=>{
    const {idUser} = req.query
    try {
        const cols = await getColsByUser(idUser)
        res.json({user: idUser,cols})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})
// Filtrar col
router.get('/:id', (req,res)=>{})
// Añadir col
router.post('/', async (req,res)=>{
    const {title, idUser} = req.body
    try {
        const newCol = await addCol(idUser, title)
        res.json(newCol)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})
// Eliminar col
router.delete('/:id', (req,res)=>{})

module.exports = router