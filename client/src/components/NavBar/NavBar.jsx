import React from "react";
import Burguer from "./svg/Burguer";
import Logo from "../../assets/logo1.png"
import style from "./NavBar.module.css";
function NavBar() {
  return (
    <div className={style.layout}>
       <img  className={style.img} src={Logo}/>
      <div className={style.container}>
       
        <div className={style.items}>
          <p>Inicio</p>
          <p>Categorias</p>
          <p>BLOG</p>
          <p>Contáctanos</p>
        </div>

        <div className={style.Burguer}>
          <Burguer />
        </div>
        <div className={style.buttonContainer}>
          <button className={style.SesionButtom}>Iniciar sesion</button>
          <button className={style.SesionButtom}>Inscribe tu colegio</button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
