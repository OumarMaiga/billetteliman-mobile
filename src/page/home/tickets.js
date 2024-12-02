import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Logo } from '../../component';
import { getTickets } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import TicketItem from '../../component/ticketItem';
import TicketList from '../../component/ticketList';

const Ticket = ({navigation}) => {
  
  const [query, setQuery] = React.useState();
  const [tickets, setTickets] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const ticketPress = (ticket_id, day) => {
    navigation.navigate('Detail', {
      "ticket_id": ticket_id,
      "day": day
    });
  }
  
  const prodilePress = () => {
    navigation.navigate('Profile');
  }

  const fetchTickets = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Ticket::fetchTickets()");
    
    setIsLoading(true);

    const formData = new FormData();
    formData.append("available-ones", 1);
    formData.append("monday-date", "");

    const response = await getTickets(formData);
    
    if (response != undefined && response.error == null) {
      setTickets(response.datas.ticketsDatas);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Ticket::fetchTickets()::response "+JSON.stringify(response));
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: (props) => <Logo {...props}/>,
      headerRight: () => (
        <Pressable style={{ borderWidth: 1, borderColor: "#fff", borderRadius: 40 }}
          onPress={prodilePress} >
          <Ionicons name="person-circle-sharp" size={36} />
        </Pressable>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Ticket::useEffect()");

    fetchTickets();

  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title,{margin: 20}]}>Billet en vente</Text>
      <TicketList tickets={tickets} ticketPress={ticketPress} />
    </SafeAreaView>
  );
}

export default Ticket;