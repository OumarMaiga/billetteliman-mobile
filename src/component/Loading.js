import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export const Loading = ({isLoading}) => {
    return (
        isLoading &&
        <View style={styles.loading_container}>
            <ActivityIndicator size="large" color="#22812B"/>
        </View>
    )
}
const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        justifyContent: "center", 
        alignItems: "center" ,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
});