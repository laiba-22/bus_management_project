require('dotenv').config();
import express, {Request, Response} from 'express'
import Bus from '../models/Bus';
import { addBus } from '../services/bus_services';



//---CREATE BUS - CONTRLOLLER---
export const addBusController = async (req : Request, res : Response) : Promise<any>=> {

    try {

        const result = await addBus(req.body);
        res.status(201).json({ result});           //success response
    } 
    catch (error: any) {

        res.status(400).json({ success:false, message: error.message });
    }


}

