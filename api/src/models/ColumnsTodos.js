const { DataTypes, literal } = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define('col', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: literal('gen_random_uuid()')
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            // autoIncrement: true,
            // validate: {
            //     min: 1,
            //     max: 6
            // }
            validate: {
                min: 0,
                max: 5
            }
        }
    }, {
        timestamps: false
    })
}