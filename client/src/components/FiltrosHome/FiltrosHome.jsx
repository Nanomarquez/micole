import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./FiltrosHome.module.css";
import Select from "@mui/material/Select";

import ListItemText from "@mui/material/ListItemText";
import Icon_filters_home from "./svg/Icon_filters_home";
import MockupDistritos from "../../MockupInfo/MockupDistritos";
import MockupGrados from "../../MockupInfo/MockupGrados";
import MockupCategoria from "../../MockupInfo/MockupCategoria";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";

import { InputLabel } from "@mui/material";
import { useSelector } from "react-redux";

const Ingreso2 = ["2023", "2024", "2025"];

function FiltrosHome() {
    const [OpenFilter, setOpenFilter] = useState(false);
    const [Ingreso, setIngreso] = useState(false);
    const [Grado, setGrado] = useState(false);
    const [Distrito, setDistrito] = useState(false);
  const { allschools, loading, departaments, distrits } = useSelector(
    (state) => state.schools
  );
  console.log(distrits)

  const toggleFilters = () => {
    setOpenFilter(!OpenFilter);
  };

const handleValueDistrito =(event)=>{
  console.log(event.target.value)
  setDistrito(event.target.value)
}
const handleValueGrado =(event)=>{
console.log(event.target.value)
setGrado(event.target.value)
}
const handleValueAño =(event)=>{
  console.log(event.target.value)
  setIngreso(event.target.value)
}
  return (
    <div className={style.filtros_container}>
      <div className={style.container_select}>
        <div className={style.select}>
          <p>Distrito</p>
          <FormControl
            variant="standard"
            style={{ width: "150px" }}
            size="small"
          >
            <InputLabel
              className="text-xl"
              id="demo-simple-select-standard-label"
            >
              Selecciona un distrito
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              // value={type}
              onChange={handleValueDistrito}
              label="Tipo de colegio"
            >
              {distrits.map((dis) => (
                <MenuItem value={dis.id} key={dis.id}>
                  <ListItemText primary={ dis.nombre_distrito} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={style.select}>
          <p>Grado</p>
          <FormControl
            variant="standard"
            style={{ width: "150px" }}
            size="small"
          >
            <InputLabel
              className="text-xl"
              id="demo-simple-select-standard-label"
            >
              Selecciona un grado
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              // value={type}
              onChange={handleValueGrado}
              label="Tipo de colegio"
            >
              {MockupGrados.map((type) => (
                <MenuItem value={type} key={type}>
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>
        <div className={style.select}>
          <p>Ingreso</p>
          <FormControl
            variant="standard"
            style={{ width: "150px" }}
            size="small"
          >
            <InputLabel
              className="text-xl"
              id="demo-simple-select-standard-label"
            >
              Selecciona año de ingreso
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              // value={type}
              onChange={handleValueAño}
              label="Tipo de colegio"
            >
              {Ingreso2.map((type) => (
                <MenuItem value={type} key={type}>
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={style.masFiltros} onClick={toggleFilters}>
          <Icon_filters_home />
          <p> Mas filtros</p>
        </div>

        <div className={style.container_button}>
          <Link to={`/listschool?distrito=${Distrito}&grado=${Grado}&ingreso=${Ingreso}`}>
            <button>Buscar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FiltrosHome;
