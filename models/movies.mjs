import Joi from 'joi';
import mongoose from 'mongoose'
import { genreSchema } from './genres.mjs';


const Movie=new mongoose.model('movies',mongoose.Schema({
    title:{type:String,
        minlength:3,
        maxlength:255,
        required:true
    
    },
    genre:{ type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,required:true,min:0,max:255
    },
    dailyRentalRate:{type:Number,required:true,min:0,max:255}
}))

function validateMovie(course){
    const schema=Joi.object({
        title:Joi.string().required().min(3).max(255),
        genreId:Joi.myJoiObjectId().required(),
        numberInStock:Joi.number().min(0).max(255),
        dailyRentalRate:Joi.number().min(0).max(255)
    })
    return schema.validate(course);
    }
    export {Movie,validateMovie as validate}