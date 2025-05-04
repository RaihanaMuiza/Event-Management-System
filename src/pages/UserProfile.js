import React, { useEffect } from "react";
import {
  Box, Typography, Card, CardContent, CircularProgress, Grid
} from "@mui/material";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendingEvents } from "../components/attendingSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.attending);

  useEffect(() => {
    dispatch(fetchAttendingEvents());
  }, [dispatch]);

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", p: 3 }}>
      <Header />

      <Typography variant="h4" sx={{
        textAlign: "center", mt: 8, mb: 4,
        fontWeight: 600, fontFamily: "'Montserrat', sans-serif"
      }}>
        User Profile
      </Typography>

      <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
        Events You Are Attending
      </Typography>

      {loading ? (
        <Box textAlign="center">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        data.map((user) => (
          <Box key={user.id} sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontFamily: "'Montserrat', sans-serif" }}>
              {user.user}
            </Typography>
            <Grid container spacing={4}>
              {user.events.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 20px rgba(255,255,255,0.2)"
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">{event.name}</Typography>
                      <Typography>Date: {event.date}</Typography>
                      <Typography>Location: {event.location}</Typography>
                      <Typography>RSVP: {event.rsvp}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );
};

export default UserProfile;
