const { DataTypes, literal } = require("sequelize")
const bcrypt = require('bcrypt')

module.exports = (sequelize) =>{
    sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: literal('gen_random_uuid()')
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            set(value){
                const salt = bcrypt.genSaltSync(10)
                this.setDataValue('password', bcrypt.hashSync(value, salt))
            }
        },
        google: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    })
}