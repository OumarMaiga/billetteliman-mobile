import * as React from 'react';
import { Image, View, Pressable, Text } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Ionicons } from 'react-native-vector-icons';
import styles from './assets/style';
import * as GLOBAL from '../../data/global';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/user';

export const Logo = () => {

    return (
        <Image source={require("../../assets/logo.png")} 
        style={{width: 40, height: 40}} />
    );
}

export const ProfileHeader = ({navigation}) => {
	
    dispatch = useDispatch();
	
    const returnPress = () => {
		navigation.goBack();
	}

    const onLogoutPress = () => {

        if(global.debug >= GLOBAL.LOG.DEBUG) console.log("ProfileHeader::onLogoutPress()");

        dispatch(logout());
    }

    return (
        <MenuProvider>
            <View style={styles.profile_header}>        
                <View style={styles.profile_header_icon_container}>
                <Pressable onPress={returnPress}>
                    <Ionicons name="arrow-back" size={32} color="#fff" />
                </Pressable>
                <Menu onSelect={value => navigation.navigate(value)}>
                    <MenuTrigger>
                        <Ionicons name="ellipsis-vertical" size={32} color="#fff" />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption value={"EditProfile"} style={styles.menu_item}>
                            <Ionicons name="refresh" size={18} color="#000" />
                            <Text style={{marginLeft: 5, marginRight: 5, fontSize: 16}}>Modifier le profil</Text>
                        </MenuOption>
                        <MenuOption value={"EditPassword"} style={styles.menu_item}>
                            <Ionicons name="key" size={18} color="#000" />
                            <Text style={{marginLeft: 5, marginRight: 5, fontSize: 16}}>Changer le mot de passe</Text>
                        </MenuOption>
                        <MenuOption value={"Setting"} style={styles.menu_item}>
                            <Ionicons name="settings" size={18} color="#000" />
                            <Text style={{marginLeft: 5, marginRight: 5, fontSize: 16}}>Reglage</Text>
                        </MenuOption>
                        <MenuOption onSelect={onLogoutPress} style={styles.menu_item}>
                            <Ionicons name="exit" size={18} color="red" />
                            <Text style={{color: "red", marginLeft: 5, marginRight: 5, fontSize: 16}}>Deconnexion</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
                </View>
                <View style={styles.profile_header_info}>
                    <Image style={styles.profile_image} 
                            source={require('../../assets/profile.png')} />
                    <Text style={styles.profile_title}>Oumar Maiga</Text>
                </View>
            </View>
        </MenuProvider>
    );
}