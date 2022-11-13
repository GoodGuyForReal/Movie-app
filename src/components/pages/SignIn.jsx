import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

const SignInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPssword] = useState('')
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
        <div className=' h-[100vh]'>

            <div className='h-full  flex items-center justify-center ' >

                <div className='flex flex-col gap-5'>
                    <h1 className='text-white'>SignIn</h1>
                    {error && <h2 className='text-black bg-white py-2 px-5 rounded-lg w-full'>Wrong Email or Password</h2>}
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' />
                    <input onChange={(e) => setPssword(e.target.value)} type="text" placeholder='Password' />
                    <button onClick={HandleSubmit} className='bg-white text-black'>Sign In</button>
                    <Link className='text-white' to={'/SignUp'}>Don't you have an Acc</Link>
                </div>

            </div>


        </div>
    )
}

export default SignInPage