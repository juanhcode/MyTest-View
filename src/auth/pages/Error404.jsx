import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import imgError404 from '../../assets/undraw_page_not_found_re_e9o6.svg'

export const Error404 = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
                sx={{
                    width: '500px',
                    height: '500px',
                    margin: '0 auto', // Centra horizontalmente el contenedor de la imagen
                }}
            >
                <img src={imgError404} alt="Ejemplo" style={{ width: '100%', height: '100%', }} />
            </Box>
            <Typography variant="body1">
                Lo sentimos, la página que estás buscando no existe.
            </Typography>
            <Button
                component={RouterLink}
                to="/"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
            >
                Ir a la página de inicio
            </Button>
        </div>
    );
};

