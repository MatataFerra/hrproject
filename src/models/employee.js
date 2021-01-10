const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/conect');

class Employee extends Model {}

Employee.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true        
    },

    cuil: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true        
    },

    address: {
        type: DataTypes.STRING
    },

    streetnumber: {
        type: DataTypes.INTEGER
    },

    postalcode: {
        type: DataTypes.INTEGER
    },

    phone: {
        type: DataTypes.INTEGER
    },

    email: {
        type: DataTypes.STRING
        
    },

    isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: false
})

  module.exports = {
    Employee
  }