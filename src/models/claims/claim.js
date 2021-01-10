const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class Claim extends Model {}

Claim.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    type: {
        type: DataTypes.STRING
    },

    dayofclaim: {
        type: DataTypes.DATEONLY
    },

    content: {
        type: DataTypes.STRING(1000)
    },
    tracing: {
        type: DataTypes.STRING(1000)
    },
    
    linkemail: {
        type: DataTypes.STRING(1000)
    }
}, {
    sequelize,
    modelName: 'Claim',
    tableName: 'claims',
    timestamps: false
});

module.exports = {
    Claim
}