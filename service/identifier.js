import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const getIdentifier = async(identifier_id) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("IdentifierService:getIdentifier()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/identifier/details/${identifier_id}`, {
            method: 'POST'
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("IdentifierService:getIdentifier()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("IdentifierService:getIdentifier()::catch", error);
    }
}


export const getIdentifiers = async() => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("IdentifierService:getIdentifiers()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/identifiers/details`, {
            method: 'POST'
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("IdentifierService:getIdentifiers()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("IdentifierService:getIdentifiers()::catch", error);
    }
}