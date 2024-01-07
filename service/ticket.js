import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const getTicket = async(ticket_id) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getTicket()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/ticket/${ticket_id}/?from-mobile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getTicket()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getTicket()::catch", error);
    }
}


export const getTickets = async() => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getTickets()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/ticket/?from-mobile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getTickets()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getTickets()::catch", error);
    }
}

export const getPartnerTickets = async(partner_id) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getPartnerTickets()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/ticket/partner/${partner_id}/?from-mobile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getPartnerTickets()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getPartnerTickets()::catch", error);
    }

} 

export const getTicketSearched = async (payload) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getTicketSearched()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/search/?start_point=${payload.start_point}&end_point=${payload.end_point}&departure_date=${payload.departure_date}&ticket_count=${payload.ticket_count}/?from-mobile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:getTicketSearched()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:getTicketSearched()::catch", error);
    }

}

export const getTicketBuyList = async(user_id) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("TicketService:getTicketBuyList()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/ticket/buy/${user_id}/?from-mobile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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
        const response = await fetch(`${global.SERVER_ADDRESS}/ticket/buy/${ticket_id}/?from-mobile`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("TicketService:buyTicket()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("TicketService:buyTicket()::catch", error);
    }

} 