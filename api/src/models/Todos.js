const { DataTypes, literal } = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define('todo', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: literal('gen_random_uuid()')
        },
        title: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    }, {
        timestamps: false
    })
}