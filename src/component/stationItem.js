import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import '../../data/global';

export default function({station, handelItemPress}) {
    
    return (
        <Pressable style={styles.station_item}
            onPress={() => handelItemPress(station.id)}>
            <Image style={styles.station_image} 
                source={{uri: global.SERVER_ADDRESS+station.company_image}} />
            <Text style={styles.station_item_title}>{station.company_name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    
    station_item: {
        margin: 10
    },
    station_item_title: {
        fontSize: 18,
        marginLeft: 4
    },
    station_image: {
        width: 100,
        height: 100,
        backgroundColor: '#c4c4c4'
    }
}) 