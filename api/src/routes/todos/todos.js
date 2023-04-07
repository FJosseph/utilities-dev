const { Router } = require('express')
const { addTodos, getTodosByUser, updateTodo, deleteTodo } = require('../../controllers/todos')
const router = Router()

//* TODOS
// Obtener todos
router.get('/', async (req,res)=>{
    const { idUser } = req.query
    try {
        const todos = await getTodosByUser(idUser)
        res.json(todos)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
    res.send('Hola mundo!!')
})
// Filtrar todo
router.get('/:id', (req,res)=>{})
// Añadir todo
router.post('/', async (req,res)=>{
    const { idUser, title, text, color } = req.body
    try {
        const todo = await addTodos(idUser, title, text, color)
        res.json(todo)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

// Actualizar todo
router.put('/:id', async (req, res)=>{
    const { id } = req.params
    const { idCol } = req.query
    try {
        const todo = await updateTodo(id, idCol)
        res.json(todo)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})
// Eliminar todo
router.delete('/:id', async(req,res)=>{
    const { id } = req.params
    try {
        const response = await deleteTodo(id)
        res.json(response)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

module.exports = router