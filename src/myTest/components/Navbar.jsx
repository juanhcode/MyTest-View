// Importa las bibliotecas y componentes necesarios de Material-UI y otras bibliotecas externas
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import { CiSearch } from "react-icons/ci";

// Definición de las opciones de configuración del menú
const settings = ["Profile", "Account", "Dashboard", "Logout"];

// Componente funcional principal para la barra de navegación
function Navbar() {
  // Estado local para manejar el menú de usuario
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Función para abrir el menú de usuario
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Función para cerrar el menú de usuario
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Renderiza la barra de navegación
  return (
    <AppBar position="static" sx={{ background: "white", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Contenedor para la barra de búsqueda */}
          <Box
            sx={{
              display: "flex",
              background: "#F5F5F5",
              borderRadius: "6px",
              width: "60%",
              gap: "10px",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            {/* Icono de búsqueda */}
            <CiSearch color="#787486" fontSize="large" />
            {/* Cuadro de entrada para la búsqueda */}
            <InputBase
              placeholder="Search for anything..."
              sx={{ width: "100%", color: "#787486", fontSize: {xs: "14px", md: "16px" } }}
            />
          </Box>

          {/* Contenedor para el botón de menú y el menú de usuario */}
          <Box sx={{ marginLeft: "auto", display: "flex", gap: "20px"}}>
            <Box>
              <Typography sx={{fontWeight: "bold", fontSize: {xs: "12px", md: "16px"}, textAlign: "right"}}>Guest</Typography>
              <Typography sx={{fontSize: {xs: "10px", md: "14px"}, color: "#787486", textAlign: "right"}}>Colombia</Typography>
            </Box>
            {/* Botón de usuario con avatar */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            {/* Menú de usuario desplegable */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* Mapea las opciones de configuración del menú */}
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {/* Etiqueta para cada opción de configuración */}
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// Exporta el componente Navbar para su uso en otras partes de la aplicación
export default Navbar;
