export const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,30}$/; // Username should be alphanumeric and 3-30 characters long
    return regex.test(username);
};

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Simple email validation
    return regex.test(email);
};

export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
    // Password must be at least 8 characters, contain letters and numbers
    return regex.test(password);
};

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword; // Confirm password must match the password
};

