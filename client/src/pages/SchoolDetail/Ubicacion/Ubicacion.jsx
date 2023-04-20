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
    <Maps lat={lat} lng={lng} />
  )
}
