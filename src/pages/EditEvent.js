import React, { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Grid, RadioGroup, Radio, FormControlLabel, Snackbar, Alert
} from "@mui/material";
import Header from "../components/Header";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    attendees: "",
    rsvp: "Yes"
  });
  const [errors, setErrors] = useState({});
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    axios.get(`/mock-api/eventDetails.json`)
      .then(res => {
        const event = res.data.find((e) => e.id === parseInt(id));
        if (event) setFormData(event);
      })
      .catch(err => console.error("Failed to load event details", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Event name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.location) newErrors.location = "Location is required";
    return newErrors;
  };

  const handleUpdate = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Since POST/PUT to public folder doesn't work, simulate success
    setTimeout(() => {
      setSuccessOpen(true);
      setTimeout(() => navigate("/event-details"), 2000);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      date: "",
      time: "",
      location: "",
      attendees: "",
      rsvp: "Yes",
    });
    setErrors({});
  };

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", p: 3, color: "#fff" }}>
      <Header />

      <Typography variant="h4" sx={{
        textAlign: "center", mt: 8, mb: 4,
        fontWeight: 600, fontFamily: "'Montserrat', sans-serif"
      }}>
        Edit Event Details
      </Typography>

      <Box sx={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 4,
        borderRadius: 2,
        maxWidth: 600,
        mx: "auto"
      }}>
        <Grid container spacing={2} direction="column">
         
          <Grid item>
            <Typography sx={{ mb: 0.5 }}>Event Name</Typography>
            <TextField
              fullWidth name="name" value={formData.name}
              onChange={handleChange} error={!!errors.name}
              helperText={errors.name} sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
          </Grid>

          <Grid item>
                      <Typography sx={{ mb: 0.5 }}>Description</Typography>
                      <TextField
                        fullWidth
                        name="description"
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                      />
                    </Grid>

        <Grid item>
                    <Typography sx={{ mb: 0.5 }}>Date</Typography>
                    <TextField
                      fullWidth
                      name="date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.date}
                      onChange={handleChange}
                      sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                    />
                  </Grid>
        <Grid item>
                    <Typography sx={{ mb: 0.5 }}>Time</Typography>
                    <TextField
                      fullWidth
                      name="time"
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      value={formData.time}
                      onChange={handleChange}
                      sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                    />
                  </Grid>

                  <Grid item>
                              <Typography sx={{ mb: 0.5 }}>Location</Typography>
                              <TextField
                                fullWidth
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                error={!!errors.location}
                                helperText={errors.location}
                                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                              />
                            </Grid>

                <Grid item>
                            <Typography sx={{ mb: 0.5 }}>Number of Attendees</Typography>
                            <TextField
                              fullWidth
                              name="attendees"
                              type="number"
                              value={formData.attendees}
                              onChange={handleChange}
                              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                            />
                          </Grid>

                <Grid item>
                            <Typography sx={{ mb: 0.5 }}>RSVP</Typography>
                            <RadioGroup
                              row
                              name="rsvp"
                              value={formData.rsvp}
                              onChange={handleChange}
                            >
                              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                              <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                          </Grid>
                  

          <Grid item sx={{ display: "flex", justifyContent: "flex-end",gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{ backgroundColor: "#81c784", color: "#000", textTransform: "none", height: 36 }}
            >
              Update
            </Button>
            <Button
                          variant="contained"
                          onClick={handleCancel}
                          sx={{ backgroundColor: "#b0b0b0", color: "#000", textTransform: "none", height: 36 }}
                        >
                          Cancel
                        </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar open={successOpen} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Event updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditEvent;
