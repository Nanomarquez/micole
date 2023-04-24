import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getDataSchools } from "../../redux/ComparadorActions";
import CardsSch from "./Components/Card/CardsSch";
import style from "./compa.module.css";
export default function Comparador() {
  const dispatch = useDispatch();

  //   const handler = () => {
  //     dispatch(getDataSchools({ colegio }));
  //   };
  return (
    <>
      <div className="min-h-screen">
      <div
               style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: 'flex-end',
                paddingRight:'5vh'
                
                // paddingBottom: "2vh",
              }}
          >
                  <Button
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "0D263B",
              fontSize: "1.5vh",
            }}
            variant="contained"
          >
            Descargar comparación
          </Button>
          </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "10vh",
          }}
        >
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: "600", color: "0D263B",  fontSize: "2.5vh" }}
          >
            Comparador de Colegios
          </Typography>
         
    
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "4vh",
          }}
          // className={style.layout}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: "3vh",
              alignItems: "flex-end",
            }}
          >
            <div className={style.divP}>
              <div className={style.divTabla}>
                <p className={style.divTabla}>Dirección:</p>
              </div>
              <div className={style.divTabla}>
                <p className={style.divTabla}>Tipo de escuela:</p>
              </div>
              <div className="flex flex-col gap-5 items-centerjustify-center">
                <p>Cant. Alumnos:</p>
                <p>Área:</p>
              </div>

              <div className="flex flex-col gap-11 items-centerjustify-center">
                <p>Métodos de Aprendizaje:</p>
                <p>Neurodiversidad:</p>
              </div>

              {/* <p>Acreditaciones:</p> */}
            </div>
          </div>
          <CardsSch />
        </div>
      </div>
    </>
  );
}
