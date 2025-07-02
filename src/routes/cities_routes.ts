import express from 'express';
import { addCityController, getCityDetailsController, updateCityController, deleteCityController } from '../controllers/cities_controller';

const router = express.Router();

router.post('/addCity', addCityController);                  //create
router.get('/getCityData/:id', getCityDetailsController);    //read
router.put('/updateCity/:id', updateCityController);        //update
router.delete('/deleteCity/:id', deleteCityController);      //delete

export default router;
