import { useUserActions } from "../hooks/api";
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
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FormattedMessage } from "react-intl";

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
export default function PasswordRecovery() {
  const { logout, recoverPassword } = useUserActions();
  const [user] = useUser();
  const [mail, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await recoverPassword(mail);
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

  if (user) {
    if (user.status == "error") {
      Swal.fire({
        title: "Error!",
        text: user.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
      logout();
    } else {
      Swal.fire({
        title: "Info!",
        text: user.message,
        icon: "info",
        confirmButtonText: "Ok",
      });
      logout();
      navigate("/passwordChange");
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
              <FormattedMessage id="recuperarCuenta" />
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <FormattedMessage id="solicitudResert" />
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
