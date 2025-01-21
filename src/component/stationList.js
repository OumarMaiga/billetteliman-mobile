import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import '../../data/global';
import StationItem from './stationItem';

export default function({stations, stationPress}) {
    
    return (
        <View style={styles.station_container}>
            <View style={styles.station_item_container}>
                <Text style={styles.station_title}>Nos partenaires</Text>
                <FlatList
                    data={stations}
                    renderItem={({item}) => <StationItem station={item} handelItemPress={stationPress} />}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    station_container: {
        margin: 5,
    },
    station_title: {
        fontSize: 22,
        marginLeft: 10
    },
    station_item_container: {
        flex: 1
    },
}) 