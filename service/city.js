import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const getCity = async(city_id, payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("CityService:getCity()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/city/details/${city_id}`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("CityService:getCity()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("CityService:getCity()::catch", error);
    }
}


export const getCities = async(payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("CityService:getCities()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/cities/details`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("CityService:getCities()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("CityService:getCities()::catch", error);
    }
}
