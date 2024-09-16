import connectDB from "./db/index.js";
// require('dotenv').config({path: './env'}) // this is an older syantax

import dotenv from 'dotenv';

dotenv.config({ path: './env' }); // this is a newer syntax


connectDB()
.then(()=>{

    console.log(`\n MongoDB Connected : ${mongoose.connection.host}`);

    app.on("error,",(error)=>{
        console.log('ERROR : ', error);
        
    })
    // use your app here      // 8000 means if env variable is not present use 8000 as default port
    app.listen(process.env.PORT || 8000,() =>{
        console.log('Example app listening on port! : ', process.env.PORT);
        
    })
})
.catch((err)=>{
    console.error("Connection of mongodb failed",err);
    process.exit(1);
 
})




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
    