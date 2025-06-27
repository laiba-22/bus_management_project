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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.signupController = void 0;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth_services_1 = require("../services/auth_services");
//---SIGNUP CONTROLLER---
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNo } = req.body;
    try {
        const result = yield (0, auth_services_1.userSignupService)({ name, email, password, phoneNo });
        res.status(201).json(result); //success response
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.signupController = signupController;
//----LOGIN CONTROLLER----
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield (0, auth_services_1.loginService)(email, password);
        res.status(200).json(result);
        console.log(`User ${result.user.name} logged in successfully using my super awesome service!`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.loginController = loginController;
