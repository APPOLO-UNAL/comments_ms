import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config()
const CONNECTIONSTRING="mongodb://juzambranol:mongodb1228@ac-8eq3gxv-shard-00-00.ruvhdcp.mongodb.net:27017,ac-8eq3gxv-shard-00-01.ruvhdcp.mongodb.net:27017,ac-8eq3gxv-shard-00-02.ruvhdcp.mongodb.net:27017/comments_db?ssl=true&replicaSet=atlas-hp2bbp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=DBCluster"

mongoose.connect(CONNECTIONSTRING, {})
.then(()=>console.log("It's connected :D !"))
.catch(err=>console.log(`The connection has failed :\n${err}`));

