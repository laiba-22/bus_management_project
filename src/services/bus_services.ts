import Bus from '../models/Bus'
import Route from '../models/Routes'



//route details
interface RouteDetails{
    busId: number;
    source: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    fare: number;
}



//bus details
interface BusDetails {
    registrationNo: string,
    routes: RouteDetails[]
}



//---adding a new bus---
export const addBus = async (busDetails: BusDetails): Promise<any> => {

    const { registrationNo, routes } = busDetails;


    //checking if bus already exists
    const existingBus = await Bus.findOne({ where: { registrationNo: busDetails.registrationNo } });
    if (existingBus) {  
        throw new Error("Bus with this registration number already exists!");
    }

    
    //creating a new bus
    const newBus = await Bus.create({ registrationNo });


    //adding the routes
    for (const route of routes) 
    {
        await Route.create({ ...route, busId: newBus.id });
    }

    return {
        success: true,
        message: 'Bus and routes added successfully!',
        bus: {
        registrationNo,
        routes
        }
    };

}