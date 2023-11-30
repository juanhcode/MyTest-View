// Importa la imagen de ilustración y otros elementos necesarios
import ImgSignUp from '../../assets/undraw_programming_re_kg9v.svg';
import { Link as RouterLink } from "react-router-dom";
import * as MUI from './MaterialUIComponents'; // Importa todos los componentes de Material-UI

// Extrae los componentes necesarios de Material-UI
const { Button, CssBaseline, TextField, Paper, Box, Grid, Typography, createTheme, ThemeProvider } = MUI;

// Crea el tema por defecto para el componente
const defaultTheme = createTheme();

// Definición del componente de registro
export const RegisterPage = () => {
  // Función que maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    // Provee el tema por defecto a todos los componentes bajo este árbol.
    <ThemeProvider theme={defaultTheme}>
      {/* Contenedor principal */}
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* Limpia los estilos del navegador */}
        <CssBaseline />
        {/* Columna izquierda con la imagen de fondo */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${ImgSignUp})`, // Utiliza la imagen local como fondo
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#B0BAC3', // Cambia el color de fondo
            backgroundSize: '500px 479px', // Establece el tamaño de la imagen de fondo
            backgroundPosition: 'center',
          }}
        />
        {/* Columna derecha con el formulario */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {/* Contenedor de elementos */}
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              mt: '160px',
              alignItems: 'center',
            }}
          >
            {/* Título */}
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              MyTest
            </Typography>
            {/* Título secundario */}
            <Typography component="h4" variant="h7" sx={{ fontWeight: 'bold', marginTop: '20px' }}>
              Create your free account
            </Typography>
            {/* Formulario */}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {/* Campos de texto */}
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="medium"
                name="fullName"
                required
              />
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
              {/* Botón de crear cuenta */}
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
                  paddingX: '40px', // Agregar padding horizontal de 15px
                }}
              >
                Create Account
              </Button>
              {/* Enlace para iniciar sesión */}
              <Grid container>
                <Grid item>
                  {/* Texto y enlace para iniciar sesión */}
                  <Typography variant="body2" sx={{ color: '#7C838A', textDecorationLine: 'none', ml: '330px' }}>
                    {"Already have an account?"}
                    <RouterLink to='/auth/login' style={{ color: '#26A048', textDecoration: 'none' }}>
                      Log in
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
};