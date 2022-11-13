import { async } from '@firebase/util'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'


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

            <div className='h-full  flex items-center justify-center ' >

                <form className='flex flex-col gap-5'>
                    <h1 className='text-white'>SignUp</h1>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' />
                    <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Password' />
                    <button onClick={HandleSubmit} className='bg-white text-black'>Sign Up</button>
                    <Link className='text-white' to={'/SignIn'}>Do you have an Acc</Link>
                </form>

            </div>


        </div>
    )
}

export default SignUp