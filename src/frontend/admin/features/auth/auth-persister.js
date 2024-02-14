const AUTH_STORE_KEY = 'la-auth';

export function persistAuth(auth) {
    if (!auth.userToken) {
        localStorage.removeItem(AUTH_STORE_KEY);
        return;
    }

    localStorage.setItem(
        AUTH_STORE_KEY, 
        JSON.stringify({
            token: auth.userToken,
            info: auth.userInfo
        })
    );
}

export function loadAuth() {
    const storedAuth = localStorage.getItem(AUTH_STORE_KEY);
    if (storedAuth) {
        const obj = JSON.parse(storedAuth);
        return {
            userToken: obj.token,
            userInfo: obj.info
        }
    }

    return {};
}