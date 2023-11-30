import { Box } from "@mui/material"
import { Navbar } from "../components";


const drawerWidth = 240;

export const MyTestLayout = ({children}) => {
    return (
        <Box sx={{ display: "flex" }}>

            <Navbar drawerWidth={ drawerWidth }/>

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
            >

                { children }

            </Box>
        </Box>
    )
}
