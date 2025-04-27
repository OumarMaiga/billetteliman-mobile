
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
import { Text, TouchableOpacity, View } from 'react-native';
import * as GLOBAL from "../../../data/global.js";
import { Ionicons } from 'react-native-vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Payment from '../../page/home/payment.js';
import BoughtTicket from '../../page/home/bought-ticket.js';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Purchase from '../../page/home/purchase.js';
import { logout } from '../../features/userSlice.js';
import styles from '../../page/home/assets/style/index.js';
import { useDispatch, useSelector } from 'react-redux';

  // ** Drawer ** //
  const Drawer = createDrawerNavigator();

  // ** Home ** //
  const Stack = createNativeStackNavigator();
    
  const ProfileButton = () => {  
    const navigation = useNavigation();
    
    const openDrawer = () => {
      if (global.debug >= GLOBAL.LOG.INFO) console.log("ProfileButton::openDrawer()");
      navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
      <TouchableOpacity onPressIn={openDrawer}
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

const HomeStack = () => {

    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{
                title: '',
                headerLeft: (props) => <Logo {...props} />,
                headerRight: () => <ProfileButton/>,
            }} />
            <Stack.Screen name="SearchBottom" component={SearchBottomSheet} options={{
                headerShown: false,
                presentation: 'transparentModal', 
                animation: 'slide_from_bottom',
            }}/>
            <Stack.Screen name="Ticket" component={Ticket} />
            <Stack.Screen name="Station" component={Station} options={{
                title: '',
                headerLeft: (props) => <Logo {...props} />,
                headerRight: () => <ProfileButton/>,
            }} />
            <Stack.Screen name="Search" component={Search} options={{
                title: '',
                headerLeft: (props) => <Logo {...props} />,
                headerRight: () => <ProfileButton/>,
            }} />
            <Stack.Screen name="Payment" component={Payment} options={{ title: 'Paiement', }} />
            <Stack.Screen name="BoughtTicket" component={BoughtTicket} options={{ title: 'Détail reservation', }} />
        </Stack.Navigator>
    );
}

const PurchaseStack = () => {  
  return (
      <Stack.Navigator initialRouteName='Purchase'>
        <Stack.Screen name="Purchase" component={Purchase} options={{
            title: '',
            headerLeft: (props) => <Logo {...props} />,
            headerRight: () => <ProfileButton/>,
        }} />
        <Stack.Screen name="BoughtTicket" component={BoughtTicket} options={{ title: 'Détail reservation', }} />
      </Stack.Navigator>
  );
}
const ProfileStack = () => {  
    return (
        <Stack.Navigator initialRouteName='Profile'>
          <Stack.Screen name="Profile" component={Profile} options={{
              title: '',
              headerLeft: (props) => <Logo {...props} />,
              headerRight: () => <ProfileButton/>,
          }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: '', }} />
          <Stack.Screen name="EditPassword" component={EditPassword} options={{ title: '', }} />
        </Stack.Navigator>
    );
}

const EditPasswordStack = () => {
    return (
        <Stack.Navigator initialRouteName='EditPassword'>
            <Stack.Screen name="EditPassword" component={EditPassword} options={{
                title: '',
                headerLeft: (props) => <Logo {...props} />,
                headerRight: () => <ProfileButton/>,
            }} />
        </Stack.Navigator>
    );
}

const SettingStack = () => {  
  return (
    <Stack.Navigator initialRouteName='Setting'>
      <Stack.Screen name="Setting" component={Setting} options={{
          title: '',
          headerLeft: (props) => <Logo {...props} />,
          headerRight: () => <ProfileButton/>,
      }} />
    </Stack.Navigator>
  );
}

const CustomDrawerContent = (props) => {

  const user = useSelector((state) => state.user.user);
    
  const dispatch = useDispatch();

  const handleLogout = () => {

    if(global.debug >= GLOBAL.LOG.DEBUG) console.log("ProfileHeader::onLogoutPress()");
    dispatch(logout()); 
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.head_info}>
        <View style={styles.head_icon}>
          <Ionicons name="person" size={30} />
        </View>
        <View style={styles.head_text}>
          <Text style={styles.user_name}>{`${user?.firstname} ${user?.lastname}`}</Text>
          <Text style={styles.user_email}>Utilisateur</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <View style={{ marginTop: 'auto', borderTopWidth: 1, borderTopColor: '#ccc' }}>
          <DrawerItem
            label="Se déconnecter"
            icon={() => (
              <Ionicons name="log-out-outline" size={22} color="#F00" />
            )}
            onPress={handleLogout}
          />
        </View>
    </DrawerContentScrollView>
  );
};

export const HomeStackScreen = () => {
    return (
      <Drawer.Navigator initialRouteName="HomeStack" screenOptions={{ 
        headerShown: false,
        drawerActiveTintColor: '#000',
       }}
        drawerContent={(props)=> <CustomDrawerContent {...props} />}
        >
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{ 
          drawerLabel: 'Accueil',
          drawerIcon: () => <Ionicons name="home" size={22} />,
        }} />
        <Drawer.Screen name="Profile" component={ProfileStack} options={{ 
          drawerLabel: 'Mon profil',
          drawerIcon: () => <Ionicons name="person-circle-sharp" size={22} />,
        }} />
        <Drawer.Screen name="Purchase" component={PurchaseStack} options={{ 
          drawerLabel:'Mes achats',
          drawerIcon: () => <Ionicons name="ticket" size={22} />,
         }} />
        <Drawer.Screen name="EditPasswordStack" component={EditPasswordStack} options={{ 
          drawerLabel:'Changer mot de passe',
          drawerIcon: () => <Ionicons name="key" size={22} />,
         }} />
        <Drawer.Screen name="SettingStack" component={SettingStack} options={{ 
          drawerLabel:'Paramètre',
          drawerIcon: () => <Ionicons name="settings" size={22} />,
         }} />
      </Drawer.Navigator>
    );
}
