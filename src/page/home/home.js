import { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Logo } from '../../component';
import { getTickets } from '../../../service/ticket';
import { getStations } from '../../../service/partner';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import StationList from '../../component/stationList';
import ErrorModal from '../../component/ErrorModal';
import { Loading } from '../../component/Loading';
import TicketItem from '../../component/ticketItem';

const Home = ({navigation}) => {
  
  const [tickets, setTickets] = useState([]);
  const [stations, setStations] = useState([]);
  const [isTicketsLoading, setIsTicketsLoading] = useState(false);
  const [isStationsLoading, setisStationsLoading] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };
  
  const ticketPress = (ticket_id, day) => {
    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::ticketPress()");
    navigation.navigate('Ticket', {
      "ticket_id": ticket_id,
      "day": day
    });
  }
  
  const stationPress = (station_id) => {
    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::stationPress()");
    navigation.navigate('Station', {
      "station_id": station_id
    });
  }
  
  const profilePress = () => {
    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::profilePress()");
    navigation.navigate('Profile');
  }

  const searchInputPress = () => {
    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::searchInputPress()");
    navigation.navigate('SearchBottom');
  }

  const searchPress = () => {    
    navigation.navigate('Search', {
      'start_point': start_point,
      'end_point': end_point,
      'departure_date': departure_date
    });
  }

  const fetchTickets = async () => {
    try {
      if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::fetchTickets()");      
      setIsTicketsLoading(true);      
      const formData = new FormData();
      formData.append("is-available", 1);  
      const response = await getTickets(formData);
  
      if (response && !response.error) {
        const ticketAsArray = Object.entries(response.datas.searchResults.data).map(([key, value]) => ({
          timestamp: key,
          items: value
        }));
        setTickets(ticketAsArray);
      } else {
        throw new Error((response != undefined && response.error) || "Erreur de récupération des tickets");
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsErrorModalVisible(true);
    } finally {
      if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Home::fetchTickets()::response "+JSON.stringify(response));
      setIsTicketsLoading(false);
    }
  }

  const fetchStations = async () => {
    try {
      if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::fetchStations()");      
      setisStationsLoading(true);
      const formData = new FormData();
      formData.append("details-types[]", 1);
      formData.append("details-types[]", 2);
      formData.append("details-types[]", 3);
      const response = await getStations(formData);
      
      if (response != undefined && !response.error) {
        setStations(response.datas.partnersDetails);
      } else {
        throw new Error((response != undefined && response.error) || "Erreur de récupération des stations");
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsErrorModalVisible(true);
    } finally {
      setisStationsLoading(false);
      if (global.debug >= GLOBAL.LOG.ROOT) console.log("Home::fetchStations()::response "+JSON.stringify(response));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: (props) => <Logo {...props}/>,
      headerRight: () => (
        <TouchableOpacity style={{ borderWidth: 1, borderColor: "#fff", borderRadius: 40 }}
          onPress={profilePress}>
          <Ionicons name="person-circle-sharp" size={36}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Home::useEffect()");

    fetchTickets();
    fetchStations();

  }, [navigation]);
    
  return (
    <SafeAreaView style={styles.container}>
      <FlatList showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        ListHeaderComponent={ 
        <>
          <View style={styles.adds_container}>
            <Image style={styles.adds_image} 
              source={require('./assets/image/adds.png')} />
          </View>

          <View style={styles.search_section}>
            <Ionicons style={styles.search_icon} name="search-outline" size={20} color="#000"/>
            <TouchableOpacity style={[styles.search_input,{justifyContent: 'center'}]}
              onPress={searchInputPress}>
                <Text style={{ color: "#D9D9D9", fontSize: 18 }}>Recherche</Text>
            </TouchableOpacity>
          </View>
        
          <TouchableOpacity onPress={profilePress}><Text style={{textAlign:'center'}}>Profile</Text></TouchableOpacity>
        
          <StationList stations={stations} stationPress={stationPress} />
        </>
        }
        data={tickets}
        renderItem={({item}) => <TicketItem ticket={item} handelItemPress={ticketPress} />}
        keyExtractor={(item,index) => index}
      />
      <Loading isLoading={isStationsLoading && isTicketsLoading}/>
      <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
    </SafeAreaView>
  );
}

export default Home;