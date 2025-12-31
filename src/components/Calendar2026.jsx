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

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function getCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0 = domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return cells;
}

export default function Calendar2026() {
  const [month, setMonth] = useState(0);
  const year = 2026;
  const today = new Date();

  const calendar = getCalendar(year, month);

  return (
    <Box>
      {/* TÍTULO */}
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight={800}
        mb={1}
      >
        Calendario 2026
      </Typography>

      <Typography
        textAlign="center"
        color="text.secondary"
        mb={4}
      >
        Autor: Jorge Patricio Santamaría Cherrez
      </Typography>

      <Paper
        elevation={6}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 4,
        }}
      >
        {/* HEADER */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <IconButton onClick={() => setMonth(m => (m === 0 ? 11 : m - 1))}>
            <ChevronLeftIcon />
          </IconButton>

          <Typography variant="h4" fontWeight={700}>
            {MONTHS[month]} {year}
          </Typography>

          <IconButton onClick={() => setMonth(m => (m === 11 ? 0 : m + 1))}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* DAYS HEADER */}
        <Grid container mb={1}>
          {DAYS.map(d => (
            <Grid item xs={12 / 7} key={d}>
              <Typography
                align="center"
                fontWeight={600}
                color="text.secondary"
              >
                {d}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* CALENDAR GRID */}
        <Grid container>
          {calendar.map((day, index) => {
            const isToday =
              day &&
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === day;

            return (
              <Grid item xs={12 / 7} key={index}>
                <Box
                  sx={{
                    height: 90,
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    p: 1.5,
                    bgcolor: isToday ? "primary.main" : "background.paper",
                    color: isToday ? "primary.contrastText" : "text.primary",
                  }}
                >
                  {day && (
                    <Typography fontWeight={600}>
                      {day}
                    </Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}
