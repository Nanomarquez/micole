import React from "react";
import style from "./Home.module.css";
import fondoHome from "../../assets/Home_img.png";
import Icon_directo from "./svg/Icon_directo";
import Icon_recomendacion from "./svg/Icon_recomendacion";
import Icon_school from "./svg/Icon_school";
function Home() {
  return (
    <>
      <div className={style.container}>
        <img className={style.img} src={fondoHome} alt="home" />
        <div className={style.landingText}>
          <h1 className={style.h1}> Tu búsqueda de colegios comienza aquí</h1>
          <p className={style.p}>¡Qué Emoción!</p>
        </div>
      </div>
      <div className={style.contentHome}>
        <h1 className={style.title}>¿Por qué escoger MiCole.pe?</h1>

        <div className={style.LayoutContent}>
          <div className={style.CardContainer}>
            <Icon_school />
          </div>
          <div className={style.CardContainer}>
            <Icon_directo />
          </div>
          <div className={style.CardContainer}>
            <Icon_recomendacion />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
