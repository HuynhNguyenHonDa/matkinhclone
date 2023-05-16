import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Spinner = () => {
  return (
    <Box className="justify-center p-10" sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};
