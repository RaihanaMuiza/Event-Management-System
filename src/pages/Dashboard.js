import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../components/eventSlice.js";
import ClearIcon from "@mui/icons-material/Clear";
import Header from "../components/Header";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.events);
  const [hostFilter, setHostFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = data.filter((event) => {
    return (
      (!hostFilter ||
        event.host.toLowerCase().includes(hostFilter.toLowerCase())) &&
      (!dateFilter || event.date.includes(dateFilter))
    );
  });

  const hosts = [...new Set(data.map((e) => e.host))];
  const dates = [...new Set(data.map((e) => e.date))];

  return (
    <Box
      sx={{ p: 3, backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}
    >
      <Header />

      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          color: "#fff",
          mt: 8,
          mb: 4,
          fontWeight: "600",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        UPCOMING EVENTS
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mb: 3,
          paddingX: "5vw",
          flexWrap: "wrap",
          "@media (max-width: 480px)": {
            flexDirection: "column",
            alignItems: "flex-end",
          },
        }}
      >
        <Autocomplete
          options={hosts}
          value={hostFilter}
          onChange={(e, newValue) => setHostFilter(newValue || "")}
          inputValue={hostFilter}
          onInputChange={(e, newInputValue) => setHostFilter(newInputValue)}
          clearOnEscape
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter by Host"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 1,
                width: 200,
                "& .MuiInputLabel-root": { color: "#888" },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    {hostFilter && (
                      <IconButton
                        size="small"
                        onClick={() => setHostFilter("")}
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                    {params.InputProps.endAdornment}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Autocomplete
          options={dates}
          value={dateFilter}
          onChange={(e, newValue) => setDateFilter(newValue || "")}
          inputValue={dateFilter}
          onInputChange={(e, newInputValue) => setDateFilter(newInputValue)}
          clearOnEscape
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter by Date"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 1,
                width: 200,
                "& .MuiInputLabel-root": { color: "#888" },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    {dateFilter && (
                      <IconButton
                        size="small"
                        onClick={() => setDateFilter("")}
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                    {params.InputProps.endAdornment}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>

      {loading ? (
        <Box textAlign="center">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid
          container
          spacing={6}
          justifyContent="center"
          sx={{
            paddingX: "5vw",
            margin: "0 auto",
          }}
        >
          {filteredEvents.map((event, index) => (
            <Grid
              item
              xs={12}
              sm={6} // 1 card on mobile, 2 cards on tablet & up
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  width: "35vw", // fill the Grid column
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 20px rgba(255,255,255,0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={event.image}
                  alt={event.name}
                  loading="lazy"
                />
                <CardContent
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                >
                  <Typography sx={{
                    fontFamily: "'Montserrat', sans-serif"}}>
                    <strong>EVENT:</strong> {event.name}
                  </Typography>
                  <Typography sx={{
                    fontFamily: "'Montserrat', sans-serif"}}>
                    <strong>DATE:</strong> {event.date}
                  </Typography>
                  <Typography sx={{
                    fontFamily: "'Montserrat', sans-serif"}}>
                    <strong>HOST:</strong> {event.host}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
