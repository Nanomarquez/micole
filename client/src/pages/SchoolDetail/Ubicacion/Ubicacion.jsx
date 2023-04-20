import React, { useEffect, useState } from 'react'
import Maps from '../../../components/Maps'
import { useSelector } from 'react-redux';

export default function Ubicacion() {
    const { oneSchool } = useSelector(
        (state) => state.schools
    );
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    useEffect(() => {
        if (oneSchool.ubicacion) {
            setLat(JSON.parse(oneSchool?.ubicacion)?.lat);
            setLng(JSON.parse(oneSchool?.ubicacion)?.lng);
        }
    }, [oneSchool]);

  return (
    <>
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
      <Maps lat={lat} lng={lng} />
    </>
  
  )
}
