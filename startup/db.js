import mongoose from 'mongoose';
import config from 'config'
import logger from '../logger/logger.js';
export default function(){
    const db=config.get('db');
    mongoose.connect(db)
    .then(()=>logger.info(`Connected to ${db}`))

   

}