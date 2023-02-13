import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSchoolDetail } from "../redux/SchoolsActions";
import banner from "../assets/ejemplobanner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faHeart,
  faPaperclip,
  faShare,
  faUsers,
  faCalendar,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import Maps from "../components/Maps";
function SchoolDetail() {
  const { id } = useParams();
  const { oneSchool } = useSelector((state) => state.schools);
  console.log(oneSchool);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchoolDetail(id));
  }, []);

  return (
    <div className="bg-[#f6f7f8]">
      <img
        src={banner}
        alt="banner"
        className="object-cover w-full h-[500px]"
      />
      <div className="p-8 px-[150px]">
        <div className="header drop-shadow-md">
          <h1 className="text-2xl  font-semibold">Colegio Los Alamos</h1>
          <div>
            <div className="flex justify-between">
              <div className="flex gap-5 items-center text-black/70">
                <h2>Calle Estados Unidos 721, Jesus Maria</h2>
                <div className="flex gap-5 items-center">
                  <span className="bg-black/80 h-min py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    5 vacantes
                  </span>
                  <span className="bg-black/80 h-min py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    2do grado
                  </span>
                  <span className="bg-black/80 h-min py-1 px-2 rounded-sm text-white text-sm flex items-center">
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
          <div className="mt-5 flex justify-between items-center">
            <div className="flex gap-5">
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
        <section className="left mt-5 w-1/2 flex flex-col gap-8">
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
        </section>
        <section className="right"></section>
      </div>
    </div>
  );
}

export default SchoolDetail;
