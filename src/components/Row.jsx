import axios from "axios";
import React, { useState, useEffect } from "react";
import { PlayIcon } from './assets/PlayIcon'
import { useNavigate } from "react-router-dom";
import './css/Row.css'


const Row = ({ title, fetchURL }) => {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(fetchURL).then((res) => {
      setMovie(res.data.results);
    });
  }, [fetchURL]);

  console.log(movie);

  return (
    <div className="container mx-auto px-20 md:px-10 sm:px-6  py-[60px]">
      <div className="mb-[25px]">
        <h2 className="text-white font-bold text-[32px]">{title}</h2>
      </div>
      <div className="flex relative items-center">
        <div id="slider" className="scrollbar-hide flex gap-5 overflow-x-auto">

          {movie.map((item, id) => (

            <div key={id} className="rowCrad flex flex-col relative cursor-pointer" onClick={() => navigate(`/${item?.id}`, { state: item })}>
              <div className="w-[300px] h-[180px] rounded-b-[20px]">
                <img
                  className="w-full h-full object-cover  rounded-[20px]"
                  src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
                  alt={item?.backdrop_path}
                />
              </div>

              <div className="absolute flex justify-between bottom-0 bg-[#00000075] w-full pt-2 backdrop-blur-sm rounded-b-[20px] ">
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
      </div>

    </div>
  );
};

export default Row;
