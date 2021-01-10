const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/conect');

class Contract extends Model {}

Contract.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING
    },

    code: {
        type: DataTypes.STRING
    },

    mount: {
        type: DataTypes.FLOAT
    }
}, {
    sequelize,
    modelName: 'Contract',
    tableName: 'contracts',
    timestamps: false
}),

module.exports = {
    Contract
}