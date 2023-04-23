import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getDataSchools } from "../../redux/ComparadorActions";
import CardsSch from "./Components/Card/CardsSch";

export default function Comparador() {
  const dispatch = useDispatch();
 
//   const handler = () => {
//     dispatch(getDataSchools({ colegio }));
//   };
  return (
    <>
      <div className="min-h-screen">
        <div>
            <Typography>Comparador de Colegios</Typography>
        </div>
     <div>
     <CardsSch/>
     </div>
    </div>
    </>
  
  );
}
