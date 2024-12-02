import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const login = async(payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("AuthService:login()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/login`, {
            method: 'POST',
            body: payload
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
        const response = await fetch(`${global.SERVER_ADDRESS}/register`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("AuthService:register()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("AuthService:register()::catch", error);
    }
}
