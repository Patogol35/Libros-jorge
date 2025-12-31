import { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  IconButton,
  Box,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Calendar2026 from "./components/Calendar2026";

export default function App() {
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
    },
    typography: {
      fontFamily: "Inter, Roboto, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <IconButton onClick={() => setMode(m => m === "light" ? "dark" : "light")}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>

        <Calendar2026 />
      </Container>
    </ThemeProvider>
  );
}
