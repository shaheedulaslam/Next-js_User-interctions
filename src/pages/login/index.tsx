import React,{useState,useEffect} from 'react'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'



const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const router = useRouter()
    const [user,setUser] = useState({
        email:'',
        password:''
    })
const [buttonDisabled , setButtonDisabled]  = useState(false)
const [loading , setLoading ] = useState(false)
    const onLogin = async()=>{
      try {
        setLoading(true)
      const res = await axios.post('/api/users/login',user)
      console.log('login success', res.data);
      router.push('/home')
        } catch (error:any) {
        console.log("login failed",error.message);
        }finally {
            setLoading(false)
        }
        
    }
    useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0){
          setButtonDisabled(false)
      }else{
          setButtonDisabled(true)
      }
      },[user])
      

  return (
    <main
      className={`flex flex-col items-center justify-center p-24 ${inter.className}`}>
      <h1 className='text-4xl my-4 text-center'>{loading ? 'Processing' : 'Login here'}</h1>
      <label>Email: </label>
      <input
        className='p-2 rounded-lg text-black'
        type='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email' /><br />

      <label>Password: </label>
      <input
        className='p-2 my-2 rounded-lg text-black'
        type='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password' /><br />

      <button
        className='border-white p-1 border-2 w-24 rounded-xl bg-blue-300 text-black font-bold'
        disabled={buttonDisabled}
        onClick={onLogin}>Submit</button>

      <Link href={'/signup'}>Create new account 😊</Link>
    </main>
  )
}


