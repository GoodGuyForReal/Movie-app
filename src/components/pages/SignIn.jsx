import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <div className=' h-[100vh]'>

            <div className='h-full  flex items-center justify-center ' >

                <div className='flex flex-col gap-5'>
                    <h1 className='text-white'>SignIn</h1>
                    <input type="text" placeholder='Email' />
                    <input type="text" placeholder='Password' />
                    <button className='bg-white text-black'>Sign In</button>
                    <Link className='text-white' to={'/SignUp'}>Don't you have an Acc</Link>
                </div>

            </div>


        </div>
    )
}

export default SignIn