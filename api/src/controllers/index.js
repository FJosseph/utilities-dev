const {Users} = require("../db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_PASSWORD } = process.env

const logIn = async(email, password, google)=>{
    if(google){}
    if(!email || !password) throw new Error('Email or password is incorrect')
    const user = await Users.findOne({
        where: {
            email
        }
    })
    if(!user) throw new Error("User doesn't exists")
    const validate = await bcrypt.compare(password, user.password)
    if(!validate) throw new Error('Password is not correct')
    const token = jwt.sign({id: user.id, email: user.email}, SECRET_PASSWORD, {expiresIn: 60*60*24})
    return {
        user: {...user.dataValues},
        token
    }
}

const register = async(firstname, lastname, email, password, google=null)=>{
    if(google){}
    const user = await Users.findOne({
        where: {
            email
        }
    })
    if(user) throw new Error('User already exists')
    const newUser = await Users.create({
        firstname,
        lastname,
        email,
        password
    })
    const token = jwt.sign({id: newUser.id, email: newUser.email}, SECRET_PASSWORD, {expiresIn: 60*60*24})
    return {
        user: newUser,
        token
    }

}

const getUser = async(id)=>{
        const user = await Users.findOne({
            where: {
                id
            }
        })
        if(!user) throw new Error("User doesn't exists!")
        return user        
}

module.exports = {
    logIn,
    register,
    getUser
}