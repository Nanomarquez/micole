import React, { useEffect, useState } from "react";
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
import generarCalendario from "./GenCalendario"
import { useSelector } from "react-redux";
//-----NO FORMATEAR EL CODIGO , SE MODIFICAN LOS ARRAYS
// ---( SE PASAN DE STRING A PROPIEDADES )
// --- EL FORMATO ADECUADO ES    'Jan': 'Ene'

function abreviarDias(data) {
  const diasAbreviados = {
    Domingo: "Dom",
    Lunes: "Lun",
    Martes: "Mar",
    Miercoles: "Mié",
    Jueves: "Jue",
 
Viernes:'Vie'
  };

  return data?.map((item) => ({
    ...item,
    dia: diasAbreviados[item.dia],
  }));
}

export default function SecCitas({ data, setStateBtn, stateBtn }) {
  //data es un obj que contiene las prefencias del colegio (las que configura en su dashboard)
  console.log(data);
  const { oneSchool, grados, horariosColegio } = useSelector(
    (state) => state.schools
  );

const  [diasDisponibles , setDiasDisponibles]=useState({
  dia:''
})

  //  devuelve array ordenado con los dias y numeros de la semana


  //  ejecuta calDiasSemana y se guarda el array ordenado
  const arrCarruselOrdenado = generarCalendario();

 




  const CardsDia = ({ diasSemana, fechadelDia, mesdelDia }) => {
    console.log(diasSemana, fechadelDia, mesdelDia)
    const [cardSelected, setCardSelected] = useState(false);
    console.log(horariosColegio)
    const dataAbreviada = abreviarDias(horariosColegio)
    console.log(dataAbreviada)
    const handlerSelected = () => {
      console.log(diasSemana, fechadelDia, mesdelDia)
      setCardSelected(!cardSelected)

    }



    const diaDisponible = dataAbreviada?.find((disponibilidadDia) =>disponibilidadDia.dia ===diasSemana );
   console.log(diaDisponible)
    return (
      <>

        <div className={cardSelected && diaDisponible && style.divBorderSelected}
          onClick={diaDisponible ? handlerSelected : null}
        >
          <p
            className={cardSelected && diaDisponible ? style.p_Selected : diaDisponible ? style.p : style.p_desactiv}
          >
            {diasSemana}
          </p>
          <p
            className={cardSelected && diaDisponible ? style.p_SelectedNumber : diaDisponible ? style.pNumber : style.p_desactiv}
          >
            {fechadelDia}
          </p>
          <p
            className={cardSelected && diaDisponible ? style.p_Selected : diaDisponible ? style.p : style.p_desactiv}
          >
            {mesdelDia}
          </p>
        </div>

      </>
    );
  };

  const arrLimpio = arrCarruselOrdenado.filter((ele) => ele.dia != "")
  return (
    <div className={style.slider_container}>



      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={5}

        grabCursor={true}
        rewind={true}

        pagination={{ clickable: true }}


        className={style.swiper}
      >

        {arrLimpio?.map((d) => {
          console.log(d)
          return (
            <>
              <SwiperSlide className={style.swiper_slide}>

                {d.dia != "" &&
                  <div className={style.cardDia}>
                    {d.diaSemana === "Sáb" && (
                      <>
                        <p
                          style={{
                            fontSize: "1.9vh",
                            fontWeight: "400",
                            color: "#9E9999",
                            padding: '2px'
                          }}
                        >
                          {d.diaSemana}
                        </p>
                        <p
                          style={{
                            fontSize: "1.9vh",
                            fontWeight: "400",
                            color: "#9E9999",
                            padding: '2px'
                          }}
                        >
                          {d.dia}
                        </p>
                        <p
                          style={{
                            fontSize: "1.9vh",
                            fontWeight: "400",
                            color: "#9E9999",
                            padding: '2px'
                          }}
                        >
                          {d.mes}
                        </p>
                      </>
                    )}
                    {d.diaSemana === "Dom" && (
                      <>
                        <p
                          style={{
                            fontSize: "1.9vh",
                            fontWeight: "400",
                            color: "#9E9999",
                            padding: '2px'
                          }}
                        >
                          {d.diaSemana}
                        </p>
                        <p
                          style={{
                            fontSize: "1.9vh",
                            fontWeight: "400",
                            color: "#9E9999",
                            padding: '2px'
                          }}
                        >
                          {d.dia}
                        </p>
                        <p
                          style={{
                            fontSize: "1.9vh",
                            fontWeight: "400",
                            color: "#9E9999",
                            padding: '2px'
                          }}
                        >
                          {d.mes}
                        </p>
                      </>
                    )}

                    {d.diaSemana != "Sáb" && d.diaSemana != "Dom" && (
                      <>
                        <CardsDia diasSemana={d.diaSemana} fechadelDia={d.dia} mesdelDia={d.mes} />
                      </>

                    )}

                  </div>
                }

              </SwiperSlide>
            </>
          );
        })
        }
      </Swiper>

      <div className={style.games_slider_buttons_container}>

        {/* <button
       onClick={nextButton}
      // className={
      //  toggleButton
      // ? `${style.next_indi_colored}`
      // : `${style.next_indi}`
      // }
     >
      right
     </button> */}
      </div>

    </div>
  );
}
