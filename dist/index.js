"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sequelize_1 = __importDefault(require("./sequelize"));
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
//checking ke saare models database me hain na
sequelize_1.default.sync();
//setting up our app
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
//to use the routes set up in auth_routes.ts
app.use('/', auth_route_1.default);
//root route
app.get('/', (req, res) => {
    res.send('this is the postgres auth api');
});
//listening on port
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
