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
import ErrorModal from '../../component/ErrorModal';
import { Loading } from '../../component/Loading';
import { FlatList } from 'react-native-gesture-handler';
import TicketItem from '../../component/ticketItem';
import { getCities } from '../../../service/city';
import { Picker } from '@react-native-picker/picker';

const Home = ({navigation}) => {
  
  const [start_point, setStart_point] = useState("Bamako");
  const [end_point,setEnd_point] = useState("");
  const [departure_date, setDeparture_date] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [cities, setCities] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const bottomSheetRef = useRef(null);

  // Fonction pour formater la date
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois (commence à 0)
    const day = String(date.getDate()).padStart(2, '0'); // Jour
    return `${year}-${month}-${day}`;
  };

  // Ouvrir le DatePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Fermer le DatePicker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Gérer la date sélectionnée
  const dateSelected = (date) => {
    const formattedDate = formatDate(date);
    setDeparture_date(formattedDate); // Stocker la date formatée
    hideDatePicker();
  };
  
  
  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };
  
  
  const openBottomSheet = () => {
    bottomSheetRef.current.expand();
  };

  const ticketPress = (ticket_id, day) => {
    navigation.navigate('Ticket', {
      "ticket_id": ticket_id,
      "day": day
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
      'departure_date': departure_date
    });
  }

  const fetchCities = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::fetchCities()");
    
    setIsLoading(true);
    
    const response = await getCities();
    
    if (response != undefined && response.error == null) {
      setCities(response.datas.citiesDatas);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Home::fetchTickets()::response "+JSON.stringify(response));
  }

  const fetchTickets = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::fetchTickets()");
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("is-available", 1);

    const response = await getTickets(formData);
    
    if (response != undefined && response.error == null) {
      const ticketAsArray = Object.entries(response.datas.searchResults.data).map(([key, value]) => ({
        timestamp: key,
        items: value
      }));
      setTickets(ticketAsArray);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Home::fetchTickets()::response "+JSON.stringify(response));
  }

  const fetchStations = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::fetchStations()");
    
    setIsLoading(true);

    const formData = new FormData();
    formData.append("details-types[]", 1);
    formData.append("details-types[]", 2);
    formData.append("details-types[]", 3);

    const response = await getStations(formData);
    
    if (response != undefined && response.error == null) {
      setStations(response.datas.partnersDetails);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT) console.log("Home::fetchStations()::response "+JSON.stringify(response));
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

    fetchCities();
    fetchTickets();
    fetchStations();

  }, []);
  
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList showsVerticalScrollIndicator={false}
      ListHeaderComponent={ 
        <>
          <View style={styles.adds_container}>
            <Image style={styles.adds_image} 
              source={require('./assets/image/adds.png')} />
          </View>

          <View style={styles.search_section}>
            <Ionicons style={styles.search_icon} name="search-outline" size={20} color="#000"/>
            <Pressable style={[styles.search_input,{justifyContent: 'center'}]}
              onPressIn={openBottomSheet}>
                <Text style={{ color: "#D9D9D9", fontSize: 18 }}>Recherche</Text>
            </Pressable>
          </View>
        
          <StationList stations={stations} stationPress={stationPress} />
        </>
      }
      data={tickets}
      renderItem={({item}) => <TicketItem ticket={item} handelItemPress={ticketPress} />}
      keyExtractor={(item,index) => index}      
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['75%']}
        enablePanDownToClose={true}
        >
        <View style={styles.book_container}>
          <Text style={styles.book_title}>Reservez votre billet</Text>
          <Text style={styles.label}>Départ</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={start_point}
                onValueChange={(itemValue) => setStart_point(itemValue)}
              >
                <Picker.Item label="Bamako" value="Bamako" />
                {cities.map(city => (
                  <Picker.Item label={city.name} value={city.name} />
                ))}
              </Picker>
            </View>
          <Text style={styles.label}>Destination</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={end_point}
              onValueChange={(itemValue) => setEnd_point(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="" value="" />
              {cities.map(city => (
                <Picker.Item label={city.name} value={city.name} />
              ))}
            </Picker>
          </View>
            
          <Text style={styles.label}>Date</Text>
          <Pressable style={[styles.input,{justifyContent: 'center'}]}
            onPress={showDatePicker}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={dateSelected}
              onCancel={hideDatePicker}
            />
            <Text style={{fontSize: 18}}>{departure_date}</Text>
          </Pressable>
            
          <Pressable onPress={searchPress} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Text style={styles.custom_button}>Recherche</Text>
          </Pressable>
          
        </View>
      </BottomSheet>
      <Loading isLoading={isLoading}/>
      <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
    </SafeAreaView>
  );
}

export default Home;