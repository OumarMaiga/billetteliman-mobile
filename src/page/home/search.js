import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Logo } from '../../component';
import { getTicketSearched } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";

const Search = ({navigation}) => {
  
  const [depart, setDepart] = React.useState();
  const [destination, setDestination] = React.useState();
  const [date, setDate] = React.useState();
  const [place, setPlace] = React.useState();
  const [ticketSearched, setTicketSearched] = React.useState([]);

  const ticketPress = (ticket_id) => {
    navigation.navigate('Detail', {
      "ticket_id": ticket_id
    });
  }

  const searchPress = () => {
    navigation.navigate('Search');
  }
  
  const prodilePress = () => {
    navigation.navigate('Profile');
  }

  const fetchTicketSearched = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Search::fetchTicketSearched()");
    
    setIsLoading(true);

    const response = await getTicketSearched({start_point: depart, end_point: destination, departure_date: date, ticket_count: place});
    
    if (response != undefined && response.success) {
      setTicketSearched(response.data);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Search::fetchTicketSearched()::response "+JSON.stringify(response));
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

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Search::useEffect()");

    //fetchTicketSearched();
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title,{margin: 20}]}>Recherche</Text>
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

          <View style={styles.search_container}>
            <Text style={styles.search_title}>Reservez votre billet</Text>
            <View style={styles.search_title_underline}></View>
            
            <Text style={styles.label}>Départ</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text)=>setDepart(text)}
              value={depart} />
              
            <Text style={styles.label}>Destination</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text)=>setDestination(text)}
              value={destination} />
            <View style={{flexDirection:"row"}}>
              <View style={{marginRight:10}}>
                <Text style={styles.label}>Date</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text)=>setDate(text)}
                  value={date} />
              </View>
              <View style={{marginLeft:10}}>
                <Text style={styles.label}>Place</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text)=>setPlace(text)}
                  value={place} />
              </View>
            </View>
            <Pressable
              onPress={searchPress}>
              <Text style={styles.custom_button}>Acheter</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Search;