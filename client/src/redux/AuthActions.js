import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  getError,
  isLoading,
  updateUser,
} from "./AuthSlice";
import axios from "axios";
import Swal from 'sweetalert2'
export const getOneUser = () => (dispatch) => {
  dispatch(isLoading());
  const token = localStorage.getItem("token");
  if(token){
    axios
      .get(`/auth`,{headers: {'Authorization': `Bearer ${token}`}})
      .then((res) => dispatch(loginUser(res.data.user)))
      .catch((err) => {
        dispatch(getError(err.response.data.error)) 
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.error
      })});
  }
};

export const register = (user) => (dispatch) => {
  const {
    esColegio,
    email,
    password,
    nombre,
    apellidos,
    nombre_colegio,
    ruc,
    telefono,
    DistritoId,
  } = user;

  console.log(
    esColegio,
    email,
    password,
    nombre,
    apellidos,
    nombre_colegio,
    ruc,
    telefono,
    DistritoId,

  );
  dispatch(isLoading());
  axios
    .post("/auth/signup", {
      esColegio,
      email,
      password,
      nombre,
      apellidos,
      nombre_colegio,
      ruc,
      telefono,
      DistritoId,
    })
    .then((res) => {
      dispatch(registerUser());
      Swal.fire({
        icon: 'success',
        title: "Usuario creado!",
        text: 'Revisa tu email para continuar'
      })
    })
    .catch((err) => {
      dispatch(getError(err.response.data.error));
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.error
      })
    });
};

export const login = (user) => (dispatch) => {
  const { email, password } = user;
  console.log(user);
  dispatch(isLoading());
  axios
    .post("/auth/signin", { email, password })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user.id);
      dispatch(loginUser(res.data.user));
      Swal.fire({
        icon: 'success',
        title: "Bienvenido a MiCole",
        text: 'Inicio de sesion exitoso'
      })

    })
    .catch((err) => {dispatch(getError(err.response.data.error))
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.error
      })});
};

export const update = (user) => (dispatch) => {
  dispatch(isLoading());
  axios
    .put(`/auth/${user.email}`, { user })
    .then((res) => {
      dispatch(updateUser(res.data.user));
    })
    .catch((err) => dispatch(getError(err.response.data.error)));
};

export const logout = () => (dispatch) => {
  dispatch(isLoading());
  try {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    Swal.fire({
      icon: 'success',
      title: "Cerrando sesión!",
      text: 'Hasta pronto!!'
    })
  } catch (err) {
    dispatch(getError(err.response.data.error));
  }
};
