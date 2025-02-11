import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackScreen } from '../home/index.js';
import { GuestStackScreen } from '../guest/index.js';
import { useSelector } from 'react-redux';
import { createURL } from 'expo-linking'

const Stack = createNativeStackNavigator();

const prefix = createURL('/');

const Navigation = () =>  {
    
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    
    const linking = {
        prefixes: [prefix],
    };

    return (
        <NavigationContainer linking={linking}>
            { isAuthenticated == true ? (
                <Stack.Navigator>
                    <Stack.Screen name="Home_" component={HomeStackScreen} options={{ headerShown: false }}/>
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Guest" component={GuestStackScreen} options={{ headerShown: false }}/>
                </Stack.Navigator>
            )
            }
        </NavigationContainer>
    );
}

export default Navigation;