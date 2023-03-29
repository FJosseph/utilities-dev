const jwt = require('jsonwebtoken')
const {SECRET_PASSWORD} = process.env

const authenticate = (req, res, next)=>{
    const tokenHeader = req.headers['x-access-token']
    if(!tokenHeader) return res.status(404).send({auth: false,message: 'Token is required'})
    try {
        const token = jwt.verify(tokenHeader,SECRET_PASSWORD)
        req.userId = token.id
        next()        
    } catch (error) {
        return res.status(404).json({
            auth: false,
            message: error.message
        })
    }
}

module.exports = authenticate