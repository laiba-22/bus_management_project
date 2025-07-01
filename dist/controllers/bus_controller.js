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
exports.addBusController = void 0;
require('dotenv').config();
const bus_services_1 = require("../services/bus_services");
//---CREATE BUS - CONTRLOLLER---
const addBusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, bus_services_1.addBus)(req.body);
        res.status(201).json({ success: true, message: "Bus added successfully!", result }); //success response
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.addBusController = addBusController;
