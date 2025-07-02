import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';


class User extends Model 
{
  public id!: number;                          //we use ! since we'll initialize these through sequelize later
  public userType!: "user" | "super_admin" | "front_desk";    //abhi 2 types se restrict kia hai
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
    userType: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'user',      // by default - itll be a user
      validate: {
        isIn: [['user', 'super_admin', 'front_desk']], 
      },
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
