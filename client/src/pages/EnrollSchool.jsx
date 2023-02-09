import React from 'react'
import Cards from '../components/Cards'
import VectorPeople from '../assets/VectorPeople.png'
import VectorTalk from '../assets/VectorTalk.png'
import GroupSchool from '../assets/GroupSchool.png'
function EnrollSchool() {
  return (
    <div>
      <header className="bg-[url('./assets/enroll.png')] h-[700px] flex justify-center items-center flex-col gap-10">
        <h1 className='text-white text-center text-4xl font-bold'>Publica tu colegio. Concreta citas con familias interesadas. <br />Gestiona todo en línea. Obtén nuevos estudiantes</h1>
        <h2 className='text-white text-center text-3xl font-bold'>Todo en un solo lugar, de forma simple y a bajo costo</h2>
        <button className='uppercase p-3 rounded-sm bg-[#0061dd] text-white font-semibold'>inscribe tu colegio aquí</button>
        <button className='px-4 py-1 rounded-md text-[#0061dd] bg-white font-semibold'>¡Quiero más información por el momento!</button>
      </header>
      <section className='bg-[#f7f8fa] h-[550px] flex flex-col justify-around'>
        <h1 className="text-center text-3xl font-semibold">¿Por qué escoger MiCole?</h1>
        <div className="flex justify-center items-center gap-5">
          <Cards img={GroupSchool} title='Haz que tu colegio brille frente a las familias' parrafe='Publica toda la información relevante sobre ti para las familias que están buscando colegios'/>
          <Cards img={VectorPeople} title='Completa tus vacantes 
disponibles' parrafe='Gestiona todas las vacantes de inicial, primaria y secundaria que tengas en un solo lugar.
'/>
          <Cards img={VectorTalk} title='Cuenta con un proceso de 
admisión simple y eficiente' parrafe='Olvídate de tener que mandar correos y comunicaciones uno a uno, hazlo todo masivo.'/>
        </div>
      </section>
    </div>
  )
}

export default EnrollSchool 