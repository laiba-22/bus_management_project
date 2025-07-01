require('dotenv').config();
import express, {Request, Response} from 'express'
import Bus from '../models/Bus';
import { addBusService, getBusDetailsService } from '../services/bus_services';



//---CREATE BUS - CONTRLOLLER---
export const addBusController = async (req : Request, res : Response) : Promise<any>=> {

    try {

        const result = await addBusService(req.body);
        res.status(201).json({ result});           //success response
    } 
    catch (error: any) {

        res.status(400).json({ success:false, message: error.message });
    }


}



//---GET BUS DETAILS - CONTROLLER---
export const getBusDetailsController = async (req : Request, res : Response) : Promise<any>=> {

    try {

        const busId = parseInt(req.params.id);
        const result = await getBusDetailsService(busId);
        res.status(200).json({result});

    } 
    catch (error: any) {

        res.status(400).json({ success: false, message: error.message });
    }

}



//---UPDATE BUS - CONTROLLER---
export const updateBusController = async (req : Request, res : Response) : Promise<any>=> {

    

}
