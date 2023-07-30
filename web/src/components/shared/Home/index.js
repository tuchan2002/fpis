import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authAction";

const Home = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Home;
