import { useUserActions } from "../hooks/api";
import { useUser } from "../UserContext";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import { FormattedMessage } from "react-intl";
import LanguageSelector from "./LanguageSelector";

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
export default function Home() {
  const { login, logout, validate } = useUserActions();
  const [user] = useUser();
  const [mail, setEmail] = useState("");
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [pwd, setPassword] = useState("");
  const navigate = useNavigate();
  const { regCode } = useParams();

  //retrieve saved data from local storage if exists

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));
    if (localData) {
      setEmail(localData.email);
      setPassword(localData.password);
      setSaveCredentials(true);
    }
  }, []);

  const validar = async (regCode) => {
    try {
      await validate(regCode);
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

  if (regCode) {
    validar(regCode);
    navigate("/");
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await login(mail, pwd);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "¡Error!",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
      });
      navigate("/");
      logout();
    }
  };

  if (user) {
    if (user.status == "error") {
      Swal.fire({
        title: "Error!",
        text: user.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
      logout();
    } else if (user.status == "ok") {
      //login con éxito
      if (saveCredentials) {
        const savedData = {
          email: mail,
          password: pwd,
        };
        localStorage.setItem("data", JSON.stringify(savedData));
      } else {
        localStorage.clear();
      }
      let timerInterval;
      Swal.fire({
        title: <FormattedMessage id="modalEntrada" />,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          navigate("/dashboard");
        }
      });
    } else {
      let timerInterval;
      Swal.fire({
        title: "Info!",
        timer: 5000,
        timerProgressBar: true,
        text: user.message,
        icon: "info",
        confirmButtonText: "Ok",
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      });
      logout();
    }
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              <LanguageSelector />
              <FormattedMessage id="cabeceraSaludo" />
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                value={mail}
                margin="normal"
                required
                fullWidth
                id="email"
                label={<FormattedMessage id="cabeceraLabelCorreo" />}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                value={pwd}
                margin="normal"
                required
                fullWidth
                name="password"
                label={<FormattedMessage id="cabeceraLabelContraseña" />}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    checked={saveCredentials}
                    color="primary"
                  />
                }
                label={<FormattedMessage id="cabeceraRecordar" />}
                onChange={(e) => setSaveCredentials(e.target.checked)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <FormattedMessage id="cabeceraBoton" />
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/passwordRecovery" variant="body2">
                    <FormattedMessage id="cabeceraOlvidar" />
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/singin" variant="body2">
                    {<FormattedMessage id="cabeceraNuevaCuenta" />}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
