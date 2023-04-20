import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faCalendar,
    faSchool,
} from "@fortawesome/free-solid-svg-icons";
export default function InfoGeneral() {

    const { oneSchool } = useSelector(
        (state) => state.schools
    );



    return (
        <section className="left mt-5 flex flex-col gap-8 w-full">

            <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
                <h2 className="font-semibold text-xl">Descripción</h2>
                <p className="text-black/60 text-base">{oneSchool.descripcion}</p>
            </div>

            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
                <h2 className="font-semibold text-xl">Ubicación</h2>
                <div className="flex text-xs w-full justify-between">
                    <ul className="flex flex-col gap-3">
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">
                                Dirección:{" "}
                            </span>
                            {oneSchool.direccion}
                        </li>
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">
                                Departamento:{" "}
                            </span>
                            {oneSchool?.Departamento?.nombre_departamento}
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-3">
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">
                                Distrito:{" "}
                            </span>
                            {oneSchool?.Distrito?.nombre_distrito}
                        </li>

                    </ul>
                    <ul className="flex flex-col gap-3">
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">
                                Provincia:{" "}
                            </span>
                            {oneSchool?.Provincium?.nombre_provincia}
                        </li>
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">Pais: </span>
                            Peru
                        </li>
                    </ul>
                </div>

            </div>

            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
                <h2 className="font-semibold text-xl">Detalles del Colegio</h2>
                <div className="flex text-xs w-full flex-col lg:flex-row gap-3 justify-between">
                    <ul className="grid grid-cols-3 w-full gap-3">
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">RUC: </span>
                            {oneSchool.ruc}
                        </li>
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">Area: </span>
                            {oneSchool.area}
                        </li>
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">
                                Fundación:{" "}
                            </span>
                            {oneSchool.fecha_fundacion}
                        </li>
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">Niveles: </span>
                            {oneSchool.Nivels?.map((nivel) => nivel.nombre_nivel).join(
                                ", "
                            )}
                        </li>
                        <li className="text-black/60">
                            <span className="font-semibold text-black ">
                                Director:{" "}
                            </span>
                            {oneSchool.nombre_director}
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-3">

                    </ul>

                </div>
                {oneSchool?.Metodos?.length > 0 && (
                    <>
                        <h2 className="font-semibold text-lg">
                            Metodos de aprendizaje
                        </h2>
                        <div className="flex flex-wrap gap-5">
                            {oneSchool?.Metodos?.map((metodo) => (
                                <p className="flex gap-2 items-center text-sm">
                                    {" "}
                                    <BsPinAngle className="text-[#0061dd]" />{" "}
                                    {metodo.nombre_metodo}{" "}
                                </p>
                            ))}
                        </div>
                    </>
                )}
                {oneSchool?.Dificultades?.length > 0 && (
                    <>
                        <h2 className="font-semibold text-lg">
                            Metodos de aprendizaje
                        </h2>
                        <div className="flex flex-wrap gap-5">
                            {oneSchool?.Dificultades?.map((dif) => (
                                <p className="flex gap-2 items-center text-sm">
                                    {" "}
                                    <BsPinAngle className="text-[#0061dd]" />{" "}
                                    {dif.nombre_dificultad}{" "}
                                </p>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
                <h2 className="font-semibold text-xl">
                    Propuesta Valor Educativo
                </h2>
                <p className="text-black/60 text-base">
                    {oneSchool.propuesta_valor}
                </p>
            </div>
    


        </section>
    )
}
