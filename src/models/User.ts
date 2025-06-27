import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';


class User extends Model 
{
  public id!: number;      //we use ! since we'll initialize these through sequelize later
  public name!: string;
  public email!: string;
  public password!: string;
  public phoneNo!: string;
}


//initial values of the user table - idher we can add rules for each field 
User.init(
  {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
    },
    phoneNo: {
      type: DataTypes.STRING,
    },

  },
  {

    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, //to remove createdAt/updatedAt col
    
  }
);

export default User;
