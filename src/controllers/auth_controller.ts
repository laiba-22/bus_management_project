const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
import express, {Request, Response} from 'express'
import User from '../models/User';
import { userSignupService, loginService } from '../services/auth_services';



//user type
interface UserCredentials {

    name:string; 
    email:string; 
    password:string; 
    phoneNo:string;
    userType?: "user" | "super_admin";  //default is user

}



//---SIGNUP CONTROLLER---
export const signupController = async (req : Request, res : Response) : Promise<any>=> {

    const {name, email, password, phoneNo, userType} : UserCredentials = req.body;

    try {

        const result = await userSignupService({name, email, password, phoneNo, userType});
        res.status(201).json(result);           //success response
    } 
    catch (error: any) {

        res.status(400).json({ sucess:true, message: error.message });
    }


}



//----LOGIN CONTROLLER----
export const loginController = async (req : Request, res: Response) : Promise<any> => {

    const { email, password }: {email:string; password:string} = req.body;

    try {

        const result = await loginService(email, password);
        res.status(200).json(result);
        console.log(`User ${result.user.name} logged in successfully using my super awesome service!`);
    } 
    catch (error: any) {

        res.status(400).json({ sucess:true, message: error.message });
    }   

}
