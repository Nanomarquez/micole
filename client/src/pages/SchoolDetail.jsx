import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { getSchoolDetail } from '../redux/SchoolsActions';
function SchoolDetail() {

  const {id} = useParams()
  const {oneSchool} = useSelector(state=>state.schools)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSchoolDetail(id))
  }, [])
  
  console.log(oneSchool)

  return (
    <div>SchoolDetail {id} </div>
  )
}

export default SchoolDetail