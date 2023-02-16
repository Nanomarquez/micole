import React, { useState } from "react";
import style from "./ModalInscripcion.module.css";
import CloseButton from "./svg/CloseButton";
import FormInscripcion from "../FormInscripcion/FormInscripcion";
import Payment from "../FormPayment/Payment";
import FormLogin from "../FormLogin/FormLogin";
export default function ModalInscripcion({ handleClose }) {
  const [OpenPayment, setOpenPayment] = useState(false);
  const [OpenLogin, setOpenLogin] = useState(false);
  const [OpenRegister, setOpenRegister] = useState(true);
//handlerOpenLogin
  const toggleClose = () => {
    handleClose(false);
  };
  return (
    <div className={style.Overlay}>
      <div style={{ paddingTop: "40px" , marginBottom:'20px'}}>
        <div className={style.contenedorModal}>
          <div className={style.DivCloseButton}>
            <div  onClick={toggleClose}>
              <CloseButton /> 
            </div>
           
          </div>
          {OpenPayment === false && OpenLogin=== false && OpenRegister === true &&(
            <FormInscripcion handlerOpenLogin={setOpenLogin}   handlerOpenPayment={setOpenPayment} />
          )}
          <div>{OpenPayment === true  && <Payment />}</div>
          <div>{OpenLogin=== true  && <FormLogin  />}</div>
        </div>
      </div>
    </div>
  );
}
