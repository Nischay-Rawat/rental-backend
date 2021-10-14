import Joi from 'joi';
import mongoose from 'mongoose'
const Customer = new mongoose.model('customers',{
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    isGold:{
        type:Boolean,default:false
    },
    phone:{
        type:String,minlength:5,maxlength:15,required:true
    }
   
})


function validateCustomer(course){
    const schema=Joi.object({
        name:Joi.string().required().min(3),
        phone:Joi.number().required(),
        isGold:Joi.boolean()
    
    })
    return schema.validate(course);
    
}
export {Customer,validateCustomer as validate}