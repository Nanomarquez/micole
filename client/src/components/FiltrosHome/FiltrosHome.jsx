import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./FiltrosHome.module.css";
import Icon_filters_home from "./svg/Icon_filters_home";
import MockupDistritos from "../../MockupInfo/MockupDistritos";
import MockupGrados from "../../MockupInfo/MockupGrados";
import MockupCategoria from "../../MockupInfo/MockupCategoria";
const Ingreso = ["2023", "2024", "2025"];

function FiltrosHome() {
  const [OpenFilter, setOpenFilter] = useState(false);
  const toggleFilters = () => {
    setOpenFilter(!OpenFilter);
  };
  return (
    <div className={style.filtros_container}>
      <div className={style.container_select}>
        <div className={style.select}>
          <p>Distrito</p>

          <label>Selecciona un distrito</label>
          <select>
            {MockupDistritos.map((distrito) => (
              <option>{distrito}</option>
            ))}
          </select>
        </div>
        <div className={style.select}>
          <p>Grado</p>
          <label>Selecciona un grado</label>
          <select>
            {MockupGrados.map((grado) => (
              <option>{grado}</option>
            ))}
          </select>
        </div>
        <div className={style.select}>
          <p>Ingreso</p>
          <label>Selecciona año de ingreso</label>

          <select>
            {Ingreso.map((año) => (
              <option>{año}</option>
            ))}
          </select>
        </div>
        {/* <div className={style.select}>
          <p>Categoria</p>
          <label>Selecciona año de ingreso</label>

          <select>
          {MockupCategoria.map((c) => (
              <option>{c}</option>
            ))}
          </select>
        </div> */}
        <div className={style.masFiltros} onClick={toggleFilters}>
          <Icon_filters_home />
          <p> Mas filtros</p>
        </div>
        {/* {OpenFilter && (
          <div>
            <div>
            {MockupCategoria.map((c) => (
              <option>{c}</option>
            ))}
            </div>
          </div>
        )} */}

        <div className={style.container_button}>
          <Link to="/listschool?distrito=algundistrito">
            <button>Buscar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FiltrosHome;
