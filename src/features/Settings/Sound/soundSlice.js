import { createSlice } from "@reduxjs/toolkit";

// Helper function to get volume from localStorage or fallback to default
const getSavedVolume = (key, defaultValue) => {
  const savedValue = localStorage.getItem(key);
  return savedValue ? parseFloat(savedValue) : defaultValue;
};

const soundSlice = createSlice({
  name: "soundSlice",
  initialState: {
    notificationVolume: getSavedVolume("notificationVolume", 0.5),
    videoVolume: getSavedVolume("videoVolume", 0.5),
  },
  reducers: {
    setNotifcationVolume: (state, action) => {
      state.notificationVolume = action.payload;
      localStorage.setItem("notificationVolume", action.payload); // Save to localStorage
    },
    setVideoVolume: (state, action) => {
      state.videoVolume = action.payload;
      localStorage.setItem("videoVolume", action.payload); // Save to localStorage
    }
  }
});

export const { setNotifcationVolume, setVideoVolume } = soundSlice.actions;

export default soundSlice.reducer;
