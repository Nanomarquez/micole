import React from "react";
import style from "./FiltrosHome.module.css";
import Icon_filters_home from "./svg/Icon_filters_home";
function FiltrosHome() {
  return (
    <div className={style.filtros_container}>
      <div className={style.container_select}>
        <div>
            <p>Distrito</p>
          <label>Selecciona un distrito</label>
          <select></select>
        </div>
        <div>
        <p>Grado</p>
          <label>Selecciona un grado</label>
          <select></select>
        </div>
        <div>
        <p>Ingreso</p>
          <label>Selecciona año de ingreso</label>
          <select></select>
        </div>
        <div className={style.masFiltros}>
          <Icon_filters_home />
          <p > Mas filtros</p>
        </div>
        <div className={style.container_button}>
              <button>Buscar</button>
        </div>
      
      </div>
    </div>
  );
}

export default FiltrosHome;
