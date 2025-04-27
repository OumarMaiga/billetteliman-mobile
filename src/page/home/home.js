import { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, Image, FlatList, Button, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getTickets } from '../../../service/ticket';
import { getStations } from '../../../service/partner';
import styles from './assets/style/index';
import StationList from '../../component/stationList';
import ErrorModal from '../../component/ErrorModal';
import { Loading } from '../../component/Loading';
import TicketItem from '../../component/ticketItem';
import BottomSheet, { BottomSheetView, TouchableOpacity, TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as GLOBAL from "../../../data/global.js";
import { getCities } from '../../../service/city';
import { formatDate } from '../../helper';
import { Portal } from 'react-native-paper';
import AutoSlider from '../../component/auto-slider';

const Home = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [stations, setStations] = useState([]);
  const [start_point, setStart_point] = useState("Bamako");
  const [end_point,setEnd_point] = useState("");
  const [departure_date, setDeparture_date] = useState(formatDate(new Date()));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [cities, setCities] = useState([]);
  const [isTicketsLoading, setIsTicketsLoading] = useState(false);
  const [isStationsLoading, setIsStationsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStationsErrorModalVisible, setIsStationsErrorModalVisible] = useState(false);
  const [isTicketsErrorModalVisible, setIsTicketsErrorModalVisible] = useState(false);
  const [isCitiesErrorModalVisible, setIsCitiesErrorModalVisible] = useState(false);
  const [stationsErrorMessage, setStationsErrorMessage] = useState("");
  const [ticketsErrorMessage, setTicketsErrorMessage] = useState("");
  const [citiesErrorMessage, setCitiesErrorMessage] = useState("");

  const bottomSheetRef = useRef(null);

  const openSearchSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const toggleStationsErrorModal = () => {
    setIsStationsErrorModalVisible(!isStationsErrorModalVisible);
  };
  const toggleTicketsErrorModal = () => {
    setIsTicketsErrorModalVisible(!isTicketsErrorModalVisible);
  };
  const toggleCitiesErrorModal = () => {
    setIsCitiesErrorModalVisible(!isCitiesErrorModalVisible);
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
    setDeparture_date(formattedDate);
    hideDatePicker();
  };
    
  const searchPress = () => {
    navigation.navigate('Search', {
      'start_point': start_point,
      'end_point': end_point,
      'departure_date': departure_date
    });
  }
  const ticketPress = (ticket_id, day) => {
    navigation.navigate('Ticket', {
      ticket_id,
      day,
    });
  };

  const stationPress = (station_id) => {
    navigation.navigate('Station', {
      station_id,
    });
  };

  const fetchStations = async () => {
    try {
      setIsStationsLoading(true);
      const formData = new FormData();
      formData.append("details-types[]", 1);
      formData.append("details-types[]", 2);
      formData.append("details-types[]", 3);
      const response = await getStations(formData);
      if (response && !response.error) {
        setStations(response.datas.partnersDetails);
      } else {
        throw new Error(response?.error || "Echec de récupération des partenaires");
      }
    } catch (error) {
      setStationsErrorMessage(error.message);
      setIsStationsErrorModalVisible(true);
    } finally {
      setIsStationsLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      setIsTicketsLoading(true);
      const formData = new FormData();
      formData.append("is-available", 1);
      const response = await getTickets(formData);
      if (response && !response.error) {
        const ticketAsArray = Object.entries(response.datas.searchResults.data).map(([key, value]) => ({
          timestamp: key,
          items: value,
        }));
        setTickets(ticketAsArray);
      } else {
        throw new Error(response?.error || "Echec de récupération des trajets");
      }
    } catch (error) {
      setTicketsErrorMessage(error.message);
      setIsTicketsErrorModalVisible(true);
    } finally {
      setIsTicketsLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      if (global.debug >= GLOBAL.LOG.INFO) console.log("SearchBttomSheet::fetchCities()");
      setIsLoading(true);
      const response = await getCities();

      if (response && !response.error) {
        setCities(response.datas.citiesDatas);
      } else {
        throw new Error((response != undefined && response.error) || "Echec de récupération des villes");
      }
    } catch (error) {
      console.error(error.message);
      setCitiesErrorMessage(error.message);
      setIsCitiesErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchStations();
    fetchTickets();
    fetchCities();
  }, [navigation]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <View style={styles.adds_container}>
                  <AutoSlider />
                </View>

                  <TouchableWithoutFeedback style={styles.search_section}
                    onPress={openSearchSheet}>
                  <Ionicons style={styles.search_icon} name="search-outline" size={20} color="#000" />
                  <View
                    style={[styles.search_input, { justifyContent: 'center' }]}
                  >
                    <Text style={{ color: "#D9D9D9", fontSize: 18 }}>Recherche</Text>
                  </View>
                  </TouchableWithoutFeedback>

                <StationList stations={stations} stationPress={stationPress} />
              </>
            }
            data={tickets}
            renderItem={({ item }) => (
              <TicketItem ticket={item} handelItemPress={ticketPress} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Loading isLoading={isStationsLoading && isTicketsLoading} />
          <ErrorModal
            isVisible={isStationsErrorModalVisible}
            toggleModal={toggleStationsErrorModal}
            message={stationsErrorMessage}
          />
          <ErrorModal
            isVisible={isTicketsErrorModalVisible}
            toggleModal={toggleTicketsErrorModal}
            message={ticketsErrorMessage}
          />
          <ErrorModal
            isVisible={isCitiesErrorModalVisible}
            toggleModal={toggleCitiesErrorModal}
            message={citiesErrorMessage}
          />
  
          {/* BottomSheet séparé */}
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['60%']}
            enablePanDownToClose={true}
          >
            <BottomSheetView>
              <View style={styles.book_container}>
                <Text style={styles.book_title}>Reservez votre billet</Text>
                <Text style={styles.label}>Départ</Text>
                  <View style={styles.input}>
                    <Picker
                      selectedValue={start_point}
                      onValueChange={(itemValue) => setStart_point(itemValue)}
                    >
                      <Picker.Item label="Bamako" value="Bamako" />
                      {cities.map((city,index) => (
                        <Picker.Item key={index} label={city.name} value={city.name} />
                      ))}
                    </Picker>
                  </View>
                <Text style={styles.label}>Destination</Text>
                <View style={styles.input}>
                  <Picker
                    selectedValue={end_point}
                    onValueChange={(itemValue) => setEnd_point(itemValue)}>
                    <Picker.Item label="" value="" />
                    {cities.map((city,index) => (
                      <Picker.Item key={index} label={city.name} value={city.name} />
                    ))}
                  </Picker>
                </View>
                  
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity style={[styles.input,{justifyContent: 'center'}]}
                  onPress={showDatePicker}>
                    {isDatePickerVisible && (
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={dateSelected}
                      onCancel={hideDatePicker}
                    />
                    )}
                  <Text style={{fontSize: 18}}>{departure_date}</Text>
                </TouchableOpacity>
                  
                <TouchableOpacity onPress={searchPress} style={styles.button_search_container}>
                  <Text style={styles.custom_button}>Recherche</Text>
                </TouchableOpacity>          
              </View>  
            </BottomSheetView>
          </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
