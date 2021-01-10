const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class ContractABM extends Model {}

ContractABM.init({

}, {
    sequelize,
    modelName: 'ContractABM',
    tableName: 'contractABMs',
    timestamps: false
});

module.exports = {
    ContractABM
}