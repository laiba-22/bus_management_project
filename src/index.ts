const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
import sequelize from './sequelize';
import express, {Request, Response} from 'express'
import authRoutes from './routes/auth_route';
import adminRoutes from './routes/admin_routes';


//checking ke saare models database me hain na
sequelize.sync()   
 

//setting up our app
const app = express();
app.use(express.json()); 
const port = process.env.PORT;


//to use the routes set up in auth_routes.ts
app.use('/', authRoutes); 


//for admin crud operations
app.use('/admin', adminRoutes)


//root route
app.get('/', (req : Request, res : Response) => {
  res.send('this is the postgres auth api');
});


//listening on port
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});