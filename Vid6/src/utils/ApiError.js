class ApiError extends Error {
    constructor( statusCode, 
        message = 'An error occurred in the API',  // default message if none provided
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = null;
        this.message = message;
        this.success = false;
        
        if (stack) {
            
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
         

    }
}




export { ApiError}

// this all code is used to handle the error in API

