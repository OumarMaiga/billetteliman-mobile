import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const updateUser = async(user_id, payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("AuthService:updateUser()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/user/update/${user_id}`, {
            method: 'POST',
            body: payload
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
        const response = await fetch(`${global.SERVER_ADDRESS}/user/password/update/${user_id}`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("AuthService:updateUser()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("AuthService:updateUser()::catch", error);
    }
}