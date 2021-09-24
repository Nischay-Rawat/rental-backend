import 'express-async-errors'
import error from './middleware/error.mjs'
import  'winston-mongodb'
import mongoose from 'mongoose'
import winston from 'winston';
import express from 'express'
import genres from './route/genres.mjs'
import customers from './route/customers.mjs'
import movies from './route/movies.mjs'
import rentals from './route/rentals.mjs'
import Joi from 'joi'
import JoiObjectId from "joi-objectid";
import users from "./route/users.mjs"
import auth from "./route/auth.mjs" 
import config from 'config'
import auth from 
process.on('uncaughtException',(er)=>{
    winston.error(er.message,er);
    process.exit(1);
    
})
process.on('unhandledRejection',(er)=>{
    winston.error(er.message,er);
})


winston.add(new winston.transports.File({ filename: 'logfile.log', }));
winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly',level:'info'}))
if(!config.get('jwtPrivateKey')){
    console.log("FatalError:jwtPrivateKey not defined");
    process.exit(1);
}
Joi.myJoiObjectId=JoiObjectId(Joi);


p.then(()=>console.log('Done'));
mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('connected to vidly dabatabes'))
.catch((error)=>console.log('failed to connect'));
const app = express();
app.use(express.json());
app.use('/api/genres',genres)
app.get('/',(req,res)=>{
 res.send('Home');

});

app.use('/api/customers',customers);
app.use('/api/genres',genres);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users)
app.use('/api/auth',auth)
app.use(error);

const port=process.env.PORT|3000;
app.listen(port,()=>{
    console.log('listening to port no ',port);
})

