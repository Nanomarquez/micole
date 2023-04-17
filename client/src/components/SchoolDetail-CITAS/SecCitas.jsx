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
import ListSubheader from '@mui/material/ListSubheader';
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
    Viernes: 'Vie',
    Miércoles: "Mié"
  };

  return data?.map((item) => ({
    ...item,
    dia: diasAbreviados[item.dia],
  }));
}
function abreviarDiasAlRevez(data) {
  const diasAbreviados = {
    Dom: 'Domingo',
    Lun: 'Lunes',
    Mar: 'Martes',
    Mié: 'Miercoles',
    Jue: 'Jueves',
    Vie: 'Viernes',
    Mié: "Miércoles"
  };

  return data?.map((item) => ({
    ...item,
    dia: diasAbreviados[item.dia],
  }));
}
// CARDS DEL CALENDARIO
const CardsDia = ({ diasSemana, fechadelDia, mesdelDia,  onCardSelect }) => {
  const { oneSchool, grados, horariosColegio } = useSelector(
    (state) => state.schools
  );
  console.log(diasSemana, fechadelDia, mesdelDia)
  const [cardSelected, setCardSelected] = useState(false);
  const [selectedCardHorario, setSelectedCardHorario] = useState([]);

  const dataAbreviada = abreviarDias(horariosColegio)
  console.log(dataAbreviada)



  const diaDisponible = dataAbreviada?.find((disponibilidadDia) => disponibilidadDia.dia === diasSemana);
  console.log(diaDisponible)

  const handlerSelected = (e,horarios) => {
    console.log(diasSemana, fechadelDia, mesdelDia,horarios)
  
    setCardSelected(!cardSelected)
    console.log(horarios)
    onCardSelect(horarios)
    console.log(horarios)
 

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
export default function SecCitas() {



  const [orderSelected, setOrderSelected] = useState("");



  //  ejecuta calDiasSemana y se guarda el array ordenado
  const arrCarruselOrdenado = generarCalendario();


  const handleChangeState = (event) => {
    let state = event.target.value;
    console.log(state)
    console.log(event.target.value)
    setOrderSelected(state);

  }
  //este componente devuelve el drop de horarios segun la card seleccionada
  const HorariosColegio = ({diaSelecionado}) => {
    const [horarioColegio, setHorarioColegio] = useState('')
    const handleChangeHora=(e)=>{
      setHorarioColegio(e.target.value)
      // aca mandar la info del dia y hora hacia school detail
    }
    console.log(diaSelecionado)
    const diasAbreviados = {
      Dom: 'Domingo',
      Lun: 'Lunes',
      Mar: 'Martes',
      Mié: 'Miercoles',
      Jue: 'Jueves',
      Vie: 'Viernes',
      Mié: "Miércoles"
    };

    const arrDias = diaSelecionado && diaSelecionado?.map((item) => ({
      ...item,
      dia: diasAbreviados[item.dia],
    }));
    console.log(arrDias)
    return (
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
          {arrDias?.map((ele) => {
            return (
           
       

                <MenuItem key={ele.id} value={ele.horarios.hasta}>
                  {ele.horarios.desde}/{ele.horarios.hasta}

                </MenuItem>

           


            )
          })}

        </Select>
      </FormControl>
    )

  }



  // Se filtran los cbjetos con strings vacios, ya que los dias pasados a la semana pasada se guardan de esa manera 
  const arrLimpio = arrCarruselOrdenado.filter((ele) => ele.dia != "")


  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (card) => {
    console.log(card)
    setSelectedCard([card]);
    console.log(selectedCard)
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

            // console.log(d)
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
                          <CardsDia    onCardSelect={handleCardSelect} diasSemana={d.diaSemana} fechadelDia={d.dia} mesdelDia={d.mes} />
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

        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "1vh" }}>
            {/* <p className={style.pSig}>Horarios </p> */}
           <HorariosColegio diaSelecionado={selectedCard} />
          </div>
        </div>

      </div>




    </>

  );
}
