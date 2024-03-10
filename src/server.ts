import express from 'express';

//Global Variables
const PORT=3000;
//Initializations
const app=express();
const APIURI='/api/v1/'
const routes=require('./routes/comments.routes')
//Settings
app.set('port',process.env.PORT ||PORT);
//Middlewares
app.use(express.json());

//Setting app rutes
app.use(APIURI,routes); //Set routes (APIv1)

//
    

module.exports = app;