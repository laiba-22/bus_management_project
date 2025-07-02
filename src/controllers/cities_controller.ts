require('dotenv').config();
import express, {Request, Response} from 'express'
import { addCityService, getCityDetailsService, deleteCityService, updateCityService } from '../services/cities_services';
import {CityDetails} from '../types/types';


//---CREATE CITY - CONTRLOLLER---
export const addCityController = async (req : Request, res : Response) : Promise<any>=> {

    try {

        const result = await addCityService(req.body);   
        res.status(201).json({ result});                //success response
    } 
    catch (error: any) {

        res.status(400).json({ success:false, message: error.message });
    }


}



//---GET CITY DETAILS - CONTROLLER---
export const getCityDetailsController = async (req : Request, res : Response) : Promise<any>=> {

    try {

        const cityId = parseInt(req.params.id);             //url params me se bus id fetch kar rae 
        const result = await getCityDetailsService(cityId);
        res.status(200).json({result});

    } 
    catch (error: any) {

        res.status(400).json({ success: false, message: error.message });
    }

}



//---UPDATE CITY - CONTROLLER---
export const updateCityController = async (req : Request, res : Response) : Promise<any>=> {

    try{

        const cityId = parseInt(req.params.id);             //url params me se bus id fetch kar rae 
        const updatedBusDetails: CityDetails = req.body;
        const result = await updateCityService(cityId, updatedBusDetails);
        res.status(200).json({result});

    }
    catch{
        res.status(400).json({ success: false, message: "Error updating bus details" });
    }

}




//---DELETE CITY - CONTROLLER ----
export const deleteCityController = async (req: Request, res : Response): Promise <any> =>{
    
    try{

        const cityId = parseInt(req.params.id);
        const result = await deleteCityService(cityId);
        res.status(200).json({result});

    }
    catch{
        res.status(400).json({ success: false, message: "Error deleting bus" });
    }

}

