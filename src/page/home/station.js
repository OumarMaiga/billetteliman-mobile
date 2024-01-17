import * as React from 'react';
import { Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Logo } from '../../component';
import { getStationTickets } from '../../../service/ticket';
import { getStation } from '../../../service/partner';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import TicketList from '../../component/ticketList';

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
      <Text style={[styles.title,{margin: 20}]}>{station && station.company_name}</Text>
      <TicketList tickets={stationTickets} ticketPress={ticketPress} />
    </SafeAreaView>
  );
}

export default Station;