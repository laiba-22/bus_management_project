"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth_controller");
const router = express_1.default.Router();
router.post('/signup', auth_controller_1.signupController);
router.post('/login', auth_controller_1.loginController);
exports.default = router;
