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
import generarCalendario from "./GenCalendario"
//-----NO FORMATEAR EL CODIGO , SE MODIFICAN LOS ARRAYS
// ---( SE PASAN DE STRING A PROPIEDADES )
// --- EL FORMATO ADECUADO ES    'Jan': 'Ene'

export default function SecCitas({ data, setStateBtn, stateBtn }) {
  //data es un obj que contiene las prefencias del colegio (las que configura en su dashboard)
  console.log(data);


  //  devuelve array ordenado con los dias y numeros de la semana


  //  ejecuta calDiasSemana y se guarda el array ordenado
  const arrCarruselOrdenado = generarCalendario();



  const CardsDia = ({ diasSemana, fechadelDia, mesdelDia }) => {
    console.log(diasSemana, fechadelDia, mesdelDia)
    const [cardSelected, setCardSelected] = useState(false);


    const handlerSelected = () => {
      setCardSelected(!cardSelected)
    }
    // aca se podria hacer de data 
    return (
      <>
        {/* {
        mockData.map((d)=>{

        })
      } */}
        <div className={cardSelected && style.divBorderSelected}
          onClick={handlerSelected}
        >
          <p
            className={cardSelected ? style.p_Selected : style.p}
          >
            {diasSemana}
          </p>
          <p
            className={cardSelected ? style.p_SelectedNumber : style.pNumber}
          >
            {fechadelDia}
          </p>
          <p
            className={cardSelected ? style.p_Selected : style.p}
          >
            {mesdelDia}
          </p>
        </div>

      </>
    );
  };
  const CardsDiaDesactivados = ({ diasSemana, fechadelDia, mesdelDia }) => {
    console.log(diasSemana, fechadelDia, mesdelDia)
    const [cardSelected, setCardSelected] = useState(false);


    const handlerSelected = () => {
      setCardSelected(!cardSelected)
    }

    return (
      <>

        <div
          className={cardSelected && style.divBorderSelected}
          onClick={handlerSelected}
        >
          <p
            className={style.p_desactiv}
          >
            {diasSemana}
          </p>
          <p
            className={style.p_desactiv}
          >
            {fechadelDia}
          </p>
          <p
            className={style.p_desactiv}
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
                            fontSize: "2.5vh",
                            fontWeight: "500",
                            color: "#9E9999",
                          }}
                        >
                          {d.dia}
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
                            fontSize: "2.5vh",
                            fontWeight: "500",
                            color: "#9E9999",
                          }}
                        >
                          {d.dia}
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
