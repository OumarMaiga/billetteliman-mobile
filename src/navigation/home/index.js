
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../page/home/home.js';
import Search from '../../page/home/search.js';
import Ticket from '../../page/home/ticket.js';
import Profile from '../../page/home/profile.js';
import EditProfile from '../../page/home/edit-profile.js';
import EditPassword from '../../page/home/edit-password.js';
import Detail from '../../page/home/detail.js';
import Partner from '../../page/home/partner.js';

// ** Home ** //
const HomeStack = createNativeStackNavigator();
export const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName='Home'>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="Detail" component={Detail} />
            <HomeStack.Screen name="Partner" component={Partner} />
            <HomeStack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <HomeStack.Screen name="EditProfile" component={EditProfile} options={{ title: '', }}/>
            <HomeStack.Screen name="EditPassword" component={EditPassword} options={{ title: '', }}/>
        </HomeStack.Navigator>
    )
}


// ** Search ** //
const SearchStack = createNativeStackNavigator();
export const SearchStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName='Search'>
            <HomeStack.Screen name="Search" component={Search} options={{headerShown: false}} />
        </HomeStack.Navigator>
    )
}

// ** Ticket ** //
const TicketStack = createNativeStackNavigator();
export const TicketStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName='Ticket'>
            <HomeStack.Screen name="Ticket" component={Ticket} options={{headerShown: false}} />
        </HomeStack.Navigator>
    )
}

// ** Profile ** //
const ProfileStack = createNativeStackNavigator();
export const ProfileStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName='Profile'>
            <HomeStack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
        </HomeStack.Navigator>
    )
}
