import { Alert, AlertTitle, Snackbar } from "@mui/material";
import React from "react";

const CustomAlert = ({ message, success }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={success ? "success" : "error"}
        sx={{ minWidth: "350px" }}
      >
        <AlertTitle>{success ? "Success" : "Error"}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
