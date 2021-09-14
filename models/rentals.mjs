import mongoose from 'mongoose'
import Joi from 'joi'

const Rental =mongoose.model('Rental',mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{type:String,required:true,minlength:5,maxlength:50},
            isGold:{
                type:Boolean,
                default:false,
            },
            phone:{type:String,required:true,minlength:5,maxlength:50
            }
        }),
        required:true
        },
    movie:{
        type:mongoose.Schema({
            title:{
                type:String,required:true,trim:true,minlength:5,maxlegth:255
            },
            dailyRentalRate:{
                type:Number,required:true,min:0,max:255
            }
        }),
        required:true
    },
        dateOut:{
            type:Date,required:true,default:Date.now
        },
        dateReturned:{
            type:Date
        },
        rentalFee:{
             type:Number,min:0
        }
        
    }))
    
    function validateRental(rental){
        const schema=Joi.object({
            customerId:Joi.myJoiObjectId().required(),
            movieId:Joi.myJoiObjectId().required(),
        })
        ;
        return schema.validate(rental);
    }
export{validateRental as validate,Rental}