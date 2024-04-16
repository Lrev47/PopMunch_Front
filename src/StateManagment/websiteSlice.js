// Import createSlice
import { createSlice } from "@reduxjs/toolkit";

// Initial state of the UI slice
const initialState = {
  sidebarOpen: false,
};

// Create a slice of the state
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

// Export the reducer and actions
export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
