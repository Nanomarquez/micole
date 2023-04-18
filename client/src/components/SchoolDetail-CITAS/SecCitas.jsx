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
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,

  Select,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import generarCalendario from "./GenCalendario"
import { useSelector } from "react-redux";
function mesNumero(mes) {
  const meses = {
    ene: '01',
    feb: '02',
    mar: '03',
    abr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    ago: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dic: '12'
  };
  return meses[mes.toLowerCase()];
}

function abreviarDias(data) {
  const diasAbreviados = {
    Domingo: "Dom",
    Lunes: "Lun",
    Martes: "Mar",
    Miercoles: "Mié",
    Jueves: "Jue",
    Viernes: 'Vie',
    Miércoles: "Mié"
  };

  return data?.map((item) => ({
    ...item,
    dia: diasAbreviados[item.dia],
  }));
}

// CARDS DEL CALENDARIO
const CardsDia = ({ diasSemana, fechadelDia, mesdelDia, onCardSelect }) => {
  const { oneSchool, grados, horariosColegio } = useSelector(
    (state) => state.schools
  );
  
  const [cardSelected, setCardSelected] = useState(false);



  const dataAbreviada = abreviarDias(horariosColegio)




  const diaDisponible = dataAbreviada?.find((disponibilidadDia) => disponibilidadDia.dia === diasSemana);
 

  // este handler envia lainformacion a schooldetail y HorariosColegios
  const handlerSelected = (e, horariosColegio) => {
    const fecha_actual = new Date();

    const year = fecha_actual.getFullYear();
    let numeroMeses = mesNumero(mesdelDia)

    const info = {
      date: fechadelDia + "/" + numeroMeses + '/' + year,
      time: horariosColegio.horarios,
      dia: horariosColegio.dia

    }


    setCardSelected(!cardSelected)

    onCardSelect(info)




  }

  return (
    <>

      <div className={cardSelected && diaDisponible && style.divBorderSelected}
        onClick={diaDisponible ? (e) => handlerSelected(e, diaDisponible) : null}
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

//este componente devuelve el drop de horarios segun la card seleccionada
const HorariosColegio = ({ diaSelecionado , sendDateHs}) => {
  const [horarioColegio, setHorarioColegio] = useState('')

  const handleChangeHora = (event) => {
    setHorarioColegio(event.target.value)
  }

  const handlerInfo = (e, date, time) => {

    // setHorarioColegio(e.target.value)

    let infoDiaHora = {
      time: time,
      date: date
    }
    sendDateHs(infoDiaHora)
  }
  return (
    <>
      <FormControl
        // variant="standard"
        sx={{ m: 1, minWidth: 100 }}
        size="small"
      >
        <InputLabel id="demo-select-small">Horarios</InputLabel>

        <Select
          sx={{ border: "none", outline: "none", fontSize: "2vh" }}
          labelId="demo-select-small"
          id="demo-select-small"
          value={horarioColegio}
          label={"Horarios"}
          onChange={handleChangeHora}
        >
          {diaSelecionado?.map((ele) => {

            return (
              <MenuItem key={ele.time.desde} onClick={(e) => handlerInfo(e, ele.date, ele.time.desde)} value={ele.time.desde}>
                {ele.time.desde}/{ele.time.hasta}
              </MenuItem>
            )
          })}

        </Select>
      </FormControl>


    </>
  )

}

export default function SecCitas({ sendDateHs }) {
 


  const [orderSelected, setOrderSelected] = useState("");



  //  ejecuta la funcion que genera el calendario y se guarda el arr de dias
  const arrCarruselOrdenado = generarCalendario();


  const handleChangeState = (event) => {
    let state = event.target.value;
  
    setOrderSelected(state);

  }




  // Se filtran los objetos con strings vacios, ya que los dias pasados se guardan de esa manera 
  const arrLimpio = arrCarruselOrdenado.filter((ele) => ele.dia != "")


  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (card) => {

    setSelectedCard([card]);
   
  };

  return (
    <>

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
                          <CardsDia onCardSelect={handleCardSelect} diasSemana={d.diaSemana} fechadelDia={d.dia} mesdelDia={d.mes} />
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

      
          <div className={style.divDropHorarios}>
            {/* <p className={style.pSig}>Horarios </p> */}
            <HorariosColegio diaSelecionado={selectedCard} sendDateHs={sendDateHs} />
       
        </div>

      </div>




    </>

  );
}
