import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import SelectCRM from "./CardsDrgAndDrp/SelectsCRM/SelectsCRM";
import { useDispatch, useSelector } from "react-redux";

import { updateTask, updateColumn, getCita} from "../redux/CitasActions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// const reorderColumnList = (sourceCol, startIndex, endIndex) => {
//   const newTaskIds = Array.from(sourceCol.taskIds);

//   const [removed] = newTaskIds.splice(startIndex, 1);

//   newTaskIds.splice(endIndex, 0, removed);
//   console.log(newTaskIds)
//   const newColumn = {
//     ...sourceCol,
//     taskIds: newTaskIds,
//   };

//   return newColumn;
// };

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = [...sourceCol.taskIds];

  const [removed] = newTaskIds.splice(startIndex, 1);

  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

function DragAndDrop() {
  const { citasAgendadas, grados } = useSelector((state) => state.schools);

  const { tasks, columns, columnOrder, success } = useSelector(
    (state) => state.citas
  );
  const [state, setState] = React.useState({ tasks, columns, columnOrder });
  const dispatch = useDispatch();
  console.log(success);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = columns[source.droppableId];

    const destinationCol = columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );
      const newState = {
        ...state,
        columns: {
          ...columns,
          [newColumn.id]: newColumn,
        },
      };
      dispatch(updateColumn(newState.columns));

      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };
    dispatch(updateColumn(newState.columns));
    // const taskId = tasks[removed]
    // const NuevoEstado = destinationCol.estado
    dispatch(updateTask(tasks[removed], destinationCol.estado));
    setState(newState);

    // alert(
    //   `Moviste la tarea ${removed} desde ${sourceCol.title} hacia ${
    //     destinationCol.title
    //   }! \nTu tarea es ${JSON.stringify(tasks[removed])}`
    // );
  };
  const [filterSelected, setFilterSelected] = useState({
    año: "",
    grado: "",
  });
  useEffect(() => {
    dispatch(getCita());
  }, [citasAgendadas.CitasActivas?.length, success]);

  const handleChangeState = (event) => {
    // let state = event.target.value;
    // dispatch(filterAdminState(state, page));

    setFilterSelected({
      ...filterSelected,
      año: event.target.value,
    });
    // dispatch(filtradoDnD(filterSelected));
  };
  const handleChangeStateGrado = (event) => {
    // let state = event.target.value;


    setFilterSelected({
      ...filterSelected,
      grado: event.target.value,
    });

    // dispatch(filtradoDnD(filterSelected));
  };
  const yearNow = new Date().getFullYear();

  return (
    <DragDropContext Scrollable onDragEnd={onDragEnd}>
      <div className="flex flex-col text-base py-2 w-full min-h-max   gap-5 duration-300  mb-6 bg-[#f6f7f8] text-[#0061dd]">
        <div className="flex items-center flex-col my-5 ">
          {/* aca van los select de año de ingreso y grado*/}
          <div style={{ display: "flex", width: "100%" }}>
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
              <InputLabel id="demo-select-small">Grado</InputLabel>

              <Select
                sx={{ border: "none", outline: "none" }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={filterSelected.grado}
                label={"Grado"}
                onChange={handleChangeStateGrado}
              >
                {grados?.map((g) => (
                  <MenuItem value={g.id}>{g.nombre_grado} </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
              <InputLabel id="demo-select-small">Año</InputLabel>

              <Select
                sx={{ border: "none", outline: "none" }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={filterSelected.año}
                label={"Estado"}
                onChange={handleChangeState}
              >
                <MenuItem value={yearNow}>{yearNow} </MenuItem>
                <MenuItem value={yearNow + 1}>{yearNow + 1} </MenuItem>
                <MenuItem value={yearNow + 2}>{yearNow + 2} </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex flex-col text-base lg:flex-row justify-between  gap-5 px-4">
          {columnOrder?.map((columnId) => {
            const column = columns[columnId];

            const tasksArr = columns[columnId].taskIds.map(
              (taskIds) => tasks[taskIds]
            );

            return (
              <Column key={column.id} column={column} tasksArr={tasksArr} />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default DragAndDrop;
