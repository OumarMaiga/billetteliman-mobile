import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, FlatList } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Logo } from '../../component';
import { getTicketSearched } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import { dateToDateHourString } from '../../helper';
import TicketList from '../../component/ticketList';

const Search = ({route, navigation}) => {
  
  const { start_point, end_point, departure_date, ticket_count } = route.params;

  const [ticketSearched, setTicketSearched] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const ticketPress = (ticket_id) => {
    navigation.navigate('Detail', {
      "ticket_id": ticket_id
    });
  }
  
  const prodilePress = () => {
    navigation.navigate('Profile');
  }

  const fetchTicketSearched = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Search::fetchTicketSearched()");
    
    setIsLoading(true);

    const response = await getTicketSearched({start_point: start_point, end_point: end_point, departure_date: departure_date, ticket_count: ticket_count});
    
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

    fetchTicketSearched();
  },[]);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ticket_available_container}>
        <Text style={styles.ticket_available_title}>{start_point} - {end_point}</Text>
        <Text style={styles.ticket_available_date}>{dateToDateHourString(departure_date)}</Text>
        <Text style={styles.ticket_available}>{ticketSearched && ticketSearched.length} trajet(s) disponible</Text>
      </View>
      <TicketList tickets={ticketSearched} ticketPress={ticketPress} />
    </SafeAreaView>
  );
}

export default Search;