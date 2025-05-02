import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../components/eventSlice";
import LazyLoadWrapper from "../components/LazyLoadWrapper";

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
      (!hostFilter || event.host === hostFilter) &&
      (!dateFilter || event.date === dateFilter)
    );
  });

  const hosts = [...new Set(data.map((e) => e.host))];
  const dates = [...new Set(data.map((e) => e.date))];

  return (
    <Box
      sx={{ p: 3, backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 3 }}>
        <TextField
          select
          label="Filter by Host"
          value={hostFilter}
          onChange={(e) => setHostFilter(e.target.value)}
          sx={{ backgroundColor: "#fff", borderRadius: 1, width: 200 }}
        >
          {hosts.map((host) => (
            <MenuItem key={host} value={host}>
              {host}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          sx={{ backgroundColor: "#fff", borderRadius: 1, width: 200 }}
        >
          {dates.map((date) => (
            <MenuItem key={date} value={date}>
              {date}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {loading ? (
        <Box textAlign="center">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <LazyLoadWrapper height="300px">
                <Card
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 20px rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.image}
                    alt={event.name}
                    loading="lazy" 
                  />
                  <CardContent sx={{ backgroundColor: "#fff", color: "#000" }}>
                    <Typography>
                      <strong>Event:</strong> {event.name}
                    </Typography>
                    <Typography>
                      <strong>Date:</strong> {event.date}
                    </Typography>
                    <Typography>
                      <strong>Host:</strong> {event.host}
                    </Typography>
                  </CardContent>
                </Card>
              </LazyLoadWrapper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
