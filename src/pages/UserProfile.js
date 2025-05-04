import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  CircularProgress,
} from "@mui/material";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendingEvents } from "../components/attendingSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.attending);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAttendingEvents());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", p: 3 }}>
      <Header />

      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#fff",
          mt: 8,
          mb: 4,
          fontWeight: "600",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        User Profile
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300, backgroundColor: "#fff", borderRadius: 1 }}
        />
      </Box>

      {loading ? (
        <Box textAlign="center">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        filteredUsers.map((user) => (
          <Box key={user.id} sx={{ mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                ml: 3,
                mb: 2,
                flexWrap: "wrap",
              }}
            >
              <Avatar>{user.name?.charAt(0)}</Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "0.85rem", color: "#aaa" }}>{user.email} | Attending {user.events.length} {user.events.length === 1 ? "event" : "events"}</Typography> 
                {/* <Typography variant="body2" sx={{ fontSize: "0.85rem", color: "#aaa" }}>
                  Attending {user.events.length} {user.events.length === 1 ? "event" : "events"}
                </Typography> */}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "flex-start",
                ml: 9,
                "@media (max-width: 600px)": {
                  justifyContent: "center",
                  ml: 0,
                },
              }}
            >
              {user.events.map((event) => (
                <Box
                  key={event.id}
                  sx={{
                    backgroundColor: "#222",
                    color: "#fff",
                    padding: 2,
                    borderRadius: 2,
                    width: "250px",
                    boxShadow: 2,
                  }}
                >
                  <Typography fontWeight="bold">{event.name}</Typography>
                  <Typography fontSize="0.9rem">Date: {event.date}</Typography>
                  <Typography fontSize="0.9rem">Location: {event.location}</Typography>
                  <Typography fontSize="0.9rem">RSVP: {event.rsvp}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default UserProfile;