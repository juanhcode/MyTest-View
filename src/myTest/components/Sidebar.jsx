import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "./Navbar";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";
import axios from "axios";

// Ancho del cajón lateral
const drawerWidth = 200;

// Funciones de estilo para el cajón lateral abierto y cerrado
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Componente de encabezado del cajón lateral
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // Necesario para que el contenido esté debajo de la barra de la aplicación
  ...theme.mixins.toolbar,
}));

// Componente de barra de aplicación estilizado
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Componente de cajón lateral estilizado
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Componente principal que incluye la barra de aplicación, el cajón lateral y el contenido principal

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function MiniDrawer({ MainComponent }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedProject, setSelectedProject] = React.useState(""); // Nuevo estado

  // Manejadores para abrir y cerrar el cajón lateral
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");
  const User = JSON.parse(localStorage.getItem("decodedToken"));

  const [project, setProject] = useState([]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(
          `https://proyecto-mytest.fly.dev/v1/manage/${User.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataProject = response.data;
        setProject(dataProject);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    getProject();
  }, []);

  const handleProjectSelect = (project) => {
    console.log("Selected Project:", project); // Agrega este log
    setSelectedProject(project); // Ajusta aquí según la estructura de tu objeto project
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Barra de aplicación */}
      <AppBar
        open={open}
        sx={{ boxShadow: "none", borderBottom: "1px solid #DBDBDB" }}
      >
        <Toolbar sx={{ background: "white", boxShadow: "none" }}>
          {/* Botón del menú */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
              background: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Componente de la barra de navegación */}
          <Navbar />
        </Toolbar>
      </AppBar>

      {/* Cajón lateral permanente */}
      <Drawer variant="permanent" open={open}>
        {/* Encabezado del cajón lateral con botón para cerrar */}
        <DrawerHeader>
          <Box sx={{ display: "flex", gap: "10px", margin: "auto" }}>
            <Typography sx={{ fontWeight: "Bold" }}>MyTest</Typography>
            <img src="/src/assets/LogoMyTest.png" alt="Logo My Test" />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        {/* Lista de elementos en el cajón lateral */}
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HiOutlineSquares2X2 fontSize={"25px"} />
              </ListItemIcon>
              <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <IoSettingsOutline fontSize={"25px"} />
              </ListItemIcon>
              <ListItemText
                primary={"Settings"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Otra sección en el cajón lateral */}
        <Divider />
        <List>
          <Box
            sx={{
              display: "flex",
              height: 20,
              justifyContent: open ? "initial" : "center",
            }}
          >
            <Typography
              sx={{
                minHeight: 48,
                display: open ? "true" : "none",
                px: 2.5,
                fontSize: 12,
                textTransform: "uppercase",
                color: "#787486",
              }}
            >
              My projects
            </Typography>
            <RiAddBoxLine color="#787486" />
          </Box>
          {project.map((project, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleProjectSelect(project)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 0.5 : "auto",
                    justifyContent: "center",
                    color: getRandomColor(),
                  }}
                >
                  <TbPointFilled fontSize={"15px"} />
                </ListItemIcon>
                <ListItemText
                  primary={project.proyecto.nombre}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Renderiza el componente principal proporcionado como MainComponent */}
        <MainComponent selectedProject={selectedProject} />
      </Box>
    </Box>
  );
}

// Propiedades requeridas para el componente principal
MiniDrawer.propTypes = {
  MainComponent: PropTypes.func.isRequired,
};
