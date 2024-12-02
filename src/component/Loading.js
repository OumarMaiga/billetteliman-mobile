import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const Loading = ({isLoading}) => {
    isLoading &&
        <View style={styles.loading_container}>
            <ActivityIndicator size="large" color="#22812B"/>
        </View>
}
const styles = StyleSheet.create({
    loading_container: {
      position: 'absolute',
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center" ,
      top: 100,
      right: 0,
      bottom: 0,
      left: 0,
    }
});