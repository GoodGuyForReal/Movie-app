import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { key } from '../../Request'
import MoviCard from '../MoviCard';
import PersonCard from '../PersonCard';


const Discover = ({ fetchURL }) => {
  const [serach, setSearch] = useState('');
  const [movie, setMovie] = useState([]);
  const [defult, setDeful] = useState([]);
  const [person, setPerson] = useState([])
  const [perlist, setPerlist] = useState([])
  const [isActive, setIsActive] = useState(true);


  //? Movie Search Results
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



  //? Person Search Results
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`

    axios.get(url).then((res) => {
      setPerlist(res.data.results);
    });

  }, [serach])

  console.log(perlist);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&query=${serach}&page=1&include_adult=false`

    axios.get(url).then((res) => {
      setPerson(res.data.results);
    });

  }, [serach])

  console.log(person)




  return (
    <div className='px-20 py-10'>
      <div className='flex flex-col h-[30vh] w-full justify-center gap-5 items-center'>
        <h1 className='text-white text-[38px] font-semibold'>Discover Beyond of the Universe</h1>
        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search a movie or person" className='text-[18px] w-[100vh] px-5 py-3 rounded-xl ' />
        <div className='flex gap-5'>
          <button onClick={() => setIsActive(!isActive)} className='text-white py-2 px-6 border rounded-lg hover:text-black hover:bg-white hover:duration-300'>Movie</button>
          <button onClick={() => setIsActive(!isActive)} className='text-white py-2 px-6 border rounded-lg hover:text-black hover:bg-white hover:duration-300'>Person</button>
        </div>
      </div>

      {!isActive ? <div className="flex justify-center items-center py-10">
        <div className="flex flex-wrap gap-6 justify-center items-center ">

          {
            serach === '' ? defult.map((item, id) => (
              <MoviCard item={item} key={id} />
            ))
              :
              movie.map((item, id) => (
                <MoviCard item={item} key={id} />
              ))
          }

        </div>
      </div> : <div className="flex justify-center items-center py-10">
        <div className="flex flex-wrap gap-6 justify-center items-center ">

          {
            serach === '' ? perlist.map((item, id) => (
              <PersonCard item={item} key={id} />
            ))
              :
              person.map((item, id) => (
                <PersonCard item={item} key={id} />
              ))
          }

        </div>
      </div>}








    </div>
  )
}

export default Discover