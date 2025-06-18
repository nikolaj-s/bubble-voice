import { createSlice } from "@reduxjs/toolkit";
import { fetchPinnedWidgets } from "./Thunks/fetchPinnedWIdgets";


const pinnedWidgetsSlice = createSlice({
    name: "pinnedWidgetsSlice",
    initialState: {
        widgets: [],
        loading: false,
        error: false
    },
    reducers: {
        addPinnedWidget: (state, action) => {
            // payload may be a widget object or just an _id string
            const incoming = action.payload
            const id = typeof incoming === 'string' ? incoming : incoming._id

            // remove any existing with same id
            state.widgets = state.widgets.filter(w => w._id !== id)

            // push the new widget (object or id) onto the end
            state.widgets.push(incoming);

            if (!action.payload.server_id) return;
            
            try {
                const cacheKey = `pinnedWidgets_${action.payload.server_id}`
                sessionStorage.setItem(cacheKey, JSON.stringify(state.widgets))
            } catch (e) {
                console.warn('Could not write pinnedWidgets to sessionStorage', e)
            }
        },

        removePinnedWidget: (state, action) => {
            // payload may be a widget object or just an _id string
            const incoming = action.payload
            const id = typeof incoming === 'string' ? incoming : incoming._id

            // filter out anything matching that id
            state.widgets = state.widgets.filter(w => w._id !== id);

            if (!action.payload.server_id) return;

            try {
                const cacheKey = `pinnedWidgets_${action.payload.server_id}`
                sessionStorage.setItem(cacheKey, JSON.stringify(state.widgets))
            } catch (e) {
                console.warn('Could not write pinnedWidgets to sessionStorage', e)
            }
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPinnedWidgets.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.widgets = [];
        })
        builder.addCase(fetchPinnedWidgets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(fetchPinnedWidgets.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.widgets = action.payload;
        })
    }
})

export const {addPinnedWidget, removePinnedWidget} = pinnedWidgetsSlice.actions;

export default pinnedWidgetsSlice.reducer;