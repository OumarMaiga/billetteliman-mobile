import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import '../../data/global';

export default function({station, handelItemPress}) {
    
    return (
        <TouchableOpacity style={styles.station_item}
            onPress={() => handelItemPress(station["1"].id)}>
            <Image style={styles.station_image} 
                source={{uri: station["1"].imagePath}} />
            <Text style={styles.station_item_title}>{station["1"].name}</Text>
        </TouchableOpacity>
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