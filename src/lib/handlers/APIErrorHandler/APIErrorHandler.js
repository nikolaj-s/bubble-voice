

export const APIErrorHandler = (rejectWithValue = () => {}, error = {}, errorPlaceholder = "Internal Server Error") => {
    if (error.response) {
        // Server responded with a status code outside 2xx
        return rejectWithValue(error.response.data?.errorMessage || 'Invalid credentials');
    } else if (error.request) {
        // Request was made but no response received
        return rejectWithValue('No response from the server');
    } else {
        // Something else went wrong
        return rejectWithValue(errorPlaceholder);
    } 
}