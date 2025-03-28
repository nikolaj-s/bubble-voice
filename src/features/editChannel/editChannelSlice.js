const { createSlice } = require("@reduxjs/toolkit");


const editChannelSlice = createSlice({
    name: "editChannelSlice",
    initialState: {
        loading: false,
        selectedChannel: {},
        error: false,
        authorized: false
    }
})

export default editChannelSlice.reducer;