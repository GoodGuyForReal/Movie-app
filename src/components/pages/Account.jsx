import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../FireBase';
import { updateDoc, doc, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import MoviCard from '../MoviCard'

const Account = () => {
    const [movies, setMovies] = useState([])
    const [like, setLike] = useState(false)
    const { user } = UserAuth();



    useEffect(() => {
        try {
            onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
                setMovies(doc.data()?.savedShow)
                setLike(true)
            })
        } catch (error) {
            console.log(error.message)
            console.log(error)
        }

    }, [user?.email])
    console.log(movies);

    // const movieRef = doc(db, 'users', `${user?.email}`)
    // const removemovie = async (passedID) => {
    //     try {
    //         const result = movies.filter((item) => item.id !== passedID)
    //         await updateDoc(movieRef, {
    //             savedShow: result,
    //         })
    //     } catch (error) {

    //     }
    // }

    return (
        <div className='h-[100vh]'>
            <h1 className='text-white text-[200px] font-medium'>Account</h1>

            <div className="flex justify-center items-center">
                <div className="flex flex-wrap gap-6 justify-center items-center ">
                    {movies.map((item, id) => (

                        <MoviCard key={id} item={item} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Account