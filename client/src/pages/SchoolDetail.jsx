import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clannDetailid,
  getAllGrados,
  getHorariosSchool,
  getSchoolDetail,
  postCita,
} from "../redux/SchoolsActions";
import CircularProgress from '@mui/material/CircularProgress'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
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
import dayjs from "dayjs";
import axios from "axios";
import style from "./SchoolD.module.css";
import SwiperEventos from "../components/SwiperEventos/SwiperEventos";
import ModalLogin from "../components/ModalLogin/ModalLogin";
import { setVacantesRedux } from "../redux/AuthActions";
import SliderC from "../components/SliderC";
import SecCitas from "../components/SchoolDetail-CITAS/SecCitas";
import InfoGeneral from "./SchoolDetail/InfoColegios/InfoGeneral";
import Comentarios from "./SchoolDetail/Comentarios/Comentarios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Infraestructura from "./SchoolDetail/InfoColegios/Infraestructura/Infraestructura";
import Acreditaciones from "./SchoolDetail/InfoColegios/Acreditaciones/Acreditaciones";
import Maps from "../components/Maps";
import Ubicacion from "./SchoolDetail/Ubicacion/Ubicacion";
import { Tabs } from "@mui/material";
import SwDetail from "./SchoolDetail/SwipperDetail/SwDetail";

function QuiltedImageList({ firstImage, gallery, setImage, setImages }) {
  return (
    <div className="w-full px-4">
      <img
        src={firstImage}
        alt=""
        onClick={() => setImage(firstImage)}
        className="cursor-pointer rounded-md h-24"
      />
      <div className="flex gap-5 mt-2 overflow-x-scroll w-full pb-2">
        {gallery?.map((item, index) => (
          <img
            key={index}
            src={item}
            className="cursor-pointer z-25 object-cover h-24 rounded-md"
            onClick={() => setImages({ open: true, src: gallery })}
          />
        ))}
      </div>
    </div>
  );
}


function SchoolDetail() {
  const { id } = useParams();
  const { oneSchool, grados, horariosColegio } = useSelector(
    (state) => state.schools
  );
  const [images, setImages] = useState({
    open: false,
    src: []
  })

  const { user, isAuth, vacantes } = useSelector((state) => state.auth);


  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [gradoParams, setGradoParams] = React.useState(params.get("grado"));
  console.log(gradoParams);
  const [ingresoParams, setIngresoParams] = React.useState(
    params.get("ingreso")
  );

  const [listaParams, setListaParams] = React.useState(params.get("lista"));

  console.log(gradoParams);
  console.log(grados);
  const nombre_grado = grados?.find(
    (grado) => grado.id == gradoParams
  )?.nombre_grado;
  const stringyDate = (date) => {
    if (date.toString().length === 1) {
      return "0" + date++;
    } else {
      return date;
    }
  };

  const [currentVacante, setCurrentVacante] = useState([]);

  useEffect(() => {
    dispatch(setVacantesRedux(id));
  }, []);
  useEffect(() => {
    if (vacantes.length > 0) {
      setCurrentVacante(
        vacantes?.filter(
          (vac) =>
            vac.GradoId === Number(gradoParams) &&
            vac.año === Number(ingresoParams)
        )
      );
    }
  }, [vacantes]);

  console.log(currentVacante);

  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  ///1

  useEffect(() => {
    dispatch(getAllGrados());
    dispatch(getSchoolDetail(id));
    dispatch(getHorariosSchool(id));
    return () => {
      dispatch(clannDetailid());
    };
  }, []);


  const [date, setDate] = React.useState(dayjs(new Date()));
  const [time, setTime] = React.useState(dayjs("2014-08-18T08:00:00"));

  const [modo, setModo] = React.useState(true);
  const [openLogin, setOpenLogin] = useState(false);



  function handleChangeDateHS(data) {
console.log(data)
if(data.select === true){
     setCita({
      ...cita,
      date: data.date,
      time: data.time
    });
}
 
  }



  const [cita, setCita] = React.useState({
    date:"",
    time: "",
    modo: modo ? "Presencial" : "Virtual",
    nombre: isAuth ? user.nombre_responsable + " " + user?.apellidos_responsable : "",

    celular: isAuth ? user.telefono : "",
    correo: isAuth ? user.email : "",
    añoIngreso: ingresoParams,
    grado: nombre_grado
  });
  console.log(cita);
  useEffect(() => {
    setCita({
      ...cita,
      grado: nombre_grado
    })
  }, [nombre_grado])

  const handleSubmit = (e) => {
    e.preventDefault();



    if (
      cita.time === "" ||
      cita.date === "" ||
      e.target["nombre"].value === "" ||
      e.target["cel"].value === "" ||
      e.target["email"].value === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: "Debes llenar todos los datos para continuar",
      });
      return;
    }
    if (isAuth) {

      console.log(cita);

      dispatch(postCita(cita));
    } else {

      Swal.fire({
        icon: "info",
        title: "Inicia Sesion",
        text: "Debes iniciar sesion o registrarte",

        confirmButtonText: "Iniciar Sesion",

      }).then(res => {
        if (res.isConfirmed) {
          setOpenLogin(true);
        }
      });
      // setOpenLogin(true);
      return;

    }
  };

  const handleModo = () => {
    setModo(!modo);
    setCita({
      ...cita,
      modo: !modo ? "Presencial" : "Virtual",
    });
  };
  document.title = oneSchool?.nombre_colegio?.length > 0 ? oneSchool.nombre_colegio : "MiCole"



  const handleSubmitLista = (e) => {
    e.preventDefault();
    if (!isAuth) {
      Swal.fire({
        icon: "info",
        title: "Inicia Sesion",
        text: "Debes iniciar sesion o registrarte para comentar",

        confirmButtonText: "Iniciar Sesion",

      }).then(res => {
        if (res.isConfirmed) {
          setOpenLogin(true);
        }
      });
      return;
    } else {
      try {
        let data = {
          año: Number(ingresoParams),
          gradoId: Number(gradoParams),
          usuarioId: user?.id,
          colegioId: oneSchool?.id,
        };
        axios
          .post("/lista", data)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Lista creada exitosamente!",
              text: "Lista Agendada",
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Algo salio mal",
              text: err.response.data.message,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      setCita({ ...cita, nombre: user?.nombre_responsable + " " + user?.apellidos_responsable, correo: user?.email, celular: user?.telefono })
    }
  }, [isAuth])

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);

  };
  console.log(oneSchool.galeria_fotos)
  return (
    // HEAD DEL DETAIL ---------------

    <>

      <div className="bg-[#f6f7f8] ">
        {images.open && <SliderC setImages={setImages} images={images.src}></SliderC>}
        {oneSchool?.primera_imagen?.length > 0 ? 
        // <img
        //   src={oneSchool.primera_imagen}
        //   alt="banner"
        //   className="object-cover w-full h-[500px]"
        // /> 
        <SwDetail/>
        : <div className="w-full h-[500px] flex justify-center items-center">
          <CircularProgress
            size="5rem"
            style={{ color: '#0061dd' }}
          />
        </div>}
        {/* BODY DETAIL-----------------------*/}
        <div
          className='flex flex-col sm:flex-row lg:px-[100px] justify-between' >
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* compartir en redes */}
            <div className="flex pt-20  pb-2 flex-row ">
              <span className="flex items-center gap-2">
                {" "}
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  className="bg-white rounded-full p-3"
                  icon={faShare}
                />
                Compartir
              </span>
              <span className="flex items-center gap-2">
                {" "}
                <FontAwesomeIcon
                  size="lg"
                  className="bg-white rounded-full p-3"
                  color="rgb(156 163 175)"
                  icon={faHeart}
                />
                Favoritos
              </span>
            </div>
            {/*nombre colegio */}
            <h1 className="pl-3 lg:pl-0 font-semibold m-0  text-[#0D263B] text-[2.9vh]">
              {oneSchool.nombre_colegio}
            </h1>
            <h2 className='pl-3 lg:pl-0 text-[#696969] text-[1.5vh]'>
              {oneSchool.direccion}{" "}
            </h2>
            <div>
              <div className={style.responsiveHead} >
                <div className=" min-w-fit  max-w-fit">

                  {/* divs negro */}
                  <div className="flex gap-2 lg:flex-row  pb-1 ">
                    <span className="bg-[#0D263B] text-[1.3vh] min-w-fit m-0 px-2 p-0 text-white rounded-sm  flex items-center">
                      {currentVacante &&
                        Number(currentVacante[0]?.capacidad) -
                        Number(currentVacante[0]?.alumnos_matriculados)}{" "}
                      Vacantes
                    </span>
                    <span className="bg-[#0D263B] text-[1.3vh] min-w-fit m-0 px-2 p-0 text-white rounded-sm flex items-center">
                      {nombre_grado}
                    </span>
                    <span className="bg-[#0D263B] text-[1.3vh] min-w-fit m-0 px-2 p-0 rounded-sm text-white  flex items-center">
                      {ingresoParams}
                    </span>
                  </div>
                 
                </div>
{/* COUTA DE INGRESO */}
            {currentVacante && (
              <div className="flex flex-col w-full ">
               <small>
                <p className="font-semibold  text-[#0D263B] text-[2.2vh]"> Pensión: S/   {currentVacante.length > 0 && currentVacante[0].cuota_pension} mes </p>  
               
                </small>
                <small>
                <p className="text-[#696969] text-[1.5vh]">  Cuota de ingreso: S/{" "}
                {currentVacante.length > 0 && currentVacante[0].cuota_ingreso}{" "}
                  </p>
                
                </small>
              
                <small>
                  <p className="text-[#696969] text-[1.5vh]">
                     Cuota de matricula: S/{" "}
                     {currentVacante.length > 0 && currentVacante[0].matricula}
                  </p>
                 
               
                </small>
              </div>
            )}
              </div>
             
            </div>
            

            <div className="pt-4 h-fit gap-5  flex  justify-between items-start lg:items-start  flex-col">
              <div className={ style.divIconsHead}>
                {" "}
                <div className="flex  flex-row  gap-3 text-center">
                  <FontAwesomeIcon
                    size="sm"
                    color="rgb(156 163 175)"
                    icon={faUsers}
                  />
                  <span className="text-[1.5vh] text-gray-400">
                    {oneSchool.numero_estudiantes} Alumnos
                  </span>
                </div>
                {oneSchool?.Categoria?.map((cat) => (
                  <div className="flex flex-row items-center min-w-[20vh] gap-3 text-center">
                    <img
                      src={cat.logo_categoria}
                      alt="logo_categoria"
                      className="w-4 object-cover invert-[40%]"
                    />
                    <span className="text-[1.8vh] text-gray-400">
                      {cat.nombre_categoria}{" "}
                    </span>
                  </div>
                ))}

                <div className="flex flex-row gap-3 text-center">
                  <FontAwesomeIcon
                    size="lg"
                    color="rgb(156 163 175)"
                    icon={faCalendar}
                  />
                  <span className="text-[1.8vh]  text-gray-400">
                    Fundación: {oneSchool.fecha_fundacion}{" "}
                  </span>
                </div>
                <div className="flex flex-row gap-3 text-center">
                  <FontAwesomeIcon
                    size="lg"
                    color="rgb(156 163 175)"
                    icon={faSchool}
                  />
                  <span className="text-[1.8vh] text-gray-400">
                    UGEL: {oneSchool.ugel}{" "}
                  </span>
                </div>
              </div>



            </div>
          </div>

          {/* INFORMACION DEL COLEGIO Y   CITA -LISTA ESPERA- EVENTOS - VIDEO- COMENTARIOS */}
          <main className="flex gap-5 flex-col lg:flex-row">
            {/* INFORMACION DEL COLEGIO */}
            {/* <Box sx={{ width: "", paddingTop: '10vh', typography: "body1" }}> */}
           <div className={style.divBox}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                   variant="scrollable"
                   scrollButtons={true}
                   aria-label="scrollable prevent TabList example"
                    onChange={handleChange} >
                    <Tab sx={{ textTransform: 'none' }} label="Datos Generales" value="1" />
                    <Tab sx={{ textTransform: 'none' }} label="Infraestructura" value="2" />
                    <Tab sx={{ textTransform: 'none' }} label="Acreditaciones" value="3" />
                    <Tab sx={{ textTransform: 'none' }} label="Ubicacion" value="4" />
                    <Tab sx={{ textTransform: 'none' }} label="Reservar Citas" value="5" />
                    <Tab sx={{ textTransform: 'none' }} label="Eventos" value="6" />
                    <Tab sx={{ textTransform: 'none' }} label="Comentarios" value="7" />
                    <Tab sx={{ textTransform: 'none' }} label="Multimedia" value="8" />

                  </TabList>
                </Box>
                <TabPanel value="1">
                  <InfoGeneral />
                </TabPanel>
                <TabPanel value="2">
                  <Infraestructura />
                </TabPanel>
                <TabPanel value="3">
                  <Acreditaciones />
                </TabPanel>
                <TabPanel value="4">
                  <Ubicacion />
                </TabPanel>
                <TabPanel value="5">
                  {listaParams === "true" ? (
                    // lista espera
                    <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
                      <h2 className="font-semibold text-xl">Lista de espera</h2>
                      <form
                        onSubmit={handleSubmitLista}
                        className="w-full flex flex-col gap-7"
                      >
                        <div className="flex w-full gap-5 justify-between">
                          {isAuth ? (
                            <input
                              name="nombreLista"
                              type="text"
                              value={user?.nombre_responsable}
                              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                              placeholder="Nombre"
                              required
                            />
                          ) : (
                            <input
                              name="nombreLista"
                              type="text"
                              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                              placeholder="Nombre"
                              required
                            />
                          )}
                          {isAuth ? (
                            <input
                              name="apellidoLista"
                              type="text"
                              value={user?.apellidos_responsable}
                              required
                              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                            />
                          ) : (
                            <input
                              name="apellidoLista"
                              type="text"
                              required
                              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                              placeholder="Apellidos"
                            />
                          )}
                        </div>
                        <div className="flex w-full gap-5 justify-between">
                          {isAuth ? (
                            <input
                              name="emailLista"
                              type="email"
                              value={user?.email}
                              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                              placeholder="Correo"
                              required
                            />
                          ) : (
                            <input
                              name="emailLista"
                              type="email"
                              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                              placeholder="Correo"
                              required
                            />
                          )}
                          {isAuth ? (
                            <input
                              name="celLista"
                              type="number"
                              pattern="[0-9]{8,15}"
                              value={user?.telefono}
                              required
                              title="Solo se permiten numeros y entre 8 y 10 caracteres"
                              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                              placeholder="Celular"
                            />
                          ) : (
                            <input
                              name="celLista"
                              type="number"
                              pattern="[0-9]{8,15}"
                              required
                              title="Solo se permiten numeros y entre 8 y 10 caracteres"
                              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                              placeholder="Celular"
                            />
                          )}
                        </div>

                        <button
                          type="submit"
                          className="border mt-5 mx-auto px-10 py-2 rounded-md shadow-lg bg-[#0061dd] text-white duration-300 cursor-pointer"
                        >
                          INSCRIBIRME
                        </button>
                      </form>
                      <p className="text-sm p-10">
                        Al enviar estás aceptando los{" "}
                        <Link className="text-[#0061dd] hover:underline">
                          Términos y Condiciones de Uso y la Política de Privacidad
                        </Link>
                      </p>
                    </div>
                  ) : (
                    // SACAR UNA CITA
                    <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
                      <h2 className="font-semibold text-xl">Solicitar una visita</h2>
                      <div className={style.divSwipperCitas}>
                        <SecCitas sendDateHs={handleChangeDateHS} />
                      </div>

                      {/* FORMULARIO DE LA CITA */}
                      <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-7"
                      >
                        <div className="flex gap-5">
                          <input
                            type="button"
                            value={"Presencial"}
                            className={`border w-[120px] ${modo ? "bg-[#0061dd] text-white" : "cursor-pointer"
                              } py-2 rounded-md shadow-lg duration-300`}
                            onClick={handleModo}
                            disabled={modo}
                          />
                          <input
                            type="button"
                            value={"Virtual"}
                            className={`border w-[120px] py-2 rounded-md shadow-lg ${!modo ? "bg-[#0061dd] text-white" : "cursor-pointer"
                              } duration-300`}
                            onClick={handleModo}
                            disabled={!modo}
                          />
                        </div>
                        <div className="flex w-full gap-5 justify-between">
                          {
                            isAuth ?
                              <input
                                name="nombre"
                                type="text"
                                value={user?.nombre_responsable + " " + user?.apellidos_responsable}
                                className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                                placeholder="Nombre"
                                onChange={(e) => {
                                  setCita({ ...cita, nombre: e.target.value });
                                }}
                                required
                              />
                              :
                              <input
                                name="nombre"
                                type="text"

                                className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                                placeholder="Nombre"
                                onChange={(e) => {
                                  setCita({ ...cita, nombre: e.target.value });
                                }}
                                required
                              />
                          }
                          <input
                            name="cel"
                            type="number"
                            pattern="[0-9]{8,15}"
                            value={user?.telefono}
                            required
                            title="Solo se permiten numeros y entre 8 y 10 caracteres"
                            className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                            placeholder="Celular"
                            onChange={(e) => {
                              setCita({ ...cita, celular: Number(e.target.value) });
                            }}
                          />
                        </div>
                        <input
                          name="email"
                          type="email"
                          value={user?.email}
                          className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                          placeholder="Correo"
                          onChange={(e) => {
                            setCita({ ...cita, correo: e.target.value });
                          }}
                          required
                        />
                        <button
                          type="submit"
                          value="Virtual"
                          className="border mt-5 mx-auto px-10 py-2 rounded-md shadow-lg bg-[#0061dd] text-white duration-300 cursor-pointer"
                        >
                          SOLICITAR VISITA
                        </button>
                      </form>
                      <p className="text-sm p-10">
                        Al enviar estás aceptando los{" "}
                        <Link className="text-[#0061dd] hover:underline">
                          Términos y Condiciones de Uso y la Política de Privacidad
                        </Link>
                      </p>
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="6">
               
                  {oneSchool?.Eventos?.length > 0 && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <h2 className="font-semibold text-xl">Eventos</h2>
                      </div>

                      <SwiperEventos data={oneSchool} />
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="7">
                  <Comentarios id={id} />
                </TabPanel>
                <TabPanel value="8">
                <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
                <h2 className="font-semibold text-xl">Galería</h2>
                {oneSchool.hasOwnProperty("galeria_fotos") &&
                  oneSchool.galeria_fotos !== null &&
                  JSON.parse(oneSchool.galeria_fotos).length > 0 && (
                    <QuiltedImageList
                      firstImage={oneSchool.primera_imagen}
                      gallery={JSON.parse(oneSchool.galeria_fotos)}
                      setImage={setImage}
                      setImages={setImages}
                    />
                  )}
                <div
                  className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${image ? "block" : "hidden"
                    }`}
                >
                  <button
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-4 z-[100] text-white"
                  >
                    Atras
                  </button>
                  <img
                    src={image}
                    alt=""
                    className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover"
                  />
                </div>
              </div>
                </TabPanel>
              </TabContext>
           </div>
              

            {/* </Box> */}


            {/* CITA -LISTA ESPERA- EVENTOS - VIDEO- COMENTARIOS */}
            {/* <section className="right mt-5  flex flex-col gap-8 w-full"> */}




            {/* EVENTOS */}

            {/* GALERIA DE FOTOS */}
            {/* <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
                <h2 className="font-semibold text-xl">Galería</h2>
                {oneSchool.hasOwnProperty("galeria_fotos") &&
                  oneSchool.galeria_fotos !== null &&
                  JSON.parse(oneSchool.galeria_fotos).length > 0 && (
                    <QuiltedImageList
                      firstImage={oneSchool.primera_imagen}
                      gallery={JSON.parse(oneSchool.galeria_fotos)}
                      setImage={setImage}
                      setImages={setImages}
                    />
                  )}
                <div
                  className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${image ? "block" : "hidden"
                    }`}
                >
                  <button
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-4 z-[100] text-white"
                  >
                    Atras
                  </button>
                  <img
                    src={image}
                    alt=""
                    className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover"
                  />
                </div>
              </div> */}
            {/* -------------------------AGREGAR GALERIA AL SLIDE DE */}
            {/* VIDEOS */}
            {/* {oneSchool.video_url?.length > 0 && (
                <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
                  <h2 className="font-semibold text-xl">Video</h2>
                 
                  <video className="w-full h-[300px] lg:h-[400px]" controls>
                    <source src={oneSchool.video_url} type="video/mp4" />
                  </video>
                </div>
              )} */}
            {/* COMENTARIOS */}


            {/* </section> */}
          </main>
          {/* ------------------------------------------------------------------------------- */}
        </div>
        {openLogin && <ModalLogin handlerClose={setOpenLogin} />}
      </div>
    </>


  );
}

export default SchoolDetail;
