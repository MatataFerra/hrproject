const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class TypeClaim extends Model {}


TypeClaim.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    typeClaim: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'TypeClaim',
    tableName: 'typeclaim',
    timestamps: false
});

module.exports = {
    TypeClaim
}