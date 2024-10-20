// packages
import { PrismaClient } from "@prisma/client";
import { ClientError, getError } from "./ErrorHandler";
import { gethashedPassword } from "./utils";


// types
import { Registration } from "@prisma/client";
import { NextFunction, Request , Response } from "express-serve-static-core"
import { response } from "./types";



const prisma = new PrismaClient()


export async function createUser(req : Request<{},{},Registration>, res : Response<response> , next:NextFunction){
    try {
        const uploadDTO = req.body;
        const { password , dateOfBirth , phoneNo } = uploadDTO;
        if(new Date(dateOfBirth) > new Date()){
            throw new ClientError(5,"Please provide valid date-of-birth");
        }else if(phoneNo.length < 7){
            throw new ClientError(6,"phoneNo cannot be Less that 7 characters")
        }
        const hash = await gethashedPassword(password)
        const user = await prisma.registration.create({
            data : {
                ...uploadDTO ,
                password : hash ,
                dateOfBirth : new Date(dateOfBirth) // Even if its a string it will not cause any error.
            }
        })
        res.status(201).json({responseCode : 1 , message : "Successfully created user" , data : user})
    } catch (error) {
        const { status , failure}  = getError(error);
        res.status(status).json(failure)
    }

}



export async function getUser(req : Request<{email : string}>, res : Response<response> , next:NextFunction){
    const { email } = req.params;
    try {
        const user = await prisma.registration.findUnique({
            where : {
                email
            },
            select: {
                id: true, firstName : true , lastName : true , dateOfBirth : true , createdAt : true , linkedInUrl : true , gitHubLink : true
            }
        })
        if(!user) throw new ClientError(401,"Email not found")
        res.status(200).json({ responseCode : 1 , message : "successfully fetched user" , data : user})
    } catch (error) {
        const { status , failure} = getError(error)
        res.status(status).json(failure)
    }
}

export async function updateUser(req : Request<{id : string},{},Partial<Registration>>, res : Response<response> , next:NextFunction) {
    const { id } = req.params;
    let updateDTO = req.body;
    const { dateOfBirth , phoneNo , password } = updateDTO
    // Assuming frontend Will check the constraints for email.
    if(dateOfBirth && new Date(dateOfBirth) > new Date()){
        throw new ClientError(5,"Please provide valid date-of-birth");
    }else if(phoneNo && phoneNo.length < 7){
        throw new ClientError(6,"phoneNo cannot be Less that 7 characters")
    }else{
        try {
            if(password){
                const hash = await gethashedPassword(password);
                updateDTO = { ...updateDTO , password : hash}
            }else if(dateOfBirth){
                updateDTO = { ...updateDTO, dateOfBirth: new Date(dateOfBirth)}
            }
            const updatedUser = await prisma.registration.update({
                where : { id } , 
                data : { ...updateDTO },
                select : {
                    firstName : true , lastName : true , dateOfBirth : true , createdAt : true , linkedInUrl : true , gitHubLink : true
                }
            })
            res.status(200).json({ responseCode: 1 , message :"Successfully updated user" , data : updatedUser})
        } catch (error) {
            const { status , failure} = getError(error);
            res.status(status).json(failure);
        }
    }

}


export async function delteUser(req : Request<{id : string},{}>, res : Response<response> , next:NextFunction){
    const { id } = req.params;
    try {
        const user = await prisma.registration.delete({ 
            where : { id }
        })
        if(user) res.sendStatus(204)
    } catch (error) {
        const { status , failure} = getError(error);
        res.status(status).json(failure);
    }
}