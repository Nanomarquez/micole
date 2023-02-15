import React from "react";
import style from "./Payment.module.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { MenuItem} from "@mui/material";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { InputLabel } from "@mui/material";
import MockupDistritos from "../../MockupInfo/MockupDistritos";
import Logo from "../../assets/logoPayment.png"
function Payment() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      ruc: "",
      lastname: "",
      phone: "",
      schoolDistrict: "",
      schoolName: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const handleChangeDistric = () => {};
  const OnSubmit = () => {
    handlerOpenPayment(true)
  };

  return (
    <>
    <div className={style.PaymentLayout}>

      <div className={style.h1_div}>
        <img src={Logo}/>
      </div>
      <div className={style.container}>
      <h1 style={{color:'blue'}}>Detalles de Compra</h1>
      <div className={style.detalle}>
        <p>Plan Especial +IGV</p>
        <p>$ 80.00</p>
      </div>
      <div className={style.detalle}>
        <p>Total</p>
        <p>$ 80.00</p>
      </div>
      
      </div>
    </div>
      
     
    </>
  );
}

export default Payment;
