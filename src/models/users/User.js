const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class User extends Model {}

const role = {
    admin: 'admin',
    regular: 'regular'
}

User.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    role: {
        type: DataTypes.STRING,
        defaultValue: role.regular
    }
},{
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
})

module.exports = {
    User,
    role
}