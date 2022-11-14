import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import '../css/SignUpPage.css'

const SignInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const { user, SignIn } = UserAuth();

    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            await SignIn(email, password)
            navigate('/');
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    }

    return (
        <div className=' h-[100vh] w-full'>

        <div className='SignUpPage items-center justify-center h-[100vh]'>

            <div className='h-full w-full flex flex-col items-center justify-center ' >
                <div className='SignUpleftbody flex flex-col gap-10'>
                    <div className='text-left'>
                        <h1 className='text-white font-medium text-[38px]'>Welcome back</h1>
                        <p className='text-[#fff7] text-[15px]'>Welcome back please enter your deatil</p>
                        {error && <p className='bg-white text-[15px] rounded-md mt-5 duration-300 ease-out text-black p-3'>Something went wrong</p>}
                    </div>
                    <form className='flex flex-col gap-5 text-center'>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                        <button onClick={HandleSubmit} className='bg-white text-black py-3 hover:duration-300 hover:bg-[#dedede]'>Sign In</button>
                        <Link className='text-white underline hover:duration-300 hover:text-[#c1c1c1]' to={'/SignUp'}>Don't you have an account</Link>
                    </form>
                </div>
            </div>

            <div className='h-full w-full'>
                <div className='signimg h-full w-full'>
                    <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80" className='object-cover object-right w-full h-full' alt="" />
                </div>
            </div>

        </div>

    </div>
    )
}

export default SignInPage