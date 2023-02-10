import React from "react";
import style from "./Carrusel.module.css";
import images from "../../exports/carruselImagenes";
import { motion } from "framer-motion";

export default function Carrusel() {
console.log(images)
  return (

    <motion.div className={style.slider_container}>
   
      <motion.div className={style.slider} drag='x' dragConstraints={{right:0, left:-700} }>
        {images.map((image) => {
            return (
                 <motion.div className={style.item}>  
            <img src={image} alt="category" />
            </motion.div>
            )
           
          
        })}
      </motion.div>
    </motion.div>
  );
}
