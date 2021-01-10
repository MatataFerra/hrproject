const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class EmailEmployee extends Model {}

EmailEmployee.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    link: {
        type: DataTypes.STRING(500)
    }
}, {
    sequelize,
    modelName: 'EmailEmployee',
    tableName: 'emailsOfEmployees',
    timestamps: false
});

module.exports = {
    EmailEmployee
}