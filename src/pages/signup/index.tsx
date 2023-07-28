import React,{useEffect, useState} from 'react'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'





const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
const router = useRouter()

    const [user,setUser] = useState({
        username:'',
        email:'',
        password:''
    })
const [buttonDisabled , setButtonDisabled]  = useState(false)
const [loading , setLoading ] = useState(false)
    const onSignup = async()=>{
        try {
        setLoading(true)
      const res = await axios.post('/api/users/signup',user)
      console.log('Sign up success', res.data);
      router.push('/login')
      
        } catch (error:any) {
        console.log("SignUp failed",error.message);
        }finally {
            setLoading(false)
        }
        
    }
useEffect(()=>{
if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
    setButtonDisabled(false)
}else{
    setButtonDisabled(true)
}
},[user])
  return (
    <main
    className={`flex flex-col items-center justify-center p-24 ${inter.className}`}>
      <h1 className='text-4xl my-4 text-center'>{loading ?'Processing':'SignUp here'}</h1>
            <label>Username: </label>
            <input
            className='p-2 my-3 mx-5 rounded-lg text-black'
            type='text'
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            placeholder='username'/><br/>

            <label>Email: </label>
            <input
            className='p-2 my-3 rounded-lg text-black'
            type='email'
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder='email'/><br/>

            <label>Password: </label>
            <input
            className='p-2 my-3 rounded-lg text-black'
            type='password'
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder='password'/><br/>

        <button 
        className='border-white p-1 border-2 w-24 rounded-xl bg-blue-300 text-black font-bold'
        disabled={buttonDisabled}
        onClick={onSignup}>Submit</button>

        <Link href={'/login'}>Already have an account ?😎</Link>
  </main>
  )
}
