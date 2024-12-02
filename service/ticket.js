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

export const getTicketBuyList = async(user_id) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getTicketBuyList()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/users/bought-tickets/${user_id}`, {
            method: 'POST'
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getTicketBuyList()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getTicketBuyList()::catch", error);
    }

} 

export const buyTicket = async(ticket_id, payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:buyTicket()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/ticket/buy/${ticket_id}/?user_id=${payload.user_id}`, {
            method: 'POST',
            body: payload
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:buyTicket()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:buyTicket()::catch", error);
    }

} 