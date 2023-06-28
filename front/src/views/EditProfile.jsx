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
import { useNavigate } from "react-router-dom";
import "./SingIn.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useFilesActions, useUserActions } from "../hooks/api";
import { useUser } from "../UserContext";

const defaultTheme = createTheme();
function EditProfile() {
  const [user] = useUser();
  const [name, setName] = useState(user.info.name);
  const [lastName, setLastName] = useState(user.info.last_name);
  const [mail, setMail] = useState(user.info.mail);
  const [tel, setTel] = useState(user.info.tel);
  const [zipCode, setZipCode] = useState(user.info.zipcode);
  const [address, setAddress] = useState(user.info.address);
  const [city, setCity] = useState(user.info.city);
  const [province, setProvince] = useState(user.info.province);

  const { updateUser, info } = useUserActions();
  const { setInfo } = useFilesActions();
  //usamos hook navigate de useNavigate porque el Componente Navigate directamente no me funciona
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //actualizamos perfil
    try {
      await updateUser(
        name,
        lastName,
        mail,
        tel,
        zipCode,
        address,
        city,
        province
      );
      Swal.fire({
        title: "¡Éxito!",
        text: "Usuario modificado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      setInfo(info);
      navigate("/dashboard");
    } catch (error) {
      return Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  if (!user) {
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
              Edita los datos de tu perfil
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
                value={name}
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
                value={lastName}
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
                value={mail}
                autoFocus
              />

              <TextField
                onChange={(e) => setTel(e.target.value)}
                margin="normal"
                fullWidth
                id="tel"
                label="Teléfono"
                name="tel"
                value={tel}
                autoFocus
              />

              <TextField
                onChange={(e) => setZipCode(e.target.value)}
                margin="normal"
                fullWidth
                id="zipcode"
                label="Código postal"
                name="zipcode"
                value={zipCode}
                autoFocus
              />

              <TextField
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
                fullWidth
                id="address"
                label="Dirección"
                name="address"
                value={address}
                autoFocus
              />

              <TextField
                onChange={(e) => setCity(e.target.value)}
                margin="normal"
                fullWidth
                id="city"
                label="Ciudad"
                name="city"
                value={city}
                autoFocus
              />
              <TextField
                onChange={(e) => setProvince(e.target.value)}
                margin="normal"
                fullWidth
                id="province"
                label="Provincia"
                name="province"
                value={province}
                autoFocus
              />

              <Grid container>
                <Grid item xs>
                  <Button
                    onClick={() => navigate("/dashboard")}
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
                    Actualizar
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

export default EditProfile;
