const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class ClaimsEmployees extends Model {}

ClaimsEmployees.init({

}, {
    sequelize,
    modelName: 'ClaimsEmployees',
    tableName: 'claimsEmployees',
    timestamps: false
});

module.exports = {
    ClaimsEmployees
}