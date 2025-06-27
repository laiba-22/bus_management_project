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
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("./sequelize"));
const User_1 = __importDefault(require("./models/User"));
sequelize_1.default.sync()
    .then(() => console.log('✅ Sequelize connected to DB'))
    .catch(err => console.error('❌ Sequelize failed to connect', err));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
//root route
app.get('/', (req, res) => {
    res.send('this is the postgres auth api');
});
//helper function - check if user already exists
const checkUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield User_1.default.findOne({ where: { email } });
    return userExists !== null; //true if user exists
});
//---SIGNUP---
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNo } = req.body;
    //checking for existing user
    const userExists = yield checkUserExists(email);
    if (userExists) {
        return res.status(400).json({ message: 'OPPS:( user already exists!' });
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
    res.status(201).json({ message: 'WOHOO:) user created successfully!',
        user: {
            name,
            email,
            phoneNo
        }
    });
}));
//login
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //fetching the user with the email id
    const userr = yield User_1.default.findOne({ where: { email } });
    //no user with this email
    if (!userr) {
        return res.status(400).json({ message: 'OPPS:( user with this email does not exist!' });
    }
    //since user with email is found- now we confirm pw
    const isPasswordValid = yield bcrypt.compare(password, userr.password);
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
}));
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
