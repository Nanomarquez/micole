import React, { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { Rating, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const distrits = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
function valuetext(value) {
  return `${value}°C`;
}

function valuetext2(value) {
  return `${value}°C`;
}

const minDistance = 10;
function ListSchool() {
  const [distritName, setDistritName] = React.useState([]);

  const handleChangeDistrit = (event) => {
    const {
      target: { value },
    } = event;
    setDistritName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const [english, setEnglish] = React.useState(10);

  const handleChangeEnglish = (event, newValue) => {
    setEnglish(newValue);
  };

  const [type, setType] = React.useState("");

  const [value1, setValue1] = React.useState([20, 37]);

  const [rating, setRating] = React.useState(2);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue2([Math.min(newValue[0], value2[1] - minDistance), value2[1]]);
    } else {
      setValue2([value2[0], Math.max(newValue[1], value2[0] + minDistance)]);
    }
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
      setSchools(res.data.slice(0, 100));
    });
  }, []);

  return (
    <div className="flex flex-col p-5 bg-[#fcfeff]">
      <h1 className="text-center text-2xl font-semibold">
        Encuentra el colegio ideal
      </h1>
      <div className="flex p-5 gap-10 m-5">
        <section className="w-1/4 flex flex-col gap-5 border-2 rounded-md bg-white shadow-lg p-10">
          <h2 className="font-semibold text-xl">Filtros</h2>
          <div>
          <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={distritName}
          onChange={handleChangeDistrit}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {distrits.map((distrit) => (
            <MenuItem key={distrit} value={distrit}>
              <Checkbox checked={distritName.indexOf(distrit) > -1} />
              <ListItemText primary={distrit} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              Tipo de colegio
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={type}
              onChange={handleChangeType}
              label="Tipo de colegio"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Typography id="input-slider" gutterBottom>
              Pensión (s/)
            </Typography>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
            />
            <div className="flex w-full gap-5 justify-around">
              <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                ${value1[0]}
              </div>
              <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                ${value1[1]}
              </div>
            </div>
          </div>
          <div>
            <Typography id="input-slider" gutterBottom>
              Cuota de ingreso (s/)
            </Typography>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={value2}
              onChange={handleChange2}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext2}
              disableSwap
            />
            <div className="flex w-full gap-5 justify-around">
              <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                ${value2[0]}
              </div>
              <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                ${value2[1]}
              </div>
            </div>
          </div>
          <div>
            <Typography id="input-slider" gutterBottom>
              Calificación
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <div>
            <Typography id="input-slider" gutterBottom>
              Inglés {english} (Hrs/semana)
            </Typography>
            <Slider
              aria-label="English"
              min={0}
              max={10}
              value={english}
              onChange={handleChangeEnglish}
              valueLabelDisplay="auto"
            />
          </div>
          <button className="bg-[#0061dd] text-white w-full p-3 rounded-sm flex justify-center items-center gap-5">
            <FontAwesomeIcon size="lg" icon={faSearch} />
            BUSCAR
          </button>
        </section>
        <section className="w-3/4 border-2 rounded-md bg-white shadow-lg"></section>
      </div>
    </div>
  );
}

export default ListSchool;
