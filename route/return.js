import Joi from 'joi'
import express from 'express'
import { Movie } from '../models/movies.js'
import { Rental } from '../models/rentals.js'
import auth from '../middleware/auth.js'
import moment from 'moment'

const router = express.Router();
router.post('/',auth,async(req,res)=>{

  const {error}=validateReturn(req.body);

  if(error)return res.status(400).send(error.message)

const rental=await Rental.findOne({'customer._id':req.body.customerId,'movie._id':req.body.movieId})

if(!rental)
return res.status(404).send('not found')
if(rental.dateReturned)
    return res.status(400).send('already returned')

    rental.dateReturned=new Date();

    rental.rentalFee=moment().diff(rental.dateOut,'days')*rental.movie.dailyRentalRate;
    await rental.save();
    await  Movie.update({_id:rental.movie._id},{
         $inc:{numberInStock:1}
     })
 
   return res.status(200).send(rental);
    
})
function validateReturn(req){
  const schema=Joi.object({
      customerId:Joi.myJoiObjectId().required(),
      movieId:Joi.myJoiObjectId().required(),
  })
  
  return schema.validate(req);
}

export default router;