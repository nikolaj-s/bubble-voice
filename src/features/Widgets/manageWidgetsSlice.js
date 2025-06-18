import { createSlice } from "@reduxjs/toolkit";
import { createWidget } from "./Thunks/createWidget";
import { fetchWidgetsToManage } from "./Thunks/fetchWidgetsToManage";
import { deleteWidget } from "./Thunks/deleteWidget";
import { reorderWidgets } from "./Thunks/reorderWidgets";
import { editWidget } from "./Thunks/editWidget";

const manageWidgetsSlice = createSlice({
    name: 'manageWidgetsSlice',
    initialState: {
        loading: false,
        error: false,
        widgets: [],
        channel_id: null,
        selectedWidget: null,
    },
    reducers: {
        setManageWidgetsForChannel: (state, action) => {
            state.channel_id = action.payload;
        }
    },
    extraReducers: (builder) => {
        // create widget
        builder.addCase(createWidget.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(createWidget.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createWidget.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.widgets = action.payload;
        })

        // fetch widgets to manage
        builder.addCase(fetchWidgetsToManage.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(fetchWidgetsToManage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(fetchWidgetsToManage.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.widgets = action.payload;
        })

        // delete widget
        builder.addCase(deleteWidget.pending, (state) => {
            state.loading = false;
            state.error = false;
        })
        builder.addCase(deleteWidget.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(deleteWidget.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.widgets = state.widgets.filter(widget => widget._id !== action.payload._id);
        })

        // reorder widgets
        builder.addCase(reorderWidgets.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(reorderWidgets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(reorderWidgets.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.widgets = action.payload;
        })

        // edit widget
        builder.addCase(editWidget.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(editWidget.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(editWidget.fulfilled, (state, action) => {
            state.error = false;
            state.loading = false;
            state.widgets = state.widgets.map(w => {
                if (w._id === action.payload._id) {
                    return action.payload;
                } else {
                    return w;
                }
            })
        })
    }
})

export const {setManageWidgetsForChannel} = manageWidgetsSlice.actions;

export default manageWidgetsSlice.reducer;