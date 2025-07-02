import User from '../models/User';  
import sequelize from '../sequelize';
import bcrypt from 'bcryptjs';
require('dotenv').config();
const prompt = require('prompt-sync') ({ sigint: true });


const createSuperAdmin = async () => {

  try {

    await sequelize.sync(); 

    const existingAdmin = await User.findOne({ where: { userType: 'super_admin' } });

    if (existingAdmin) {
      console.error('Super admin already exists!');
      return;
    } 

    await User.create({
      name:"Laiba",
      email: "Laiba123@gmail.com",
      password: bcrypt.hash("Laiba123", 10),
      phoneNo: "1234567890",
      userType: 'super_admin'
    });

    console.log('Super admin created successfully!');
  } catch (err) {
    console.error('Error creating super admin:', err);
  } finally {
    await sequelize.close();
  }

};

createSuperAdmin();
