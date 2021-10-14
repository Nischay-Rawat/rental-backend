import express from 'express'
import validateObjectId from '../middleware/validateObjectId.js';
import admin from '../middleware/admin.js';
import auth from '../middleware/auth.js';
import {Genre,validate}from '../models/genres.js'
const router = express.Router();



router.get('/',async(req,res)=>{

    const genres=await Genre.find().sort();  
    res.send(genres);
    
});
router.get('/:id',validateObjectId,async(req,res)=>{
 

    const  genre = await Genre.findById(req.params.id)

   if(!genre)
   return res.status(404).send('No matching id number')
    
res.send(genre)
})
router.post('/',auth,async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.message)
const genre=new Genre({name:req.body.name})
 await genre.save();

res.send(genre);

})

router.put('/:id',async(req,res)=>{
    const {error}=validate(req.body)
    if(error)
    return res.status(400).send(error.message)

    const   genre = await Genre.findByIdAndUpdate((req.params.id),{name:req.body.name},{new:true})
   
    if(!genre) 
    return res.status(404).send("No matching id number");
  
  
    res.send(genre);
    

})
router.delete('/:id',[auth,admin],async(req,res)=>{
    
    const genre = await Genre.findByIdAndDelete((req.params.id))
   
    if(!genre) return res.status(404).send("No matching id number")
    res.send(genre)
    
    
    
})


export default router;