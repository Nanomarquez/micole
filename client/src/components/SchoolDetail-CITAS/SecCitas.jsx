import React, { useState } from "react";
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

//-----NO FORMATEAR EL CODIGO , SE MODIFICAN LOS ARRAYS
// ---( SE PASAN DE STRING A PROPIEDADES )
// --- EL FORMATO ADECUADO ES    'Jan': 'Ene'

export default function SecCitas({ data }) {
  //data es un obj que contiene las prefencias del colegio (las que configura en su dashboard)
  console.log(data);

  //-----------TOMA EL DIA ACTUAL---------------
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  const fecha = hoy.toDateString(); // "Sun Jun 14 2020"
  const formato = hoy.getDate();

  //-----------Separa el formato fecha en un array ---------------
  let partes = fecha.split(" ");
  let diaSemana = partes[0];
  let mes = partes[1];
  let dia = partes[2];
  let anio = partes[3];
  const arrSeprarado = [diaSemana, mes, dia, anio];
  //---------------
  console.log(formato);
  console.log(fecha);
  console.log(arrSeprarado);

  // Relacion dias abreviados en ingles con dias abreviados en español
  const arrDiasEspañolal = {
    'Sun': "Dom",
    'Sat': "Sab",
    'Fri': "Vier",
    'Thurs': " Jue",
    'Wed': " Mier",
    'Tues': "Mar",
    'Mon': " Lun",
  };
  // Relacion meses abreviados en ingles con meses abreviados en español
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
  // esta relacion la uso para ir sumando a la fecha actual (el nro del dia del mes)
  // LOS ESPACIOS  deben estar de esa forma ya que no se puede tener un arr con el mismo valor de key
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
  // misma relacion pero al reves, se usa en el map para obtener el dia
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

  //  devuelve array ordenado con los dias y numeros de la semana
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

  //  ejecuta calDiasSemana y se guarda el array ordenado
  const arrCarruselOrdenado = calDiasSemana();
  console.log(arrCarruselOrdenado);

  // card del dia + seleccion
  const CardsDia = ({diasSemana,fechadelDia,mesdelDia}) => {
    console.log(diasSemana,fechadelDia,mesdelDia)
    const [cardSelected, setCardSelected] = useState(false);
    return (
      <>
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
          {fechadelDia}
        </p>
        <p
          style={{
            fontSize: "1.9vh",
            fontWeight: "400",
            color: "#000000",
          }}
        >
          {mesdelDia}
        </p>
      </>
    );
  };

  return (
    <div style={{ width: "65vh" }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={5}
        loop={true}
        navigation={true}
        loopFillGroupWithBlank={true}
        //  pagination={{ clickable: true }}
        //  scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}

        className={style.swiper}
      >
        {arrCarruselOrdenado?.map((d) => {
          console.log(NrosDias[d.dia]);
          let diasSemana = NrosDias[d.dia];

          return (
            <>
              <SwiperSlide className={style.swiper_slide}>
                <div className={style.cardDia}>
                  {diasSemana === "Sab" && (
                    <>
                      <p
                        style={{
                          fontSize: "1.9vh",
                          fontWeight: "400",
                          color: "#9E9999",
                        }}
                      >
                        {diasSemana}
                      </p>
                      <p
                        style={{
                          fontSize: "2.5vh",
                          fontWeight: "500",
                          color: "#9E9999",
                        }}
                      >
                        {d.fecha}
                      </p>
                      <p
                        style={{
                          fontSize: "1.9vh",
                          fontWeight: "400",
                          color: "#9E9999",
                        }}
                      >
                        {d.mes}
                      </p>
                    </>
                  )}
                  {diasSemana === "Dom" && (
                    <>
                      <p
                        style={{
                          fontSize: "1.9vh",
                          fontWeight: "400",
                          color: "#9E9999",
                        }}
                      >
                        {diasSemana}
                      </p>
                      <p
                        style={{
                          fontSize: "2.5vh",
                          fontWeight: "500",
                          color: "#9E9999",
                        }}
                      >
                        {d.fecha}
                      </p>
                      <p
                        style={{
                          fontSize: "1.9vh",
                          fontWeight: "400",
                          color: "#9E9999",
                        }}
                      >
                        {d.mes}
                      </p>
                    </>
                  )}

                  {diasSemana != "Sab" && diasSemana != "Dom" && (
                    // <>
                    //   <p
                    //     style={{
                    //       fontSize: "1.9vh",
                    //       fontWeight: "400",
                    //       color: "#000000",
                    //     }}
                    //   >
                    //     {diasSemana}
                    //   </p>
                    //   <p
                    //     style={{
                    //       fontSize: "2.5vh",
                    //       fontWeight: "500",
                    //       color: "#000000",
                    //     }}
                    //   >
                    //     {d.fecha}
                    //   </p>
                    //   <p
                    //     style={{
                    //       fontSize: "1.9vh",
                    //       fontWeight: "400",
                    //       color: "#000000",
                    //     }}
                    //   >
                    //     {d.mes}
                    //   </p>
                    // </>
                    <CardsDia diasSemana={diasSemana} fechadelDia={d.fecha} mesdelDia={d.mes} />
                  )}
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </div>
  );
}
