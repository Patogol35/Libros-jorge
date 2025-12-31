import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const months = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const getMonthData = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay() || 7;
  const totalDays = new Date(year, month + 1, 0).getDate();
  return { firstDay, totalDays };
};

export default function Calendar2026() {
  const [month, setMonth] = useState(0);
  const year = 2026;
  const today = new Date();

  const { firstDay, totalDays } = getMonthData(year, month);

  const prevMonth = () => setMonth((m) => (m === 0 ? 11 : m - 1));
  const nextMonth = () => setMonth((m) => (m === 11 ? 0 : m + 1));

  return (
    <Paper
      elevation={8}
      sx={{
        p: 4,
        maxWidth: 900,
        mx: "auto",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <IconButton onClick={prevMonth}>
          <ChevronLeftIcon />
        </IconButton>

        <Typography variant="h4" fontWeight={700}>
          {months[month]} {year}
        </Typography>

        <IconButton onClick={nextMonth}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Days header */}
      <Grid container>
        {days.map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Typography
              textAlign="center"
              fontWeight={600}
              color="text.secondary"
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar */}
      <Grid container mt={1}>
        {[...Array(firstDay - 1)].map((_, i) => (
          <Grid item xs={12 / 7} key={`empty-${i}`} />
        ))}

        {[...Array(totalDays)].map((_, i) => {
          const dayNumber = i + 1;
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === dayNumber;

          return (
            <Grid item xs={12 / 7} key={dayNumber}>
              <Box
                sx={{
                  height: 80,
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  p: 1,
                  bgcolor: isToday ? "primary.main" : "transparent",
                  color: isToday ? "#000" : "inherit",
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: isToday ? "primary.main" : "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <Typography fontWeight={600}>{dayNumber}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
