import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const getStation = async(station_id, payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("StationService:getStation()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/partner/details/${station_id}`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("StationService:getStation()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("StationService:getStation()::catch", error);
    }
}


export const getStations = async(payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("StationService:getStations()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/partners/details`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("StationService:getStations()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("StationService:getStations()::catch", error);
    }
}
