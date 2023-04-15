import React from "react";
import style from "./swiperCitas.module.css";
import {
  Pagination,
  Autoplay,
  EffectFade,
  Navigation,
  Parallax,
  Scrollbar,
  A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function SecCitas({ data }) {
  //data es un obj que contiene las prefencias del colegio (las que configura en su dashboard)
  console.log(data);
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  const fecha = hoy.toDateString(); // "Sun Jun 14 2020"
  const formato = hoy.getDate();
  const slices = fecha.slice(",");

  //--------------------------

  let partes = fecha.split(" ");
  let diaSemana = partes[0];
  let mes = partes[1];
  let dia = partes[2];
  let anio = partes[3];
  const arrSeprarado = [diaSemana, mes, dia, anio];
  //---------------
  //   const nroDia =  fecha.getDay('Sun Jun 14 2020')
  console.log(formato);
  console.log(fecha);
  console.log(arrSeprarado);
  //   function separarFecha(fecha) {

  //     return [diaSemana, mes, dia, anio];
  //   }
  const formatoFinal = {
    dia: "Viernes",
    horarios: { desde: "16:20 ", hasta: "17:00 " },
  };
  const arrDiasEspañol = {
    Viernes: "Fri",
    Jueves: "Thurs",
    Miercoles: "Wed",
    Martes: "Tues",
    Lunes: "Mon",
  };
  const arrDiasEspañolal = {
    'Sun': "Dom",
    'Sat': "Sab",
    'Fri': "Vier",
    'Thurs': " Jue",
    'Wed': " Mier",
    'Tues': "Mar",
    'Mon': " Lun",
  };
  const monthsActual = {
    'Jan': "Ene",
    'Feb': "Feb",
    'Mar': "Mar",
    'Apr': "Abr",
    'May': "May",
    'Jun': "Jun",
    'Jul': "Jul",
    'Aug': "Ago",
    'Sep': "Sep",
    'Oct': "Oct",
    'Nov': "Nov",
    'Dec': "Dic",
  };
  const relacionNrosDias = {
    "Dom ": 14,
    "Sab ": 13,
    "Vier ": 12,
    "Jue ": 11,
    "Mier ": 10,
    "Mar ": 9,
    "Lun ": 8,
    'Dom': 7,
    'Sab': 6,
    'Vier': 5,
    'Jue': 4,
    'Mier': 3,
    'Mar': 2,
    'Lun': 1,
  };
  const NrosDias = {
    14: "Dom ",
    13: "Sab ",
    12: "Vier ",
    11: "Jue ",
    10: "Mier ",
    9: "Mar ",
    8: "Lun ",

    7: "Dom",
    6: "Sab",

    5: "Vier",
    4: "Jue",
    3: "Mier",
    2: "Mar",
    1: "Lun",
  };
  const diadelmes = arrSeprarado[2];
  const numDiames = parseInt(diadelmes);
  const DiaActia = arrSeprarado[0];
  console.log(arrSeprarado[0]);

  //   console.log(data.dia)
  const calDiasSemana = () => {
    console.log(DiaActia);
    const diaActualCarrusel = arrDiasEspañolal[DiaActia];
    const nombremes = arrSeprarado[1];
    console.log(diaActualCarrusel);
    const numerodeDiaOrden = relacionNrosDias[diaActualCarrusel];
    console.log(numerodeDiaOrden);

    const ele0 = {
      dia: numerodeDiaOrden,
      mes: monthsActual[arrSeprarado[1]],
      fecha: numDiames,
    };
    const ele1 = {
      dia: numerodeDiaOrden + 1,
      mes: monthsActual[nombremes],
      fecha: numDiames + 1,
    };
    const ele2 = {
      dia: numerodeDiaOrden + 2,
      mes: monthsActual[arrSeprarado[1]],
      fecha: numDiames + 2,
    };

    const ele3 = {
      dia: numerodeDiaOrden + 3,
      mes: monthsActual[arrSeprarado[1]],
      fecha: numDiames + 3,
    };
    const ele4 = {
      dia: numerodeDiaOrden + 4,
      mes: monthsActual[arrSeprarado[1]],
      fecha: numDiames + 4,
    };
    const ele5 = {
      dia: numerodeDiaOrden + 5,
      mes: monthsActual[arrSeprarado[1]],
      fecha: numDiames + 5,
    };
    const ele6 = {
      dia: numerodeDiaOrden + 6,
      mes: monthsActual[arrSeprarado[1]],
      fecha: numDiames + 6,
    };
    return [ele0, ele1, ele2, ele3, ele4, ele5, ele6];
  };
  const arrCarruselOrdenado = calDiasSemana();
  console.log(arrCarruselOrdenado);
  return (
    <div style={{ width: "65vh" }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={2}
        slidesPerView={4}
        navigation
        //  pagination={{ clickable: true }}
        //  scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className={style.swiper}
      >
        {arrCarruselOrdenado?.map((d) => {
          console.log(NrosDias[d.dia]);
          let diasSemana = NrosDias[d.dia];
      
            return (
              <>
                <SwiperSlide className={style.swiper_slide}>
                  <div
                    style={{
                      border: "1px solid #494646",
                      width: "10vh",
                      borderRadius: "2vh",
                      height: "20",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                 
                      <p
                        style={{
                          fontSize: "1.9vh",
                          fontWeight: "400",
                          color: "#000000",
                        }}
                      >
                        {diasSemana}
                      </p>
                 

                    <p
                      style={{
                        fontSize: "2.5vh",
                        fontWeight: "500",
                        color: "#000000",
                      }}
                    >
                      {d.fecha}
                    </p>
                    <p
                      style={{
                        fontSize: "1.9vh",
                        fontWeight: "400",
                        color: "#000000",
                      }}
                    >
                      {d.mes}
                    </p>
                  </div>
                </SwiperSlide>
              </>
            );
        })}
      </Swiper>
    </div>
  );
}
