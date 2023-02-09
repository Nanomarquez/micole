import React from 'react'

function CardsOne({img,title,parrafe}) {
  return (
    <div className="bg-white text-black shadow-md w-[350px] p-5 h-[350px] rounded-md flex flex-col items-center justify-evenly text-center">
      <img src={img} alt={title} className='w-24'/>
      <h2 className='font-bold'>{title}</h2>
      <p className='text-black'>{parrafe}</p>
    </div>
  )
}

export default CardsOne