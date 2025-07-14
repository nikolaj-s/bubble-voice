import { createSlice } from "@reduxjs/toolkit";
import { getMoment } from "./Thunks/getMoment";

const momentSlice = createSlice({
    name: 'momentSlice',
    initialState: {
        loading: false,
        error: false,
        selectedMoment: null,
        messages: []
    },
    reducers: {
        setSelectedMoment: (state, action) => {
            state.messages = [];
            state.selectedMoment = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMoment.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getMoment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getMoment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            const {messages} = action.payload;

            if (Array.isArray(messages)) {
                state.messages = messages;
            }
        })
    }
})

export const {setSelectedMoment} = momentSlice.actions;

export default momentSlice.reducer;