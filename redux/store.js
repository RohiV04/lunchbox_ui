// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for the phone number
const phoneNumberSlice = createSlice({
  name: 'phoneNumber',
  initialState: null,
  reducers: {
    setPhoneNumber: (state, action) => {
      return action.payload;
    },
  },
});

// Create the Redux store with the phoneNumberSlice
const store = configureStore({
  reducer: {
    phoneNumber: phoneNumberSlice.reducer,
  },
});

// Export the store and action creator
export const { setPhoneNumber } = phoneNumberSlice.actions;
export default store;
