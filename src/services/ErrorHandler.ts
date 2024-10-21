// packages
import { Prisma } from "@prisma/client";

// types
import { failure } from "./types"


export class ClientError extends Error{
    public code:number;
    
    constructor(_code:number , _message:string){
        super(_message)
        this.code = _code;
        Object.setPrototypeOf(this,ClientError.prototype) // This is have type safety when creating instances
    }
}


interface composite {
    failure : failure ,
    status : number
}

export function getError(err:any) : composite{
    let message : string , status : number , responseCode : number;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = 'Provided fields:' + err.meta.target + ' already exists';
        } else if (err.code === 'P2025') {
            message = 'Record not found.';
        } else if (err.code === 'P2014') {
            message = 'Foreign key constraint failed.';
        } else if (err.code === 'P2003') {
            message = 'Required field missing.';
        } else if(err.code === 'P1012'){
            message = err.message
        } else {
            message = 'An unknown error occurred:'
        }
        status = 400;
        responseCode = 2
    }else if(err instanceof ClientError){
        status = 400;
        message = err.message
        responseCode = err.code
    }else{
        status = 500 
        message = err.message
        responseCode = 0
    }
    return {
        failure : { responseCode , message } ,
        status
    }
}