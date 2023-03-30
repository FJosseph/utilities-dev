const { text } = require('body-parser')
const { Col, Todo, Users } = require('../../db')

//* ALL
const getAll= async (idUser)=>{
    const user = await Users.findOne({
        where: {
            id: idUser
        },
        include: [
            {
                model: Col,
                include: [
                    {
                        model: Todo
                    }
                ]
            }
        ]
    })
    return user
}

//* TODOS
const getTodosByUser = async (idUser)=>{
    const user = await Users.findOne({
        where: {
            id: idUser
        }
    })
    const todos = await user.getTodos()
    return todos
}


const addTodos = async (idUser, title, text, color)=>{
    const user = await Users.findOne({
        where: {
            id: idUser
        },
        include: Col
    })
    const colTodo = user.dataValues.cols.find(x=>x.dataValues.status == 0)
    const col = await Col.findOne({
        where: {
            id: colTodo.id
        }
    })
    const newTodo = await Todo.create({
            title, text, color
    })
    await user.addTodo(newTodo)
    await col.addTodo(newTodo)
    return newTodo
}

const updateTodo = async (id, idCol)=>{
    const todo = await Todo.findOne({
        where: {
            id
        }
    })
    const col = await Col.findOne({
        where: {
            id: idCol
        }
    })
    await todo.setCol(col)
    return {
        message: 'Todo is updated'
    }
}


//* COLUMNS TODOS
const getColsByUser = async (idUser)=>{
    const user = await Users.findOne({
        where: {
            id: idUser
        }
    })
    const cols = await user.getCols()
    return cols
}

const addCol = async (idUser, title)=>{
    const user = await Users.findOne({
        where: {
            id: idUser
        },
        include: Col
    })
    // Validar que no sea mayor a 5
    if(user.dataValues.cols.length > 5) throw new Error('No se puede agregar más columnas')
    // Agregar status incremental si existen columnas
    if(user.dataValues.cols.length > 0) {
        console.log(user.dataValues);
        const allStatus  = user.dataValues.cols.map(x=>x.dataValues.status)
        const maxCol = allStatus.sort((a,b)=>b-a)
        const newColWithStatus = await Col.create({
            title,
            status: maxCol[0] + 1
        })
        await user.addCol(newColWithStatus)
        return newColWithStatus 
    }
    const newCol = await Col.create({
        title
    })
    await user.addCol(newCol)
    return newCol
}

module.exports = {
    getAll,
    getColsByUser,
    addCol,
    getTodosByUser,
    addTodos,
    updateTodo
}