import { async } from '@firebase/util'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import '../css/SignUpPage.css'


const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const { user, SignUp } = UserAuth()


    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            await SignUp(email, password)
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=' h-[100vh] w-full'>

            <div className='SignUpPage items-center justify-center h-[100vh]'>

                <div className='h-full w-full flex flex-col items-center justify-center ' >
                    <div className='SignUpleftbody'>
                        <div className='mb-5 text-left'>
                            <h1 className='text-white font-medium text-[38px]'>Welcome back</h1>
                            <p className='text-[#fff7] text-[15px]'>Welcome Back please enter your deatils</p>
                        </div>
                        <form className='flex flex-col gap-5 text-center'>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh]' />
                            <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Password' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh]' />
                            <button onClick={HandleSubmit} className='bg-white text-black'>Sign Up</button>
                            <Link className='text-white' to={'/SignIn'}>Do you have an Acc</Link>
                        </form>
                    </div>
                </div>

                <div className='h-full w-full bg-white'>

                </div>

            </div>

        </div>
    )
}

export default SignUp