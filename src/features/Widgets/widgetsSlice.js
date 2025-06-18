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
        },
        removeWidget: (state, action) => {
            if (state.widgets[action.payload.channel_id]) {
                state.widgets[action.payload.channel_id] = state.widgets[action.payload.channel_id].filter(w => w._id !== action.payload._id)
            }
        },
        updateWidget: (state, action) => {
            if (state.widgets[action.payload.channel_id]) {
                state.widgets[action.payload.channel_id] = state.widgets[action.payload.channel_id].map(w => {
                    if (w._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return w;
                    }
                })
            }
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

export const {setChannelToViewWidgetsOf, removeWidget, updateWidget} = widgetsSlice.actions;

export default widgetsSlice.reducer;