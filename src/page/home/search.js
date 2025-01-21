import * as React from 'react';
import { View, Text, SafeAreaView, Pressable, FlatList } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Logo } from '../../component';
import { getTicketsSearched } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import { convertToDate } from '../../helper';
import TicketList from '../../component/ticketList';
import ErrorModal from '../../component/ErrorModal';
import { Loading } from '../../component/Loading';
import TicketItem from '../../component/ticketItem';

const Search = ({route, navigation}) => {
  
  const { start_point, end_point, departure_date } = route.params;
  
  const [ticketsSearched, setTicketsSearched] = React.useState([]);
  const [ticketsSearchedCount, setTicketsSearchedCount] = React.useState();
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

  const fetchTicketsSearched = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Search::fetchTicketsSearched()");
    
    setIsLoading(true);

    const formData = new FormData();
    formData.append("is-available", 1);

    const response = await getTicketsSearched(formData, {start_point: start_point, end_point: end_point, departure_date: departure_date});
    
    if (response != undefined && response.error == null) {
      const ticketsAsArray = Object.entries(response.datas.searchResults.data).map(([key, value]) => ({
        timestamp: key,
        items: value
      }));
      setTicketsSearched(ticketsAsArray);
      setTicketsSearchedCount(response.datas.searchResults.count);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Search::fetchTicketsSearched()::response "+JSON.stringify(response));
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

    fetchTicketsSearched();
  },[]);
  
  return (
    <SafeAreaView style={styles.container}>
      { ticketsSearched && (
      <FlatList 
        ListHeaderComponent={
        <View style={styles.ticket_available_container}>
          <Text style={styles.ticket_available_title}>{start_point} - {end_point}</Text>
          <Text style={styles.ticket_available_date}>{convertToDate(departure_date)}</Text>
          {ticketsSearchedCount == 0 &&
            <Text style={styles.ticket_available}>Pas de trajet disponible</Text>
          }
          {ticketsSearchedCount == 1 &&
            <Text style={styles.ticket_available}>1 trajet disponible</Text>
          }
          {ticketsSearchedCount > 1 &&
            <Text style={styles.ticket_available}>{ticketsSearchedCount} trajets disponible</Text>
          }
        </View>
        }
        data={ticketsSearched}
        renderItem={({item}) => <TicketItem ticket={item} handelItemPress={ticketPress} />}
        keyExtractor={(item,index) => index} />
      )}
      <Loading isLoading={isLoading}/>
      <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
        
    </SafeAreaView>
  );
}

export default Search;