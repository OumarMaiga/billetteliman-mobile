import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackScreen } from '../home/index.js';
import { GuestStackScreen } from '../guest/index.js';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = () =>  {
    
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    return (
        <NavigationContainer>
            <Stack.Navigator>
            { isAuthenticated == true ? (
                <Stack.Screen name="App" component={HomeStackScreen} options={{ headerShown: false }}/>
            ) : (
                <Stack.Screen name="Guest" component={GuestStackScreen} options={{ headerShown: false }}/>
            )
            }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;