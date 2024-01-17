import React from 'react';
import '../../data/global';
import { FlatList, StyleSheet, View } from 'react-native';
import TicketItem from './ticketItem';

export default function({tickets, ticketPress}) {
    
    return (
        <View style={styles.ticket_container}>
            <FlatList
                data={tickets}
                renderItem={({item}) => <TicketItem ticket={item} handelItemPress={ticketPress} />}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ticket_container: {
        marginBottom: 40,
    }    
}) 