import express from 'express';
import { addBusController } from '../controllers/bus_controller';

const router = express.Router();

router.post('/addbus', addBusController);

export default router;