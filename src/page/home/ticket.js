import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, 
  Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { getTicket, buyTicket } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import { dateTimeFormat, priceFormat } from '../../helper';
import { useSelector } from 'react-redux';
import ErrorModal from '../../component/ErrorModal';

const Ticket = ({route}) => {
  const { ticket_id, day } = route.params;
  
  const [firstname, setFirstname] = React.useState();
  const [lastname, setLastname] = React.useState();
  const [phonenumber, setPhonenumber] = React.useState();
  const [ticketCount, setTicketCount] = React.useState(1);
  const [ticket, setTicket] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const user = useSelector((state) => state.user);

  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };

  const buyPress = async (ticket_id) => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("Ticket::submitButtonPress()")
  
    const formData = new FormData();
    formData.append("firstname", [firstname]);
    formData.append("lastname", [lastname]);
    formData.append("phonenumber", [phonenumber]);
    formData.append("count", 1);
    formData.append("day", day);
    formData.append("potential-payer", user.id);

    const response = await buyTicket(ticket_id, formData);
    
    if(response != undefined && response.error == null) {
      console.log(response.payment_url);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
  }

  const fetchTicket = async (ticket_id) => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Ticket::fetchTicket()");
    
    setIsLoading(true);

    const formData = new FormData();
    formData.append("details-types[]", 1);
    formData.append("details-types[]", 2);
    formData.append("details-types[]", 3);

    const response = await getTicket(ticket_id, formData);
    
    if (response != undefined && response.error == null) {
      setTicket(response.datas.ticketDatas);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Ticket::fetchTicket()::response "+JSON.stringify(response));
  }

  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Ticket::useEffect()");

    fetchTicket(ticket_id);

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
          <ScrollView>
            <View style={styles.ticket_detail_container}>
              <Text style={styles.ticket_detail_station}>{ticket && ticket.partner.companyName}</Text>
              <View style={styles.ticket_detail_item_row}>
                <View style={styles.ticket_detail_item}>
                  <Text style={styles.ticket_detail_item_label}>Trajet</Text>
                  <Text style={styles.ticket_detail_item_text}>{ticket && ticket.travelDatas.from} - {ticket && ticket.travelDatas.to}</Text>
                </View>
                <View style={[styles.ticket_detail_item,{alignItems: "flex-end"}]}>
                  <Text style={styles.ticket_detail_item_label}>Départ</Text>
                  <Text style={[styles.ticket_detail_item_text,{textAlign: "right"}]}>{ticket && dateTimeFormat(day, ticket.travelDatas.departureAt)}</Text>
                </View>
              </View>
              <View style={styles.ticket_detail_item_row}>
                <View style={styles.ticket_detail_item}>
                  <Text style={styles.ticket_detail_item_label}>Distance</Text>
                  <Text style={styles.ticket_detail_item_text}>1500km</Text>
                </View>
                <View style={[styles.ticket_detail_item,{alignItems: "flex-end"}]}>
                  <Text style={styles.ticket_detail_item_label}>Durée</Text>
                  <Text style={styles.ticket_detail_item_text}>28h</Text>
                </View>
              </View>
              <View style={styles.ticket_detail_item_row}>
                <View style={styles.ticket_detail_item}>
                  <Text style={styles.ticket_detail_item_label}>Tarif</Text>
                  <Text style={[styles.ticket_detail_item_text,{alignItems: "flex-end"}]}>{ticket && priceFormat(ticket.price)}</Text>
                </View>
                <View style={[styles.ticket_detail_item,{alignItems: "flex-end"}]}>
                  <Text style={styles.ticket_detail_item_label}>Commission</Text>
                  <Text style={[styles.ticket_detail_item_text,{textAlign: "right"}]}>{ticket && priceFormat(ticket.commission)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.ticket_detail_form_container}>
              <Text style={styles.ticket_detail_form_billet}>Informations du passager</Text>
              
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setTicketCount(text)}
                value={ticketCount} />

              <Text style={styles.label}>Prenom</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setFirstname(text)}
                value={firstname} />
                
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setLastname(text)}
                value={lastname} />
                
              <Text style={styles.label}>Telephone</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setPhonenumber(text)}
                value={phonenumber} />
                
              <Pressable onPress={() => buyPress(ticket_id)} style={{display: 'flex', flexWrap: 'wrap', marginBottom: 20}}>
                <Text style={styles.custom_button}>Acheter</Text>
              </Pressable>
            </View>
            <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
          </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Ticket;