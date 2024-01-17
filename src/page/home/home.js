import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Logo } from '../../component';
import { getTickets } from '../../../service/ticket';
import { getStations } from '../../../service/partner';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import StationList from '../../component/stationList';
import TicketList from '../../component/ticketList';

const Home = ({navigation}) => {
  
  const [start_point, setStart_point] = useState();
  const [end_point,setEnd_point] = useState();
  const [departure_date, setDeparture_date] = useState(Date.now());
  const [ticket_count, setTicket_count] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const bottomSheetRef = useRef(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const dateSelected = (date) => {
    setDeparture_date(date);
    hideDatePicker();
  };
  
  const openBottomSheet = () => {
    bottomSheetRef.current.expand();
  };

  const ticketPress = (ticket_id) => {
    navigation.navigate('Detail', {
      "ticket_id": ticket_id
    });
  }
  
  const stationPress = (station_id) => {
    navigation.navigate('Station', {
      "station_id": station_id
    });
  }
  
  const prodilePress = () => {
    navigation.navigate('Profile');
  }

  const searchPress = () => {
    navigation.navigate('Search', {
      'start_point': start_point,
      'end_point': end_point,
      'departure_date': departure_date,
      'ticket_count': ticket_count
    });
  }

  const dateFormated = () => {
    d = new Date(departure_date);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    day = day > 9 ? day : '0' + day;
    month = month > 9 ? month : '0' + month;
    return `${day}/${month}/${year}`;
  }

  const fetchTickets = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::fetchTickets()");
    
    setIsLoading(true);

    const response = await getTickets();
    
    if (response != undefined && response.success) {
      setTickets(response.data);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Home::fetchTickets()::response "+JSON.stringify(response));
  }

  const fetchStations = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::fetchStations()");
    
    setIsLoading(true);

    const response = await getStations();
    
    if (response != undefined && response.success) {
      setStations(response.data);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Home::fetchStations()::response "+JSON.stringify(response));
  }

  useLayoutEffect(() => {
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

  useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::useEffect()");

    fetchTickets();
    fetchStations();

  }, []);
  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.adds_container}>
          <Image style={styles.adds_image} 
            source={require('./assets/image/adds.png')} />
        </View>

        <View style={styles.search_section}>
          <Ionicons style={styles.search_icon} name="ios-search" size={20} color="#000"/>
          <Pressable style={[styles.search_input,{justifyContent: 'center'}]}
            onPressIn={openBottomSheet}>
              <Text style={{ color: "#D9D9D9", fontSize: 18 }}>Recherche</Text>
          </Pressable>
        </View>
      
        <StationList stations={stations} stationPress={stationPress} />
      
        <TicketList tickets={tickets} ticketPress={ticketPress}/>
        
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['75%']}
          enablePanDownToClose={true}
          >
          <View style={styles.book_container}>
            <Text style={styles.book_title}>Reservez votre billet</Text>
            <Text style={styles.label}>Départ</Text>
            <BottomSheetTextInput
              style={styles.input}
              onChangeText={(text)=>setStart_point(text)}
              value={start_point} />
              
            <Text style={styles.label}>Destination</Text>
            <BottomSheetTextInput
              style={styles.input}
              onChangeText={(text)=>setEnd_point(text)}
              value={end_point} />
              
            <Text style={styles.label}>Date</Text>
            <Pressable style={[styles.input,{justifyContent: 'center'}]}
              onPress={showDatePicker}>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={dateSelected}
                onCancel={hideDatePicker}
              />
              <Text style={{fontSize: 18}}>{dateFormated()}</Text>
            </Pressable>

            <Text style={styles.label}>Nombre de ticket</Text>
            <BottomSheetTextInput
              style={styles.input}
              onChangeText={(text)=>setTicket_count(text)}
              keyboardType = 'numeric'
              value={ticket_count} />
              
            <Pressable onPress={searchPress} style={{display: 'flex', flexWrap: 'wrap'}}>
              <Text style={styles.custom_button}>Recherche</Text>
            </Pressable>
            
          </View>
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;