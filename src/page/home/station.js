import * as React from 'react';
import { Text, SafeAreaView, ScrollView, Pressable, View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Logo } from '../../component';
import { getStationTickets } from '../../../service/ticket';
import { getStation } from '../../../service/partner';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import TicketList from '../../component/ticketList';
import ErrorModal from '../../component/ErrorModal';
import { FlatList } from 'react-native-gesture-handler';
import TicketItem from '../../component/ticketItem';

const Station = ({route, navigation}) => {
  
  const { station_id } = route.params;
  
  const [stationTickets, setStationTickets] = React.useState([]);
  const [station, setStation] = React.useState();
  const [stationticketsCount, setStationTicketsCount] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };

  const ticketPress = (ticket_id, day) => {
    navigation.navigate('Ticket', {
      "ticket_id": ticket_id,
      "day": day
    });
  }
  
  const prodilePress = () => {
    navigation.navigate('Profile');
  }

  const fetchStationTickets = async (station_id) => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Station::fetchStationTickets()");
    
    setIsLoading(true);

    const formData = new FormData();
    formData.append("is-available", 1);

    let response = await getStationTickets(station_id, formData);
    
    if (response != undefined && response.error == null) {
      const ticketAsArray = Object.entries(response.datas.ticketDatas.data).map(([key, value]) => ({
        timestamp: key,
        items: value
      }));
      setStationTickets(ticketAsArray);
      setStationTicketsCount(response.datas.ticketDatas.count);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Station::fetchStationTickets()::response "+JSON.stringify(response));
  }

  const fetchStation = async (station_id) => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Station::fetchStation()");
    
    setIsLoading(true);

    const formData = new FormData();
    formData.append("details-types[]", 1);
    formData.append("details-types[]", 2);
    formData.append("details-types[]", 3);

    let response = await getStation(station_id, formData);
    
    if (response != undefined && response.error == null) {
      setStation(response.datas.partnerDetails);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
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
      <FlatList
        ListHeaderComponent={
          <View style={{margin:10}}>
            <Text style={styles.title}>{station && station["1"].name}</Text>
            {stationticketsCount == 0 &&
              <Text style={styles.ticket_available}>Pas de trajet disponible</Text>
            }
            {stationticketsCount == 1 &&
              <Text style={styles.ticket_available}>Un trajet disponible</Text>
            }
            {stationticketsCount > 1 &&
              <Text style={styles.ticket_available}>{stationticketsCount} trajets disponible</Text>
            }
          </View>
        }
        data={stationTickets}
        renderItem={({item}) => <TicketItem ticket={item} handelItemPress={ticketPress} />}
        keyExtractor={(item,index) => index} />
      <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
    </SafeAreaView>
  );
}

export default Station;