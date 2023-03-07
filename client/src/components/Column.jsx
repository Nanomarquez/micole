import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import Chip from "@mui/material/Chip";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Typography from "@mui/material/Typography";
import NavTabs from "./Tabs/TabsCita";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import ModalCita from "./Tabs/ModalCita/ModalCita";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

const Column = ({ column, tasks }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(tasks);
  const handleClick = () => {
    setOpenDetail(true);
  };

  return (
    <>
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
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className={`flex ${
                        draggableSnapshot.isDragging
                          ? "opacity-50"
                          : "opacity-100"
                      } mb-1 h-[110px] items-center flex-col justify-evenly text-black shadow-lg bg-white border rounded-md p-2`}
                    >
                      {" "}
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <h2>{task.nombre}</h2>
                        <div>
                          <Chip
                            onClick={handleOpen}
                            label="+"
                            size="small"
                            style={{
                              backgroundColor: "#4A91F9",
                              color: "#FFF",
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <Chip label={task.grado} />
                        <Chip label={task.añoIngreso} />
                      </div>
                      {open && (
                        <div>
                      
                          <ModalCita handleClose={handleClose} open={open} task={task} />
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default Column;
