import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../FireBase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';


const Account = () => {
    const [movies, setMovies] = useState([])
    const [like, setLike] = useState(false)
    const { user } = UserAuth();

    const navigate = useNavigate();

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

    const moviRef = doc(db, 'users', `${user?.email}`)

    const deleteItem = async (passedid) => {

        try {
            const result = movies.filter((item) => item.id !== passedid)
            console.log(result)
            await updateDoc(moviRef, {
                savedShow: result
            })

        } catch (error) {
            console.log(error.message);
        }

    }


    return (
        <div className='h-[100vh]'>
            <h1 className='text-white text-[200px] font-medium'>Account</h1>

            <div className="flex justify-center items-center">
                <div className="flex flex-wrap gap-6 justify-center items-center ">
                    {movies === undefined ? <h1 className='text-white'>Sepet bos aga</h1> : movies.map((item, id) => (

                        <div key={id} className=" rounded-[35px] " >

                            <div className=" relative flex flex-col gap-3 py-3">

                                <div className="relative w-[300px] h-[400px]">
                                    <div className="absolute z-10 bg-gradient-to-t from-[#00000089] h-full w-full rounded-[35px]"></div>
                                    <img
                                        className="w-full h-full object-cover rounded-[35px] "
                                        src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                                        alt={item?.poster_path}
                                    />
                                </div>
                                <div className="absolute flex w-full justify-center top-12">
                                    <p className="text-white max-w-max border backdrop-blur-md rounded-md px-3 py-2 bg-[#00000046] border-[#cbcbcb] text-[14px] font-semibold">IMDb: {item?.vote_average}</p>
                                </div>
                                <div className=" absolute z-40 bottom-12 emax-w-max flex flex-col gap-3 w-full justify-center">
                                    <p className="text-white w-full text-center font-semibold text-[22px] px-3 mb-3">{item?.title}</p>
                                    <div className="flex w-full justify-center gap-3">

                                        <button onClick={() => navigate(`/${item?.id}`, { state: item })} className="py-3 px-7 bg-[#ffffff74] text-white font-semibold text-[13px] rounded-[12px] backdrop-blur-md flex items-center text-center hover:bg-[#ffffffa0] hover:transition-[300ms]">Watch Now</button>
                                        <button onClick={() => deleteItem} className="py-3 px-7 bg-[#ffffff00] text-white font-semibold text-[13px] rounded-[12px] backdrop-blur-md border flex items-center text-center hover:bg-[#ffffff] hover:text-black hover:duration-300">{!like ? 'Save' : 'Saved'}</button>

                                    </div>
                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Account