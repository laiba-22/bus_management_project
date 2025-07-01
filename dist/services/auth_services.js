"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.userSignupService = void 0;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User_1 = __importDefault(require("../models/User"));
//helper function - check if user already exists
const checkUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield User_1.default.findOne({ where: { email } });
    return userExists !== null; //true if user exists
});
//signup service
const userSignupService = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNo } = userInfo;
    //checking for existing user
    const userExists = yield checkUserExists(email);
    if (userExists) {
        throw new Error("User already exists!");
    }
    //hashing the password
    const hashedPassword = yield bcrypt.hash(password, 10);
    //adding the user to our db using create func
    const user = yield User_1.default.create({
        name,
        email,
        password: hashedPassword,
        phoneNo
    });
    //success response
    return {
        success: true,
        message: 'User created successfully!',
        user: {
            name,
            email,
            phoneNo
        }
    };
});
exports.userSignupService = userSignupService;
//login service
const loginService = (mail, pw) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = { email: mail, password: pw };
    //fetching the user with the email id
    const userr = yield User_1.default.findOne({ where: { email } });
    //no user with this email
    if (!userr) {
        throw new Error("User with this email does not exist!");
    }
    //since user with email is found- now we confirm pw
    const isPasswordValid = yield bcrypt.compare(password, userr.password);
    if (!isPasswordValid) {
        throw new Error("Incorrect Password!");
    }
    //creating a token
    const token = jwt.sign({ id: userr.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    console.log("login service called");
    return {
        success: true,
        message: 'Login successful!',
        token,
        user: {
            name: userr.name,
            email: userr.email,
            phoneNo: userr.phoneNo
        }
    };
});
exports.loginService = loginService;
