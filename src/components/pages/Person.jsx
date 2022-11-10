import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { key } from '../../Request'
import '../css/Personstyle.css'
import MoviCard from '../MoviCard'

const Person = () => {
  const [perdetails, setPerdetails] = useState([])
  const [perimages, setPerimages] = useState([])
  const { state: persondetail } = useLocation()
  const [personCredits, setPersonCredits] = useState([])
  const [creditlimt, setCreditlimt] = useState(10)
  const [showMore, setShowMore] = useState(false);




  const { id } = persondetail

  //?Person Details
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${key}&language=en-US`

    axios.get(url).then((res) =>
      setPerdetails(res.data))
  }, [id])
  console.log(perdetails);
  console.log(persondetail);
  //?Person Details ends



  //?Person Images
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${key}`

    axios.get(url).then((res) =>
      setPerimages(res.data.profiles))

  }, [id])
  const limtPerImg = perimages.slice(0, 4)
  console.log(perimages);
  console.log(limtPerImg);
  //?Person Images ends

  //?Person movie credits
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${key}&language=en-US`

    axios.get(url).then((res) => setPersonCredits(res.data.cast))

  }, [id])
  console.log(personCredits)
  //?Person movie credits ends

  //?Show More Text

  const turncate = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  };

  const age = (i) => {
    const year = i;
    return year.slice(0, 4);
  }
  

  const LoadHandler = () => {
    setCreditlimt(pre => pre + 10)
  }

  const LessHandler = () => {
    setCreditlimt(10)
  }



  return (
    <div className='Container text-white py-20 px-20 overflow-hidden md:px-10 sm:px-5'>
      <div className='PersonBody mt-10'>

        <div className='PersonHeader w-full h-full gap-5'>

          <div className='h-[63vh] w-[42vh]'>
            <img src={`https://image.tmdb.org/t/p/original${perdetails?.profile_path}`} alt={perdetails?.name} className='object-cover object-center h-full w-full' />
          </div>

          <div className='flex flex-col gap-4'>
            <h1 className='text-[38px] font-medium '>{perdetails?.name}</h1>
            <p className=''>{perdetails?.birthday}</p>
            <p className=''>{perdetails?.place_of_birth}</p>
            <div>
              {/*todo: TEXTI ARRAY YE CEVIR SONRA LENGTINI ALIP BUTONU GIZLEYEBILIRSIN */}
              {showMore ? <p className='w-[90%] leading-[190%] '>{perdetails?.biography}</p> : turncate(perdetails?.biography, 800)}
              {/* <p className='w-[90%] leading-[190%] '>{perdetails?.biography}</p> */}
              {perdetails?.biography < 800 ? <button>Empty</button> : <button onClick={() => setShowMore(!showMore)} className='underline'>{!showMore ? '...Show More' : '...Show less'}</button>}
            </div>
          </div>

        </div>

        <div className='PersonBottom py-20 flex flex-col gap-5'>

          <div className='Perimglist'>
            <h1 className='text-[32px] font-medium'>Images</h1>
            <div className='perimgs grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 py-10'>
              {limtPerImg.map((item, id) => (
                <div key={id}>
                  <img src={`https://image.tmdb.org/t/p/original${item?.file_path}`} alt={item?.name} className='object-cover object-center h-[63vh] w-[42vh]' />
                </div>

              ))}
            </div>
          </div>

          <div className='PersonCredits '>

            <div className='flex'>
              <h1 className='text-white text-[32px] font-medium'>Movies <span className='text-slate-400 text-[24px] font-normal'>(+{personCredits.length})</span></h1>
            </div>

            <div className='CreditList text-center '>
              <div className="flex justify-center items-center py-10">
                <div className="flex flex-wrap gap-6  items-center ">
                  {personCredits.slice(0, creditlimt).map((item, id) => (
                    <MoviCard item={item} key={id} />
                  ))}

                </div>
              </div>

              <div className='creditbtns'>
                {personCredits.length < 10 ? null : <div className='flex gap-5 justify-center'>
                  <button className='py-2 px-6 bg-white text-black rounded-lg duration-300 hover:bg-[#c5c5c5]' onClick={LoadHandler}>Load More</button>
                  <button className='py-2 px-6 bg-black text-white border rounded-lg hover:bg-white hover:text-black duration-300' onClick={LessHandler}>Less</button>
                </div>}

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Person