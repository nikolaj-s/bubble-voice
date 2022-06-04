import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const handleSignIn = createAsyncThunk(
    'signInSlice/handleSignIn',
    async (_, { rejectWithValue }) => {
        //place holder return true until there is 
        return true;
    }
)

const signInSlice = createSlice({
    name: "signInSlice",
    initialState: {

    },
    reducers: {
        redirectToSignUp: (state, action) => {
        }
    },
    extraReducers: {
        [handleSignIn.pending]: (state, action) => {

        },
        [handleSignIn.fulfilled]: (state, action) => {
            
        },
        [handleSignIn.rejected]: (state, action) => {

        }
    }
})


export const {redirectToSignUp} = signInSlice.actions;

export default signInSlice.reducer;