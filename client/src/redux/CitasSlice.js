import { createSlice } from "@reduxjs/toolkit";

export const citasSlice = createSlice({
  name: "citas",
  initialState: {
    tasks: null,

    columns: {
      "column-1": {
        id: "column-1",
        title: "Solicitud de cita",
        taskIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "Cita realizada",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Aplicacion",
        taskIds: [],
      },
      "column-4": {
        id: "column-4",
        title: "Entrevista con el director",
        taskIds: [],
      },
      "column-5": {
        id: "column-5",
        title: "Vacante ofrecida",
        taskIds: [],
      },
      "column-6": {
        id: "column-6",
        title: "Vacante aceptada",
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: [
      "column-1",
      "column-2",
      "column-3",
      "column-4",
      ,
      "column-5",
      ,
      "column-6",
    ],
  },
  reducers: {
    getCitas: (state, action) => {
      console.log(action.payload);

      const data = action.payload.map((ele, index) => {
        return {
          [index]: {
            id: index,
            celular: ele.telefono,
            correo: ele.email,
            date: ele.fecha_cita,
            modo: ele.modalidad,
            nombre: ele.nombre,
            time: ele.hora_cita,
            añoIngreso: "",
            grado: "",
          },
        };
      });
      state.tasks = Object.assign({}, ...data)
    },
  },
});

export const { getCitas } = citasSlice.actions;
export default citasSlice.reducer;

