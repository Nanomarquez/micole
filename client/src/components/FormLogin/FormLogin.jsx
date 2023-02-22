import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./FormLogin.module.css";
import Logo from "../../assets/logoPayment.png";
import FB from "./svg/FB";
import { login } from "../../redux/AuthActions";
import Gmail from "./svg/Gmail";
import { useDispatch } from "react-redux";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import {Link} from 'react-router-dom'
export default function FormLogin({handlerClose,OpenLogin,setOpenLogin}) {
  const dispatch = useDispatch();

  const ToggleSeePass = () => {
    setseePassword(!seePassword);
  };
  const [seePassword, setseePassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
    mode: "onChange",
  });

  const OnSubmit = async (user) => {
    
    dispatch(login(user))  
  };

  return (
    <>
    
        <form  onSubmit={handleSubmit(OnSubmit)} className={style.Form}>
      <div className={style.img_div}>
        <img src={Logo} />
      </div>
      <input
        placeholder="Correo Electrónico"
        {...register("email", {
          required: true,
          maxLength: 100,
        })}
        className="shadow-md"
      />
      {errors.email?.type === "required" && (
        <p className={style.p}>Campo requerido</p>
      )}

<div className={style.DivPass}>
              {seePassword === true ? (
                <BsEye onClick={ToggleSeePass} className={style.Password} />
              ) : (
                <BsEyeSlash
                  onClick={ToggleSeePass}
                  className={style.Password}
                />
              )}

              <input
                placeholder="Contraseña"
                type={ seePassword === true ? "text" :"password"}
                {...register("password", {
                  required: true,
                  maxLength: 100,
                })}
                className="shadow-md"
              />
            </div>
      <button className="hover:shadow-lg shadow-black duration-300">INGRESAR</button>

    </form>
    <div className="text-center mb-3">
        <p>¿Has olvidado tu contraseña?</p>
        <p className="text-[#0061dd]">Recuperar contraseña</p>
    </div>
    <div className="text-center mb-3">
        <p>¿No tienes una cuenta?</p>
        <p className="text-[#0061dd] cursor-pointer" onClick={()=>setOpenLogin(!OpenLogin)}>
        Registrate Aqui
          </p>
    </div>
    <div className={style.socialMedia}>
        <p>Prefiero iniciar sesion con:</p>
      <div style={{display:"flex" , gap:"20px" , padding:"20px", alignItems:"center"}}>
          <FB/>
        <Gmail/>
      </div>
      
    </div>
    </>


  );
}
