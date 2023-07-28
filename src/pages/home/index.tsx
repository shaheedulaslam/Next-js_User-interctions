import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'


export default function Hero() {
    const router = useRouter()

    const logout = async()=>{
        try {
        await axios.get('/api/users/logout')
        console.log('Logout successfull');
        router.push('/login')
        
        } catch (error:any) {
           console.log(error.message);      
        }
    }
    return (
        <>
            <div className='flex items-end justify-end'>
                <button className='border-2 mx-4 rounded-md w-20 p-1' onClick={logout}>Logout</button>
            </div>
            <div className='flex flex-col items-center justify-center my-14'>
                <h1 className='text-2xl font-semibold'>Hero is arrived</h1>
            </div>
        </>
    )
}
