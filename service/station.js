import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const getStation = async(station_id) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("StationService:getStation()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/api/station/${station_id}/?from-mobile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("StationService:getStation()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("StationService:getStation()::catch", error);
    }
}


export const getStations = async() => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("StationService:getStations()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/api/station/?from-mobile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("StationService:getStations()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("StationService:getStations()::catch", error);
    }
}
