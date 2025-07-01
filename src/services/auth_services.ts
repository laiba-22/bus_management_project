const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import User from '../models/User'


//user type
interface UserCredentials {

    name:string; 
    email:string; 
    password:string; 
    phoneNo:string;
    userType?: "user" | "super_admin";  //default is user

}


//helper function - check if user already exists
const checkUserExists = async (email : string) : Promise<boolean> => {

    const userExists = await User.findOne({ where: { email } });
    return userExists !== null;        //true if user exists
  
};


//signup service
export const userSignupService = async (userInfo : UserCredentials) : Promise<any>=> {

    let {name, email, password, phoneNo, userType} : UserCredentials = userInfo;

    //checking is someone is trying to create a super admin
    if (userType === 'super_admin') {
        throw new Error("Super admin can not be created!");
    }

    //default userType = 'user'
    userType = userType || 'user';

    //checking for existing user
    const userExists = await checkUserExists(email);
    if (userExists) {   
        throw new Error("User already exists!");
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10); 
    
    //adding the user to our db using create func
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNo,
        userType
    })
   
    //success response
    return {
        success:true,
        message: 'User created successfully!' , 
        user: {
            name,
            email,          
            phoneNo
        }
    };

}



//login service
export const loginService = async (mail: string, pw: string) : Promise<any> => {

    const { email, password }: {email:string; password:string} = { email: mail, password: pw };

    //fetching the user with the email id
    const userr = await User.findOne({ where: {email}})

    //no user with this email
    if (!userr) {
        throw new Error("User with this email does not exist!");
    }

    //since user with email is found- now we confirm pw
    const isPasswordValid = await bcrypt.compare(password, userr.password);
    if (!isPasswordValid) {
        throw new Error( "Incorrect Password!");
    }

    //creating a token
    const token = jwt.sign({ id: userr.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    console.log("login service called");

    return{
        success:true,
        message: 'Login successful!',
        token,
        user: {
            name: userr.name,
            email: userr.email,
            phoneNo: userr.phoneNo
        }
    };


}


