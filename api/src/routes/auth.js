const { Router } = require('express')
const { register, logIn, getUser } = require('../controllers')
const authenticate = require('../controllers/auth')
const router = Router()

router.get('/user', authenticate, async(req,res)=>{
    const { userId } = req
    try {
        const user = await getUser(userId)
        return res.send({
            id: user.dataValues.id ,
            firstname: user.dataValues.firstname ,
            lastname: user.dataValues.lastname ,
            email: user.dataValues.email ,
            auth: true
        })
    } catch (error) {
        return res.status(404).send({
            error: error.message
        })
    }
})

router.post('/signin', async(req,res)=>{
    const {email, password, googleToken} = req.body
    try {
        const user = await logIn(email, password, googleToken)
        return res.send({auth: true, ...user})
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
})

router.post('/signup', async(req,res)=>{
    const {firstname, lastname, email, password, googleToken} = req.body
    if(!email) return res.status(404).send({
        message: '¡Email is required!'
    })
    try {
        const user = await register(firstname, lastname, email, password, googleToken)
        return res.send({auth: true, ...user})
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
})

module.exports = router