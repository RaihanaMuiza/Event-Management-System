import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../components/eventSlice';

export const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});
