import React from 'react';
import '../../data/global';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { dateTimeFormat, priceFormat } from '../helper';

export default function({ticket, handelItemPress}) {
    
    return (
        ticket.items.map((ticketData, index) => (
        <Pressable style={styles.ticket_item} key={index}
                onPress={() => handelItemPress(ticketData.id, ticket.timestamp)}>
                <View style={styles.ticket_item_top_container}>
                    <Text style={styles.ticket_station}>{ticketData.partner.companyName}</Text>
                    <Text style={styles.ticket_trajet_price}>{priceFormat(ticketData.price)}</Text>
                </View>
                <View style={styles.dashed_line} />
                <View style={styles.ticket_trajet}>
                    <View style={styles.ticket_depart}>
                        <Text style={styles.ticket_depart_label}>Depart</Text>
                        <Text style={styles.ticket_depart_value}>{ticketData.travelDatas.from}</Text>
                    </View>
                    <View style={styles.ticket_infos}></View>
                    <View style={styles.ticket_destination}>
                        <Text style={styles.ticket_destination_label}>Destination</Text>
                        <Text style={styles.ticket_destination_value}>{ticketData.travelDatas.to}</Text>
                    </View>
                </View>
                <View style={styles.ticket_item_bottom_container}>
                    <Text style={styles.ticket_trajet_date}>{dateTimeFormat(ticket.timestamp, ticketData.travelDatas.departureAt)}</Text>
                    <Text style={styles.custom_button}>Reservez</Text>
                </View>
            </Pressable>
        ))
    )
}

const styles = StyleSheet.create({
    ticket_item: {
        flex: 1,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: "#EFEFEF",
        padding: 10,
    },
    ticket_item_top_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dashed_line: {
        borderTopWidth: 2,
        borderTopColor: '#AAAAAA',
        borderStyle: 'dashed',
        marginVertical: 10
      },
    ticket_trajet: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    ticket_station: {
        fontSize: 20,
        fontWeight: "bold"
    },
    ticket_trajet_price: {
        fontSize: 18,
        color: "#22812B",
        fontWeight: 600
    },
    ticket_depart: {
        flex: 1
    },
    ticket_depart_label: {
        fontSize: 12,
        color: "#979797"
    },
    ticket_depart_value: {
        fontSize: 20,
        fontWeigh: "bold"
    },
    ticket_destination: {
        alignItems: "flex-end",
        flex: 1
    },
    ticket_destination_label: {
        fontSize: 12,
        color: "#979797"
    },
    ticket_destination_value: {
        fontSize: 20,
        fontWeigh: "bold"
    },
    ticket_item_bottom_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    ticket_trajet_date: {
        fontSize: 14,
    },
    custom_button: {
        backgroundColor: "#22812B",
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 18,
    },
    
}) 