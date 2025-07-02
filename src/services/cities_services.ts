import Bus from '../models/Bus'
import Cities from '../models/Cities';
import { CityDetails } from '../types/types';


//---adding a new bus---
export const addCityService = async (cityDetails: CityDetails): Promise<any> => {

    const {terminal_name, city, is_active, address } = cityDetails;


    //checking if city already exists
    const existingCity = await Cities.findOne({ where: { city: cityDetails.city } });
    if (existingCity) {  
        throw new Error("City already exists!");
    }


    //creating a new city
    const newCity = await Cities.create({ terminal_name, city, is_active, address });

    return {
        success: true,
        message: 'City added successfully!',
        newCity
    };

}


//---getting city details by id---
export const getCityDetailsService = async (cityId: number): Promise<any> => {

    const city = await Cities.findByPk(cityId);

    if (!city) {
        throw new Error("City not found!");
    }

    return {
        success: true,
        message: 'City details fetched successfully!',
        city
        }
        
};


//---updating city details---
export const updateCityService = async (cityId: number, cityDetails: CityDetails) : Promise<any> => {

    //finding the city
    const newcity = await Cities.findByPk(cityId);

    if (!newcity) {
        throw new Error("City not found!");
    }


    const {terminal_name, city, is_active, address } = cityDetails;
    
    newcity.terminal_name = terminal_name
    newcity.city = city 
    newcity.is_active= is_active
    newcity.address = address
    await newcity.save();

    
    return {
        success: true,
        message: 'City updated successfully!',
        newcity
        }

};


export const deleteCityService = async (cityId: number): Promise<any> => {

    const city = await Cities.findByPk(cityId);

    if (!city) {
        throw new Error("City not found!");
    }

    
    await city.destroy()


    return {
        success: true,
        message: 'City deleted successfully!',
        }
        
};
