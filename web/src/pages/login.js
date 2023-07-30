import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authAction";

const initialState = { email: "", password: "" };
const Login = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const navigate = useNavigate();
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  const onChangeUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
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
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          autoFocus
          name="email"
          value={email}
          onChange={onChangeUserData}
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChangeUserData}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={email.trim() && password.trim() ? false : true}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
