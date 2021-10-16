import express from 'express'
import  './logger/logger.js';
const app = express();
import route from  './startup/routes.js'
route(app);
import db from   './startup/db.js';
db();
 import config from './startup/config.js'
config();
 
import logger from './logger/logger.js';
import validation from './startup/validation.js'
validation();
import prod from './startup/prod.js'
prod(app);
const port =process.env.PORT||4080;
const server=app.listen(port,()=>{
    logger.info(`app is listening on port no ${port}`)
})

export default server;
