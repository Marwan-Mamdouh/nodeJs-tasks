import { Box, Grid, TextField, Typography, Button, Link } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link as ReactLink, useNavigate } from "react-router";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { login } from "../requestHelper/axiosRequest";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/slices/userSlice";

const LoginForm = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserDataChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleGoToLogin = async () => {
    const { authToken } = await login(userData);

    if (authToken) {
      navigate("/");
      dispatch(loginAction(authToken));
    }
  };

  return (
    <Box
      sx={{
        boxShadow: "0 5px 20px -3px rgba(25,35,47,0.2)",
        justifyContent: "stretch",
        flexDirection: "column",
        borderRadius: "10px",
        display: "flex",
        m: "70px auto",
        width: 500,
        p: "20px",
        gap: 5,
      }}
    >
      <Typography
        sx={{ color: "black", display: "flex", alignItems: "center", gap: 1 }}
      >
        {"Login Form"}
        <LoginIcon />
      </Typography>
      <TextField
        required
        id="username"
        name="username"
        label="username"
        variant="outlined"
        onChange={handleUserDataChange}
      />

      <TextField
        required
        id="password"
        name="password"
        type="password"
        label="password"
        variant="outlined"
        onChange={handleUserDataChange}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Don't have account ?</Typography>
        <Link underline="none" to={"/register"} component={ReactLink}>
          <Button
            endIcon={<AppRegistrationIcon />}
            variant="contained"
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#778da9",
            }}
          >
            Register
          </Button>
        </Link>
        <Button
          endIcon={<LoginIcon />}
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#415a77",
          }}
          onClick={handleGoToLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
