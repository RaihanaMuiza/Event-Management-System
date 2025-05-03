import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../components/eventSlice';
import eventDetailsReducer from "../components/eventDetailsSlice";

export const store = configureStore({
  reducer: {
    events: eventReducer,
    eventDetails: eventDetailsReducer,
  },
});
