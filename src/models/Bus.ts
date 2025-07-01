import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Bus extends Model {
    public id!: number;        
    public registrationNo!: number; 
}

Bus.init(
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    registrationNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  
    }
},
{
    sequelize,
    modelName: 'Bus',
    tableName: 'buses'
}
)


export default Bus;