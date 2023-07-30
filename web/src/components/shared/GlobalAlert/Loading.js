import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default Loading;
