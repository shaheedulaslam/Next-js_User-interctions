import User from "@/models/userModel";
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'
import { dbConnect } from "@/dbConfig/dbconfig";



const handler = async(req:NextApiRequest , res:NextApiResponse) =>{
    await dbConnect()
    try {
        if(req.method === 'POST'){
            const {username,email,password} = req.body
            // already existed user
    
            const user = await User.findOne({email:email})
            if(user){
            res.status(400).json({
                status:"failure",
                message:'email is already exist'
            })
            }else{
                const hashpassword = await bcrypt.hash(password,10)
                const newUser = new User({
                    username,
                    email,
                    password:hashpassword
                })
                await newUser.save()
                console.log(newUser,"new created user here");            
                res.status(201).json({
                    status:"success",
                    message:"created a user",
                    data:newUser
                })
            }      
       
    }
    } catch (error:any) {
             return res.status(500).json({
                 status: "failure",
                 message: "Something went Wrong",
                 error_message: error.message
             })
    }  
}

export default handler