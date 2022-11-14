/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import '../css/Details.css'
import axios from 'axios'
import { key } from '../../Request'
import { PlayIcon, DarkPlayIcon } from '../assets/PlayIcon'
import { UserIconSm } from '../assets/UserIcon'
import MoviCard from '../MoviCard'
import PersonCard from '../PersonCard'

import ArrowRight from '../assets/ArrowRight'
import ArrowLeft from '../assets/ArrowLeft'



const MoviePageHero = () => {

  const { state: details } = useLocation();
  console.log(details)

  const [mdb, setMdb] = useState([])
  const [video, setVideo] = useState([])
  const [genre, setGenre] = useState([])
  const [toggle, setToggle] = useState(true)
  const [recom, setRecom] = useState([])


  const { id } = useParams();
  console.log(id);

  console.log()

  //? Genres name
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`

    axios.get(url).then((res) => {
      setGenre(res.data.genres);
    });

  }, [id])
  console.log(genre)

  const found = genre.find((obj) => {
    const movgenidarr = details?.genre_ids

    for (let i = 0; i < movgenidarr.length; i++) {
      const find = obj?.id === movgenidarr[i];
      return find
    }

  });
  console.log(found);
  //? Genres name Ends

  //? Cast
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}&language=en-US`

    axios.get(url).then((res) => {
      setMdb(res.data.cast);
    });

  }, [id]);
  //? Cast Ends

  //? Video
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`

    axios.get(url).then((res) => {
      setVideo(res.data.results);
    });

  }, [id]);
  console.log(video);
  //? Video End

  //? Recomendations
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${key}&language=en-US&page=1`

    axios.get(url)
      .then((res) => { setRecom(res.data.results) });

  }, [id])
  const slicerecom = recom.slice(0, 6)
  //? Recomendations end

  //? Trailer Link
  const tariler = video.filter((item) => {
    return item.type === "Teaser" || item.type === "Trailer"
  })
  const trailerLink = `https://www.youtube.com/embed/${tariler[0]?.key}`
  console.log(trailerLink);
  //? Trailer Link End

  //? Videos Section limit
  const slicevideo = video.slice(0, 15)
  console.log(slicevideo);
  //? Videos Section end

  //? directing
  console.log(mdb);
  const directing = mdb.filter((fam) => {
    return fam.known_for_department === "Directing"
  })
  //? directing end

  //? Cast
  const filterpop = mdb.filter((fam) => {
    return fam.popularity > 2.000 && fam.known_for_department === "Acting";
  })
  console.log(filterpop);
  const slice = filterpop.slice(0, 4)
  console.log(slice);
  //? Cast end

  const reyear = () => {
    const year = details?.release_date;
    return year.slice(0, 4);
  }
  console.log(reyear());

  //? Trailer PopUp

  const trailerBtnHandler = () => {
    setToggle(false)
  }

  const trailerBtnHandlerClose = () => {
    setToggle(true)
  }
  //? Trailer PopUp Ends


  const btnNextHandle = () => {
    const box = document.querySelector('.detailsVideos');
    box.scrollLeft = box.scrollLeft - 500
  }

  const btnBackHandle = () => {
    const box = document.querySelector('.detailsVideos');
    box.scrollLeft = box.scrollLeft + 500
  }




  return (
    <div className='overflow-hidden'>

      {!toggle && <div className='fixed z-[60] w-full h-full backdrop-blur-md'>
        <div className='fixed z-[55] flex justify-center w-full bottom-[12vh]'>
          <button onClick={() => trailerBtnHandlerClose()} className='py-2 px-7 bg-white text-black rounded-xl'>Close</button>
        </div>
        <div className='fixed z-50 w-full h-full flex items-center justify-center'>

          <iframe src={trailerLink}
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'
            className='bg-[#bdbdbd] rounded-xl'
            height={'500px'}
            width={'900px'}
          />
        </div>
        <div className='fixed z-[49] bg-[#00000071] top-0 bottom-0 left-0 right-0'></div>
      </div>}

      <section className='detailsHeader h-[100vh] w-full'>

        <div className='detailsHeaderBody h-full relative'>

          {/* bg image */}
          <div className='absolute h-[100vh] -z-0 w-full'>
            <div className="absolute -z-10 h-full w-full  bg-[#00000072]"></div>
            <div className="absolute -z-10 h-full w-full  bg-gradient-to-t from-[#00000013]"></div>
            <img src={`https://image.tmdb.org/t/p/original${details?.backdrop_path}`} className='absolute -z-20 object-top object-cover w-full h-full' alt={details?.backdrop_path} />
          </div>

          <div className='flex flex-col justify-between'>
            <div className='dhb top-[-50px] absolute flex flex-col items-center justify-center h-full w-full gap-5'>

              {/* title */}
              <div className='w-[80%] top-0 text-center'>
                <h1 className='text-white text-[110px] md:text-[90px] sm:text-[50px] leading-[120%] uppercase font-bold'>{details?.title}</h1>
              </div>

              {/* title bottom Bar  */}
              <div className='flex gap-5'>

                {/* Diractor */}
                {directing[0]?.name ? <p className="py-3 px-9 bg-[#00000015] border text-white font-semibold text-[13px] rounded-[12px] backdrop-blur-[2px] ">By <span className='underline'>{directing[0]?.name}</span></p> : null}

                {/* Year */}
                <p className="py-3 px-9 bg-[#00000015] border text-white font-semibold text-[13px] rounded-[12px] backdrop-blur-[2px]">IMDB: {details.vote_average.toFixed(1)}</p>

                {/* imdb */}
                <p className="py-3 px-9 bg-[#00000015] border text-white font-semibold text-[13px] rounded-[12px] backdrop-blur-[2px]">{reyear()}</p>

                <button className="py-3 px-9 bg-[#ffffff] text-black font-semibold text-[13px] border rounded-[12px] hover:bg-[#e7e7e7]">Overview</button>

              </div>
            </div>

            {/* Bottom Bar  */}
            <div className='headerDetailsBottom absolute bottom-8 flex justify-center gap-7 w-full px-10'>
              <div className='flex justify-between items-end w-full'>

                {/* recomended Button */}
                {slicerecom.map((item, id) => {
                  <div key={id} onClick={() => trailerBtnHandler()}>
                    <legend className='text-white mb-3 flex'><PlayIcon /> recommended</legend>
                    <div className='w-[25vh] h-[32vh] border-[1px] border-white relative  flex items-center'>
                      <button className='absolute h-[50px] w-[50px]  z-10 right-[-2px] bg-[#ffffff] text-white flex items-center text-center hover:right-[0px]  justify-center transition-[300ms] hover:h-full hover:w-full'><DarkPlayIcon /></button>
                      <img src={`https://image.tmdb.org/t/p/original${item?.poster_path}`} className='absolute  object-cover w-full h-full' alt={item?.poster_path} />
                    </div>
                  </div>
                })}


                {/* trailer Button */}
                <button onClick={() => trailerBtnHandler()}>
                  <legend className='text-white mb-3 flex'><PlayIcon /> Trailer</legend>
                  <div className='w-[200px] h-[50px] border-[2px] relative rounded-full flex items-center'>
                    <button className='absolute h-[50px] w-[50px]  z-10 right-[-2px] bg-[#ffffff] text-white  rounded-full flex items-center text-center hover:right-[0px]  justify-center transition-[300ms] hover:h-full hover:w-full'><DarkPlayIcon /></button>
                    <img src={`https://image.tmdb.org/t/p/original${details?.poster_path}`} className='absolute  object-cover w-full h-full rounded-full' alt={details?.poster_path} />
                  </div>
                </button>


                {/* Cast Button */}
                <button>
                  <legend className='text-white mb-3 flex'><PlayIcon /> Cast</legend>
                  <div className='w-[200px] h-[50px] relative  flex items-center'>

                    <div className="flex -space-x-6">

                      {slice.map((item, index) => (
                        item?.profile_path === null ? <UserIconSm /> : <img key={index} className="h-[50px] w-[50px] object-cover rounded-full border-2 border-white" src={`https://image.tmdb.org/t/p/original${item?.profile_path}`} alt="" />

                      ))}

                      <button className="flex justify-center items-center h-[50px] w-[50px]  text-black bg-[#ffffff] rounded-full border-2 text-[11px] font-semibold border-white hover:bg-[#ffffffd2] ">+{filterpop.length}</button>
                    </div>

                  </div>
                </button>

                {/* Scroll Button */}
                <div>
                  <button className="py-3 px-9 bg-[#0000000f] border text-white font-semibold text-[13px] rounded-[12px] backdrop-blur-[2px] hover:bg-[#ffffff] hover:text-black hover:transition-[300ms] ">Scroll</button>
                </div>

              </div>
            </div>


          </div>
        </div>
      </section>

      <section className='py-10 px-10 bg-black' id='detailsDetail '>
        <div className='flex flex-col gap-5'>

          <div className='genre flex gap-4'>

            <p className='text-white rounded-xl border px-6 py-2 max-w-fit'>{found?.name}</p>

          </div>

          <div className='overview py-2'>
            <h1 className='text-white text-[16px]'>{details?.release_date}</h1>
            <h1 className='text-white text-[32px] font-semibold mb-3'>{details?.title}</h1>
            <h2 className='text-white text-[16px] leading-[170%] w-[60%] md:w-[100%] lg:w-[100%] xl:w-[60%]'>{details?.overview}</h2>
          </div>

          <div className="cast  px-0 py-10">
            <h1 className='text-white text-[32px] px-5 font-semibold mb-3'>Top Cast</h1>

            <div className='castList'>
              {filterpop.map((item, id) => (
                <PersonCard item={item} key={id} />
              ))}



            </div>
          </div>


          {slicevideo.length === 0 ? null : <div className="videos text-white text-[32px] font-semibold   mb-3">
            <h1>Videos <span className='text-slate-400 text-[24px] font-normal'>(+{slicevideo.length})</span></h1>

            <div className='flex relative w-full group '>
              <button onClick={btnNextHandle} className="swiper-button-prev group-hover:block  hover:opacity-100 absolute left-0 z-10 bg-[#00000068] top-0 bottom-[13%]  text-white"> <ArrowLeft /> </button>
              <div className='detailsVideos scrollbar-hide flex w-full gap-7 overflow-x-auto mt-4 pb-7 scroll-smooth'>
                {slicevideo.map((item, id) => (
                  <div key={id}>
                    <iframe src={`https://www.youtube.com/embed/${item?.key}`}
                      frameBorder='0'
                      allow='autoplay; encrypted-media'
                      allowFullScreen
                      title='video'
                      className='bg-[#d5d5d5] rounded-xl'
                      height={'400px'}
                      width={'500px'}
                    />
                    <p className='text-white text-[18px] mt-3 w-[60%]'>{item?.name}</p>
                  </div>
                ))}
              </div>
              <button onClick={btnBackHandle} className="swiper-button-next absolute z-10 right-0 hover:opacity-100 group-hover:block bg-[#00000068] top-0 bottom-[13%] text-white"><ArrowRight /></button>
            </div>


          </div>}


          <div>
            {slicerecom.length === 0 ? null : <div className="recomanded  py-10">
              <div>
                <h1 className=' text-white text-[32px] font-semibold mb-3'>More Like This <span className='text-slate-400 text-[24px] font-normal'>(+{slicerecom.length})</span></h1>
              </div>

              <div className="flex justify-center items-center ">
                <div className="flex flex-wrap gap-6 items-center ">
                  {slicerecom.map((item, id) => (

                    <MoviCard item={item} key={id} />

                  ))}

                </div>
              </div>
            </div>}
          </div>


        </div>


      </section >

    </div >
  )
}

export default MoviePageHero