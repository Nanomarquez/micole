import axios from "axios";
import { getDataColegios } from "./ComparadorSlice";
export const getDataSchools =
  ({ colegio }) =>
  (dispatch) => {
    //   axios
    //     .get(`/colegios/id`)
    //     .then((res) => dispatch(getDataColegios(res.data)))
    //     .catch((err) => {
    //       dispatch(getError(err.response.data.error));
    //     });
    dispatch(getDataColegios(colegio));
  };
