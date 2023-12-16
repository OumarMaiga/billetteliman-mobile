import * as React from 'react';
import { Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen, SearchStackScreen, ProfileStackScreen, TicketStackScreen } from '../home/index.js';
import { GuestStackScreen } from '../guest/index.js';
import { Ionicons } from 'react-native-vector-icons';
//import { Logo } from '../../component/logo.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigation = ({navigation}) =>  {
    
    const isAuthenticated = true;
 
    return (
        <NavigationContainer>
            { isAuthenticated == true ? (
                /*<Tab.Navigator>
                    <Tab.Screen name="Home_" component={HomeStackScreen} options={{
                        headerShown: false,
                        title: 'Accueil'}}/>
                    <Tab.Screen name="Recherche" component={SearchStackScreen} options={{
                        headerShown: false,
                        title: 'Recherche' }}/>
                    <Tab.Screen name="Ticket" component={TicketStackScreen} options={{
                        headerShown: false,
                        title: 'Billet' }}/>
                    <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ 
                        headerShown: false,
                        title: 'Profile'}}/>
                </Tab.Navigator>*/
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