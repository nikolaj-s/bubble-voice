const { createSlice } = require("@reduxjs/toolkit");

const userProfileSlice = createSlice({
    name: 'userProfileSlice',
    initialState: {
        loading: false,
        error: false,
        user: null
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const {setUserProfile} = userProfileSlice.actions;

export default userProfileSlice.reducer;