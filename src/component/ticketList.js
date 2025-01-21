import React from 'react';
import '../../data/global';
import { FlatList, StyleSheet, View } from 'react-native';
import TicketItem from './ticketItem';
import { Loading } from './Loading';

export default function({tickets, ticketPress, isTicketsLoading}) {
    
    return (
        <View style={styles.ticket_container}>
            <FlatList
                data={tickets}
                renderItem={({item}) => <TicketItem ticket={item} handelItemPress={ticketPress} />}
                keyExtractor={(item, index) => index}
            />
            <Loading isLoading={isTicketsLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    ticket_container: {
        marginBottom: 40,
    }    
}) 