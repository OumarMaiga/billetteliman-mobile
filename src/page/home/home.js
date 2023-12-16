//import * as React from 'react';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Logo } from '../../component';
import styles from './assets/style/index';

const Home = ({navigation}) => {
  
  const bottomSheetRef = useRef(null);

  // Function to open the bottom sheet
  const openBottomSheet = () => {
    bottomSheetRef.current.expand();
  };

  // Function to close the bottom sheet
  const closeBottomSheet = () => {
    bottomSheetRef.current.collapse();
  };

  const ticketPress = () => {
    navigation.navigate('Detail');
  }
  
  const partnerPress = () => {
    navigation.navigate('Partner');
  }
  
  const prodilePress = () => {
    console.log("prodilePress...");
    navigation.navigate('Profile');
  }

  const searchPress = () => {
    console.log("searchPressed!");
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: (props) => <Logo {...props}/>,
      headerRight: () => (
        <Pressable style={{ borderWidth: 1, borderColor: "#fff", borderRadius: 40 }}
          onPress={prodilePress}
        >
          <Ionicons name="person-circle-sharp" size={36}/>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.adds_container}>
          <Image style={styles.adds_image} 
            source={require('./assets/image/adds.png')} />
        </View>

        <View style={styles.search_section}>
          <Ionicons style={styles.search_icon} name="ios-search" size={20} color="#000"/>
          <TextInput style={styles.search_input}
            placeholder="Recherche"
            onPressIn={openBottomSheet} />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={['25%', '50%', '75%']}
          backgroundComponent={({ style }) => <View style={[style, { backgroundColor: 'white' }]} />} >
          <View style={{ padding: 16 }}>
            <Text>Hello! I am a bottom sheet!</Text>
            <TouchableOpacity onPress={closeBottomSheet}>
              <Text>Close Bottom Sheet</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      
        <View style={styles.partner_container}>
          <Text style={styles.partner_title}>Nos partenaires</Text>
          <View style={styles.partner_item_container}>
            <Pressable style={styles.partner_item}
              onPress={partnerPress}>
              <Image style={styles.partner_image} 
                source={require('./assets/image/bus.png')} />
              <Text style={styles.partner_item_title}>Tilemsi</Text>
            </Pressable>
            <Pressable style={styles.partner_item}
              onPress={partnerPress}>
              <Image style={styles.partner_image} 
                source={require('./assets/image/bus.png')} />
              <Text style={styles.partner_item_title}>TCV</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.ticket_container}>
          <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
              onPress={ticketPress}>
              <View style={styles.ticket_item_top_container}>
                <View>
                  <Text style={styles.ticket_trajet}>Bamako - Kayes</Text>
                  <Text style={styles.ticket_trajet_date}>Sam 12 Nov à 12h00</Text>
                </View>
                <Text style={styles.ticket_station}>Tilemsi</Text>
              </View>
              <View style={styles.ticket_item_bottom_container}>
                <Text style={styles.ticket_trajet_price}>12 500F</Text>
                <Pressable
                  onPress={ticketPress}>
                  <Text style={styles.ticket_trajet_button}>Acheter</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
              onPress={ticketPress}>
              <View style={styles.ticket_item_top_container}>
                <View>
                  <Text style={styles.ticket_trajet}>Bamako - Kayes</Text>
                  <Text style={styles.ticket_trajet_date}>Sam 12 Nov à 12h00</Text>
                </View>
                <Text style={styles.ticket_station}>Tilemsi</Text>
              </View>
              <View style={styles.ticket_item_bottom_container}>
                <Text style={styles.ticket_trajet_price}>12 500F</Text>
                <Pressable
                  onPress={ticketPress}>
                  <Text style={styles.ticket_trajet_button}>Acheter</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
              onPress={ticketPress}>
              <View style={styles.ticket_item_top_container}>
                <View>
                  <Text style={styles.ticket_trajet}>Bamako - Kayes</Text>
                  <Text style={styles.ticket_trajet_date}>Sam 12 Nov à 12h00</Text>
                </View>
                <Text style={styles.ticket_station}>Tilemsi</Text>
              </View>
              <View style={styles.ticket_item_bottom_container}>
                <Text style={styles.ticket_trajet_price}>12 500F</Text>
                <Pressable
                  onPress={ticketPress}>
                  <Text style={styles.ticket_trajet_button}>Acheter</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;