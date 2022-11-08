import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { key } from '../../Request'
import MoviCard from '../MoviCard';


const Discover = ({ fetchURL }) => {
  const [serach, setSearch] = useState('');
  const [movie, setMovie] = useState([]);
  const [defult, setDeful] = useState([]);



  useEffect(() => {
    axios.get(fetchURL)
      .then((res) => {
        setDeful(res.data.results);
      });
  }, [fetchURL]);
  console.log(defult);


  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${serach}&page=1&include_adult=false`
 
    axios.get(url).then((res) => {
      setMovie(res.data.results);
    });

  }, [serach])

  console.log(serach)


  return (
    <div className='px-20 py-10'>
      <div className='flex flex-col h-[30vh] w-full justify-center gap-5 items-center'>
        <h1 className='text-white text-[38px] font-semibold'>Discover Beyond of the Universe</h1>
        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search a movie" className='text-[18px] w-[100vh] px-5 py-3 rounded-xl ' />
      </div>

      <div className="flex justify-center items-center py-10">
        <div className="flex flex-wrap gap-6 justify-center items-center ">

          {       
            serach === '' ?  defult.map((item, id) => (
            <MoviCard item={item} key={id} />
          ))
          : 
            movie.map((item, id) => (
            <MoviCard item={item} key={id} />
          ))
          } 

        </div>
      </div>

    </div>
  )
}

export default Discover