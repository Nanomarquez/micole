import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSchoolsPage, getColegiosSearch } from "../../../redux/SchoolsActions";

import CardColegio from "./card-colegio-admin/CardColegio";
import SearchCoelegio from "./search-colegio-admin/SearchCoelegio";
export default function PageColegio() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const { allschools, pagination, loading } = useSelector(
    (state) => state.schools
  );

  const [Input, setInput] = useState("");
  useEffect(() => {
    dispatch(getAllSchoolsPage(page));
  
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // "http://localhost:3001/colegios?limit=10&page=1&search="mateo""
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
        <SearchCoelegio
          handlerInput={setInput}
          nroColegios={allschools?.length}
          data={allschools && allschools}
       
        />
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
