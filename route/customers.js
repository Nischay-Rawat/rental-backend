import express from 'express'
import {Customer,validate} from '../models/customers.js'
const router = express.Router();




router.get('/',async (req,res)=>{
const customer=await Customer.find().sort();  

res.send(customer);
})
router.get('/:id',async(req,res)=>{
let  customer = await Customer.findById(req.params.id)

   if(!customer)
   return res.status(404).send('No matching id number')
    


res.send(customer)
})
router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.message)
let customer=new Customer({name:req.body.name,phone:req.body.phone,isGold:req.body.isGold})
 customer=await customer.save();

res.send(customer);

})

router.put('/:id',async(req,res)=>{
    const {error}=validate(req.body)
    if(error)
    return res.status(400).send(error.message)

    let  customer = await Customer.findByIdAndUpdate((req.params.id),{name:req.body.name,phone:req.body.phone,isGold:req.body.isGold},{new:true})
   
    if(!customer) 
    return res.status(404).send("No matching id number");
  
  
    res.send(customer);
    

})
router.delete('/:id',async(req,res)=>{
    
    const customer = await Customer.findByIdAndDelete((req.params.id))
   
    if(!customer) return res.status(404).send("No matching id number")
    res.send(customer)
    
    
    
})


export default router;