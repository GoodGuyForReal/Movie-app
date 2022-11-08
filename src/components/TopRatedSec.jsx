import React, { useEffect, useState } from "react";
import axios from "axios";
import MoviCard from "./MoviCard";


const TopRatedSec = ({ title, fetchURL }) => {
  const [movie, setMovie] = useState([]);

  
  useEffect(() => {
    axios.get(fetchURL).then((res) => {
      setMovie(res.data.results);
    });
  }, [fetchURL]);

  console.log(movie);


  return (
    <div className="container mx-auto px-20 mb-20 flex flex-col">

      <div className="Search flex items-center justify-between">
        <h2 className="text-white font-bold text-[32px] p-4 pl-[3%]">{title}</h2>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex flex-wrap gap-6 justify-center items-center ">

          {movie.map((item, id) => (
            <MoviCard item={item}  key={id}/>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TopRatedSec;
