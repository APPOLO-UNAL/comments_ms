import express from 'express'
import commentsRouter from './routes/comments'
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app= express();
dotenv.config()



mongoose.connect(process.env.MONGOCONNECTIONSTRING as string, {})
.then(()=>console.log("It's connected!"))
.catch(()=>console.log("The connection has failed"));

const PORT=3000;

app.listen(PORT,()=>
     console.log(`Server on port ${PORT}`)
 );
//app.use('/api/routes');