import { useFilesActions, useUserActions } from "../hooks/api";
import { useUser } from "../UserContext";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import "./Home.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.hackaboss.com/">
        Hack a Boss Project 3 - Team A
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function ValidateUser() {
  const { logout, validate } = useUserActions();
  const { info } = useFilesActions();
  let { regCode } = useParams();
  const [code, setCode] = useState(regCode);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      validar(regCode);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
      });
      logout();
    }
  };

  const validar = async (regCode) => {
    await validate(regCode);
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="mainContainer">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Validar Usuario mediante código
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => setCode(e.target.value)}
                value={code}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Código de validación"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Validar
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
