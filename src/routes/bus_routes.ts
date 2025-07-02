import express from 'express';
import { addBusController, getBusDetailsController, updateBusController, deleteBusController } from '../controllers/bus_controller';

const router = express.Router();

router.post('/addbus', addBusController);                  //create
router.get('/getBusData/:id', getBusDetailsController);    //read
router.put('/updateBus/:id', updateBusController);        //update
router.delete('/deleteBus/:id', deleteBusController);      //delete

export default router;
