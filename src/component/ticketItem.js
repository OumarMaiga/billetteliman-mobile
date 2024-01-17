import React from 'react';
import '../../data/global';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { dateToDateHourString, priceFormat } from '../helper';

export default function({ticket, handelItemPress}) {
    
    return (
        <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
                onPress={() => handelItemPress(ticket.id)}>
                <View style={styles.ticket_item_top_container}>
                    <View>
                        <Text style={styles.ticket_trajet}>{ticket.start_point} - {ticket.end_point}</Text>
                        <Text style={styles.ticket_trajet_date}>{dateToDateHourString(ticket.departure_date)}</Text>
                    </View>
                    <Text style={styles.ticket_station}>{ticket.company_name}</Text>
                </View>
                <View style={styles.ticket_item_bottom_container}>
                    <Text style={styles.ticket_trajet_price}>{priceFormat(ticket.price)}</Text>
                    <Pressable
                        onPress={() => handelItemPress(ticket.id)}>
                        <Text style={styles.custom_button}>Acheter</Text>
                    </Pressable>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    ticket_item: {
        flex: 1,
        margin: 10,
        height: 100,
        flexDirection: "row",
        backgroundColor: "#EFEFEF",
        padding: 10,
        borderWidth: 1,
        borderColor: "#22812B",
        borderRadius: 10
    },
    ticket_item_container: {
        flex: 1,
        marginLeft: 5,
        justifyContent: "space-between"
    },
    ticket_trajet: {
        fontSize: 18
    },
    ticket_station: {
        fontSize: 16,
        fontWeight: "bold"
    },
    ticket_item_top_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"

    },
    ticket_item_bottom_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    ticket_trajet_date: {
        fontSize: 12,
        fontWeight: '300'
    },
    ticket_trajet_price: {
        fontSize: 18,
    },
    custom_button: {
        backgroundColor: "#22812B",
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 18,
    },
    
}) 