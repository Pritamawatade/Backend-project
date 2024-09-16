import connectDB from "./db/index.js";
// require('dotenv').config({path: './env'}) // this is an older syantax

import dotenv from 'dotenv';


dotenv.config({ path: './env' }); // this is a newer syntax


connectDB()














//  FIRST APPROCH TO CONNECT WITH DATABSE


// const app = express();
// (async () => {
//     try {
//       await  mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

//       app.on("error", (errror) => {
//         console.log("ERROR : ", errror);
//         throw errror;
//         })

//         app.listen(process.env.PORT,() =>{
//             console.log('Example app listening on port!');
            
//         })
//     } catch (error) {
//         console.error(error);
//         throw new Error('Failed to connect to MongoDB');
//     }
// })()
    