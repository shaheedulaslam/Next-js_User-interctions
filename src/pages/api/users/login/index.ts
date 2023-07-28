import User from "@/models/userModel";
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'
import { dbConnect } from "@/dbConfig/dbconfig";
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";



const handler = async(req:NextApiRequest , res: NextApiResponse)=>{
    await dbConnect()
    try {
        if(req.method === 'POST'){
            const {email,password}  = req.body
    
            // already exist 
            const user = await User.findOne({email:email})
            if(!user){
                res.status(400).json({
                    status:"failure",
                    message:'invalid email'
                })
            }else{
                const validPassword = await bcrypt.compare(password, user.password)
                if(!validPassword){
                    res.status(400).json({
                        status:"failure",
                        message:'invalid password'
                    })
                }
                const tokenData = {
                    id:user._id,
                    username:user.username,
                    email:user.email
                }
                // create token 
                const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
                res.setHeader('Set-Cookie',serialize('token',token,{
                    httpOnly:true,
                    maxAge:60 * 60 * 24
                }))      
                return res.status(201).json({
                    message: 'Login Successful',
                    status: "success"
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



