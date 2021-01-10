const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/conect');

class Schools extends Model {}

const level = {
    inicial: 'inicial',
    primaria: 'primaria',
    media: 'media',
    adultos: 'adultos',
    especial: 'especial'
}


Schools.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    fullname: {
        type: DataTypes.STRING
    },

    educationlevel: {
        type: DataTypes.STRING,
        defaultValue: level.primaria
    },

    numschool: {
        type: DataTypes.INTEGER
    },

    district: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 21
        }
    },

    commune: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 15
        }
    },

    address: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'Schools',
    tableName: 'schools',
    timestamps: false
});

module.exports = {
    Schools,
    level
}