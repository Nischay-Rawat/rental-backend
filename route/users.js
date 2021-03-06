import express from 'express'
import bcrypt from 'bcrypt'
import {User,validate} from '../models/users.js'
import _ from 'lodash'
import auth from '../middleware/auth.js'
const router = express.Router();




router.get('/',async (req,res)=>{
const user=await User.find().sort();  

res.send(user);
})
router.get('/me',auth,async(req,res)=>{
const user=await User.findById(req.user._id).select('-password')
res.send(user);
})
router.get('/:id',async(req,res)=>{
let  user = await User.findById(req.params.id)

   if(!user)
   return res.status(404).send('No matching id number')
    


res.send(user)
})
router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.message)
let user=await User.findOne({email:req.body.email});
if(user)return res.status(400).send("User already registered");
 user=new User(_.pick(req.body,['email','name','password',]))
 const salt=await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(user.password,salt);
  if(req.body.isAdmin){
      user.isAdmin=req.body.isAdmin;
      
  }
  
 await user.save();

const token=user.generateAuthToken();
 res.header('x-auth-token',token).send(_.pick(user,['email','name','isAdmin']));

})

router.put('/:id',async(req,res)=>{
    const {error}=validate(req.body)
    if(error)
    return res.status(400).send(error.message)

    let  user = await User.findByIdAndUpdate((req.params.id),{name:req.body.name,email:req.body.email,password:req.body.password})
   
    if(!user) 
    return res.status(404).send("No matching id number");
  
  
    res.send(user);
    

})
router.delete('/:id',async(req,res)=>{
    
    const user = await User.findByIdAndDelete((req.params.id))
   
    if(!user) return res.status(404).send("No matching id number")
    res.send(user)
    
    
    
})


export default router;