import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const getTicket = async(ticket_id, payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getTicket()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/ticket/details/${ticket_id}`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getTicket()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getTicket()::catch", error);
    }
}


export const getTickets = async(payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getTickets()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/search/tickets`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getTickets()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getTickets()::catch", error);
    }
}

export const getStationTickets = async(station_id, payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getStationTickets()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/ticket/partner/${station_id}`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getStationTickets()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getStationTickets()::catch", error);
    }

} 

export const getTicketsSearched = async (payload, param) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getTicketsSearched()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/search/tickets?start-point=${param.start_point}&end-point=${param.end_point}&start-search-date=${param.departure_date}&end-search-date=${param.departure_date}`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getTicketsSearched()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getTicketsSearched()::catch", error);
    }

}

export const getBoughtTicket = async(boughtTicketId) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getBoughtTicket()");
    
    try {
        console.log(`${global.SERVER_ADDRESS}/bought-ticket/details/${boughtTicketId}`);
        const response = await fetch(`${global.SERVER_ADDRESS}/bought-ticket/details/${boughtTicketId}`, {
            method: 'POST'
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getBoughtTicket()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getBoughtTicket()::catch", error);
    }

} 

export const getBoughtTicketList = async(user_id) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getBoughtTicket()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/users/bought-tickets/${user_id}`, {
            method: 'POST'
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getBoughtTicketList()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getBoughtTicketList()::catch", error);
    }

} 

export const boughtTicket = async(ticket_id, payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:boughtTicket()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/bought-ticket/${ticket_id}`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:boughtTicket()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:boughtTicket()::catch", error);
    }

} 