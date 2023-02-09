import React from 'react'
import { faLocationDot, faPhone,faEnvelope , faChevronUp ,faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF ,faTwitter, faInstagram, faLinkedinIn , faTelegram } from "@fortawesome/free-brands-svg-icons";
import Logo from '../assets/logo1.png'
import { useState } from 'react';
function Footer() {
  const [toggle,setToggle] = useState(false)

  return (
    <div className={`bg-gradient-to-b from-[#0c2337] to-[#1a4266] text-white w-full ${toggle ? 'h-full sm:h-[600px]' : 'h-[120px]'} flex flex-col justify-center items-center sm:items-stretch sm:justify-between duration-500`}>
      <div className={`h-4/5 transition-all duration-300 ${toggle ? "block" : "hidden"} flex gap-10 sm:gap-0 flex-col sm:flex-row my-24 justify-around`}>
      <ul className='font-normal flex flex-col gap-5'>
        <li className="font-bold text-xl">Contáctenos</li>
        <li className='flex items-center gap-3'><FontAwesomeIcon icon={faLocationDot} />Líma, Perú</li>
        <li className='flex items-center gap-3'><FontAwesomeIcon icon={faPhone} />123 456 7890</li>
        <li className='flex items-center gap-3'><FontAwesomeIcon icon={faEnvelope} />support@houzing.com</li>
        <li className='flex gap-2'>
          <a href="#" className='w-8 h-8 items-center justify-center flex rounded-md hover:bg-white/20'>
        <FontAwesomeIcon color='white' icon={faFacebookF} />
          </a>
          <a href="#" className='w-8 h-8 items-center justify-center flex rounded-md hover:bg-white/20'>
        <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className='w-8 h-8 items-center justify-center flex rounded-md hover:bg-white/20'>
        <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className='w-8 h-8 items-center justify-center flex rounded-md hover:bg-white/20'>
        <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </li>
      </ul>
      <ul className='font-normal flex flex-col gap-5'>
        <li className="font-bold text-xl">Categorías</li>
        <li className='hover-underline-animation w-min cursor-default'>Religiosos</li>
        <li className='hover-underline-animation w-min cursor-default'>Internacionales</li>
        <li className='hover-underline-animation w-min cursor-default'>Mujeres</li>
        <li className='hover-underline-animation w-min cursor-default'>Hombres</li>
        <li className='hover-underline-animation w-min cursor-default'>Especiales</li>
      </ul>
      <ul className='font-normal flex flex-col gap-5'>
        <li className="font-bold text-xl">Menu</li>
        <li className='hover-underline-animation w-min cursor-default'>Inicio</li>
        <li className='hover-underline-animation w-min cursor-default'>Categorías</li>
        <li className='hover-underline-animation w-min cursor-default'>Nosotros</li>
        <li className='hover-underline-animation w-min cursor-default'>Blog</li>
        <li className='hover-underline-animation w-min cursor-default'>Contacto</li>
        <li className='hover-underline-animation w-min sm:w-max cursor-default'>Terminos y Condiciones</li>
      </ul>
      <ul className='font-normal flex flex-col gap-5'>
        <li className="font-bold text-xl">Subscríbite</li>
        <p>Enterate de todos los tips sobre educacion <br /> para tus hijos que te ofrece MiCole</p>
        <div className='w-min flex items-center bg-white py-2 pl-4 pr-2 rounded-md'>
        <input type="email" placeholder='Ingresa tu correo...' className='outline-none text-black'/>
        <button>
        <FontAwesomeIcon size="2xl" color="#0061dd" icon={faTelegram} />
        </button>
        </div>
      </ul>
      </div>
      <hr className={`${toggle ? "block" : "hidden"}`}/>
      <div className={`flex w-full items-center justify-center ${toggle ? "h-1/5" : "h-full"} `}>
        <img src={Logo} alt="logo" />
        <button onClick={()=>setToggle(!toggle)} className='absolute w-10 h-10 right-5 bg-[#0061dd] rounded-sm'>
        <FontAwesomeIcon size="xl" icon={toggle ? faChevronUp : faChevronDown} />
        </button>
      </div>
    </div>
  )
}

export default Footer