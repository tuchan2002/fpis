import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "calc(100vh - 70px)",
        backgroundColor: "primary.main",
      }}
    >
      <Typography variant="h1" style={{ color: "#fff" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "#fff" }}>
        The page you're looking for doesn't exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
