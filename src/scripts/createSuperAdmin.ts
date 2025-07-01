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
      console.log('Super admin already exists!');
      return;
    }

    //taking input for super admin details
    const name = prompt('Enter super admin name: ');
    const email = prompt('Enter super admin email: ');  
    const phoneNo = prompt('Enter super admin phone number: ');
    const password = prompt.hide('Enter super admin password: ');

    const hashedPassword = await bcrypt.hash(password  , 10);   

    await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNo,
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
