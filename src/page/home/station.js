import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Logo } from '../../component';
import { getStationTickets } from '../../../service/ticket';
import { getStation } from '../../../service/station';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";

const Station = ({route, navigation}) => {
  
  const { station_id } = route.params;
  
  const [stationTickets, setStationTickets] = React.useState([]);
  const [station, setStation] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const ticketPress = (ticket_id) => {
    navigation.navigate('Detail', {
      "ticket_id": ticket_id
    });
  }
  
  const prodilePress = () => {
    navigation.navigate('Profile');
  }

  const fetchStationTickets = async (station_id) => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Station::fetchStationTickets()");
    
    setIsLoading(true);

    let response = await getStationTickets(station_id);
    
    if (response != undefined && response.success) {
      setStationTickets(response.data);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Station::fetchStationTickets()::response "+JSON.stringify(response));
  }

  const fetchStation = async (station_id) => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Station::fetchStation()");
    
    setIsLoading(true);

    let response = await getStation(station_id);
    
    if (response != undefined && response.success) {
      setStation(response.data);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Station::fetchStation()::response "+JSON.stringify(response));
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

  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Station::useEffect()");

    fetchStationTickets(station_id);
    fetchStation(station_id);

  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title,{margin: 20}]}>Tilemsi</Text>
      <ScrollView>
        <View style={styles.ticket_container}>
          <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
              onPress={() => ticketPress(1)}>
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
                  onPress={() => ticketPress(1)}>
                  <Text style={styles.custom_button}>Acheter</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
              onPress={() => ticketPress(1)}>
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
                  onPress={() => ticketPress(1)}>
                  <Text style={styles.custom_button}>Acheter</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
              onPress={() => ticketPress(1)}>
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
                  onPress={() => ticketPress(1)}>
                  <Text style={styles.custom_button}>Acheter</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Station;