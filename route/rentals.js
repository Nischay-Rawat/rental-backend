import express from 'express'
import { Customer } from '../models/customers.js'
import {Movie} from '../models/movies.js'
import { Rental,validate } from '../models/rentals.js'

const router=express.Router();
router.get('/',async(req,res)=>{
    const rentals =await Rental.find().sort('-dateout');
    res.send(rentals);
})
router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.message)
    const movie =await Movie.findById(req.body.movieId)

    if(!movie)return res.status(404).send("Invalid movie");
    const customer =await Customer.findById(req.body.customerId)
    if(!customer)return res.status(404).send("Invalid customer");
    if(movie.numberInStock===0)return res.status(404).send("Movie not in stock");
    let rental=new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate

        }
    })
    rental=await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);
})
export default router;