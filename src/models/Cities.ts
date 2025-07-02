import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';


class Cities extends Model 
{
  public id!: number;                          
  public terminal_name!: string;    
  public city!: string;
  public is_active!: boolean;
  public address! : string;
}


//initial values of the user table - idher we can add rules for each field 
Cities.init(
  {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    terminal_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
    },

    address: {
      type: DataTypes.STRING,
    }
  },
  {

    sequelize,
    modelName: 'Cities',
    tableName: 'cities',
    
  }
);

export default Cities;
