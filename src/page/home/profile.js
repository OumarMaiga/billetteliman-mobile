import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import { ProfileHeader } from '../../component';
import styles from './assets/style/index';

const Profile = ({navigation}) => {
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader navigation={navigation}/>
        
        <View style={styles.profile_ticket_bought_container}>
          <View style={styles.profile_ticket_bought_left}>
            <View>
              <Text>Compagnie: Tilemsi</Text>
            </View>
            <View>
              <Text>Trajet: Bamako - Kayes</Text>
            </View>
            <View>
              <Text>Depart: Sam 12 Nov 2023 à 12h00</Text>
            </View>
            <View>
              <Text>Montant payé: 12 500F</Text>
            </View>
          </View>
          <View style={styles.profile_ticket_bought_right}>
            <View>
              <Text style={{textAlign:'right'}}>ID: T12-210</Text>
            </View>
            <View>
              <Text style={{textAlign:'right'}}>Pour: Bakary Maiga</Text>
            </View>
            <View>
              <Text style={{textAlign:'right'}}>Achété le 10/12/2023</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image source={require("./assets/image/qr-code.png")} 
                style={styles.profile_ticket_bought_image} />
            </View>
          </View>
        </View>
        
        <View style={styles.profile_ticket_bought_container}>
          <View style={styles.profile_ticket_bought_left}>
            <View>
              <Text>Compagnie: Tilemsi</Text>
            </View>
            <View>
              <Text>Trajet: Bamako - Kayes</Text>
            </View>
            <View>
              <Text>Depart: Sam 12 Nov 2023 à 12h00</Text>
            </View>
            <View>
              <Text>Montant payé: 12 500F</Text>
            </View>
          </View>
          <View style={styles.profile_ticket_bought_right}>
            <View>
              <Text style={{textAlign:'right'}}>ID: T12-210</Text>
            </View>
            <View>
              <Text style={{textAlign:'right'}}>Pour: Bakary Maiga</Text>
            </View>
            <View>
              <Text style={{textAlign:'right'}}>Achété le 10/12/2023</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image source={require("./assets/image/qr-code.png")} 
                style={styles.profile_ticket_bought_image} />
            </View>
          </View>
        </View>
        
        <View style={styles.profile_ticket_bought_container}>
          <View style={styles.profile_ticket_bought_left}>
            <View>
              <Text>Compagnie: Tilemsi</Text>
            </View>
            <View>
              <Text>Trajet: Bamako - Kayes</Text>
            </View>
            <View>
              <Text>Depart: Sam 12 Nov 2023 à 12h00</Text>
            </View>
            <View>
              <Text>Montant payé: 12 500F</Text>
            </View>
          </View>
          <View style={styles.profile_ticket_bought_right}>
            <View>
              <Text style={{textAlign:'right'}}>ID: T12-210</Text>
            </View>
            <View>
              <Text style={{textAlign:'right'}}>Pour: Bakary Maiga</Text>
            </View>
            <View>
              <Text style={{textAlign:'right'}}>Achété le 10/12/2023</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image source={require("./assets/image/qr-code.png")} 
                style={styles.profile_ticket_bought_image} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;