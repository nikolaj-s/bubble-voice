import { fetchWidgets } from "./Thunks/fetchWidgets";

const { createSlice } = require("@reduxjs/toolkit");

const widgetsSlice = createSlice({
    name: "widgetsSlice",
    initialState: {
        widgets: {},
        loading: false,
        error: false,
        channel: null
    },
    reducers: {
        setChannelToViewWidgetsOf: (state, action) => {
            state.channel = action.payload;
        }
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

            console.log(state.widgets[action.payload.channel_id])
        })
    }
})

export const {setChannelToViewWidgetsOf} = widgetsSlice.actions;

export default widgetsSlice.reducer;