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
            <h1>Cientos de alternativas para escoger</h1>
            <p>
              Encuentra una gran variedad de colegios que se acomoden a tus
              necesidades
            </p>
          </div>
          <div className={style.CardContainer}>
            <Icon_directo />
            <h1>Contacto directo con tu colegio de interés</h1>
            <p>
              Separa una cita directamente desde la plataforma con un solo click
            </p>
          </div>
          <div className={style.CardContainer}>
            <Icon_recomendacion />
            <h1>Revisa recomendaciones de nuestra comunidad</h1>
            <p>
              Verifica miles de opiniones de otros padres de familia sobre los
              colegios de la plataforma
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
