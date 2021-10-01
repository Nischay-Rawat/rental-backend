import express from 'express';
import genres from '../route/genres.mjs'
import customers from '../route/customers.mjs'
import movies from '../route/movies.mjs'
import rentals from '../route/rentals.mjs'
import users from "../route/users.mjs"
import auth from "../route/auth.mjs"
import error from '../middleware/error.mjs'
export default  function(app){
app.use(express.json());
app.use('/api/customers',customers);
app.use('/api/genres',genres);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users)
app.use('/api/auth',auth);
app.use(error);
}