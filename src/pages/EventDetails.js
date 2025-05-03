import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  IconButton,
  Collapse,
  Tooltip,
  TextField,
  InputAdornment,
  Fab,
} from "@mui/material";
import Header from "../components/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventDetails } from "../components/eventDetailsSlice"; 

const EventDetails = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.eventDetails); 
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchEventDetails()); 
  }, [dispatch]);

  const filteredEvents = data.filter((event) =>
    event.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <Box
      sx={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", p: 3 }}
    >
      <Header />

      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mt: 8,
          mb: 4,
          fontWeight: "600",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Event Details
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", px: "5vw", mb: 3 }}
      >
        <TextField
          placeholder="Search by event name"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            width: 300,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

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
            sm={6}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="35vw">
              <Card
                sx={{
                  backgroundColor: "#ddd",
                  color: "#000",
                  height: "50px",
                  px: 2,
                  py: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 6px 12px rgba(255,255,255,0.15)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {event.name}
                </Typography>
                <IconButton onClick={() => handleExpand(index)}>
                  {expandedCard === index ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </Card>

              <Collapse in={expandedCard === index}>
                <Card
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    mt: 1,
                    px: 2,
                    py: 2,
                  }}
                >
                  <Typography sx={{
                    fontWeight: "400",
                    fontFamily: "'Montserrat', sans-serif",
                  }}>{event.description}</Typography>
                  <Typography sx={{ mt: 1, fontWeight: "400",
                    fontFamily: "'Montserrat', sans-serif", }}>
                    <strong>Number of Attendees:</strong> {event.attendees}
                  </Typography>
                  <Typography sx={{
                    fontWeight: "400",
                    fontFamily: "'Montserrat', sans-serif",
                  }}>
                    <strong>Location:</strong> {event.location}
                  </Typography>
                  <Typography sx={{
                    fontWeight: "400",
                    fontFamily: "'Montserrat', sans-serif",
                  }}>
                    <strong>Date & Time:</strong> {event.datetime}
                  </Typography>
                  <Typography sx={{
                    fontWeight: "400",
                    fontFamily: "'Montserrat', sans-serif",
                  }}>
                    <strong>RSVP:</strong> {event.rsvp ? "Yes" : "No"}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 2,
                      gap: 1,
                    }}
                  >
                    <Tooltip title="Edit">
                      <IconButton>
                        <EditIcon sx={{ color: "#555" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton>
                        <DeleteIcon sx={{ color: "#d32f2f" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Collapse>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Tooltip title="Create Event">
        <Fab
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "10px", 
            width: 56,
            height: 56,
            minHeight: "unset", 
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
          onClick={() => (window.location.href = "/create-event")}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default EventDetails;
