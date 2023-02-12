import axios from 'axios'
import {getSchools} from './SchoolsSlice'

export const getAllSchools = () => (dispatch) => {
  axios.get("https://fakestoreapi.com/products")
  .then(res=>dispatch(getSchools(res.data)))
  .catch(err=>console.log(err))
}