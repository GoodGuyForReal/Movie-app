import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { request } from "../Request";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(request.requestPopular).then((res) => {
      setMovies(res.data.results);
    });
  }, []);

  console.log(movie);

  const turncate = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  };

  return (
    <div className="container mx-auto px-0 overflow-hidden">
      <section className="h-[80vh] w-full text-white">
        <div className="w-full h-full relative">
          <div className="absolute z-20  bottom-0 top-[10%] w-full  bg-gradient-to-t  from-black"></div>
          <img
            className="absolute w-full h-full object-cover object-top"
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt={movie?.title}
          />

          <div className=" flex absolute z-40 py-20 sm:px-10 px-20 w-full h-full">
            <div className="w-full h-full flex flex-col justify-between ">
              <div className="flex justify-between items-center mt-5 sm:flex-col sm:gap-3 sm:mt-7">
                <p className="bg-white px-4 py-2 text-black rounded-[30px] font-semibold">
                  #Popular
                </p>
                <p className="text-white max-w-max border rounded-md px-3 py-2 backdrop-blur-md bg-[#0000007d] border-yellow-400 text-[14px] font-semibold">IMDB: {movie?.vote_average}</p>
              </div>

              <div className="flex justify-between items-end md:flex md:flex-col md:justify-center md:items-center">
                <div>
                  <p>{movie?.release_date}</p>
                  <h1 className="text-white text-[48px] font-semibold max-w-[80%] leading-[130%] sm:max-w-[100%] sm:text-[34px] mb-2">
                    {movie?.title}
                  </h1>

                  <p className="w-full m-0 max-w-[80%] lg:hidden"><span className="text-slate-300">{turncate(movie?.overview, 150)}</span><span className="font-semibold">...More</span>
                  </p>
                </div>

                <div className="flex gap-5 sm:justify-between">
                  <button onClick={() => navigate(`/${movie?.id}`, { state: movie })} className="text-white bg-none border py-2 px-8 rounded-[15px] hover:bg-white hover:text-black hover:transition-[300ms]">Details</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
