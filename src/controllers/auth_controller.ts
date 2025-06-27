const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
import express, {Request, Response} from 'express'
import User from '../models/User';



//user type
interface UserCredentials {

    name:string; 
    email:string; 
    password:string; 
    phoneNo:string;

}



//helper function - check if user already exists
const checkUserExists = async (email : string) : Promise<boolean> => {

    const userExists = await User.findOne({ where: { email } });
    return userExists !== null;        //true if user exists
  
};



//---SIGNUP CONTROLLER---
export const signupController = async (req : Request, res : Response) : Promise<any>=> {

    const {name, email, password, phoneNo} : UserCredentials = req.body;

    //checking for existing user
    const userExists = await checkUserExists(email);
    if (userExists) {   
        return res.status(400).json({ message: 'OPPS:( user already exists!' });
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10); 
    
    //adding the user to our db using create func
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNo
    })
   
    //success response
    res.status(201).json({ message: 'WOHOO:) user created successfully!' ,
        user: {
            name,
            email,
            phoneNo
        }
    });

}



//----LOGIN CONTROLLER----
export const loginController = async (req : Request, res: Response) : Promise<any> => {

    const { email, password }: {email:string; password:string} = req.body;

    //fetching the user with the email id
    const userr = await User.findOne({ where: {email}})

    //no user with this email
    if (!userr) {
        return res.status(400).json({ message: 'OPPS:( user with this email does not exist!' });
    }

    //since user with email is found- now we confirm pw
    const isPasswordValid = await bcrypt.compare(password, userr.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'OPPS:( wrong password!' });
    }

    //creating a token
    const token = jwt.sign({ id: userr.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        message: 'WOHOO:) login successful!',
        token,
        user: {
            name: userr.name,
            email: userr.email,
            phoneNo: userr.phoneNo
        }
    });

}
