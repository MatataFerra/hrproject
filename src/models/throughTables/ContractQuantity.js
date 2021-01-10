const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class ContractQuantity extends Model {}

ContractQuantity.init({

    quantity: {
        type: DataTypes.INTEGER
    }

}, {
    sequelize,
    modelName: 'ContractQuantity',
    tableName: 'contractQuantitys',
    timestamps: false
});

module.exports = {
    ContractQuantity
}