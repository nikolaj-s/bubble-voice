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
        addSavedMedia: (state, action) => {
            
            if (state.widgets[action.payload.channel_id]) {
                
                state.widgets[action.payload.channel_id] = state.widgets[action.payload.channel_id].map(w => {

                    if (w.widget_type === 'media_player') {

                        const saves = w.config.saves || [];
                        console.log('updated saves')
                        return {...w, config: {saves: [action.payload.media, ...saves]}}

                    }

                    return w;
                })

            }
        },
        removeSavedMedia: (state, action) => {

            if (state.widgets[action.payload.channel_id]) {
                state.widgets[action.payload.channel_id] = state.widgets[action.payload.channel_id].map(w => {
                    if (w.widget_type === 'media_player') {

                        const saves = w.config.saves || [];

                        return {...w, config: {saves: saves.filter(s => s._id !== action.payload.media_id)}}

                    } 

                    return w;
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

export const {
    addSavedMedia,
    removeSavedMedia
} = widgetsSlice.actions;

export default widgetsSlice.reducer;