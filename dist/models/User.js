"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
class User extends sequelize_1.Model {
}
//initial values of the user table - idher we can add rules for each field 
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    phoneNo: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, //to remove createdAt/updatedAt col
});
exports.default = User;
