import 'express-async-errors'
import  winston from 'winston'
import 'winston-mongodb'
const {createLogger,transports,format,combine} =winston;

    const logger =createLogger({
        transports:[
            new transports.Console(),
            new transports.File({
                level:'info',
                filename:'info.log',
                format:format.combine(format.json(),format.timestamp())
                
            }),
           new transports.MongoDB(
               {
                level:'info',
                db:'mongodb://localhost/vidly',
    
            })
        ],
        exceptionHandlers: [
            new transports.File({ filename: 'exceptions.log' ,level:'info'})
          ],
          rejectionHandlers: [
            new transports.File({ filename: 'rejections.log' })
          ]

          
        
        
        
    })


logger.exitOnError=true;
export default logger