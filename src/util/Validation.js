
export const url = 'http://10.0.0.38:3016'

export const getToken = async () => {
    try {
        const keytar = window.require('keytar');

        const token = await keytar.getPassword("TOKEN", "USER_ACCOUNT");

        return token;
    
    } catch (error) {

        return document.cookie.split('token=')[1]
    }
}

export const setToken = async (jwt) => {
    try {
        const keytar = window.require('keytar');

        keytar.setPassword("TOKEN", "USER_ACCOUNT", jwt);
    } catch (error) {
        document.cookie = `token=${jwt}`
    }
}

export const clearToken = async () => {
    try {
        const keytar = window.require('keytar');

        keytar.deletePassword("TOKEN", "USER_ACCOUNT");
    } catch (error) {
        document.cookie = "token=;"
    }
}