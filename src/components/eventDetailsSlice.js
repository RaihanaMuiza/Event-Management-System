import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEventDetails = createAsyncThunk(
  "eventDetails/fetchEventDetails",
  async () => {
    const response = await axios.get("/mock-api/eventDetails.json");
    return response.data;
  }
);

const eventDetailsSlice = createSlice({
  name: "eventDetails",
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventDetailsSlice.reducer;
