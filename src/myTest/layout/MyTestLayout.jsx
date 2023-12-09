import { Box } from "@mui/material"
import MiniDrawer from "../components/Sidebar";
import Home from "../../auth/pages/Home";


export const MyTestLayout = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <MiniDrawer MainComponent={() => <Home />}/>
        </Box>
    )
}
