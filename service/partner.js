import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const getPartner = async(partner_id) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("PartnerService:getPartner()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/partner/${partner_id}/?from-mobile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("PartnerService:getPartner()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("PartnerService:getPartner()::catch", error);
    }
}


export const getPartners = async() => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("PartnerService:getPartners()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/partner/?from-mobile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("PartnerService:getPartners()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("PartnerService:getPartners()::catch", error);
    }
}
