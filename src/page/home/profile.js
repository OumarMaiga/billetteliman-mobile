import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from 'react-native-vector-icons';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";

const Profile = ({navigation}) => {
    
  const user = useSelector((state) => state.user.user);

  const onEditPress = () => {
    if (global.debug >= GLOBAL.LOG.INFO) console.log("Profile::onEditPress()");
    navigation.navigate('EditProfile');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profile_header_container}>
          <Text style={styles.profile_header_title}>Mon profil</Text>
        </View>
        
        <Text style={{fontWeight:"bold",padding:20,fontSize:16}}>Information personnelle</Text>

        <View style={styles.profile_info_perso_container}>
          <View style={styles.profile_info_perso_item_container}>
            <View style={styles.profile_info_perso_item_icon}>
              <Ionicons name="person-circle-sharp" size={22} color="#000" />
            </View>
            <View style={styles.profile_info_perso_item}>
              <Text style={styles.profile_info_perso_item_label}>Prenom & Nom</Text>
              <Text style={styles.profile_info_perso_item_text}>{`${user.firstname} ${user.lastname}`}</Text>
            </View>
          </View>
          
          <View style={styles.profile_info_perso_item_container}>
            <View style={styles.profile_info_perso_item_icon}>
              <Ionicons name="mail" size={22} color="#000" />
            </View>
            <View style={styles.profile_info_perso_item}>
              <Text style={styles.profile_info_perso_item_label}>Email</Text>
              <Text style={styles.profile_info_perso_item_text}>{`${user.email}`}</Text>
            </View>
          </View>
          
          <View style={styles.profile_info_perso_item_container}>
            <View style={styles.profile_info_perso_item_icon}>
              <Ionicons name="call-sharp" size={22} color="#000" />
            </View>
            <View style={styles.profile_info_perso_item}>
              <Text style={styles.profile_info_perso_item_label}>Téléphone</Text>
              <Text style={styles.profile_info_perso_item_text}>{`${user.phonenumber}`}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={onEditPress} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Text style={styles.custom_button}>Mise à jour du profil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;