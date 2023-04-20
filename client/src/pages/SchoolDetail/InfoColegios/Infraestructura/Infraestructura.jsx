import React, { useState } from 'react'
// import { a11yProps, TabPanel } from '../../../components/Tabs';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { a11yProps, TabPanel } from '../../../../components/Tabs';
import { useSelector } from 'react-redux';
export default function Infraestructura() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);

    };
    
    const { oneSchool, grados, horariosColegio } = useSelector(
        (state) => state.schools
      );
      
    let infra = Array.from(
        new Set(oneSchool?.Infraestructuras?.map((e) => e.InfraestructuraTipoId))
    );
    return (
        <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
            <h2 className="font-semibold text-xl">Infraestructura</h2>

            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                {infra.map((e) => (
                    <Tab
                        style={{
                            fontSize: "11px",
                            fontFamily: "Poppins",
                            textTransform: "capitalize",
                        }}
                        label={
                            e === 1
                                ? "Administrativo"
                                : e === 2
                                    ? "Artistica"
                                    : e === 3
                                        ? "Deportiva"
                                        : e === 4
                                            ? "Enseñanza"
                                            : e === 5
                                                ? "Laboratorio"
                                                : null
                        }
                        {...a11yProps(e)}
                    />
                ))}
            </Tabs>

            <div className="text-sm flex w-full justify-center">
                {oneSchool?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 1
                ) && (
                        <TabPanel value={value} index={0}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {oneSchool?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 1
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        )}
                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}
                {oneSchool?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 2
                ) && (
                        <TabPanel value={value} index={1}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {oneSchool?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 2
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        )}
                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}
                {oneSchool?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 3
                ) && (
                        <TabPanel value={value} index={2}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {oneSchool?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 3
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        )}
                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}
                {oneSchool?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 4
                ) && (
                        <TabPanel value={value} index={3}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {oneSchool?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 4
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        )}
                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}
                {oneSchool?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 5
                ) && (
                        <TabPanel value={value} index={4}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {oneSchool?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 5
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-10"
                                            />
                                        )}

                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}

            </div>
        </div>
    )
}
