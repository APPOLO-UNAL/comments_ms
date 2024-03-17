import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config()
const CONNECTIONSTRINGTEMPLATE:String=process.env.CONNECTIONSTRINGTEMPLATE as string
const CONNECTIONSTRING=CONNECTIONSTRINGTEMPLATE
    .replace("<user>",process.env.MONGOUSER as string)
    .replace("<password>",process.env.MONGOPASSWORD as string)

mongoose.connect(CONNECTIONSTRING, {})
.then(()=>console.log("It's connected!"))
.catch(err=>console.log(`The connection has failed :\n${err}`));

