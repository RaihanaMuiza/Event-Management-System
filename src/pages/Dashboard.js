import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../components/eventSlice.js";
import ClearIcon from "@mui/icons-material/Clear";
import Header from "../components/Header";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.events);
  const [hostFilter, setHostFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <Header onMenuClick={() => setDrawerOpen(true)} />

      {/* pass empty handler for now if no menu needed */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#fff",
          mt: 8, // margin top to push below transparent header
          mb: 4,
          fontWeight: "bold",
        }}
      >
        Upcoming Events
      </Typography>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
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
          {[
            { label: "Upcoming Events", path: "/dashboard" },
            { label: "Event Details", path: "/event-details" },
            { label: "User Profile", path: "/profile" },
          ].map((item) => (
            <ListItem
              button
              key={item.label}
              onClick={() => {
                window.location.href = item.path;
                setDrawerOpen(false);
              }}
              sx={{ justifyContent: "center" }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 24, align: "center" }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Filter Section (Top Right) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mb: 3,
          paddingX: "5vw",
          flexWrap: "wrap", // allows stacking when needed
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
      {/* Events Section */}
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
            paddingX: "5vw", // 5vw side padding
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
                  //maxWidth: "35vw", // make all cards equal width
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
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
