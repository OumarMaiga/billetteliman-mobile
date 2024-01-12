import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const login = async(payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("AuthService:login()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/api/login/log-me/?from-mobile`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("AuthService:login()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("AuthService:login()::catch", error);
    }
}

export const register = async(payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("AuthService:register()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/api/register/try/?from-mobile`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("AuthService:register()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("AuthService:register()::catch", error);
    }
}

export const updateUser = async(user_id, payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("AuthService:updateUser()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/api/user/update/${user_id}/?from-mobile`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("AuthService:updateUser()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("AuthService:updateUser()::catch", error);
    }
}

export const changePassword = async(user_id, payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("AuthService:updateUser()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/api/user/password/change/${user_id}/?from-mobile`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("AuthService:updateUser()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("AuthService:updateUser()::catch", error);
    }
}