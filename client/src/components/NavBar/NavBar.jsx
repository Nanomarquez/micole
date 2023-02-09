import React, { useState } from "react";
import Burguer from "./svg/Burguer";
import Logo from "../../assets/logo1.png";
import style from "./NavBar.module.css";
import Categoria from "./Categoria/Categoria";
import Contacto from "./Contacto/Contacto";
import { Link } from "react-router-dom";
function NavBar() {
 
  const [OpenCategory, setOpenCategory] = useState(false);
  const [ OpenContact , setOpenContact ] = useState(false);
  const ToggleCategory = () => {
    setOpenCategory(!OpenCategory);
  };
  const ToggleContact = () => {
    setOpenContact(!OpenContact);
  };
  return (
    <div className={style.layout}>
  <Link to={"/"}>
    <img className={style.img} src={Logo} />
  </Link>
      

      <div className={style.container}>
        <div className={style.items}>
        <Link to={"/"}>
           <p className={style.p}>Inicio</p>
        </Link>
         
          <p className={style.p} onClick={ToggleCategory}>
            Categorias
          </p>
          <p className={style.p}>BLOG</p>
          <p className={style.p} onClick={ToggleContact}>Contáctanos</p>
        </div>

        <div className={style.Burguer}>
          <Burguer />
        </div>
        <div className={style.buttonContainer}>
          <button className={style.SesionButtom}>Iniciar sesion</button>

          <Link to={"/enroll"}>
            <button className={style.SesionButtom}>Inscribe tu colegio</button>
          </Link>
        </div>
      </div>
      {OpenCategory && <Categoria />}
      {OpenContact && <Contacto />}
      
    </div>
  );
}

export default NavBar;
