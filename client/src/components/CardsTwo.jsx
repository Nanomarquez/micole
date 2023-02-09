import React from 'react'

function CardsTwo({title,price,free,family,photos,plan,premium}) {
  return (
    <div className='text-white border p-2 rounded-lg w-[250px] text-center flex flex-col gap-5'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <h2 className='text-2xl'>{free ? "Sin Costo" : `s/ ${price}`}</h2>
      <small>por mes</small>
      <hr />
      <p>{free ? "¡Siempre gratis!" : "¡30 días de prueba gratis!"}</p>
      <p>365 días de publicación</p>
      {premium ? <p>Envío ilimitado de familias interesadas por mes</p> : <p>Envío de hasta {family} familias interesadas por mes</p>}
      <p>{photos} fotos del centro educativo en la plataforma</p>
      <p>Soporte operativo disponible</p>
      <button className='px-4 my-5 mx-auto py-3 rounded-lg text-[#0061dd] bg-white font-normal'>¡Quiero el plan {plan}!</button>
    </div>
  )
}

export default CardsTwo