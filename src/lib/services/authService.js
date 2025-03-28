
export const getToken = () => {
    try {
        const keytar = window.require('keytar');

        const token = localStorage.getItem("TOKEN");
        
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

        localStorage.setItem("TOKEN", jwt);

        return;
    } catch (error) {
        document.cookie = `token=${jwt};`
    }
}

export const clearToken = () => {
    try {
        const keytar = window.require('keytar');

        localStorage.removeItem("TOKEN");

        return;
    } catch (error) {
        document.cookie = "`token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Lax;"
    }
}

export const isAuthenticated = () => {
    return getToken();
};

