const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class AbsenceEmployee extends Model {}

AbsenceEmployee.init({

}, {
    sequelize,
    modelName: 'AbsenceEmployee',
    tableName: 'absenceemployee',
    timestamps: false
});

module.exports = {
    AbsenceEmployee
}