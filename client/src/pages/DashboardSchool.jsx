import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import { useForm } from "react-hook-form";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Squash as Hamburger } from "hamburger-react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useWindowSize from "react-use-window-size";
import Logo from "../assets/logoPayment.png";
import Confetti from "react-confetti";
import DragAndDrop from "../components/DragAndDrop";
import GridVacantes from "../components/GridVacantes";
import Swal from "sweetalert2";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import { steps } from "../MockupInfo/Pasos";
import { getVacantes, postHorariosVacantes } from "../redux/SchoolsActions";
import { CiUser, CiClock1 } from "react-icons/ci";
import { BsWindowDock } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { GiHexagonalNut } from "react-icons/gi";
import { useEffect } from "react";
import { logout, getSchoolDetail } from "../redux/AuthActions";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
const yearNow = new Date().getFullYear();
import { AiOutlineIdcard } from "react-icons/ai";
import Cards from "../components/CardsDrgAndDrp/Cards";

const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "400px",
};

function StandardImageList({ one, list, setImage, eliminarImagenDePreview }) {
  {
    return one ? (
      <div className="flex justify-center items-center relative">
        <button
          onClick={() => eliminarImagenDePreview(list)}
          className="absolute bg-[#0061dd]/30 right-2 top-2 text-white hover:bg-[#0061dd] p-2 rounded-md duration-300"
        >
          Quitar
        </button>
        <img
          src={list}
          alt={list}
          onClick={() => setImage(list)}
          className="cursor-pointer object-cover w-[370px] h-[400px] "
        />
      </div>
    ) : (
      <ImageList sx={{ width: "100%", height: 400 }} cols={2} rowHeight={400}>
        {list.map((item) => (
          <ImageListItem key={item}>
            <button
              onClick={() => eliminarImagenDePreview(item)}
              className="absolute bg-[#0061dd]/30 right-2 top-2 text-white hover:bg-[#0061dd] p-2 rounded-md duration-300"
            >
              Quitar
            </button>
            <img
              src={item}
              alt={item}
              loading="lazy"
              onClick={() => setImage(item)}
              className="cursor-pointer min-h-[200px] "
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }
}

function DashboardSchool() {
  const { width, height } = useWindowSize();
  const [page, setPage] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [allData, setAllData] = useState({});

  const dispatch = useDispatch();
  const {
    categories,
    provincias,
    distrits,
    departaments,
    niveles,
    infraestructura: infraState,
    afiliaciones,
  } = useSelector((state) => state.schools);
  const { user, oneSchool } = useSelector((state) => state.auth);
  const id = user.id;
  useEffect(() => {
    if (user) {
      dispatch(getSchoolDetail(user.id));
    }
  }, [allData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email ? user.email : "",
      telefono: user.telefono ? user.telefono : "",
      newEmail: "",
      password: "",
      newPassword: "",
      repitPassword: "",
    },
    mode: "onChange",
  });
  const OnSubmit = async (user) => {
    if (user.newPassword !== user.repitPassword) {
      Swal.fire("warning", "Las nuevas contraseñas no coinciden", "error");
      return;
    }
    if (password) {
      Swal.fire(
        "Error",
        "Ingrese su contraseña para modificar algun campo",
        "warning"
      );
      return;
    }
    const data = {
      email: user.email,
      newEmail: user.newEmail,
      telefono: user.telefono,
      password: user.password,
      newPassword: user.newPassword,
    };
    try {
      axios
        .put(`/auth/${id}`, data)
        .then((res) => {
          Swal.fire("Exito", "Datos actualizados", "success");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal",
            text: err.response.data.error,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: error.response,
      });
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleCompleteDatosPrincipales = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setAllData({ ...allData, ...datosPrincipales });
    handleNext();
  };

  const handleCompleteVacantes = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleCompleteInfraestructura = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setAllData({ ...allData, ...datosPrincipales });
    handleNext();
  };

  const handleCompleteAcreditaciones = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setAllData({ ...allData, ...datosPrincipales });
    handleNext();
  };

  const handleCompleteMultimedia = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setAllData({ ...allData, multimedia });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  let libRef = React.useRef(libraries);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB9qHB47v8fOmLUiByTvWinUehYqALI6q4",
    libraries: libRef.current,
  });

  const [center, setCenter] = React.useState({
    lat: -12.046374,
    lng: -77.042793,
  });

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const zoom = 18;
    map.setZoom(zoom);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const direccion = useRef();

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoadPlace = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setLatitud(place.geometry.location.lat());
      setLongitud(place.geometry.location.lng());
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setDatosPrincipales({
        ...datosPrincipales,
        direccion:
          place.address_components[1].long_name +
          " " +
          place.address_components[0].long_name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const initialDatosPrincipales = {
    nombreColegio: oneSchool?.nombre_colegio ? oneSchool.nombre_colegio : "",
    descripcion: oneSchool?.descripcion ? oneSchool.descripcion : "",
    propuesta: oneSchool?.propuesta_valor ? oneSchool.propuesta_valor : "",
    categoria: oneSchool?.Categoria ? oneSchool.Categoria : "",
    nombreDirector: oneSchool?.nombre_director ? oneSchool.nombre_director : "",
    fundacion: oneSchool?.fecha_fundacion
      ? Number(oneSchool?.fecha_fundacion)
      : null,
    ruc: oneSchool?.ruc ? Number(oneSchool.ruc) : null,
    ugel: oneSchool?.ugel ? Number(oneSchool.ugel) : null,
    area: oneSchool?.area ? Number(oneSchool.area) : null,
    ingles: oneSchool?.horas_idioma_extranjero
      ? Number(oneSchool.horas_idioma_extranjero)
      : null,
    alumnos: oneSchool?.numero_estudiantes
      ? Number(oneSchool.numero_estudiantes)
      : null,
    niveles: oneSchool?.Nivels?.length > 0 ? oneSchool.Nivels : [],
    departamento: oneSchool?.Departamento ? oneSchool.Departamento : {},
    provincia: oneSchool?.Provincium ? oneSchool.Provincium : {},
    distrito: oneSchool?.Distrito ? oneSchool.Distrito : {},
    direccion: oneSchool?.direccion ? oneSchool.direccion : "",
    lat:
      oneSchool?.ubicacion?.length > 0
        ? JSON.parse(oneSchool.ubicacion).lat
        : 0,
    lng:
      oneSchool?.ubicacion?.length > 0
        ? JSON.parse(oneSchool.ubicacion).lng
        : 0,
    infraestructura: oneSchool?.Infraestructuras
      ? oneSchool.Infraestructuras
      : [],
    afiliaciones:
      oneSchool?.Afiliacions.length > 0 ? oneSchool.Afiliacions : [],
  };

  const [datosPrincipales, setDatosPrincipales] = useState(
    initialDatosPrincipales
  );

  const datosPrincipalesCompleted = () => {
    if (
      datosPrincipales.nombreColegio !== "" &&
      datosPrincipales.descripcion !== "" &&
      datosPrincipales.propuesta !== "" &&
      datosPrincipales.categoria.length !== 0 &&
      datosPrincipales.nombreDirector !== "" &&
      datosPrincipales.fundacion !== null &&
      datosPrincipales.ruc !== null &&
      datosPrincipales.ugel !== null &&
      datosPrincipales.area !== null &&
      datosPrincipales.ingles !== null &&
      datosPrincipales.alumnos !== null &&
      datosPrincipales.niveles.length !== 0 &&
      Object.keys(datosPrincipales.departamento).length !== 0 &&
      Object.keys(datosPrincipales.provincia).length !== 0 &&
      Object.keys(datosPrincipales.distrito).length !== 0 &&
      datosPrincipales.direccion !== "" &&
      datosPrincipales.lat !== 0 &&
      datosPrincipales.lng !== 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const infraestructuraCompleted = () => {
    if (datosPrincipales.infraestructura.length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const acreditacionesCompleted = () => {
    if (datosPrincipales.afiliaciones.length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const [isOpen, setOpen] = useState(false);

  const [file, setFile] = useState(null);

  const [files, setFiles] = useState(null);

  const handleFilesSubmitOne = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("file", previewOne);
      formData.append("upload_preset", "tcotxf16");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/de4i6biay/image/upload",
        formData
      );
      setMultimedia({ ...multimedia, image: res.data.secure_url });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: "Intenta nuevamente",
      });
    }
    Swal.fire({
      icon: "success",
      title: "Imagen subida correctamente",
    });
    setSpanOne(false);
    setActiveUpOne(false);
  };

  function handleFilesSubmit(e) {
    e.preventDefault();
    let arrayImages = [];
    preview?.map(async (image, index) => {
      const formData = new FormData();
      try {
        formData.append("file", image);
        formData.append("upload_preset", "tcotxf16");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/de4i6biay/image/upload",
          formData
        );
        arrayImages.push(res.data.secure_url);
        setMultimedia({
          ...multimedia,
          images: arrayImages,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Algo salio mal",
          text: "Intenta nuevamente",
        });
      }
    });
    Swal.fire({
      icon: "success",
      title: "Imagenes subidas correctamente",
    });
    setSpanTwo(false);
    setActiveUpTwo(false);
  }

  const initialMultimedia = {
    image:
      oneSchool?.primera_imagen?.length > 0 ? oneSchool.primera_imagen : "",
    images:
      oneSchool?.galeria_fotos?.length > 0
        ? JSON.parse(oneSchool.galeria_fotos)
        : [],
    video_url: oneSchool?.video_url?.length > 0 ? oneSchool.video_url : "",
  };

  const [multimedia, setMultimedia] = useState(initialMultimedia);

  const initialPreviewOne =
    oneSchool?.primera_imagen?.length > 0 ? oneSchool.primera_imagen : "";
  const initialPreview =
    oneSchool?.galeria_fotos?.length > 0
      ? JSON.parse(oneSchool.galeria_fotos)
      : [];
  const [preview, setPreview] = useState(initialPreview);
  const [previewOne, setPreviewOne] = useState(initialPreviewOne);

  useEffect(() => {
    if (files !== null) {
      Object.values(files).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview((prev) => [...prev, reader.result]);
        };
      });
    }
  }, [files]);

  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewOne(reader.result);
      };
    }
  }, [file]);

  const eliminarImagenDePreview = (img) => {
    setPreview(preview.filter((image) => image !== img));
  };
  const eliminarImagenDePreviewOne = (img) => {
    setPreviewOne("");
  };

  const [image, setImage] = useState(null);

  const multimediaCompleted = () => {
    if (multimedia.image !== "" && multimedia.images.length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmitFormComplete = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/colegios/${user.id}`, allData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Felicidades ya estas a un paso de publicar tu colegio",
          text: "Continua completando el horario para tus citas",
          confirmButtonText: "Continuar",
        }).then((res) => {
          if (res.isConfirmed) {
            handleReset();
            setPage(1);
          }
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Lo sentimos algo salio mal",
          text: err.message,
        });
      });
  };

  const [vacantes, setVacantes] = useState(0);

  const initialDaysWithTime = [
    {
      Lunes: [dayjs("2014-08-18T08:00:00"), dayjs("2014-08-18T17:00:00"), true],
    },
    {
      Martes: [
        dayjs("2014-08-18T08:00:00"),
        dayjs("2014-08-18T17:00:00"),
        true,
      ],
    },
    {
      Miercoles: [
        dayjs("2014-08-18T08:00:00"),
        dayjs("2014-08-18T17:00:00"),
        true,
      ],
    },
    {
      Jueves: [
        dayjs("2014-08-18T08:00:00"),
        dayjs("2014-08-18T17:00:00"),
        true,
      ],
    },
    {
      Viernes: [
        dayjs("2014-08-18T08:00:00"),
        dayjs("2014-08-18T17:00:00"),
        true,
      ],
    },
  ];

  const [daysWithTime, setDaysWithTime] = React.useState(initialDaysWithTime);

  const stringyDate = (date) => {
    if (date.toString().length === 1) {
      return "0" + date++;
    } else {
      return date;
    }
  };

  // { Lunes: ["08:30", "13:00", true] },
  // {
  //   dia: "Lunes",
  //   horarios: { desde: "08:30", hasta: "13:00" },
  //   disponibilidad: false,
  //   vacantesDispo:2,
  //   vacantes: "20",
  // },
  const handleSubmitCitas = (e) => {
    e.preventDefault();

    const newDaysWithTime = daysWithTime.filter((days) => {
      return days[Object.keys(days)[0]][2] === true;
    });
    const newDays = newDaysWithTime.map((day) => ({
      dia: Object.keys(day)[0],

      horarios:[ {
        desde: stringyDate(day[Object.keys(day)][0]["$H"])
          .toString()
          .concat(":")
          .concat(stringyDate(day[Object.keys(day)][0]["$m"]).toString()),
        hasta: stringyDate(day[Object.keys(day)][1]["$H"])
          .toString()
          .concat(":")
          .concat(stringyDate(day[Object.keys(day)][1]["$m"]).toString()),
      }],
    }));
    Swal.fire({
      icon: "success",
      title: "Horarios actualizados exitosamente!",
      text: "Cambios guardados",
    });
    console.log(newDays);
    dispatch(postHorariosVacantes(newDays));
  };

  const [spanOne, setSpanOne] = useState(false);
  const [spanTwo, setSpanTwo] = useState(false);
  const [activeUpOne, setActiveUpOne] = useState(true);
  const [activeUpTwo, setActiveUpTwo] = useState(true);

  const [seePassword, setSeePassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);

  useEffect(() => {
    dispatch(getVacantes(datosPrincipales.niveles));
  }, [datosPrincipales.niveles]);

  const [vacantesOffOne,setVacantesOffOne] = useState(true)
  const [vacantesOffTwo,setVacantesOffTwo] = useState(true)
  const [vacantesOffThree,setVacantesOffThree] = useState(true)

  console.log(vacantesOffThree)

  return (
    <div className="flex lg:flex-row flex-col">
      <section
        className={`leftshadow ${
          !isOpen
            ? "h-[50px] lg:h-full lg:min-h-full"
            : "h-[300px] lg:h-full lg:min-h-full"
        } duration-300 overflow-hidden bg-white w-full lg:w-1/4 shadow-leftshadow flex justify-center z-50`}
      >
        <div className="absolute left-5 block lg:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} color="#0061dd" />
        </div>
        <ul
          className={`${
            !isOpen ? "hidden" : "flex"
          } lg:flex flex-col justify-center gap-4 static lg:absolute lg:top-48`}
        >
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 0 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => setPage(0)}
          >
            <CiUser
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 0 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 0 ? "text-white" : null
              }`}
            >
              Perfil del colegio
            </span>
          </button>
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 1 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => setPage(1)}
          >
            <CiClock1
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 1 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 1 ? "text-white" : null
              }`}
            >
              Horario para citas{" "}
            </span>
          </button>
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 1 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => setPage(4)}
          >
            <AiOutlineIdcard
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 1 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 1 ? "text-white" : null
              }`}
            >
              Control de citas{" "}
            </span>
          </button>

          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 2 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => setPage(2)}
          >
            <BsWindowDock
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 2 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 2 ? "text-white" : null
              }`}
            >
              Mi plan
            </span>
          </button>

          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 3 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => setPage(3)}
          >
            <GiHexagonalNut
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 3 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 3 ? "text-white" : null
              }`}
            >
              Configuración
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => dispatch(logout())}
          >
            <AiOutlineLogout className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Logout
            </span>
          </button>
        </ul>
      </section>
      <section className="right w-full bg-[#f6f7f8] p-5 lg:px-32 lg:py-12">
        {page === 0 ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <Stepper
              nonLinear
              activeStep={activeStep}
              orientation={width > 700 ? "horizontal" : "vertical"}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton
                    color="inherit"
                    // disabled={!completed[index]}
                    onClick={handleStep(index)}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div className="mt-10">
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Confetti
                    width={width - 10}
                    height={width > 900 ? height + 155 : height}
                    style={{ zIndex: 500, position: "fixed" }}
                  />
                  <div
                    className={`h-screen flex flex-col gap-10 justify-center`}
                  >
                    <h1 className="text-4xl text-center font-bold mt-5">
                      Felicitaciones completaste todos los pasos
                    </h1>
                    <p className="text-center">
                      Porfavor envia el formulario hacia nuestra base de datos
                      para continuar
                    </p>
                    <img src={Logo} alt="" className="object-cover mx-auto" />
                    <button
                      type="submit"
                      className="bg-[#0061dd] text-white rounded-md mx-auto p-3"
                      onClick={handleSubmitFormComplete}
                    >
                      Enviar datos
                    </button>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 && (
                    <form className="flex flex-col gap-7">
                      <div className="flex flex-col">
                        <label
                          htmlFor="nombreColegio"
                          className="text-lg font-medium"
                        >
                          Nombre del Colegio
                        </label>
                        <input
                          type="text"
                          name="nombreColegio"
                          id="nombreColegio"
                          className="p-3 rounded-md border-2  outline-none"
                          value={datosPrincipales.nombreColegio}
                          onChange={(e) =>
                            setDatosPrincipales({
                              ...datosPrincipales,
                              nombreColegio: e.target.value,
                            })
                          }
                          placeholder="Ingresa el nombre del colegio"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="descripcion"
                          className="text-lg font-medium"
                        >
                          Descripcion
                        </label>
                        <textarea
                          name="descripcion"
                          id="descripcion"
                          className="p-3 rounded-md border-2 outline-none"
                          rows={5}
                          onChange={(e) =>
                            setDatosPrincipales({
                              ...datosPrincipales,
                              descripcion: e.target.value,
                            })
                          }
                          value={datosPrincipales.descripcion}
                          placeholder="Ingresa la descripción de tu colegio"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="propuesta"
                          className="text-lg font-medium"
                        >
                          Propuesta de Valor Educativa
                        </label>
                        <textarea
                          name="propuesta"
                          id="propuesta"
                          className="p-3 rounded-md border-2 outline-none"
                          rows={5}
                          onChange={(e) =>
                            setDatosPrincipales({
                              ...datosPrincipales,
                              propuesta: e.target.value,
                            })
                          }
                          value={datosPrincipales.propuesta}
                          placeholder="Ingresa la propuesta de valor educativa de tu colegio"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <label
                            htmlFor="categoria"
                            className="text-lg font-medium"
                          >
                            Categoria
                          </label>
                          <small>Puede marcar mas de una opción</small>
                        </div>
                        <div className="flex flex-col lg:grid grid-cols-3">
                          {categories?.map((category) => (
                            <FormControlLabel
                              key={category.id}
                              control={
                                <Checkbox
                                  checked={
                                    datosPrincipales?.categoria.length > 0 &&
                                    datosPrincipales?.categoria
                                      .map((e) => e.id)
                                      .includes(category.id)
                                  }
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        categoria: [
                                          ...datosPrincipales.categoria,
                                          category,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        categoria:
                                          datosPrincipales.categoria.filter(
                                            (cat) => cat.id !== category.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={category.nombre_categoria}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="director"
                          className="text-lg font-medium"
                        >
                          Nombre del Director
                        </label>
                        <input
                          type="text"
                          name="director"
                          id="director"
                          className="p-3 rounded-md border-2  outline-none"
                          onChange={(e) =>
                            setDatosPrincipales({
                              ...datosPrincipales,
                              nombreDirector: e.target.value,
                            })
                          }
                          placeholder="Ingresa el nombre del director"
                          value={datosPrincipales.nombreDirector}
                        />
                      </div>
                      <div className="flex flex-col lg:grid grid-cols-3 gap-5">
                        <div className="flex flex-col">
                          <label
                            htmlFor="fundacion"
                            className="text-lg font-medium"
                          >
                            Año de Fundación
                          </label>
                          <input
                            type="number"
                            name="fundacion"
                            id="fundacion"
                            className="p-3 rounded-md border-2  outline-none"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                fundacion: Number(e.target.value),
                              })
                            }
                            pattern="\d{4}"
                            placeholder="Ingresa un año"
                            value={datosPrincipales.fundacion}
                            title="Solo se permiten numeros, 4 caracteres y un año superior a 1700"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="ruc" className="text-lg font-medium">
                            N° RUC
                          </label>
                          <input
                            type="number"
                            name="ruc"
                            placeholder="Ingresa el RUC"
                            id="ruc"
                            className="p-3 rounded-md border-2  outline-none"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                ruc: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.ruc}
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="ugel" className="text-lg font-medium">
                            UGEL
                          </label>
                          <input
                            type="number"
                            name="ugel"
                            placeholder="Ingresa el UGEL"
                            id="ugel"
                            className="p-3 rounded-md border-2  outline-none"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                ugel: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.ugel}
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="area" className="text-lg font-medium">
                            Área del campus (m2)
                          </label>
                          <input
                            type="number"
                            name="area"
                            id="area"
                            placeholder="Ingresa el area del campus"
                            className="p-3 rounded-md border-2  outline-none"
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                area: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.area}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="ingles"
                            className="text-lg font-medium"
                          >
                            Hr/Semana idioma Inglés
                          </label>
                          <input
                            type="number"
                            name="ingles"
                            id="ingles"
                            placeholder="Ingresa las horas de ingles"
                            className="p-3 rounded-md border-2  outline-none"
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                ingles: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.ingles}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="alumnos"
                            className="text-lg font-medium"
                          >
                            Cantidad de Alumnos
                          </label>
                          <input
                            type="number"
                            name="alumnos"
                            id="alumnos"
                            placeholder="Ingresa la cantidad de alumnos"
                            className="p-3 rounded-md border-2  outline-none"
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                alumnos: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.alumnos}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <label
                            htmlFor="alumnos"
                            className="text-lg font-medium"
                          >
                            Niveles
                          </label>
                          <small>Puede marcar mas de una opción</small>
                        </div>
                        <div className="flex flex-col lg:grid grid-cols-3">
                          {niveles?.map((level) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.niveles.some(
                                    (niv) => niv.id === level.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        niveles: [
                                          ...datosPrincipales.niveles,
                                          level,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        niveles:
                                          datosPrincipales.niveles.filter(
                                            (cat) => cat.id !== level.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={level.nombre_nivel}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex w-full flex-col gap-5">
                        <h1 className="text-2xl font-medium">Ubicación</h1>
                        <div className="flex w-full gap-5 flex-col lg:flex-row">
                          <div className="flex flex-col w-full gap-3">
                            <label className="text-lg font-medium">
                              Departamento
                            </label>
                            <FormControl size="medium" className="w-full">
                              <InputLabel id="demo-simple-select-standard-label">
                                Selecciona un Departamento
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-type-select-standard"
                                value={datosPrincipales.departamento}
                                onChange={(e) => {
                                  setDatosPrincipales({
                                    ...datosPrincipales,
                                    departamento: e.target.value,
                                  });
                                }}
                                label="Selecciona una Provincia"
                                className="bg-white"
                                defaultValue={datosPrincipales.departamento}
                              >
                                <MenuItem value={datosPrincipales.departamento}>
                                  {
                                    datosPrincipales.departamento
                                      .nombre_departamento
                                  }
                                </MenuItem>
                                {departaments
                                  .filter(
                                    (dep) =>
                                      dep.nombre_departamento !==
                                      datosPrincipales.departamento
                                        .nombre_departamento
                                  )
                                  .map((type, index) => (
                                    <MenuItem value={type} key={type.index}>
                                      <ListItemText
                                        primary={type.nombre_departamento}
                                      />
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div className="flex flex-col w-full gap-3">
                            <label className="text-lg font-medium">
                              Provincia
                            </label>

                            <FormControl size="medium" className="w-full">
                              <InputLabel id="demo-simple-select-standard-label">
                                Selecciona una Provincia
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-type-select-standard"
                                value={datosPrincipales.provincia}
                                onChange={(e) => {
                                  setDatosPrincipales({
                                    ...datosPrincipales,
                                    provincia: e.target.value,
                                  });
                                }}
                                label="Selecciona una Provincia"
                                className="bg-white"
                                defaultValue={datosPrincipales.provincia}
                              >
                                <MenuItem value={datosPrincipales.provincia}>
                                  {datosPrincipales.provincia.nombre_provincia}
                                </MenuItem>
                                {provincias
                                  .filter(
                                    (prov) =>
                                      prov.nombre_provincia !==
                                      datosPrincipales.provincia
                                        .nombre_provincia
                                  )
                                  .map((type, index) => (
                                    <MenuItem value={type} key={type.index}>
                                      <ListItemText
                                        primary={type.nombre_provincia}
                                      />
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div className="flex flex-col w-full gap-3">
                            <label className="text-lg font-medium">
                              Distrito
                            </label>

                            <FormControl size="medium" className="w-full">
                              <InputLabel id="demo-simple-select-standard-label">
                                Selecciona un Distrito
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-type-select-standard"
                                value={datosPrincipales.distrito}
                                onChange={(e) => {
                                  setDatosPrincipales({
                                    ...datosPrincipales,
                                    distrito: e.target.value,
                                  });
                                }}
                                label="Selecciona una Provincia"
                                className="bg-white"
                                defaultValue={datosPrincipales.distrito}
                              >
                                <MenuItem value={datosPrincipales.distrito}>
                                  {datosPrincipales.distrito.nombre_distrito}
                                </MenuItem>
                                {distrits
                                  .filter(
                                    (distrit) =>
                                      distrit.nombre_distrito !==
                                      datosPrincipales.distrito.nombre_distrito
                                  )
                                  .map((type, index) => (
                                    <MenuItem value={type} key={type.index}>
                                      <ListItemText
                                        primary={type.nombre_distrito}
                                      />
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <label
                            htmlFor="direccion"
                            className="text-lg font-medium"
                          >
                            Dirección
                          </label>
                          {isLoaded && (
                            <>
                              <div className="flex flex-col lg:flex-row w-full gap-5">
                                <Autocomplete
                                  onPlaceChanged={onPlaceChanged}
                                  onLoad={onLoadPlace}
                                >
                                  <input
                                    type="text"
                                    className={`p-3 rounded-md border-2 ${
                                      width > 900 ? "w-[400px]" : " w-full"
                                    }  outline-none`}
                                    ref={direccion}
                                  />
                                </Autocomplete>
                                <input
                                  type="text"
                                  name="direccion"
                                  id="direccion"
                                  className={`p-3 rounded-md border-2 ${
                                    datosPrincipales.direccion === null
                                      ? "bg-inherit"
                                      : "bg-white"
                                  }  outline-none w-full`}
                                  placeholder="Dirección"
                                  value={datosPrincipales.direccion}
                                  disabled
                                  onChange={(e) => {
                                    setDatosPrincipales({
                                      ...datosPrincipales,
                                      direccion: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="text"
                                  name="lat"
                                  id="lat"
                                  className={`p-3 rounded-md border-2 ${
                                    latitud === null ? "bg-inherit" : "bg-white"
                                  }  outline-none hidden`}
                                  placeholder="Latitud"
                                  value={latitud}
                                  disabled
                                  onChange={(e) => {
                                    setDatosPrincipales({
                                      ...datosPrincipales,
                                      lat: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="text"
                                  name="lng"
                                  id="lng"
                                  className={`p-3 rounded-md border-2 ${
                                    longitud === null
                                      ? "bg-inherit"
                                      : "bg-white"
                                  }  outline-none hidden`}
                                  placeholder="Longitud"
                                  value={longitud}
                                  disabled
                                  onChange={(e) => {
                                    setDatosPrincipales({
                                      ...datosPrincipales,
                                      lng: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                              >
                                {center.lat !== 0 && center.lng !== 0 && (
                                  <MarkerF position={center}></MarkerF>
                                )}

                                <></>
                              </GoogleMap>{" "}
                            </>
                          )}
                        </div>
                      </div>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          type="submit"
                          onClick={handleCompleteDatosPrincipales}
                          sx={{ mr: 1 }}
                          disabled={datosPrincipalesCompleted()}
                        >
                          Next
                        </Button>
                        {/* {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))} */}
                      </Box>
                    </form>
                  )}
                  {activeStep === 1 && (
                    <div className="flex flex-col gap-5">
                      <h1 className="text-2xl">
                        Almenos una casilla debe ser seleccionada
                      </h1>
                      <small>Puede marcar mas de una opción</small>
                      <div className="flex flex-col lg:flex-row gap-5">
                        <div className="grid lg:grid-cols-5 grid-cols-2">
                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Administrativo
                            </label>

                            {infraState
                              .filter((inf) => inf.InfraestructuraTipoId === 1)
                              .map((infra) => (
                                <>
                                  <div className="flex flex-col">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={datosPrincipales.infraestructura.some(
                                            (inf) => inf.id === infra.id
                                          )}
                                          onChange={(event, target) => {
                                            if (target) {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura: [
                                                  ...datosPrincipales.infraestructura,
                                                  infra,
                                                ],
                                              });
                                            } else {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura:
                                                  datosPrincipales.infraestructura.filter(
                                                    (inf) => inf.id !== infra.id
                                                  ),
                                              });
                                            }
                                          }}
                                        />
                                      }
                                      label={infra.nombre_infraestructura}
                                    />
                                  </div>
                                </>
                              ))}
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Artistica
                            </label>

                            {infraState
                              .filter((inf) => inf.InfraestructuraTipoId === 2)
                              .map((infra) => (
                                <>
                                  <div className="flex flex-col">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={datosPrincipales.infraestructura.some(
                                            (inf) => inf.id === infra.id
                                          )}
                                          onChange={(event, target) => {
                                            if (target) {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura: [
                                                  ...datosPrincipales.infraestructura,
                                                  infra,
                                                ],
                                              });
                                            } else {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura:
                                                  datosPrincipales.infraestructura.filter(
                                                    (inf) => inf.id !== infra.id
                                                  ),
                                              });
                                            }
                                          }}
                                        />
                                      }
                                      label={infra.nombre_infraestructura}
                                    />
                                  </div>
                                </>
                              ))}
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Deportiva
                            </label>

                            {infraState
                              .filter((inf) => inf.InfraestructuraTipoId === 3)
                              .map((infra) => (
                                <>
                                  <div className="flex flex-col">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={datosPrincipales.infraestructura.some(
                                            (inf) => inf.id === infra.id
                                          )}
                                          onChange={(event, target) => {
                                            if (target) {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura: [
                                                  ...datosPrincipales.infraestructura,
                                                  infra,
                                                ],
                                              });
                                            } else {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura:
                                                  datosPrincipales.infraestructura.filter(
                                                    (inf) => inf.id !== infra.id
                                                  ),
                                              });
                                            }
                                          }}
                                        />
                                      }
                                      label={infra.nombre_infraestructura}
                                    />
                                  </div>
                                </>
                              ))}
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Enseñanza
                            </label>

                            {infraState
                              .filter((inf) => inf.InfraestructuraTipoId === 4)
                              .map((infra) => (
                                <>
                                  <div className="flex flex-col">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={datosPrincipales.infraestructura.some(
                                            (inf) => inf.id === infra.id
                                          )}
                                          onChange={(event, target) => {
                                            if (target) {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura: [
                                                  ...datosPrincipales.infraestructura,
                                                  infra,
                                                ],
                                              });
                                            } else {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura:
                                                  datosPrincipales.infraestructura.filter(
                                                    (inf) => inf.id !== infra.id
                                                  ),
                                              });
                                            }
                                          }}
                                        />
                                      }
                                      label={infra.nombre_infraestructura}
                                    />
                                  </div>
                                </>
                              ))}
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Laboratorio
                            </label>

                            {infraState
                              .filter((inf) => inf.InfraestructuraTipoId === 5)
                              .map((infra) => (
                                <>
                                  <div className="flex flex-col">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={datosPrincipales.infraestructura.some(
                                            (inf) => inf.id === infra.id
                                          )}
                                          onChange={(event, target) => {
                                            if (target) {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura: [
                                                  ...datosPrincipales.infraestructura,
                                                  infra,
                                                ],
                                              });
                                            } else {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                infraestructura:
                                                  datosPrincipales.infraestructura.filter(
                                                    (inf) => inf.id !== infra.id
                                                  ),
                                              });
                                            }
                                          }}
                                        />
                                      }
                                      label={infra.nombre_infraestructura}
                                    />
                                  </div>
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          onClick={handleCompleteInfraestructura}
                          sx={{ mr: 1 }}
                          disabled={infraestructuraCompleted()}
                        >
                          Next
                        </Button>
                        {/* {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))} */}
                      </Box>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="flex flex-col gap-5">
                      <h1 className="text-2xl">
                        Almenos una casilla debe ser seleccionada
                      </h1>
                      <small>Puede marcar mas de una opción</small>
                      <div className="flex flex-col lg:flex-row gap-5">
                        <div className="grid lg:grid-cols-4 grid-cols-2">
                          <div className="flex flex-col gap-3">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Afiliaciones
                            </label>

                            {afiliaciones
                              .filter((inf) => inf.Afiliacion_tipo_Id === 1)
                              .map((infra) => (
                                <>
                                  <div className="flex flex-col">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={datosPrincipales.afiliaciones.some(
                                            (inf) => inf.id === infra.id
                                          )}
                                          onChange={(event, target) => {
                                            if (target) {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                afiliaciones: [
                                                  ...datosPrincipales.afiliaciones,
                                                  infra,
                                                ],
                                              });
                                            } else {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                afiliaciones:
                                                  datosPrincipales.afiliaciones.filter(
                                                    (inf) => inf.id !== infra.id
                                                  ),
                                              });
                                            }
                                          }}
                                        />
                                      }
                                      label={infra.nombre_afiliacion}
                                    />
                                  </div>
                                </>
                              ))}
                          </div>

                          <div className="flex flex-col gap-3">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Alianzas
                            </label>

                            {afiliaciones
                              .filter((inf) => inf.Afiliacion_tipo_Id === 2)
                              .map((infra) => (
                                <>
                                  <div className="flex flex-col">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={datosPrincipales.afiliaciones.some(
                                            (inf) => inf.id === infra.id
                                          )}
                                          onChange={(event, target) => {
                                            if (target) {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                afiliaciones: [
                                                  ...datosPrincipales.afiliaciones,
                                                  infra,
                                                ],
                                              });
                                            } else {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                afiliaciones:
                                                  datosPrincipales.afiliaciones.filter(
                                                    (inf) => inf.id !== infra.id
                                                  ),
                                              });
                                            }
                                          }}
                                        />
                                      }
                                      label={infra.nombre_afiliacion}
                                    />
                                  </div>
                                </>
                              ))}
                          </div>

                          <div className="flex flex-col gap-3">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Certificaciones
                            </label>

                            {afiliaciones
                              .filter((inf) => inf.Afiliacion_tipo_Id === 3)
                              .map((infra) => (
                                <>
                                  <div className="flex flex-col">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={datosPrincipales.afiliaciones.some(
                                            (inf) => inf.id === infra.id
                                          )}
                                          onChange={(event, target) => {
                                            if (target) {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                afiliaciones: [
                                                  ...datosPrincipales.afiliaciones,
                                                  infra,
                                                ],
                                              });
                                            } else {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                afiliaciones:
                                                  datosPrincipales.afiliaciones.filter(
                                                    (inf) => inf.id !== infra.id
                                                  ),
                                              });
                                            }
                                          }}
                                        />
                                      }
                                      label={infra.nombre_afiliacion}
                                    />
                                  </div>
                                </>
                              ))}
                          </div>

                          <div className="flex flex-col gap-3">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Asociaciones
                            </label>

                            {afiliaciones
                              .filter((inf) => inf.Afiliacion_tipo_Id === 4)
                              .map((infra) => (
                                <>
                                  <div className="flex flex-col">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={datosPrincipales.afiliaciones.some(
                                            (inf) => inf.id === infra.id
                                          )}
                                          onChange={(event, target) => {
                                            if (target) {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                afiliaciones: [
                                                  ...datosPrincipales.afiliaciones,
                                                  infra,
                                                ],
                                              });
                                            } else {
                                              setDatosPrincipales({
                                                ...datosPrincipales,
                                                afiliaciones:
                                                  datosPrincipales.afiliaciones.filter(
                                                    (inf) => inf.id !== infra.id
                                                  ),
                                              });
                                            }
                                          }}
                                        />
                                      }
                                      label={infra.nombre_afiliacion}
                                    />
                                  </div>
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          onClick={handleCompleteAcreditaciones}
                          sx={{ mr: 1 }}
                          disabled={acreditacionesCompleted()}
                        >
                          Next
                        </Button>
                        {/* {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))} */}
                      </Box>
                    </div>
                  )}
                  {activeStep === 3 && (
                      <div className="flex gap-2 min-h-screen flex-col w-full lg:w-[900px] overflow-hidden">
                        <h1 className="text-2xl">Vacantes disponibles</h1>
                        <small>Debera enviar el formulario de al menos 1 de los 3 años antes de continuar</small>
                        <button
                          className="flex font-semibold justify-between items-center bg-white p-2 rounded-md shadow-md"
                          onClick={() =>
                            vacantes === 0 ? setVacantes(null) : setVacantes(0)
                          }
                        >
                          {" "}
                          <span>2023</span>{" "}
                          <FontAwesomeIcon
                            size="lg"
                            icon={vacantes === 0 ? faArrowUp : faArrowDown}
                          />{" "}
                        </button>
                        {vacantes === 0 && <GridVacantes setVacantesOff={setVacantesOffOne} año={yearNow}/>}
                        <button
                          className="flex font-semibold justify-between items-center bg-white p-2 rounded-md shadow-md"
                          onClick={() =>
                            vacantes === 1 ? setVacantes(null) : setVacantes(1)
                          }
                        >
                          {" "}
                          <span>2024</span>{" "}
                          <FontAwesomeIcon
                            size="lg"
                            icon={vacantes === 1 ? faArrowUp : faArrowDown}
                          />{" "}
                        </button>
                        {vacantes === 1 && <GridVacantes setVacantesOff={setVacantesOffTwo} año={yearNow+1} />}
                        <button
                          className="flex font-semibold justify-between items-center bg-white p-2 rounded-md shadow-md"
                          onClick={() =>
                            vacantes === 2 ? setVacantes(null) : setVacantes(2)
                          }
                        >
                          {" "}
                          <span>2025</span>{" "}
                          <FontAwesomeIcon
                            size="lg"
                            icon={vacantes === 2 ? faArrowUp : faArrowDown}
                          />{" "}
                        </button>
                        {vacantes === 2 && <GridVacantes setVacantesOff={setVacantesOffThree} año={yearNow+2}  />}
                        <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button disabled={vacantesOffOne && vacantesOffTwo && vacantesOffThree} onClick={handleCompleteVacantes} sx={{ mr: 1 }}>
                          Next
                        </Button>
                        {/* {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))} */}
                      </Box>
                      </div>

                  )}
                  {activeStep === 4 && (
                    <div className="flex flex-col gap-5">
                      <h1 className="text-2xl">Agregar imagenes</h1>
                      <small>
                        Deberas subir las imagenes con el boton{" "}
                        <span className="font-bold">Upload</span> antes de
                        proseguir
                      </small>
                      <div className="flex flex-col lg:flex-row gap-5">
                        <form
                          onSubmit={handleFilesSubmitOne}
                          className="flex flex-col"
                        >
                          <div className="file-select flex w-full lg:min-w-[200px] ">
                            <label
                              htmlFor="image"
                              className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
                            >
                              <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
                              <span className="text-sm mx-auto text-center text-[#0061dd]">
                                Imagen principal
                              </span>{" "}
                            </label>
                            <input
                              type="file"
                              id="image"
                              name="image"
                              accept="image/png,image/jpeg"
                              onChange={(e) => {
                                setSpanOne(true);
                                setFile(e.target.files[0]);
                              }}
                              className="hidden"
                            />
                          </div>
                          {activeUpOne && (
                            <button
                              type="submit"
                              disabled={
                                file !== null && previewOne !== null
                                  ? false
                                  : true
                              }
                              className="p-2 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white rounded-b-md"
                            >
                              Upload
                            </button>
                          )}

                          {spanOne && (
                            <span className="relative text-center animate-bounce text-3xl">
                              👆
                            </span>
                          )}
                        </form>
                        {previewOne !== "" && (
                          <>
                            <div className="border-2 rounded-md overflow-hidden p-2 bg-white">
                              <StandardImageList
                                eliminarImagenDePreview={
                                  eliminarImagenDePreviewOne
                                }
                                one={true}
                                setImage={setImage}
                                list={previewOne}
                              />
                            </div>
                            <div
                              className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${
                                image ? "block" : "hidden"
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
                                className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover "
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col lg:flex-row gap-5">
                        <form
                          onSubmit={handleFilesSubmit}
                          className="flex flex-col"
                        >
                          <div className="file-select flex w-full lg:min-w-[200px] ">
                            <label
                              htmlFor="images"
                              className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
                            >
                              <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
                              <span className="text-sm mx-auto text-center text-[#0061dd]">
                                Galeria de imagenes
                              </span>{" "}
                            </label>
                            <input
                              type="file"
                              id="images"
                              name="images"
                              accept="image/png,image/jpeg"
                              onChange={(e) => {
                                setSpanTwo(true);
                                setFiles(e.target.files);
                              }}
                              multiple
                              className="hidden"
                            />
                          </div>
                          {activeUpTwo && (
                            <button
                              type="submit"
                              disabled={
                                files !== null && preview.length !== 0
                                  ? false
                                  : true
                              }
                              className="p-2 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white rounded-b-md"
                            >
                              Upload
                            </button>
                          )}

                          {spanTwo && (
                            <span className="relative text-center animate-bounce text-3xl">
                              👆
                            </span>
                          )}
                        </form>
                        {preview.length !== 0 && (
                          <>
                            <div className="border-2 rounded-md overflow-hidden p-2 bg-white">
                              <StandardImageList
                                eliminarImagenDePreview={
                                  eliminarImagenDePreview
                                }
                                one={false}
                                setImage={setImage}
                                list={preview}
                              />
                            </div>
                            <div
                              className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${
                                image ? "block" : "hidden"
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
                                className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover "
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="nombreColegio"
                          className="text-lg font-medium"
                        >
                          Video Url
                        </label>
                        <input
                          type="url"
                          pattern="^((https?|ftp):\/\/)?([a-z0-9]+(\.[a-z0-9]+)+([\/?#][^#\s]*)?)$
                          "
                          name="video"
                          id="video"
                          className="p-3 rounded-md border-2  outline-none"
                          value={multimedia.video_url}
                          onChange={(e) =>
                            setMultimedia({
                              ...multimedia,
                              video_url: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          onClick={handleCompleteMultimedia}
                          sx={{ mr: 1 }}
                          disabled={multimediaCompleted()}
                        >
                          Next
                        </Button>
                        {/* {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                          <Typography
                                            variant="caption"
                                            sx={{ display: "inline-block" }}
                                          >
                                            Step {activeStep + 1} already completed
                                          </Typography>
                                        ) : (
                                          <Button onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1
                                              ? "Finish"
                                              : "Complete Step"}
                                          </Button>
                                        ))} */}
                      </Box>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </Box>
        ) : page === 1 ? (
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="grid lg:grid-cols-3 w-full grid-cols-2">
                {daysWithTime.map((day, index) => (
                  <div className="my-3">
                    <FormControlLabel
                      label={Object.keys(day)}
                      control={
                        <Checkbox
                          checked={day[Object.keys(day)][2]}
                          onChange={(event, target) => {
                            if (target) {
                              setDaysWithTime([
                                ...daysWithTime.slice(0, index),
                                {
                                  [Object.keys(day)]: [
                                    day[Object.keys(day)][0],
                                    day[Object.keys(day)][1],
                                    true,
                                  ],
                                },
                                ...daysWithTime.slice(index + 1),
                              ]);
                            } else {
                              setDaysWithTime([
                                ...daysWithTime.slice(0, index),
                                {
                                  [Object.keys(day)]: [
                                    day[Object.keys(day)][0],
                                    day[Object.keys(day)][1],
                                    false,
                                  ],
                                },
                                ...daysWithTime.slice(index + 1),
                              ]);
                            }
                          }}
                        />
                      }
                    />
                    <div className="flex flex-col gap-3">
                      <small className="font-semibold">
                        {[
                          stringyDate(
                            day[Object.keys(day)][0]["$H"]
                          ).toString(),
                          stringyDate(
                            day[Object.keys(day)][0]["$m"]
                          ).toString(),
                        ].join(":")}{" "}
                        -{" "}
                        {[
                          stringyDate(
                            day[Object.keys(day)][1]["$H"]
                          ).toString(),
                          stringyDate(
                            day[Object.keys(day)][1]["$m"]
                          ).toString(),
                        ].join(":")}{" "}
                      </small>
                      <div className="flex gap-2">
                        <MobileTimePicker
                          label="Desde"
                          disabled={!day[Object.keys(day)][2]}
                          className="w-[70px]"
                          value={day[Object.keys(day)][0]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          onChange={(newValue) => {
                            setDaysWithTime([
                              ...daysWithTime.slice(0, index),
                              {
                                [Object.keys(day)]: [
                                  newValue,
                                  day[Object.keys(day)][1],
                                  true,
                                ],
                              },
                              ...daysWithTime.slice(index + 1),
                            ]);
                          }}
                          minutesStep={60}
                          minTime={dayjs("2014-08-18T08:00:00")}
                          maxTime={day[Object.keys(day)][1]}
                        />
                        <MobileTimePicker
                          label="Hasta"
                          disabled={!day[Object.keys(day)][2]}
                          className="w-[70px] "
                          onChange={(newValue) => {
                            setDaysWithTime([
                              ...daysWithTime.slice(0, index),
                              {
                                [Object.keys(day)]: [
                                  day[Object.keys(day)][0],
                                  newValue,
                                  true,
                                ],
                              },
                              ...daysWithTime.slice(index + 1),
                            ]);
                          }}
                          value={day[Object.keys(day)][1]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          minutesStep={60}
                          minTime={day[Object.keys(day)][0]}
                          maxTime={dayjs("2014-08-18T17:00:00")}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </LocalizationProvider>
            <button
              onClick={handleSubmitCitas}
              className="flex mx-auto my-5 bg-[#0061dd] text-white p-2 rounded-md shadow-md"
            >
              Guardar Cambios
            </button>
            <DragAndDrop />
          </div>
        ) : page === 2 ? (
          <div className="min-h-screen">Plan</div>
        ) : page === 3 ? (
          <div className="flex flex-col gap-5 min-h-screen px-24">
            <h1 className="text-xl font-semibold">Datos Personales</h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(OnSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-base font-medium">
                  Email Actual
                </label>
                <input
                  {...register("email", {
                    required: true,
                  })}
                  disabled
                  type="email"
                  name="email"
                  id="email"
                  className="p-3 rounded-md border-2 w-full lg:w-1/2 outline-none"
                  placeholder="Ingresa el email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="newEmail" className="text-base font-medium">
                  Nuevo Email
                </label>
                <input
                  {...register("newEmail")}
                  type="email"
                  name="newEmail"
                  id="newEmail"
                  className="p-3 rounded-md border-2 w-full lg:w-1/2 outline-none"
                  placeholder="Ingresa el nuevo email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="telefono" className="text-base font-medium">
                  Telefono
                </label>
                <input
                  {...register("telefono", {
                    required: true,
                  })}
                  type="number"
                  name="telefono"
                  id="telefono"
                  className="p-3 rounded-md border-2 w-full lg:w-1/2 outline-none"
                  placeholder="Ingresa el telefono"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-base font-medium">
                  Contraseña actual
                </label>
                <div className="relative w-full lg:w-1/2">
                  <input
                    {...register("password")}
                    type={seePassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="p-3 rounded-md border-2 w-full outline-none"
                    placeholder="Ingresa la contraseña"
                  />
                  {seePassword ? (
                    <BsEye
                      onClick={() => setSeePassword(!seePassword)}
                      className="absolute cursor-pointer top-[35%] lg:top-[40%] right-5"
                    />
                  ) : (
                    <BsEyeSlash
                      onClick={() => setSeePassword(!seePassword)}
                      className="absolute top-[35%] lg:top-[40%] cursor-pointer right-5"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="newPassword" className="text-base font-medium">
                  Contraseña nueva
                </label>
                <div className="relative w-full lg:w-1/2">
                  <input
                    {...register("newPassword")}
                    type={seeNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    className="p-3 rounded-md border-2 w-full outline-none"
                    placeholder="Ingresa la nueva contraseña"
                  />
                  {seeNewPassword ? (
                    <BsEye
                      onClick={() => setSeeNewPassword(!seeNewPassword)}
                      className="absolute cursor-pointer top-[35%] lg:top-[40%] right-5"
                    />
                  ) : (
                    <BsEyeSlash
                      onClick={() => setSeeNewPassword(!seeNewPassword)}
                      className="absolute top-[35%] lg:top-[40%] cursor-pointer right-5"
                    />
                  )}
                </div>
                <div className="relative w-full lg:w-1/2">
                  <input
                    {...register("repitPassword")}
                    type={seeNewPassword ? "text" : "password"}
                    name="repitPassword"
                    id="repitPassword"
                    className="p-3 rounded-md border-2 w-full outline-none"
                    placeholder="Repeti la nueva contraseña"
                  />
                  {seeNewPassword ? (
                    <BsEye
                      onClick={() => setSeeNewPassword(!seeNewPassword)}
                      className="absolute cursor-pointer top-[35%] lg:top-[40%] right-5"
                    />
                  ) : (
                    <BsEyeSlash
                      onClick={() => setSeeNewPassword(!seeNewPassword)}
                      className="absolute top-[35%] lg:top-[40%] cursor-pointer right-5"
                    />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#0061dd] text-white w-full lg:w-1/2 outline-none p-2 rounded-md"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        ) : page === 4 ? (
          <div className="min-h-screen">
            <div style={{display:'flex',gap:'10px'}}>
              <Cards icon="solicitud" text="Solicitudes de Citas" nro={2} />
              <Cards icon="visualizacion" text="Visualizaciones" nro={2} />
              <Cards icon="mensaje" text="Mensajes" nro={2} />
              <Cards icon="comentario" text="Comentarios" nro={2} />
            </div>

            <DragAndDrop />
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default DashboardSchool;
