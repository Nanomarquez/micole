import React, { useState } from "react";
import style from "./ModalInscripcion.module.css";
import CloseButton from "./svg/CloseButton";
import FormInscripcion from "../FormInscripcion/FormInscripcion";
import Payment from "../FormPayment/Payment";
export default function ModalInscripcion({ handleClose }) {
  const [OpenPayment, setOpenPayment] = useState(false);

  const toggleClose = () => {
    handleClose(false);
  };
  return (
    <div className={style.Overlay}>
      <div className={style.contenedorModal}>
        <div className={style.DivCloseButton} onClick={toggleClose}>
          <CloseButton />
        </div>
        {OpenPayment === false && (
          <FormInscripcion handlerOpenPayment={setOpenPayment} />
        )}
        <div>{OpenPayment && <Payment />}</div>
      </div>
    </div>
  );
}
