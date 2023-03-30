import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterAdminState,
  getAllSchoolsPage,
  getColegiosSearch,
  getNombresColegios,
} from "../../../redux/SchoolsActions";
import axios from "axios";
import CardColegio from "./card-colegio-admin/CardColegio";
import SearchCoelegio from "./search-colegio-admin/SearchCoelegio";
import { getNombreColegios } from "../../../redux/SchoolsSlice";
export default function PageColegio() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState();
  const [OptionSelectedState, seOptionSelectedState] = useState("");
  const [filterSelected, setFilterSelected] = useState({
    state: "",
    distrito: "",
  });
  const { allschools, pagination, loading, nameColegio } = useSelector(
    (state) => state.schools
  );
  const url = "/colegios?limit=50&";
  const [Input, setInput] = useState("");
  useEffect(() => {
    dispatch(getAllSchoolsPage(page));
    dispatch(getNombresColegios());
  }, [page]);

  console.log(nameColegio);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeState = (event) => {
    let state = event.target.value;
    dispatch(filterAdminState(state, page));

    setFilterSelected({
      ...filterSelected,
      state: event.target.value,
    });
  };

  // "http://localhost:3001/colegios?limit=10&page=1&search="mateo""
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
        <div style={{ display: "flex" }}>
          <SearchCoelegio
            handlerInput={setInput}
            nroColegios={nameColegio?.length}
            data={nameColegio && nameColegio}
            vacante={false}
          />
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="demo-select-small">Estado</InputLabel>

            <Select
              sx={{ border: "none", outline: "none" }}
              labelId="demo-select-small"
              id="demo-select-small"
              value={filterSelected.state}
              label={"Estado"}
              onChange={handleChangeState}
            >
              <MenuItem value={true}>Activo</MenuItem>
              <MenuItem value={false}>Inactivo</MenuItem>
            </Select>
          </FormControl>
        </div>

        <CardColegio
          input={Input}
          data={allschools && allschools}
          isLoading={loading && loading}
          page={page}
        />
      </div>
      <Box
        justifyContent={"start"}
        alignItems={"center"}
        display={"flex"}
        sx={{ margin: "20px 0px" }}
      >
        <Pagination
          count={pagination.pages}
          onChange={handlePageChange}
          page={page}
          color="primary"
        />
      </Box>
    </>
  );
}
