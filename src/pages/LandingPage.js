import React, { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../components/Header";
import LandingPageImage from "../assets/landingPgImg.jpg";

const LandingPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = ["Upcoming Events", "Event Details", "User Profile"];

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
      <Header onMenuClick={() => setDrawerOpen(true)} />

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
              fontFamily: `"Playfair Display", serif`,
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              fontWeight: "bold",
              color: "#fff",
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            Dream
          </Box>
          <Box
            sx={{
              fontFamily: `"Playfair Display", serif`,
              fontSize: { xs: "1.5rem", sm: "2.2rem", md: "2.8rem" },
              color: "#fff",
              textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            Event Management
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.75)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(false)}
          sx={{ position: "absolute", top: 20, right: 20, color: "#fff" }}
        >
          <CloseIcon />
        </IconButton>

        <List>
          {menuItems.map((item) => (
            <ListItem button key={item} sx={{ justifyContent: "center" }}>
              <ListItemText
                primary={item}
                primaryTypographyProps={{ fontSize: 24, align: "center" }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default LandingPage;
