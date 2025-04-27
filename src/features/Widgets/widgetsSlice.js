import { fetchWidgets } from "./Thunks/fetchWidgets";

const { createSlice } = require("@reduxjs/toolkit");

const widgetsSlice = createSlice({
    name: "widgetsSlice",
    initialState: {
        widgets: {},
        loading: false,
        error: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchWidgets.pending, (state) =>{
            state.loading = true;
            state.error = false;
        })
        builder.addCase(fetchWidgets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(fetchWidgets.fulfilled, (state, action) => {
            state.loading = false;
            state.error =false;
            state.widgets[action.payload.channel_id] = action.payload.widgets;
        })
    }
})

export default widgetsSlice.reducer;