import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import sequelize from '../src/config/sequelize-config.ts';
import supplierRouter from './router/supplierRoutes.ts';
import customerRouter from './router/customerRoutes.ts';
import login from './router/login.ts';
import { firstMiddleware } from './middlewares/middlewareExample.ts';
import { secondMiddleware } from './middlewares/middlewareExample.ts';
 
const app = express(); //creating a server
const port = 3000;
 
//Syncing the models in node and schema in DB
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced.');
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });
 
interface CustomRequest extends Request{
    customProperty?: string;
}

// app.use((req:CustomRequest ,res:Response, next:NextFunction)=>{
//     firstMiddleware(req,res,next);
// })

// app.use((req:CustomRequest ,res:Response,next:NextFunction)=>{
//     secondMiddleware(req,res,next);
// })

app.get('/example',firstMiddleware,secondMiddleware,(req:CustomRequest,res)=>{
    const customProperty = req.customProperty??"Not available";
    res.send(`Custom Property Value: ${customProperty}`);
})

//Add this line before app.use to encode white spaces in the queryparams
app.use(express.urlencoded({ extended: true })); //its for using qslibrary. qslibrary has nested elements in order to extract it we use this i think
 
//middlewire to convert body into json
app.use(express.json());
 


app.use("/api/v1",supplierRouter); //here api/v1 is called basepath
app.use("/api/v2",customerRouter); //here api/v1 is called basepath
app.use("/login",login);

app.listen(port, () => {
    console.log(`Listening to Port ${port}...`);
})