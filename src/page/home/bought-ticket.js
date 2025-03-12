import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, 
  KeyboardAvoidingView, Platform, Image,
  Button} from 'react-native';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import { convertToDateHour, dateTimeFormat, formatDateTime, priceFormat } from '../../helper';
import { useSelector } from 'react-redux';
import ErrorModal from '../../component/ErrorModal';
import { Loading } from '../../component/Loading';
import { Picker } from '@react-native-picker/picker';
import SuccessModal from '../../component/SuccessModal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getBoughtTicket } from '../../../service/ticket';

const BoughtTicket = ({route, navigation}) => {
  const { boughtTicketId } = route.params;
  
  const [boughtTicket, setBoughtTicket] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
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
  };

  const fetchBoughtTicket = async (boughtTicketId) => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("BoughtTicket::fetchBoughtTicket()");
    
    setIsLoading(true);

    const formData = new FormData();

    const response = await getBoughtTicket(boughtTicketId, formData);
    
    if (response != undefined && response.error == null) {
      setBoughtTicket(response.datas.boughtTicketDatas);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("BoughtTicket::fetchBoughtTicket()::response "+JSON.stringify(response));
  }

  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("BoughtTicket::useEffect()");

    fetchBoughtTicket(boughtTicketId);

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      { boughtTicket && (
        <KeyboardAvoidingView behavior="padding" 
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
          <ScrollView>
            <View style={styles.ticket_detail_container}>              
              <Text style={styles.ticket_detail_station}>{boughtTicket && boughtTicket.ticket.travelDatas.from} - {boughtTicket && boughtTicket.ticket.travelDatas.to}</Text>
              <Text style={[styles.ticket_detail_item_label,{marginTop:-10, marginBottom:10}]}>{boughtTicket && dateTimeFormat(boughtTicket.travelDate, boughtTicket.ticket.travelDatas.departureAt)}</Text>
              <View style={styles.ticket_detail_item_row}>
                <View style={styles.ticket_detail_item}>
                  <Text style={styles.ticket_detail_item_label}>{boughtTicket && 'ID ticket'}</Text>
                  <Text style={styles.ticket_detail_item_text}>{boughtTicket && boughtTicket.paymentConfigurationDatas.code}</Text>
                </View>
                <View style={[styles.ticket_detail_item,{alignItems: "flex-end"}]}>
                  <Text style={styles.ticket_detail_item_label}>{boughtTicket && 'Pour'}</Text>
                  <Text style={styles.ticket_detail_item_text}>{boughtTicket && boughtTicket.boughtFor.map(person => `${person.firstname} ${person.lastname}`).join(", ")}</Text>
                </View>
              </View>
              <View style={styles.ticket_detail_item_row}>
                <View style={styles.ticket_detail_item}>
                  <Text style={styles.ticket_detail_item_label}>{boughtTicket && 'Achété le'}</Text>
                  <Text style={styles.ticket_detail_item_text}>{boughtTicket && formatDateTime(new Date(boughtTicket.buyDate*1000))}</Text>
                </View>
                <View style={[styles.ticket_detail_item,{alignItems: "flex-end"}]}>
                  <Text style={styles.ticket_detail_item_label}>{boughtTicket && 'Compagnie'}</Text>
                  <Text style={styles.ticket_detail_item_text}>{boughtTicket && boughtTicket.ticket.partner.companyName}</Text>
                </View>
              </View>
              <View style={styles.ticket_detail_item_row}>
                <View style={styles.ticket_detail_item}>
                  <Text style={styles.ticket_detail_item_text}>{boughtTicket && 'Montant payé'}</Text>
                </View>
                <View style={[styles.ticket_detail_item,{alignItems: "flex-end"}]}>
                  <Text style={[styles.ticket_detail_item_text,{color:"red"}]}>{boughtTicket && boughtTicket.paymentConfigurationDatas.amount+'F'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.ticket_detail_qr_container}>
              <Image style={styles.qr_code_image} source={require('./assets/image/qr-code.png')} />
              <View style={[styles.ticket_detail_item_row,{marginTop:10}]}>
                <Text style={styles.ticket_detail_nb_title}>NB:
                  <Text style={styles.ticket_detail_nb_text}> Montrez le code QR à la gare pour récupérer votre billet</Text>
                </Text>
              </View>
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

export default BoughtTicket;