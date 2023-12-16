import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from '../../page/guest/start';
import Login from '../../page/guest/login';
import Register from '../../page/guest/register';

const GuestStack = createNativeStackNavigator();

export const GuestStackScreen = () => {
    return (
        <GuestStack.Navigator initialRouteName='Start'>
            <GuestStack.Screen name="Start" component={Start} options={{headerShown: false}} />
            <GuestStack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <GuestStack.Screen name="Register" component={Register} options={{headerShown: false}} />
        </GuestStack.Navigator>
    )
}