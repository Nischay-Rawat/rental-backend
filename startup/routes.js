import express from 'express';
import genres from '../route/genres.js'
import customers from '../route/customers.js'
import movies from '../route/movies.js'
import rentals from '../route/rentals.js'
import users from "../route/users.js"
import auth from "../route/auth.js"
import error from '../middleware/error.js'
import returns  from '../route/return.js'
export default  function(app){
app.use(express.json());
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users)
app.use('/api/auth',auth);
app.use('/api/genres',genres);
app.use('/api/returns',returns)
app.use(error);
}