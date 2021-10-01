import mongoose from 'mongoose';

import logger from '../logger/logger.mjs';
export default function(){
    mongoose.connect('mongodb://localhost/vidly')
    .then(()=>logger.info('connected to vidly dabatabes'))

   

}