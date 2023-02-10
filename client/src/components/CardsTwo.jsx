import React from 'react'
import Tilt from 'react-parallax-tilt';
function CardsTwo({title,price,free,family,photos,plan,premium}) {
  return (
    <Tilt glareEnable={true} glareBorderRadius='1rem'>
    <div className='text-white group border p-2 rounded-lg w-[350px] shadow-sm shadow-white sm:w-[250px] peer-hover: duration-500 hover:bg-white hover:text-[#0061dd] text-center flex flex-col gap-5'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <h2 className='text-2xl'>{free ? "Sin Costo" : `s/ ${price}`}</h2>
      <small>por mes</small>
      <hr />
      <p>{free ? "¡Siempre gratis!" : "¡30 días de prueba gratis!"}</p>
      <p>365 días de publicación</p>
      {premium ? <p>Envío ilimitado de familias interesadas por mes</p> : <p>Envío de hasta {family} familias interesadas por mes</p>}
      <p>{photos} fotos del centro educativo en la plataforma</p>
      <p>Soporte operativo disponible</p>
      <button className='px-4 my-5 mx-auto py-3 rounded-lg hover:animate-bounce duration-500 group-hover:bg-[#0061dd] group-hover:text-white text-[#0061dd] bg-white font-medium'>¡Quiero el plan {plan}!</button>
    </div>
     </Tilt>
  )
}

export default CardsTwo