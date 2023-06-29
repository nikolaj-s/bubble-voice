import { createSlice } from "@reduxjs/toolkit";


const MemberPanelSlice = createSlice({
    name: "MemberPanelSlice",
    initialState: {
        selectedMember: "",
        posX: 0,
        posY: 0,
        origin: false,
        left: null
    },
    reducers: {
        setSelectedMember: (state, action) => {
            if (state.selectedMember === action.payload) {
                state.selectedMember = ""
            } else {
                state.selectedMember = action.payload;
            }
            
        },
        setPanelPosition: (state, action) => {
            state.posX = action.payload.x;
            state.posY = action.payload.y;
            state.origin = action.payload.origin;
            state.left = action.payload.left;
        }
    }
})

// selectors
export const selectPanelPositionY = state => state.MemberPanelSlice.posY;

export const selectPanelPositionX = state => state.MemberPanelSlice.posX;

export const selectCurrentMemberPanel = state => state.MemberPanelSlice.selectedMember;

export const selectPanelOrigin = state => state.MemberPanelSlice.origin;

export const selectPanelLeftPos = state => state.MemberPanelSlice.left;

export const { setSelectedMember, setPanelPosition } = MemberPanelSlice.actions;

export default MemberPanelSlice.reducer;