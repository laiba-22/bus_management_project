import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import Bus from './Bus';

class Route extends Model {
    public id!: number; 
    public busId!: number;       
    public source!: string; 
    public destination!: string;
    public departureTime!: Date
    public arrivalTime!: Date;
    public fare!: number;
}  

Route.init(
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    busId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Bus, 
            key: 'id', 
        },
    },

    source: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    fare: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
},
{
    sequelize,
    modelName: 'Route',
    tableName: 'routes'
}
)


//association btw bus and routes
Bus.hasMany(Route, { foreignKey: 'busId'});
Route.belongsTo(Bus, { foreignKey: 'busId'});

export default Route;