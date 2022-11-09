import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { key } from '../../Request'

const Person = () => {
  const [perdetails, setPerdetails] = useState([])
  const [perimages, setPerimages] = useState([])
  const { state: persondetail } = useLocation()

  const { id } = persondetail


  useEffect(() => {
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${key}&language=en-US`

    axios.get(url).then((res) =>
      setPerdetails(res.data))
  }, [])

  console.log(perdetails);

  console.log(persondetail);


  useEffect(() => {
    const url = `https://api.themoviedb.org/3/person/${id}/tagged_images?api_key=${key}&language=en-US&page=1`

    axios.get(url).then((res) =>
      setPerimages(res.data.results))

  }, [])

  const limtPerImg = perimages.slice(0, 10)
  console.log(perimages);
  console.log(limtPerImg);



  return (
    <div className='Container text-white py-20 px-20'>
      <div className='PersonBody'>

        <div className='PersonHeader flex gap-5'>

          <div>
            <img src={`https://image.tmdb.org/t/p/original${perdetails?.profile_path}`} alt={perdetails?.name} className='object-cover object-center h-[63vh] w-[42vh]' />
          </div>

          <div className='flex flex-col gap-4'>
            <h1>{perdetails?.name}</h1>
            <p>{perdetails?.birthday}</p>
            <p>{perdetails?.place_of_birth}</p>
            <p>{perdetails?.biography}</p>
          </div>

        </div>

        <div className='Perimglist'>
          {perimages.map((item, id) => (
            <div key={id}>
              <img src={`https://image.tmdb.org/t/p/original${item?.file_path}`} alt={item?.name} className='object-cover object-center h-[63vh] w-[42vh]' />
            </div>

          ))}

        </div>

        <div className='PersonCredits'>

          <div className='flex gap-4 py-10'>
            <h1 className='text-white text-[24px] font-medium'>Movies</h1>
            <h1 className='text-white text-[24px] font-medium'>TV Shows</h1>
          </div>

          <div className='CreditList'>


          </div>

        </div>

      </div>
    </div>
  )
}

export default Person