import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, 
  TouchableOpacity, KeyboardAvoidingView, Platform, 
  Button} from 'react-native';
import { getTicket, boughtTicket } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import { dateTimeFormat, priceFormat } from '../../helper';
import { useSelector } from 'react-redux';
import ErrorModal from '../../component/ErrorModal';
import { Loading } from '../../component/Loading';
import { Picker } from '@react-native-picker/picker';
import SuccessModal from '../../component/SuccessModal';

const Ticket = ({route, navigation}) => {
  const { ticket_id, day, status, boughtTicketId } = route.params;
  
  const [firstname, setFirstname] = React.useState();
  const [lastname, setLastname] = React.useState();
  const [phonenumber, setPhonenumber] = React.useState();
  const [ticketCount, setTicketCount] = React.useState(1);
  const [ticket, setTicket] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBoughtTicketLoading, setIsBoughtTicketLoading] = React.useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const user = useSelector((state) => state.user.user);
  
  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };
  const toggleSuccessModal = () => {
    setIsSuccessModalVisible(!isSuccessModalVisible);
    navigation.navigate('BoughtTicket',{
      "boughtTicketId": boughtTicketId,
    });
  };

  React.useEffect(()=> {
    if(status !== undefined) {
      emptyInfoClient();
      if (status == 'success') {
				setSuccessMessage("Achat effectuer avec succès");
        setIsSuccessModalVisible(!isSuccessModalVisible);
      } else {
        if (status == 'echec') {
          setErrorMessage("Erreur de lors du paiement. Veuillez-nous contactez au 71316544");
        } else if(status == 'pending') {
          setErrorMessage("Paiement en cours de validation");
        } else if(status == 'cancel') {
          setErrorMessage("Vous avez annulé le paiement");
        } else if(status == 'initiated') {
          setErrorMessage("Vous n'avez pas terminer le paiement");
        } else {
          setErrorMessage("Status de paiement inconnue...");
        }
        setIsErrorModalVisible(!isErrorModalVisible);
      }
    }
  },[status])

  const buyPress = async (ticket_id) => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("Ticket::buyPress()")
    
    setIsBoughtTicketLoading(true);

    const formData = new FormData();
    formData.append("firstname[]", firstname);
    formData.append("lastname[]", lastname);
    formData.append("phonenumber[]", phonenumber);
    formData.append("count", 1);
    formData.append("day", day);
    formData.append("potential-payer", user.id);
    formData.append("deeplink", "billetteliman://home");
  
    const response = await boughtTicket(ticket_id, formData);
    
    if(response != undefined && response.error == null) {
      navigation.navigate('Payment', { url: response.datas.payment_url, ticket_id: ticket_id, boughtTicketId: response.datas.boughtTicket.id, day: day });
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsBoughtTicketLoading(false);
  }

  const emptyInfoClient = () => {
    setFirstname("");
    setLastname("");
    setPhonenumber("");
  }
  const fetchTicket = async (ticket_id) => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Ticket::buyPress()");
    
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

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Ticket::buyPress()::response ",JSON.stringify(response));
  }

  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Ticket::useEffect()");

    fetchTicket(ticket_id);

  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      { ticket && (
        <KeyboardAvoidingView behavior="padding" 
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
          <ScrollView>
            <View style={styles.ticket_detail_container}>              
              <Text style={styles.ticket_detail_station}>{ticket && ticket.partner.companyName}</Text>
              <View style={styles.ticket_detail_item_row}>
                <View style={styles.ticket_detail_item}>
                  <Text style={styles.ticket_detail_item_label}>{ticket && 'Trajet'}</Text>
                  <Text style={styles.ticket_detail_item_text}>{ticket && ticket.travelDatas.from} - {ticket && ticket.travelDatas.to}</Text>
                </View>
                <View style={[styles.ticket_detail_item,{alignItems: "flex-end"}]}>
                  <Text style={styles.ticket_detail_item_label}>{ticket && 'Départ'}</Text>
                  <Text style={[styles.ticket_detail_item_text,{textAlign: "right"}]}>{ticket && dateTimeFormat(day, ticket.travelDatas.departureAt)}</Text>
                </View>
              </View>
              <View style={styles.ticket_detail_item_row}>
                <View style={styles.ticket_detail_item}>
                  <Text style={styles.ticket_detail_item_label}>{ticket && 'Distance'}</Text>
                  <Text style={styles.ticket_detail_item_text}>{ticket && '1500km'}</Text>
                </View>
                <View style={[styles.ticket_detail_item,{alignItems: "flex-end"}]}>
                  <Text style={styles.ticket_detail_item_label}>{ticket && 'Durée'}</Text>
                  <Text style={styles.ticket_detail_item_text}>{ticket && '28h'}</Text>
                </View>
              </View>
              <View style={styles.ticket_detail_item_row}>
                <View style={styles.ticket_detail_item}>
                  <Text style={styles.ticket_detail_item_label}>{ticket && 'Tarif'}</Text>
                  <Text style={[styles.ticket_detail_item_text,{alignItems: "flex-end"}]}>{ticket && priceFormat(ticket.price)}</Text>
                </View>
                <View style={[styles.ticket_detail_item,{alignItems: "flex-end"}]}>
                  <Text style={styles.ticket_detail_item_label}>{ticket && 'Commission'}</Text>
                  <Text style={[styles.ticket_detail_item_text,{textAlign: "right"}]}>{ticket && priceFormat(ticket.commission)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.ticket_detail_form_container}>
              <Text style={styles.ticket_detail_form_billet}>Informations du passager</Text>
              
              {/* <Text style={styles.label}>Nombre</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={ticketCount}
                  onValueChange={(itemValue) => setTicketCount(itemValue)}
                >
                  <Picker.Item key="1" label="1" value="1" />
                  <Picker.Item key="2" label="2" value="2" />
                  <Picker.Item key="3" label="3" value="3" />
                  <Picker.Item key="4" label="4" value="4" />
                  <Picker.Item key="5" label="5" value="5" />
                </Picker>
              </View> */}

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
                keyboardType='numeric'
                onChangeText={(text)=>setPhonenumber(text)}
                value={phonenumber} />
                
              <TouchableOpacity onPress={() => buyPress(ticket_id)} style={{display: 'flex', flexWrap: 'wrap', marginBottom: 20}}>
                <Text style={styles.custom_button}>Acheter</Text>
                <Loading isLoading={isBoughtTicketLoading}/>
              </TouchableOpacity>
            </View>
            <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
            <SuccessModal isVisible={isSuccessModalVisible} toggleModal={toggleSuccessModal} message={successMessage} />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      <Loading isLoading={isLoading}/>
    </SafeAreaView>
  );
}

export default Ticket;