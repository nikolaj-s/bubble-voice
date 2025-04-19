import { createSlice } from "@reduxjs/toolkit";

const serverContentDataSettingsSlice = createSlice({
    name: "serverContentDataSettingsSlice",
    initialState: {
        error: false,
        loading: false,

    }
})

export default serverContentDataSettingsSlice.reducer;
