import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import LandingPageImage from "../assets/landingPgImg.jpg";

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${LandingPageImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#000",
        position: "relative",
        color: "#fff",
      }}
    >
      <Header />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 1,
          px: 2,
        }}
      >
        <Box>
          <Box
            sx={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              fontWeight: "bold",
              color: "#fff",
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            DREAM EVENT MANAGEMENT
          </Box>

          <Box
            sx={{
              fontFamily: `'Montserrat', sans-serif`,
              fontSize: { xs: "1rem", sm: "1.3rem", md: "1.6rem" },
              color: "#ddd",
              mt: 2,
              textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            Where every moment becomes a memory
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
