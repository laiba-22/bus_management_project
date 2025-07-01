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
exports.addBus = void 0;
const Bus_1 = __importDefault(require("../models/Bus"));
const Routes_1 = __importDefault(require("../models/Routes"));
//---adding a new bus---
const addBus = (busDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const { registrationNo, routes } = busDetails;
    //checking if bus already exists
    const existingBus = yield Bus_1.default.findOne({ where: { registrationNo: busDetails.registrationNo } });
    if (existingBus) {
        throw new Error("Bus with this registration number already exists!");
    }
    //creating a new bus
    const newBus = yield Bus_1.default.create({ registrationNo });
    //adding the routes
    for (const route of routes) {
        yield Routes_1.default.create(Object.assign(Object.assign({}, route), { busId: newBus.id }));
    }
    return {
        success: true,
        message: 'Bus and routes added successfully!',
        bus: {
            registrationNo,
            routes
        }
    };
});
exports.addBus = addBus;
