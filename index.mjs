
import express from 'express'
import  './logger/logger.mjs';
const app = express();
import route from  './startup/routes.mjs'
route(app);
import db from   './startup/db.mjs';
db();
 import config from './startup/config.mjs'
 conf
 
import logger from './logger/logger.mjs';

validation();



const port=process.env.PORT|3000;
app.listen(port,()=>{
   logger.info(`listening to port no ${port}`);
})

