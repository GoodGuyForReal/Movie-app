import React from 'react'
import { useNavigate } from "react-router-dom";
import { PlayIcon } from './assets/PlayIcon';



const MoviCard = ({ item, id }) => {
    const navigate = useNavigate();


    return (
        
        <div>
            
            {item?.poster_path === null ? null : <div key={id} className=" rounded-[35px] " >

                <div  className=" relative flex flex-col gap-3 py-3 cursor-pointer" onClick={() => navigate(`/${item?.id}`, { state: item })}>

                    <div className="relative w-[300px] h-[400px]">
                        <div className="absolute z-10 bg-gradient-to-t from-[#00000089] h-full w-full rounded-[35px]"></div>
                        <img
                            className="w-full h-full object-cover rounded-[35px] "
                            src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                            alt={item?.backdrop_path}
                        />
                    </div>
                    <div className="absolute flex w-full justify-center top-12">
                        <p className="text-white max-w-max border backdrop-blur-md rounded-md px-3 py-2 bg-[#00000046] border-[#cbcbcb] text-[14px] font-semibold">IMDb: {item?.vote_average}</p>
                    </div>
                    <div className=" absolute z-40 bottom-12 emax-w-max flex flex-col gap-3 w-full justify-center">
                        <p className="text-white w-full text-center font-semibold text-[22px] px-3 mb-3">{item?.title}</p>
                        <div className="flex w-full justify-center">
                            <button onClick={() => navigate(`/${item?.id}`, { state: item })} className="py-3 px-7 bg-[#ffffff74] text-white font-semibold text-[13px] rounded-[12px] backdrop-blur-md flex items-center text-center hover:bg-[#ffffffa0] hover:transition-[300ms]"><PlayIcon />Watch Now</button>
                        </div>
                    </div>

                </div>

            </div>}

        </div>
    )
}

export default MoviCard