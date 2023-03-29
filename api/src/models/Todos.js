const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define('todos', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true
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
            allowNull: false
        }
    }, {
        timestamps: false
    })
}