const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/conect');

class Rol extends Model {}

Rol.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    position: {
        type: DataTypes.STRING(250),
        defaultValue: 'Docente'
    }
    
}, {
    sequelize,
    modelName: 'Rol',
    tableName: 'rol',
    timestamps: false
});

module.exports = {
    Rol
}