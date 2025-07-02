//user type
export interface UserCredentials {

    name:string; 
    email:string; 
    password:string; 
    phoneNo:string;
    userType?: "user" | "super_admin";  //default is user

}


//route details
export interface RouteDetails{
    busId: number;
    source: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    fare: number;
}


//bus details
export interface BusDetails {
    registrationNo: string,
    description: string,
    routes: RouteDetails[]
}



//city details
export interface CityDetails{
    terminal_name: string;    
    city: string;
    is_active: boolean;
    address: string;
}