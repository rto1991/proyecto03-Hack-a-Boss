import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import "./SingIn.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useUserActions } from "../hooks/api";
import { useUser } from "../UserContext";

const defaultTheme = createTheme();
function SingIn() {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { signin, logout } = useUserActions();
  const [user] = useUser();
  let res = {}; //la usaremos para capturar la respuesta y manejar posibles mensajes de error
  //usamos hook navigate de useNavigate porque el Componente Navigate directamente no me funciona
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //comprobar coincidencia de passwords
    if (password !== repeatPassword) {
      return Swal.fire({
        title: "Error!",
        text: "Las contraseñas no coinciden",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    //intentamos hacer el registro con los datos proporcionados
    try {
      await signin(name, last_name, "normal", mail, password);
    } catch (error) {
      return Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  if (user) {
    if (user.status === "error") {
      Swal.fire({
        title: "Error!",
        text:
          "Se produjo un error intentando registrar el usuario. " +
          user.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
      logout();
    } else {
      Swal.fire({
        title: "¡Éxito!",
        text: "Has creado tu usuario correctamente, ve a tu bandeja de entrada para validarlo y poder usar MyCloudDrive",
        icon: "success",
        confirmButtonText: "Ok",
      });
      logout();
      navigate("/");
    }
  }

  function volverAInicio(e) {
    e.preventDefault();
    navigate("/");
  }

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
            <Typography component="h1" variant="h5">
              Regístrate en MyCloudDrive
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoFocus
              />
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="last_name"
                label="Apellidos"
                name="last_name"
                autoFocus
              />
              <TextField
                onChange={(e) => setMail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoFocus
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Typography component="p" variant="p">
                Password debe tener entre 8 y 30 caracteres, contener al menos
                una letra mayúscula, un número y un símbolo especial (!@#$&*)
              </Typography>
              <TextField
                onChange={(e) => setRepeatPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="repeat_password"
                label="Repite Password"
                type="password"
                id="repeat_password"
              />

              <Grid container>
                <Grid item xs>
                  <Button
                    onClick={(e) => volverAInicio(e)}
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Volver
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Registrarse
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default SingIn;
