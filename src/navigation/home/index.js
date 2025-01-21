
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../page/home/home.js';
import Search from '../../page/home/search.js';
import Tickets from '../../page/home/tickets.js';
import Profile from '../../page/home/profile.js';
import EditProfile from '../../page/home/edit-profile.js';
import EditPassword from '../../page/home/edit-password.js';
import Ticket from '../../page/home/ticket.js';
import Station from '../../page/home/station.js';
import Setting from '../../page/home/setting.js';
import SearchBottomSheet from '../../page/home/search-bottom-sheet.js';

// ** Home ** //
const HomeStack = createNativeStackNavigator();
export const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName='Home'>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="SearchBottom" component={SearchBottomSheet} options={{
                headerShown: false,
                presentation: 'transparentModal', 
                animation: 'slide_from_bottom'
            }}/>
            <HomeStack.Screen name="Ticket" component={Ticket} />
            <HomeStack.Screen name="Station" component={Station} />
            <HomeStack.Screen name="Search" component={Search} />
            <HomeStack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <HomeStack.Screen name="EditProfile" component={EditProfile} options={{ title: '', }}/>
            <HomeStack.Screen name="EditPassword" component={EditPassword} options={{ title: '', }}/>
            <HomeStack.Screen name="Setting" component={Setting} options={{ title: '', }}/>
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
        <HomeStack.Navigator initialRouteName='Tickets'>
            <HomeStack.Screen name="Tickets" component={Tickets} options={{headerShown: false}} />
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
