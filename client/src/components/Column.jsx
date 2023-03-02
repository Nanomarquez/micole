import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import Chip from '@mui/material/Chip';
const Column = ({ column, tasks }) => {

  return (
    <div className="rounded-md bg-white shadow-md border h-min w-full flex flex-col">
      <div className="flex items-center  bg-[#0061dd] py-2 rounded-t-md px-2 mb-2 h-20">
        <h1 className="text-sm text-white">{column.title}</h1>
      </div>
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            // className="flex p-4 flex-1 flex-col gap-2"

            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    className={`flex ${draggableSnapshot.isDragging ? "opacity-50" : "opacity-100"} mb-1 h-[110px] items-center flex-col justify-evenly text-black shadow-lg bg-white border rounded-md p-2`}
                  >
                   <div>
                       <h2 >{task.nombre}</h2>
                   </div>
                 
                   <div style={{display:'flex'}}>
                          <Chip label={task.grado} />
                    <Chip label={task.añoIngreso} />
                   </div>
              
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
