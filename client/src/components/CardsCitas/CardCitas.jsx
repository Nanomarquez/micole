import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CardCita.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import EventIcon from "@mui/icons-material/Event";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button } from "@mui/material";
import { putCita } from "../../redux/CitasActions";
import { getCitaAgendadas } from "../../redux/SchoolsActions";
import Chip from "@mui/material/node/Chip";
import NotFound from "./svg/notFound";
export default function CardCitas({ filtros }) {
  const { citasAgendadas, grados } = useSelector((state) => state.schools);
  const [idCita, setIdCita] = useState("");
  const [Inactivas, setInactivas] = useState(citasAgendadas.CitasInactivas);
  const [Activas, setActivas] = useState(citasAgendadas.CitasActivas);
  const [Citas, setCita] = useState(citasAgendadas);

  const dispatch = useDispatch();
  const handlerPutStateCita = (iD) => {
    console.log(iD);

    // dispatch(putCita(iD));
    const CitasConfirmadas = Citas.CitasInactivas.find((ele) => ele.id === iD);

    const citasSinConfirmar = Citas.CitasInactivas.filter(
      (ele) => ele.id !== iD
    );
    console.log(citasSinConfirmar);
    setInactivas(citasSinConfirmar);
    // setActivas(Inactivas.find((ele)=> ele.id === idCita))
    setActivas([...Activas, CitasConfirmadas]);
    setIdCita("");
  };
  console.log(Activas);

  useEffect(() => {
    dispatch(getCitaAgendadas);
  }, []);

  return (
    <>
      <div data-aos="fade-up">
        {filtros === "" && (
          <div className={style.layout}>
            {citasAgendadas &&
              Inactivas?.map((cita) => {
                return (
                  <>
                    <div className={style.container}>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexDirection: "column",
                          width: "100%",
                          fontSize: "1.8vh",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "1.8vh",
                          }}
                        >
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                            alt=""
                          />
                          <div>
                            <div className={style.divNombreGrado}>
                              <p>{cita.nombre}</p>
                              {grados &&
                                grados.map((ele) => {
                                  console.log(ele.id === cita.GradoId);
                                  if (ele.id === cita.GradoId) {
                                    return (
                                      <Chip
                                        sx={{ height: "20px" }}
                                        color="primary"
                                        label={ele.nombre_grado}
                                      />
                                    );
                                  }
                                })}
                            </div>

                            <div className={style.itemDiv}>
                              <div className={style.itemDiv}>
                                <AccessTimeIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />
                                <p>{cita.hora_cita}</p>
                              </div>{" "}
                              <div className={style.itemDiv}>
                                <EventIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />{" "}
                                <p>{cita.fecha_cita}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {cita.modalidad === "Virtual" && (
                          <LaptopWindowsIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        {cita.modalidad === "Presencial" && (
                          <PersonPinIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        <p>{cita.modalidad}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className={style.itemDiv}>
                          <PhoneIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                          <p>{cita.telefono}</p>
                        </div>

                        <p>{cita.email}</p>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            handlerPutStateCita(cita.id);
                          }}
                          variant="contained"
                        >
                          Confirmar{" "}
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })}
            {Activas &&
              Activas?.map((cita) => {
                return (
                  <>
                    <div className={style.container}>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexDirection: "column",
                          width: "100%",
                          fontSize: "1.8vh",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "1.8vh",
                          }}
                        >
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                            alt=""
                          />
                          <div>
                            <div className={style.divNombreGrado}>
                              <p>{cita.nombre}</p>
                              {grados &&
                                grados.map((ele) => {
                                  console.log(ele.id === cita.GradoId);
                                  if (ele.id === cita.GradoId) {
                                    return (
                                      <Chip
                                        sx={{ height: "20px" }}
                                        color="primary"
                                        label={ele.nombre_grado}
                                      />
                                    );
                                  }
                                })}
                            </div>

                            <div className={style.itemDiv}>
                              <div className={style.itemDiv}>
                                <AccessTimeIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />
                                <p>{cita.hora_cita}</p>
                              </div>{" "}
                              <div className={style.itemDiv}>
                                <EventIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />{" "}
                                <p>{cita.fecha_cita}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {cita.modalidad === "Virtual" && (
                          <LaptopWindowsIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        {cita.modalidad === "Presencial" && (
                          <PersonPinIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        <p>{cita.modalidad}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className={style.itemDiv}>
                          <PhoneIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                          <p>{cita.telefono}</p>
                        </div>

                        <p>{cita.email}</p>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            handlerPutStateCita(cita.id);
                          }}
                          variant="contained"
                          disabled
                        >
                          Confirmada{" "}
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        )}
        {filtros === "SinConfirmar" && (
          <div className={style.layout}>
            {citasAgendadas && Inactivas?.length === 0 && (
              <>
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "20px",
                    minHeight: "100%",
                    boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
                  }}
                >
                  <NotFound />
                  <h1>No hay solicitudes pendientes</h1>
                </div>
              </>
            )}
            {citasAgendadas &&
              Inactivas?.map((cita) => {
                return (
                  <>
                    <div className={style.container}>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexDirection: "column",
                          width: "100%",
                          fontSize: "1.8vh",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "1.8vh",
                          }}
                        >
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                            alt=""
                          />
                          <div>
                            <div className={style.divNombreGrado}>
                              <p>{cita.nombre}</p>
                              {grados &&
                                grados.map((ele) => {
                                  console.log(ele.id === cita.GradoId);
                                  if (ele.id === cita.GradoId) {
                                    return (
                                      <Chip
                                        sx={{ height: "20px" }}
                                        color="primary"
                                        label={ele.nombre_grado}
                                      />
                                    );
                                  }
                                })}
                            </div>

                            <div className={style.itemDiv}>
                              <div className={style.itemDiv}>
                                <AccessTimeIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />
                                <p>{cita.hora_cita}</p>
                              </div>{" "}
                              <div className={style.itemDiv}>
                                <EventIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />{" "}
                                <p>{cita.fecha_cita}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {cita.modalidad === "Virtual" && (
                          <LaptopWindowsIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        {cita.modalidad === "Presencial" && (
                          <PersonPinIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        <p>{cita.modalidad}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className={style.itemDiv}>
                          <PhoneIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                          <p>{cita.telefono}</p>
                        </div>

                        <p>{cita.email}</p>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            handlerPutStateCita(cita.id);
                          }}
                          variant="contained"
                        >
                          Confirmar{" "}
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        )}
        {filtros === "Confirmados" && (
          <div className={style.layout}>
            {Activas && Activas?.length === 0 && (
              <>
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100%",
                    boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
                  }}
                >
                  <NotFound />
                  <h1>No hay solicitudes pendientes</h1>
                </div>
              </>
            )}

            {Activas &&
              Activas?.map((cita) => {
                return (
                  <>
                    <div className={style.container}>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexDirection: "column",
                          width: "100%",
                          fontSize: "1.8vh",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "1.8vh",
                          }}
                        >
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                            alt=""
                          />
                          <div>
                            <div className={style.divNombreGrado}>
                              <p>{cita.nombre}</p>
                              {grados &&
                                grados.map((ele) => {
                                  console.log(ele.id === cita.GradoId);
                                  if (ele.id === cita.GradoId) {
                                    return (
                                      <Chip
                                        sx={{ height: "20px" }}
                                        color="primary"
                                        label={ele.nombre_grado}
                                      />
                                    );
                                  }
                                })}
                            </div>

                            <div className={style.itemDiv}>
                              <div className={style.itemDiv}>
                                <AccessTimeIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />
                                <p>{cita.hora_cita}</p>
                              </div>{" "}
                              <div className={style.itemDiv}>
                                <EventIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />{" "}
                                <p>{cita.fecha_cita}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {cita.modalidad === "Virtual" && (
                          <LaptopWindowsIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        {cita.modalidad === "Presencial" && (
                          <PersonPinIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        <p>{cita.modalidad}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className={style.itemDiv}>
                          <PhoneIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                          <p>{cita.telefono}</p>
                        </div>

                        <p>{cita.email}</p>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            handlerPutStateCita(cita.id);
                          }}
                          variant="contained"
                          disabled
                        >
                          Confirmada{" "}
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        )}
      </div>

      <div className={style.layout}></div>
    </>
  );
}
