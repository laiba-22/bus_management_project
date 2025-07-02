import Bus from '../models/Bus'
import Route from '../models/Routes'
import { BusDetails, RouteDetails } from '../types/types';



//---adding a new bus---
export const addBusService = async (busDetails: BusDetails): Promise<any> => {

    const { registrationNo, description , routes } = busDetails;

    //checking if bus already exists
    const existingBus = await Bus.findOne({ where: { registrationNo: busDetails.registrationNo } });
    if (existingBus) {  
        throw new Error("Bus with this registration number already exists!");
    }

    //creating a new bus
    const newBus = await Bus.create({ registrationNo, description });

    //adding the routes
    for (const route of routes) 
    {
        await Route.create({ ...route, busId: newBus.id });
    }

    return {
        success: true,
        message: 'Bus and routes added successfully!',
        newBus
    };

}


//---getting bus details by id---
export const getBusDetailsService = async (busId: number): Promise<any> => {

    //fetching bus details
    const bus = await Bus.findByPk(busId, {
        include: [Route]
    });

    if (!bus) {
        throw new Error("Bus not found!");
    }

    return {
        success: true,
        message: 'Bus details fetched successfully!',
        bus
        }
        
};


//---updating bus details---
export const updateBusService = async (busId: number, busDetails: BusDetails) : Promise<any> => {

    //finding the bus
    const bus = await Bus.findByPk(busId);

    if (!bus) {
        throw new Error("Bus not found!");
    }

    const {registrationNo, description, routes}=busDetails;
    
    bus.registrationNo = registrationNo;
    bus.description = description;
    await bus.save();

    //deleting existing routes
    await Route.destroy({ where: { busId } });

    //new routes based on payroll
    for (const route of routes) {
        await Route.create({ ...route, busId: bus.id });
    }

    const updatedBus = await Bus.findByPk(busId, { include: [Route] });
    
    return {
        success: true,
        message: 'Bus and its routes updated successfully!',
        updatedBus
        }

};


export const deleteBusService = async (busId: number): Promise<any> => {

    //finding the bus
    const bus = await Bus.findByPk(busId);

    //no bus- so error
    if (!bus) {
        throw new Error("Bus not found!");
    }

    //deleting routes
    Route.destroy({ where: {busId} })

    //deleting bus
    await bus.destroy()

    return {
        success: true,
        message: 'Bus and its routes deleted successfully!',
        }
        
};
