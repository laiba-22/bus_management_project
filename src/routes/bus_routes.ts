import express from 'express';
import { addBusController, getBusDetailsController, updateBusController } from '../controllers/bus_controller';

const router = express.Router();

router.post('/addbus', addBusController);                  //create
router.get('/getBusData/:id', getBusDetailsController);    //read
router.post('/updateBus/:id', updateBusController);        //update

export default router;