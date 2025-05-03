import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../components/Header";

const EventDetails = () => {
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
        Event Details
      </Typography>
    </Box>
  );
};

export default EventDetails;
