import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Logo } from '../../component';
import { getTickets } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";

const Ticket = ({navigation}) => {
  
  const [query, setQuery] = React.useState();
  const [tickets, setTickets] = useState([]);

  const ticketPress = () => {
    navigation.navigate('Detail');
  }
  
  const prodilePress = () => {
    navigation.navigate('Profile');
  }

  const fetchTickets = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Ticket::fetchTickets()");
    
    setIsLoading(true);

    const response = await getTickets();
    
    if (response.success) {
      setTickets(response.data);
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

    //fetchTickets();

  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title,{margin: 20}]}>Billet en vente</Text>
      <ScrollView>

        <View style={styles.ticket_container}>
          <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
              onPress={ticketPress}>
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
                  onPress={ticketPress}>
                  <Text style={styles.custom_button}>Acheter</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
              onPress={ticketPress}>
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
                  onPress={ticketPress}>
                  <Text style={styles.custom_button}>Acheter</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.ticket_item}>
            <Pressable style={styles.ticket_item_container}
              onPress={ticketPress}>
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
                  onPress={ticketPress}>
                  <Text style={styles.custom_button}>Acheter</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Ticket;