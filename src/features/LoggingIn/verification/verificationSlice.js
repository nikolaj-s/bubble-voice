import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const handleVerificationCode = createAsyncThunk(
    'verificationSlice/handleVerificationCode',
    async (_, {getState, rejectWithValue}) => {
        //const { verificationCode } = getState().verificationCode;

        // verify code
        
    }
)

const verificationSlice = createSlice({
    name: "verificationSlice",
    initialState: {
        verificationCode: "",
        error: false,
        errorMessage: "",
        loading: false
    },
    reducers: {
        closeVerificationError: (state, action) => {

        }
    },
    extraReducers: {

    }
})

export default verificationSlice.reducer;