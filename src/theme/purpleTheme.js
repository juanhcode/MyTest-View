import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#B0BAC3",
    },
    secondary: {
      main: "#E7E8EA",
    },
    error: {
      main: red.A400
    }
  },
});
