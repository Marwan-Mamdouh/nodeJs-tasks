import { Box, TextField, Typography, Button } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { register } from "../requestHelper/axiosRequest";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router";
import { useState } from "react";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleUserDataChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleRegister = async () => {
    const response = await register(userData);
    if (!response) {
      console.error(response);
      return;
    }
    navigate("/login");
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
        Register
        <AppRegistrationIcon />
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
        id="email"
        type="email"
        name="email"
        label="email"
        variant="outlined"
        onChange={handleUserDataChange}
      />
      <TextField
        id="name"
        name="name"
        label="name"
        variant="outlined"
        onChange={handleUserDataChange}
      />

      <TextField
        required
        id="password"
        type="password"
        name="password"
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
        <Typography>you have an account ?</Typography>
        <Button
          endIcon={<LoginIcon />}
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#778da9",
          }}
        >
          Login
        </Button>
        <Button
          endIcon={<AppRegistrationIcon />}
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#415a77",
          }}
          onClick={handleRegister}
        >
          Register now
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
