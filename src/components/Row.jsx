import axios from "axios";
import React, { useState, useEffect } from "react";
import { PlayIcon } from './assets/PlayIcon'
import { useNavigate } from "react-router-dom";
import './css/Row.css'

import ArrowLeft from "./assets/ArrowLeft";
import ArrowRight from "./assets/ArrowRight";


const Deneme = ({ title, fetchURL }) => {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(fetchURL).then((res) => {
      setMovie(res.data.results);
    });
  }, [fetchURL]);


  const btnNextHandle = () => {
    const box = document.querySelector('.rowVideos');
    box.scrollLeft = box.scrollLeft - 500
  }

  const btnBackHandle = () => {
    const box = document.querySelector('.rowVideos');
    box.scrollLeft = box.scrollLeft + 500
  }



  return (
    <div className="container mx-auto px-20 md:px-10 sm:px-6 py-[60px]">
      <div className="mb-[25px]">
        <h2 className="text-white font-bold text-[32px]">{title}</h2>
      </div>
      <div className='flex relative w-full group '>
        <button onClick={btnNextHandle} className="swiper-button-prev group-hover:block  hover:opacity-100 absolute left-0 z-10 bg-[#00000090] top-0 bottom-0  text-white"> <ArrowLeft /> </button>
        <div className='rowVideos scrollbar-hide flex gap-4 overflow-x-hidden scroll-smooth'>
          {movie.map((item, id) => (

            <div key={id} className="rowCrad flex flex-col relative cursor-pointer" onClick={() => navigate(`/${item?.id}`, { state: item })}>
              <div className="w-[400px] h-[25vh] rounded-b-[12px]">
                <img
                  className="w-full h-full object-cover  rounded-[12px]"
                  src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
                  alt={item?.backdrop_path}
                />
              </div>

              <div className="absolute flex justify-between bottom-0 bg-[#00000075] w-full pt-2 backdrop-blur-sm rounded-b-[12px] ">
                <div>
                  <p className="text-white px-5 ">{item?.title}</p>
                  <p className="text-white px-5 pb-2">release: {item?.release_date}</p>
                </div>

                <div className="px-5">
                  <button onClick={() => navigate(`/${item?.id}`, { state: item })} className=" text-white max-w-max border rounded-[50px] p-1 pl-[5px] text-[14px] hover:bg-[#000000] hover:transition-[300ms] font-semibold"> <PlayIcon /></button>
                </div>
              </div>
            </div>

          ))}
        </div>
        <button onClick={btnBackHandle} className="swiper-button-next absolute z-10 right-0 hover:opacity-100 group-hover:block bg-[#00000090] top-0 bottom-0 text-white"><ArrowRight /></button>
      </div>




    </div>


  );
};

export default Deneme;
