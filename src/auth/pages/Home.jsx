import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

function Home({ selectedProject }) {
  console.log("Selected Project in Home:", selectedProject);

  const token = localStorage.getItem("token");

  const [project, setProject] = useState(null);
  const [caso, setCaso] = useState([]);
  const [errorFetchingCasos, setErrorFetchingCasos] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setProject(selectedProject.proyecto_id);
    }
  }, [selectedProject]);

  useEffect(() => {
    const getProject = async () => {
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
            setCaso(dataCaso);
            setErrorFetchingCasos(false);
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

    getProject();
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
        <Typography marginTop={2} variant="h5">
          Casos
        </Typography>
        <Box marginTop={2}>
          {errorFetchingCasos ? (
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
                      padding: "20px",
                      alignItems: 'center',
                      background: "#F6F6F6",
                      width: "240px",
                      height: "110px",
                      borderRadius: "16px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      cursor: "pointer",
                    }}
                  >
                    <Typography sx={{color: "#0D062D"}}>{caso.nombre}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </div>
  );
}

Home.propTypes = {
  selectedProject: PropTypes.any,
};

export default Home;
