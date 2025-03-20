
export const getToken = () => {
    try {
        const keytar = window.require('keytar');

        const token = keytar.getPassword("TOKEN", "USER_ACCOUNT");

        return token;
    
    } catch (error) {

        const match = document.cookie.match(/(^| )token=([^;]+)/);
        
        return match ? match[2] : null;
    }
}

export const setToken = (jwt) => {

    if (jwt.split('.').length !== 3) return;

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
        document.cookie = "`token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Lax;"
    }
}

export const isAuthenticated = () => {
    return getToken();
};

