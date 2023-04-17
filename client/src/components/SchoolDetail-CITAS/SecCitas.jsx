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


function abreviarDias(data) {
  const diasAbreviados = {
    Domingo: "Dom",
    Lunes: "Lun",
    Martes: "Mar",
    Miercoles: "Mié",
    Jueves: "Jue",
    Viernes:'Vie',
    Miércoles:"Mié"
  };

  return data?.map((item) => ({
    ...item,
    dia: diasAbreviados[item.dia],
  }));
}

export default function SecCitas() {

  const { oneSchool, grados, horariosColegio } = useSelector(
    (state) => state.schools
  );





  //  ejecuta calDiasSemana y se guarda el array ordenado
  const arrCarruselOrdenado = generarCalendario();

 



// Se generan las cards y se ponen en color gris segun la disponibilidad del colegio
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
// Se filtran los cbjetos con strings vacios, ya que los dias pasados a la semana pasada se guardan de esa manera 
  const arrLimpio = arrCarruselOrdenado.filter((ele) => ele.dia != "")
   return (
    <>
    <div  >
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
    <div>Holi</div>

    </div>
   
    </>
   
  );
}
