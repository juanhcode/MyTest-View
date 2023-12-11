import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Button, Dialog, DialogContent, IconButton, List, ListItem, ListItemText, TextField } from '@mui/material';
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

function Home({ selectedProject }) {
  // Log de información sobre el proyecto seleccionado
  console.log("Selected Project in Home:", selectedProject);

  // Obtener el token de localStorage
  const token = localStorage.getItem("token");

  // Estado para almacenar el proyecto actual y los casos
  const [project, setProject] = useState(null);
  const [caso, setCaso] = useState([]);
  const [errorFetchingCasos, setErrorFetchingCasos] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCaso, setSelectedCaso] = useState(null);

  // Función para cerrar el diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Función para abrir el diálogo con el caso seleccionado
  const handleOpenDialog = (caso) => {
    setSelectedCaso(caso);
    setOpenDialog(true);
  };

  // Actualizar el estado del proyecto cuando se selecciona un nuevo proyecto
  useEffect(() => {
    if (selectedProject) {
      setProject(selectedProject.proyecto_id);
    }
  }, [selectedProject]);

  // Referencia mutable para la función de obtener proyecto
  const getProject = useRef();

  // Función para eliminar un caso
  const handleDelete = async (caso) => {
    try {
      const response = await axios.delete(
        `https://proyecto-mytest.fly.dev/v1/caso/${caso.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Delete response:', response.data);

      // Llamamos a getProject para actualizar la lista de casos después de la eliminación
      getProject.current();

      // Realizar acciones adicionales después de la eliminación (si es necesario)
    } catch (error) {
      console.error('Error deleting caso:', error);
      // Manejo de errores
    }
  };

  // Estado para la edición de un caso y control de apertura del modal de edición
  const [editingCaso, setEditingCaso] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Función para abrir el modal de edición con el caso seleccionado
  const handleOpenEditModal = (caso) => {
    setEditingCaso(caso);
    setOpenEditModal(true);
  };

  // Función para actualizar un caso
  const handleUpdateCaso = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://proyecto-mytest.fly.dev/v1/caso/${editingCaso.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Update response:', response.data);
      // Realizar acciones adicionales después de la actualización (si es necesario)
      // Cerrar el modal de edición
      setOpenEditModal(false);
      getProject.current(); // Actualizar la lista de casos
      // Actualizar casos para reflejar los cambios (agregar lógica si es necesario)
    } catch (error) {
      console.error('Error updating caso:', error);
      // Manejo de errores
    }
  };

  const [newCasoData, setNewCasoData] = useState({
    nombre: '',
    descripcion: '',
    pasos_a_seguir: '',
    prioridades: '',
    fecha_inicio: '',
    fecha_limite: '',
    datos_de_prueba: '',
    proyecto_id: Math.floor(Math.random() * 1000) + 1,
  });

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [createCasoData, setCreateCasoData] = useState('')

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `https://proyecto-mytest.fly.dev/v1/${createCasoData}/`,
        newCasoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Create response:', response.data);

      // Realizar acciones adicionales después de la creación (si es necesario)
      // Por ejemplo, actualizar la lista de casos
      // getProject.current();

      // Cerrar el modal después de la creación exitosa
      setOpenCreateModal(false);
      setCreateCasoData()

      // Restablecer los datos del nuevo caso a valores iniciales
      setNewCasoData({
        nombre: '',
        descripcion: '',
        pasos_a_seguir: '',
        prioridades: '',
        fecha_inicio: '',
        fecha_limite: '',
        datos_de_prueba: '',
        proyecto_id: Math.floor(Math.random() * 1000) + 1,
        // Restablecer otros campos si es necesario
      });
    } catch (error) {
      console.error('Error creating caso:', error);
      // Manejo de errores
    }
  };

  // Obtener el proyecto y sus casos al cargar o cambiar el proyecto seleccionado
  useEffect(() => {
    getProject.current = async () => {
      try {
        if (project) {
          const response = await axios.get(
            `https://proyecto-mytest.fly.dev/v1/caso/${project}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const dataCaso = response.data;

          if (Array.isArray(dataCaso)) {
            // Establecer los casos obtenidos en el estado
            setCaso(dataCaso);
            setErrorFetchingCasos(false);
          } else if (dataCaso.error === "No hay casos de prueba para este proyecto") {
            // Manejar el caso específico cuando no hay casos
            setCaso([]); // Puedes establecer un array vacío o proporcionar casos predeterminados
            setErrorFetchingCasos(true);
          } else {
            console.error("La respuesta de la API no es un array:", dataCaso);
            setErrorFetchingCasos(true);
          }
        }
      } catch (error) {
        console.error("Error fetching casos", error);
        setErrorFetchingCasos(true);
      }
    };

    getProject.current(); // Obtener los casos al cargar la página o cambiar de proyecto
  }, [project, token]);


  return (
    <div>
      <Typography variant="h3" sx={{ paddingBottom: 5 }}>
        {selectedProject
          ? selectedProject.proyecto.nombre
          : "Casos de prueba"}
      </Typography>
      <Divider></Divider>
      <Box>
        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography marginTop={2} variant="h5">
            Casos
          </Typography>

          <Grid>
            <Button variant="contained" sx={{ mt: '20px' }} onClick={() => setOpenCreateModal(true)}>Agregar <ControlPointIcon sx={{ ml: '5px' }} /></Button>
          </Grid>
        </Grid>

        <Box marginTop={2}>
          {!caso.length ? (
            <Typography variant="body1" marginTop={2}>
              No hay casos de prueba para este proyecto.
            </Typography>
          ) : (
            <Grid
              container
              spacing={{ xs: 2, md: 10 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {caso.map((caso, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      padding: '20px',
                      alignItems: 'center',
                      background: '#F6F6F6',
                      width: '240px',
                      height: '110px',
                      borderRadius: '16px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      justifyContent: 'center'

                    }}

                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Typography sx={{ color: '#0D062D', fontWeight: 'bold' }}>
                        {caso.nombre && caso.nombre.charAt(0).toUpperCase() + caso.nombre.slice(1)}
                      </Typography>
                      <Typography sx={{ color: '#0D062D', fontSize: '12px', marginLeft: '8px' }}>
                        "{caso.descripcion && caso.descripcion.charAt(0).toUpperCase() + caso.descripcion.slice(1)}"
                      </Typography>
                      <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton aria-label="Ver" onClick={() => handleOpenDialog(caso)}>
                          <Visibility />
                        </IconButton>
                        <IconButton
                          aria-label="Editar"
                          onClick={() => handleOpenEditModal(caso)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton aria-label="Eliminar" onClick={() => handleDelete(caso)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogContent>
              {/* Contenido del modal */}
              {selectedCaso && (
                <Typography variant="body1">
                  <List>
                    <ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>Descripción: </Typography>
                        <ListItemText sx={{ ml: '5px' }} primary={`  ${selectedCaso.descripcion && selectedCaso.descripcion.charAt(0).toUpperCase() + selectedCaso.descripcion.slice(1)}`} />
                      </Grid>
                      <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>Pasos: </Typography>
                        <ListItemText sx={{ ml: '5px' }} primary={`  ${selectedCaso.pasos_a_seguir && selectedCaso.pasos_a_seguir.charAt(0).toUpperCase() + selectedCaso.pasos_a_seguir.slice(1)}`} />
                      </Grid>
                      <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>Prioridades: </Typography>
                        <ListItemText sx={{ ml: '5px' }} primary={`  ${selectedCaso.prioridades && selectedCaso.prioridades.charAt(0).toUpperCase() + selectedCaso.prioridades.slice(1)}`} />
                      </Grid>
                      <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>Fecha Inicio: </Typography>
                        <ListItemText sx={{ ml: '5px' }} primary={`  ${selectedCaso.fecha_inicio && selectedCaso.fecha_inicio.charAt(0).toUpperCase() + selectedCaso.fecha_inicio.slice(1)}`} />
                      </Grid>
                      <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>Fecha Limite: </Typography>
                        <ListItemText sx={{ ml: '5px' }} primary={`  ${selectedCaso.fecha_limite && selectedCaso.fecha_limite.charAt(0).toUpperCase() + selectedCaso.fecha_limite.slice(1)}`} />
                      </Grid>
                      <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>Pruebra: </Typography>
                        <ListItemText sx={{ ml: '5px' }} primary={`  ${selectedCaso.datos_de_prueba && selectedCaso.datos_de_prueba.charAt(0).toUpperCase() + selectedCaso.datos_de_prueba.slice(1)}`} />
                      </Grid>
                    </ListItem>
                    {/* Agrega más elementos ListItemText con otros campos */}
                    <Divider />
                  </List>
                </Typography>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
            <DialogContent>
              {editingCaso && (
                <form>
                  <TextField
                    sx={{ m: '10px', ml: '9%' }}
                    label="Nombre"
                    value={editingCaso.nombre}
                    onChange={(e) => {
                      const updatedCaso = { ...editingCaso, nombre: e.target.value };
                      setEditingCaso(updatedCaso);
                    }}
                  />
                  <TextField
                    sx={{ m: '10px', ml: '9%' }}
                    label="Descripción"
                    value={editingCaso.descripcion}
                    onChange={(e) => {
                      const updatedCaso = { ...editingCaso, descripcion: e.target.value };
                      setEditingCaso(updatedCaso);
                    }}
                  />
                  <TextField
                    sx={{ m: '10px', ml: '9%' }}
                    label="Pasos a seguir"
                    value={editingCaso.pasos_a_seguir}
                    onChange={(e) => {
                      const updatedCaso = { ...editingCaso, pasos_a_seguir: e.target.value };
                      setEditingCaso(updatedCaso);
                    }}
                  />
                  <TextField
                    sx={{ m: '10px', ml: '9%' }}
                    label="Prioridades"
                    value={editingCaso.prioridades}
                    onChange={(e) => {
                      const updatedCaso = { ...editingCaso, prioridades: e.target.value };
                      setEditingCaso(updatedCaso);
                    }}
                  />
                  <TextField
                    sx={{ m: '10px', ml: '9%' }}
                    label="Fecha Inicio"
                    value={editingCaso.fecha_inicio}
                    onChange={(e) => {
                      const updatedCaso = { ...editingCaso, fecha_inicio: e.target.value };
                      setEditingCaso(updatedCaso);
                    }}
                  />
                  <TextField
                    sx={{ m: '10px', ml: '9%' }}
                    label="Fecha Límite"
                    value={editingCaso.fecha_limite}
                    onChange={(e) => {
                      const updatedCaso = { ...editingCaso, fecha_limite: e.target.value };
                      setEditingCaso(updatedCaso);
                    }}
                  />
                  <TextField
                    sx={{ m: '10px', ml: '9%' }}
                    label="Datos de prueba"
                    value={editingCaso.datos_de_prueba}
                    onChange={(e) => {
                      const updatedCaso = { ...editingCaso, datos_de_prueba: e.target.value };
                      setEditingCaso(updatedCaso);
                    }}
                  />
                  <Button sx={{ ml: '16%', mt: '20px' }} onClick={() => handleUpdateCaso(editingCaso)} variant="contained"
                    size="small">Guardar cambios</Button>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
            <DialogContent>
              {/* Formulario para agregar un nuevo caso */}
              <TextField
                label="Nombre"
                value={newCasoData.nombre}
                onChange={(e) => setNewCasoData({ ...newCasoData, nombre: e.target.value })}
              />
              <TextField
                label="Descripción"
                value={newCasoData.descripcion}
                onChange={(e) => setNewCasoData({ ...newCasoData, descripcion: e.target.value })}
              />
              <TextField
                label="Pasos a seguir"
                value={newCasoData.pasos_a_seguir}
                onChange={(e) => setNewCasoData({ ...newCasoData, pasos_a_seguir: e.target.value })}
              />
              <TextField
                label="Prioridades"
                value={newCasoData.prioridades}
                onChange={(e) => setNewCasoData({ ...newCasoData, prioridades: e.target.value })}
              />
              <TextField
                label="Fecha Inicio"
                value={newCasoData.fecha_inicio}
                onChange={(e) => setNewCasoData({ ...newCasoData, fecha_inicio: e.target.value })}
              />
              <TextField
                label="Fecha Límite"
                value={newCasoData.fecha_limite}
                onChange={(e) => setNewCasoData({ ...newCasoData, fecha_limite: e.target.value })}
              />
              <TextField
                label="Datos de prueba"
                value={newCasoData.datos_de_prueba}
                onChange={(e) => setNewCasoData({ ...newCasoData, datos_de_prueba: e.target.value })}
              />
              {/* Otros campos del nuevo caso */}
              {/* ... */}
              <Button onClick={handleCreate}>Crear Caso</Button>
            </DialogContent>
          </Dialog>

        </Box>
      </Box>
    </div>
  );
}

Home.propTypes = {
  selectedProject: PropTypes.any,
};

export default Home;
