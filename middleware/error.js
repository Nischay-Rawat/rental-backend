import logger from '../logger/logger.js'
export default function(error,req,res,next){
    logger.error(error.message,{metadata:error});
  
    res.status(500).send("Something failed");
}