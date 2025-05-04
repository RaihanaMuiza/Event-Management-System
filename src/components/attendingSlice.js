import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAttendingEvents = createAsyncThunk(
  "attending/fetchEvents",
  async () => {
    const res = await axios.get("/mock-api/attendingEvents.json");
    return res.data;
  }
);

const attendingSlice = createSlice({
  name: "attending",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendingEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendingEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAttendingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to load attending events";
      });
  },
});

export default attendingSlice.reducer;

