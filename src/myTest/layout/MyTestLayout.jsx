import { Box } from "@mui/material"
import React from "react"
import MiniDrawer from "../components/Sidebar";
import Home from "../../auth/pages/Home";

export const MyTestLayout = () => {
    const [selectedProject] = React.useState(null);
    return (
        <Box sx={{ display: "flex" }}>
            <MiniDrawer MainComponent={Home} selectedProject={selectedProject} />
        </Box>
    )
}
