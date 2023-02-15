import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSchoolDetail } from "../redux/SchoolsActions";
import banner from "../assets/ejemplobanner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/premium.png";
import {
  faDoorOpen,
  faHeart,
  faPaperclip,
  faShare,
  faUsers,
  faCalendar,
  faSchool,
  faChalkboard,
  faChildReaching,
  faVectorSquare,
  faFlask,
  faRobot,
  faGraduationCap,
  faRestroom,
  faHouseMedicalFlag,
  faCameraRotate,
} from "@fortawesome/free-solid-svg-icons";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Maps from "../components/Maps";
import { a11yProps, TabPanel } from "../components/Tabs";
import { Rating } from "@mui/material";

function SchoolDetail() {
  const { id } = useParams();
  const { oneSchool } = useSelector((state) => state.schools);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchoolDetail(id));
  }, []);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="bg-[#f6f7f8]">
      <img
        src={banner}
        alt="banner"
        className="object-cover w-full h-[500px]"
      />
      <div className="p-8 px-5 lg:px-[100px]">
        <div className="header drop-shadow-md">
          <h1 className="text-2xl  font-semibold">Colegio Los Alamos</h1>
          <div>
            <div className="flex justify-between flex-col gap-5 lg:flex-row mt-2 lg:mt-0">
              <div className="flex gap-5 items-start lg:items-center flex-col lg:flex-row text-black/70">
                <h2>Calle Estados Unidos 721, Jesus Maria</h2>
                <div className="flex gap-5 items-center">
                  <span className="bg-black/80 min-w-fit py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    5 vacantes
                  </span>
                  <span className="bg-black/80 min-w-fit py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    2do grado
                  </span>
                  <span className="bg-black/80 min-w-fit py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    2022
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-5 text-black/70">
                <span className="flex items-center gap-2">
                  {" "}
                  <FontAwesomeIcon
                    size="md"
                    color="rgb(156 163 175)"
                    className="bg-white rounded-full p-3"
                    icon={faShare}
                  />
                  Compartir
                </span>
                <span className="flex items-center gap-2">
                  {" "}
                  <FontAwesomeIcon
                    size="md"
                    className="bg-white rounded-full p-3"
                    color="rgb(156 163 175)"
                    icon={faHeart}
                  />
                  Favoritos
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 gap-5 flex justify-between items-start lg:items-center flex-col lg:flex-row">
            <div className="flex gap-5 items-start">
              {" "}
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faUsers}
                />
                <span className="text-sm text-gray-400">368 Alumnos</span>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faPaperclip}
                />
                <span className="text-sm text-gray-400"> Mixto</span>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faDoorOpen}
                />
                <span className="text-sm text-gray-400">2 Salones</span>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faCalendar}
                />
                <span className="text-sm text-gray-400">2 Salones</span>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faSchool}
                />
                <span className="text-sm text-gray-400">2 Salones</span>
              </div>
            </div>
            <div>
              <h1 className="font-semibold">S/ 800/mes</h1>
              <small>Cuota de ingreso: S/ 10,000</small>
            </div>
          </div>
        </div>
        <main className="flex gap-5 flex-col lg:flex-row">
        <section className="left mt-5 flex flex-col gap-8">
          <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Descripcion</h2>
            <p className="text-black/60 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              dolores dolorum facilis tempore ut, voluptatibus perferendis!
              Nihil amet maiores mollitia est aspernatur consequatur placeat
              velit quae dolorem ex vitae repellendus sunt quis numquam corrupti
              minima nam, officiis totam odio repellat cupiditate soluta
              adipisci nemo veniam.{" "}
            </p>
          </div>
          <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Ubicacion</h2>
            <div className="flex text-xs w-full justify-between">
              <ul className="flex flex-col gap-3">
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Direccion: </span>
                  329 Queensberry Street
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">
                    Departamento:{" "}
                  </span>
                  New Jersey State
                </li>
              </ul>
              <ul className="flex flex-col gap-3">
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Distrito: </span>
                  Jersey City
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Zip: </span>
                  365448
                </li>
              </ul>
              <ul className="flex flex-col gap-3">
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Provincia: </span>
                  Greenville
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Pais: </span>
                  United State
                </li>
              </ul>
            </div>
            <Maps />
          </div>
          <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Detalles del Colegio</h2>
            <div className="flex text-xs w-full justify-between">
              <ul className="flex flex-col gap-3">
                <li className="text-black/60">
                  <span className="font-semibold text-black ">RUC: </span>
                  128380912879
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Area: </span>
                  1560 Sq Ft
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Fundacion: </span>
                  2021-09-14
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Niveles: </span>
                  Inicial, primaria, secundaria
                </li>
              </ul>
              <ul className="flex flex-col gap-3">
                <li className="text-black/60">
                  <span className="font-semibold text-black ">
                    Profesores:{" "}
                  </span>
                  8
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Salones: </span>3
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Director: </span>
                  Juan Perez
                </li>
              </ul>
              <ul className="flex flex-col gap-3">
                <li className="text-black/60">
                  <span className="font-semibold text-black ">
                    Tipo de educacion:{" "}
                  </span>
                  Escolarizada
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Turnos: </span>
                  Mañana
                </li>
                <li className="text-black/60">
                  <span className="font-semibold text-black ">Localidad: </span>
                  Urbana
                </li>
              </ul>
            </div>
          </div>
          <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Propuesta Valor Educativo</h2>
            <p className="text-black/60 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              dolores dolorum facilis tempore ut, voluptatibus perferendis!
              Nihil amet maiores mollitia est aspernatur consequatur placeat
              velit quae dolorem ex vitae repellendus sunt quis numquam corrupti
              minima nam, officiis totam odio repellat cupiditate soluta
              adipisci nemo veniam.{" "}
            </p>
          </div>
          <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Infraestructura</h2>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab
                style={{
                  fontSize: "11px",
                  fontFamily: "Poppins",
                  textTransform: "capitalize",
                }}
                label="Administrativa"
                {...a11yProps(0)}
              />
              <Tab
                style={{
                  fontSize: "11px",
                  fontFamily: "Poppins",
                  textTransform: "capitalize",
                }}
                label="Artistica"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  fontSize: "11px",
                  fontFamily: "Poppins",
                  textTransform: "capitalize",
                }}
                label="Deportiva"
                {...a11yProps(2)}
              />
              {/* <Tab
                  style={{
                    fontSize: "16px",
                    fontFamily: "Poppins"
                  }}
                  label="Toggles"
                  {...a11yProps(3)}
                />*/}
              <Tab
                style={{
                  fontSize: "11px",
                  fontFamily: "Poppins",
                  textTransform: "capitalize",
                }}
                label="Enseñanza"
                {...a11yProps(3)}
              />
              <Tab
                style={{
                  fontSize: "11px",
                  fontFamily: "Poppins",
                  textTransform: "capitalize",
                }}
                label="Laboratorio"
                {...a11yProps(4)}
              />
              {/*<Tab
                  style={{
                    fontSize: "16px",
                    fontFamily: "Poppins"
                  }}
                  label="AWS S3 Config"
                  {...a11yProps(5)}
                />*/}
            </Tabs>

            <div className="flex text-xs w-full justify-between">
              <TabPanel value={value} index={0}>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faChalkboard}
                    />
                    Pizarras acrilicas
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faChildReaching}
                    />
                    Area de juegos
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faVectorSquare}
                    />
                    Patio
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faFlask}
                    />
                    Laboratorio de Ciencias
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faRobot}
                    />
                    Laboratorio de Robotica
                  </li>
                </ul>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faRestroom}
                    />
                    Baños
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faShare}
                    />
                    Compartir
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faShare}
                    />
                    Compartir
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faShare}
                    />
                    Compartir
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faShare}
                    />
                    Compartir
                  </li>
                </ul>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faShare}
                    />
                    Compartir
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faShare}
                    />
                    Compartir
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faShare}
                    />
                    Compartir
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faShare}
                    />
                    Compartir
                  </li>
                  <li className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      size="lg"
                      color="rgb(156 163 175)"
                      className="bg-[#f6f7f8] rounded-full p-3"
                      icon={faShare}
                    />
                    Compartir
                  </li>
                </ul>
              </TabPanel>
            </div>
          </div>
          <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">
              Acreditaciones / Certificaciones / Asosiaciones
            </h2>
            <div className="flex text-xs w-full gap-5">
              <ul className="flex flex-col gap-5">
                <li className="text-black/60 flex items-center gap-3">
                  <img src={logo} alt="" className="w-10" />
                  Great Place to Study
                </li>
                <li className="text-black/60 flex items-center gap-3">
                  <img src={logo} alt="" className="w-10" />
                  Great Place to Study
                </li>{" "}
                <li className="text-black/60 flex items-center gap-3">
                  <img src={logo} alt="" className="w-10" />
                  Great Place to Study
                </li>
              </ul>
              <ul className="flex flex-col gap-5">
                <li className="text-black/60 flex items-center gap-3">
                  <img src={logo} alt="" className="w-10" />
                  Great Place to Study
                </li>
                <li className="text-black/60 flex items-center gap-3">
                  <img src={logo} alt="" className="w-10" />
                  Great Place to Study
                </li>
                <li className="text-black/60 flex items-center gap-3">
                  <img src={logo} alt="" className="w-10" />
                  Great Place to Study
                </li>
              </ul>
            </div>
          </div>
          <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Lugares cercanos</h2>
            <h3 className="font-medium text-lg flex items-center gap-2">
              {" "}
              <FontAwesomeIcon
                size="lg"
                color="rgb(156 163 175)"
                className="bg-[#f4f7f9] rounded-full p-3"
                icon={faGraduationCap}
              />
              Centros Comerciales
            </h3>
            <ul className="flex justify-between text-black/50 items-center">
              <li>Real Plaza Salaverry (3km)</li>
              <ul className="flex">

              <li className="flex item-center">              <Rating
                value={4}
                readOnly
                size='small'
              /></li>
              <small className="text-black/50">400 reviews</small>
              </ul>

            </ul>
            <ul className="flex justify-between text-black/50 items-center">
              <li>Real Plaza Salaverry (3km)</li>
              <ul className="flex">

              <li className="flex item-center">              <Rating
                value={4}
                readOnly
                size='small'
              /></li>
              <small className="text-black/50">400 reviews</small>
              </ul>

            </ul>
            <h3 className="font-medium text-lg flex items-center gap-2">
              {" "}
              <FontAwesomeIcon
                size="lg"
                color="rgb(156 163 175)"
                className="bg-[#f4f7f9] rounded-full p-3"
                icon={faHouseMedicalFlag}
              />
              Centros Medicos
            </h3>
            <ul className="flex justify-between text-black/50 items-center">
              <li>Real Plaza Salaverry (3km)</li>
              <ul className="flex">

              <li className="flex item-center">              <Rating
                value={4}
                readOnly
                size='small'
              /></li>
              <small className="text-black/50">400 reviews</small>
              </ul>

            </ul>
            <ul className="flex justify-between text-black/50 items-center">
              <li>Real Plaza Salaverry (3km)</li>
              <ul className="flex">

              <li className="flex item-center">              <Rating
                value={4}
                readOnly
                size='small'
              /></li>
              <small className="text-black/50">400 reviews</small>
              </ul>

            </ul>
            <h3 className="font-medium text-lg flex items-center gap-2">
              {" "}
              <FontAwesomeIcon
                size="lg"
                color="rgb(156 163 175)"
                className="bg-[#f4f7f9] rounded-full p-3"
                icon={faCameraRotate}
              />
              Seguridad
            </h3>
            <ul className="flex justify-between text-black/50 items-center">
              <li>Real Plaza Salaverry (3km)</li>
              <ul className="flex">

              <li className="flex item-center">              <Rating
                value={4}
                readOnly
                size='small'
              /></li>
              <small className="text-black/50">400 reviews</small>
              </ul>

            </ul>
            <ul className="flex justify-between text-black/50 items-center">
              <li>Real Plaza Salaverry (3km)</li>
              <ul className="flex">

              <li className="flex item-center">              <Rating
                value={4}
                readOnly
                size='small'
              /></li>
              <small className="text-black/50">400 reviews</small>
              </ul>

            </ul>
          </div>
        </section>
        <section className="right mt-5  flex flex-col gap-8">
        <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Descripcion</h2>
            <p className="text-black/60 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              dolores dolorum facilis tempore ut, voluptatibus perferendis!
              Nihil amet maiores mollitia est aspernatur consequatur placeat
              velit quae dolorem ex vitae repellendus sunt quis numquam corrupti
              minima nam, officiis totam odio repellat cupiditate soluta
              adipisci nemo veniam.{" "}
            </p>
          </div>
          <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Descripcion</h2>
            <p className="text-black/60 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              dolores dolorum facilis tempore ut, voluptatibus perferendis!
              Nihil amet maiores mollitia est aspernatur consequatur placeat
              velit quae dolorem ex vitae repellendus sunt quis numquam corrupti
              minima nam, officiis totam odio repellat cupiditate soluta
              adipisci nemo veniam.{" "}
            </p>
          </div>  
          <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Descripcion</h2>
            <p className="text-black/60 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              dolores dolorum facilis tempore ut, voluptatibus perferendis!
              Nihil amet maiores mollitia est aspernatur consequatur placeat
              velit quae dolorem ex vitae repellendus sunt quis numquam corrupti
              minima nam, officiis totam odio repellat cupiditate soluta
              adipisci nemo veniam.{" "}
            </p>
          </div>    
        </section>
        </main>
      </div>
    </div>
  );
}

export default SchoolDetail;
