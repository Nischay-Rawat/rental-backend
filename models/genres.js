import Joi from 'joi';
import mongoose from 'mongoose'
const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    }
})
const Genre = new mongoose.model('Genres',genreSchema)
function validateGenre(course){
    const schema=Joi.object({
        name:Joi.string().required().min(5).max(50),
        
    })
    return schema.validate(course);
    }
    export {Genre,validateGenre as validate,genreSchema}