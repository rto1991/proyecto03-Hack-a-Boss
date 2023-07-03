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
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import LanguageSelector from "./LanguageSelector";

const defaultTheme = createTheme();
function SingIn() {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { signin, logout } = useUserActions();
  const [user] = useUser();
  const intl = useIntl();
  let res = {}; //la usaremos para capturar la respuesta y manejar posibles mensajes de error
  //usamos hook navigate de useNavigate porque el Componente Navigate directamente no me funciona
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //comprobar coincidencia de passwords
    if (password !== repeatPassword) {
      return Swal.fire({
        title: intl.formatMessage({ id: "singInError" }),
        text: intl.formatMessage({ id: "singInCoincidir" }),
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    //intentamos hacer el registro con los datos proporcionados
    try {
      await signin(name, last_name, "normal", mail, password);
    } catch (error) {
      return Swal.fire({
        title: intl.formatMessage({ id: "singInError" }),
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  if (user) {
    if (user.status === "error") {
      Swal.fire({
        title: intl.formatMessage({ id: "singInError" }),
        text: intl.formatMessage({ id: "singInErrorUsuario" }) + user.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
      logout();
    } else {
      Swal.fire({
        title: intl.formatMessage({ id: "singInExito" }),
        text: intl.formatMessage({ id: "singInCreado" }),
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
          <LanguageSelector />
          <CssBaseline />
          <Box
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormattedMessage id="singInRegistro" />
            <Typography component="h1" variant="h5"></Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="name"
                label={intl.formatMessage({ id: "singInNombre" })}
                name={intl.formatMessage({ id: "singInNombre" })}
                autoFocus
              />
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="last_name"
                label={intl.formatMessage({ id: "singInApellidos" })}
                name={intl.formatMessage({ id: "singInApellidos" })}
                autoFocus
              />
              <TextField
                onChange={(e) => setMail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label={intl.formatMessage({ id: "cabeceraLabelCorreo" })}
                name={intl.formatMessage({ id: "cabeceraLabelCorreo" })}
                autoFocus
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name={intl.formatMessage({ id: "cabeceraLabelContraseña" })}
                label={intl.formatMessage({ id: "cabeceraLabelContraseña" })}
                type="password"
                id="password"
              />
              <Typography component="p" variant="p">
                <FormattedMessage id="pwdInfo" />
              </Typography>
              <TextField
                onChange={(e) => setRepeatPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name={intl.formatMessage({ id: "singInRepetir" })}
                label={intl.formatMessage({ id: "singInRepetir" })}
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
                    <FormattedMessage id="pwdVolver" />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    <FormattedMessage id="pwdRegistrarse" />
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
