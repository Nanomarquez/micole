import React, { useState } from "react";
import style from "./sw_comparador.module.css";

// import de la libreria swipper , el carrusel de las cards
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
import { useSelector } from "react-redux";

export default function SwComparador({ galeria, primeraFoto }) {
    console.log(galeria, primeraFoto)
  // galeria_fotos(pin):"[ "https://via.placeholder.com/400x300.png?text=Colegio+1",
  //  "https://via.placeholder.com/400x300.png?text=Colegio+2",
  //  "https://via.placeholder.com/400x300.png?text=Colegio+3"]

  const { oneSchool } = useSelector((state) => state.schools);
  const arrImg =
    galeria !== null && JSON.parse(galeria).length > 0 && JSON.parse(galeria);
  console.log(arrImg);
  arrImg.unshift(primeraFoto);
  return (
    <>
      {/* <div className={style.divResponsiveDesktop}> */}
      <div className={style.slider_container}>
        <Swiper
         style={{
            "--swiper-navigation-color": "#73A3E1",
            "--swiper-navigation-border": "#000",
            "--swiper-pagination-color": "#fff",
          }}
          modules={[
            EffectFade,
            Autoplay,
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
          ]}
          spaceBetween={0}
          slidesPerView={1}
          effect={"fade"}
          grabCursor={true}
          navigation={true}
          rewind={true}
        //   autoplay={{
        //     delay: 2600,
        //     disableOnInteraction: false,
        //   }}
          pagination={{ clickable: true }}
          className={style.swiper}
        >
          {arrImg?.map((f) => {
            return (
              <>
                <SwiperSlide className={style.swiper_slide}>
                  <img
                    src={f}
                    alt="banner"
                    style={{width:'100%', height:'100%'}}
                  />
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
      {/* </div> */}
    </>
  );
}
