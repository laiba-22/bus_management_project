"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
const Bus_1 = __importDefault(require("./Bus"));
class Route extends sequelize_1.Model {
}
Route.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    busId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Bus_1.default,
            key: 'id',
        },
    },
    source: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    departureTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    arrivalTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    fare: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize: sequelize_2.default,
    modelName: 'Routes',
    tableName: 'routes'
});
//association btw bus and routes
Bus_1.default.hasMany(Route, { foreignKey: 'busId' });
Route.belongsTo(Bus_1.default, { foreignKey: 'busId' });
exports.default = Route;
