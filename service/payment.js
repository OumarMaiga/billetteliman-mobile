import "../data/global.js";
import * as GLOBAL from "../data/global.js";

export const getPaymentReturn = async(boughtTicketId) => {
    
    if (global.debug >= GLOBAL.LOG.INFO) console.log("PaymentService:getPaymentReturn()");
    
    try {
        const response = await fetch(`${global.SERVER_ADDRESS}/payment/return/${boughtTicketId}`, {
            method: 'POST'
        });

        const body = await response.json();

        if (global.debug >= GLOBAL.LOG.TRACE) console.log("PaymentService:getPaymentReturn()::body", body);

        return body;

    } catch (error) {
        if (global.debug >= GLOBAL.LOG.INFO) console.error("PaymentService:getPaymentReturn()::catch", error);
    }
}