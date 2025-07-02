import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';


class Bus extends Model {
    public id!: number;        
    public registrationNo!: string; 
    public description!: string;
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
    },

    description:{
        type: DataTypes.STRING,
        allowNull:true,
    }


},
{
    sequelize,
    modelName: 'Bus',
    tableName: 'buses'
}
)


export default Bus;