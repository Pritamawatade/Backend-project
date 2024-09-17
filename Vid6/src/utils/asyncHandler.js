
const asyncHandler = (requestHandler)=>{

    return (req , res, next) =>{
        Promise.resolve(requestHandler(req, res, next)).
        catch((error)=>{
            console.log('ERROR : ', error);
            
        })
    }

}

export {asyncHandler}



//  try catch syntax fro handling this operation 

// const asyncHandler = (fn) => async(req , res , next) =>{
//     try {
//         await fn(req , res , next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message: error.message
//         })
//     }
// } // this is nothing but an high order function 