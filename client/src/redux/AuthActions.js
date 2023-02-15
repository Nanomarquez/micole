import {getUser,registerUser,loginUser,logoutUser,getError,isLoading} from './AuthSlice'
import axios from 'axios'

export const getUser = (email) => (dispatch) => {
  dispatch(isLoading())
  axios.get(`/auth/${email}`)
  .then(res=>dispatch(getUser(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

export const registerUser = (user) => (dispatch) => {
  dispatch(isLoading())
  axios.post('/auth/signup',{user})
  .then(res=>{dispatch(registerUser())})
  .catch(err=>{dispatch(getError(err.message))})
}

export const loginUser = (user) => (dispatch) => {
  dispatch(isLoading())
  axios.post('/auth/signin',{user})
  .then(res=>{
    dispatch(loginUser(res.data))
    localStorage.setItem('token', res.data.token);
  })
  .catch(err=>dispatch(getError(err.message)))
}

export const logoutUser = () => (dispatch) => {
  dispatch(isLoading())
  try {
    dispatch(logoutUser())
    localStorage.removeItem('token');
  } catch (err) {
    dispatch(getError(err.message))
  }
}

