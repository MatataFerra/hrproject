//ABM es por Alta, Baja y Modificación
//ABM is for Enrolled, Leaving or Fired and Upgrade (promotion)

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/conect');

class ABM extends Model {}

ABM.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    enrolled: {
        type: DataTypes.DATEONLY
    },

    leave: {
        type: DataTypes.DATEONLY
    }
}, {
    sequelize,
    modelName: 'ABM',
    tableName: 'abm',
    timestamps: false
});

module.exports = {
    ABM
}