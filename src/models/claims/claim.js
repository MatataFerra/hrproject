const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');
const { getDate }  = require('../../services/time')

class Claim extends Model {}

const statusName = [
    'Nuevo',
    'Leído',
    'Contestado',
    'Resuelto'
]

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
        type: DataTypes.DATEONLY,
        get() {
            const getData = this.getDataValue('dayofclaim');
            return getDate(getData)
        }
    },

    content: {
        type: DataTypes.STRING(1000)
    },
    tracing: {
        type: DataTypes.STRING(1000)
    },

    status: {
        type: DataTypes.STRING(250),
        defaultValue: statusName[0],
        validate: {
            // isIn: [
            //     [statusName]
            // ]

            isIn: [
                statusName
            ]
        }

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