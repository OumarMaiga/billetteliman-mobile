
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../page/home/home.js';
import Search from '../../page/home/search.js';
import Profile from '../../page/home/profile.js';
import EditProfile from '../../page/home/edit-profile.js';
import EditPassword from '../../page/home/edit-password.js';
import Ticket from '../../page/home/ticket.js';
import Station from '../../page/home/station.js';
import Setting from '../../page/home/setting.js';
import SearchBottomSheet from '../../page/home/search-bottom-sheet.js';
import { Logo } from '../../component/index.js';
import { TouchableOpacity } from 'react-native';
import * as GLOBAL from "../../../data/global.js";
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import Payment from '../../page/home/payment.js';
import BoughtTicket from '../../page/home/bought-ticket.js';

export const HomeStackScreen = () => {
  
  const ProfileButton = () => {  
    const navigation = useNavigation();
    
    const profilePress = () => {
      if (global.debug >= GLOBAL.LOG.INFO) console.log("ProfileButton::profilePress()");
      navigation.navigate('Profile');
    }

    return (
      <TouchableOpacity onPress={profilePress}
        style={{
          borderWidth: 1,
          borderColor: '#fff',
          borderRadius: 40,
          padding: 4,
        }}>
        <Ionicons name="person-circle-sharp" size={36} color="#000" />
      </TouchableOpacity>
    );
  };
  
  // ** Home ** //
  const HomeStack = createNativeStackNavigator();
    return (
        <HomeStack.Navigator initialRouteName='Home'>
            <HomeStack.Screen name="Home" component={Home} options={{
                title: '',
                headerLeft: (props) => <Logo {...props} />,
                headerRight: () => <ProfileButton/>,
            }} />
            <HomeStack.Screen name="SearchBottom" component={SearchBottomSheet} options={{
                headerShown: false,
                presentation: 'transparentModal', 
                animation: 'slide_from_bottom',
            }}/>
            <HomeStack.Screen name="Ticket" component={Ticket} />
            <HomeStack.Screen name="Station" component={Station} options={{
                title: '',
                headerLeft: (props) => <Logo {...props} />,
                headerRight: () => <ProfileButton/>,
            }} />
            <HomeStack.Screen name="Search" component={Search} options={{
                title: '',
                headerLeft: (props) => <Logo {...props} />,
                headerRight: () => <ProfileButton/>,
            }} />
            <HomeStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <HomeStack.Screen name="EditProfile" component={EditProfile} options={{ title: '', }} />
            <HomeStack.Screen name="EditPassword" component={EditPassword} options={{ title: '', }} />
            <HomeStack.Screen name="Setting" component={Setting} options={{ title: '', }}/>
            <HomeStack.Screen name="Payment" component={Payment} options={{ title: 'Paiement', }} />
            <HomeStack.Screen name="BoughtTicket" component={BoughtTicket} options={{ title: 'Détail reservation', }} />
        </HomeStack.Navigator>
    )
}
