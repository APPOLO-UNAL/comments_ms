import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config()



mongoose.connect(process.env.MONGOURI as string, {})
.then(()=>console.log("It's connected!"))
.catch(err=>console.log(`The connection has failed :\n${err}`));

