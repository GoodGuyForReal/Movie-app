import React from 'react'
import { UserIcon } from './assets/UserIcon'
import { useNavigate } from 'react-router-dom'

const PersonCard = ({ item, id }) => {
    const navigate = useNavigate();
    
    return (
        <div  onClick={() => navigate(`/Person/${item?.id}`, { state: item })} key={id} className='castCard flex flex-col p-3 gap-6 cursor-pointer hover:border hover:rounded-lg'>
            <div className='flex gap-3 items-center'>
                {item?.profile_path === null ? <UserIcon /> : <img src={`https://image.tmdb.org/t/p/original${item?.profile_path}`} alt={item?.name} className='actAvatar w-[100px] h-[100px] object-cover rounded-full' />}
                <div>
                    <p className='text-white text-[20px] font-medium mb-2'>{item?.name}</p>
                    <p className='text-slate-400 text-[15px] font-normal'>{item?.character}</p>
                </div>
            </div>
        </div>
    )
}

export default PersonCard