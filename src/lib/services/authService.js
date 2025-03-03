
export const getToken = () => {
    try {
        const keytar = window.require('keytar');

        const token = keytar.getPassword("TOKEN", "USER_ACCOUNT");

        return token;
    
    } catch (error) {

        return document.cookie.split('token=')[1]
    }
}

export const setToken = (jwt) => {
    console.log(jwt)
    try {
        const keytar = window.require('keytar');

        keytar.setPassword("TOKEN", "USER_ACCOUNT", jwt);

        return;
    } catch (error) {
        document.cookie = `token=${jwt};`
    }
}

export const clearToken = () => {
    try {
        const keytar = window.require('keytar');

        keytar.deletePassword("TOKEN", "USER_ACCOUNT");

        return;
    } catch (error) {
        document.cookie = "token=;"
    }
}

export const isAuthenticated = () => {
    return getToken();
};