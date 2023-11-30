import ImgSignUp from '../../assets/undraw_mobile_development_re_wwsn.svg';
import { Link as RouterLink } from "react-router-dom"
import * as MUI from './MaterialUIComponents'; // Importa todos los componentes de Material-UI

const { Button, CssBaseline, TextField, Paper, Box, Grid, Typography, createTheme, ThemeProvider } = MUI;

const defaultTheme = createTheme();

export const LoginPage = () => {
  // Esta función maneja el evento de envío del formulario.
  // Evita la acción por defecto del formulario y recoge los datos del formulario.
  const handleSubmit = (event) => {
    // Previene el comportamiento predeterminado del formulario (evita la recarga de la página).
    event.preventDefault();

    // Crea un objeto FormData a partir de los elementos del formulario actual.
    const formData = new FormData(event.currentTarget);

    // Muestra en la consola un objeto con el correo electrónico y la contraseña obtenidos del formulario.
    console.log({
      email: formData.get('email'), // Obtiene el valor del campo 'email' del formulario
      password: formData.get('password'), // Obtiene el valor del campo 'password' del formulario
    });
  };

  return (
    // Provee el tema por defecto a todos los componentes bajo este árbol.
    <ThemeProvider theme={defaultTheme}>
      {/* Contenedor principal */}
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* Limpia los estilos del navegador */}
        <CssBaseline />
        {/* Columna izquierda */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${ImgSignUp})`, // Establece la imagen de fondo
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#B0BAC3', // Establece el color de fondo
            backgroundSize: '500px 479px', // Establece el tamaño de la imagen de fondo
            backgroundPosition: 'center',
          }}
        />
        {/* Columna derecha */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {/* Contenedor de elementos */}
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              mt: '200px',
              alignItems: 'center',
            }}
          >
            {/* Encabezado */}
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              MyTest
            </Typography>
            {/* Formulario */}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {/* Campos de texto */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* Botón de iniciar sesión */}
              <Button
                variant="contained"
                sx={{
                  ml: '190px',
                  mt: '20px',
                  mb: '20px',
                  backgroundColor: '#26A048',
                  color: '#000000',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#1F7F38',
                  },
                  paddingX: '30px', // Agregar padding horizontal de 15px
                }}
              >
                Iniciar Sesión
              </Button>
              {/* Enlace para registrarse */}
              <Grid container>
                <Grid item>
                  {/* Texto y enlace para registro */}
                  <Typography variant="body2" sx={{ color: '#7C838A', textDecorationLine: 'none', ml: '330px' }}>
                    {"Don't have an account? "}
                    <RouterLink to='/auth/register' style={{ color: '#26A048', textDecoration: 'none' }}>
                      Sign Up
                    </RouterLink>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}