import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import { ProfileHeader } from '../../component';
import { useSelector } from 'react-redux';
import { getBoughtTicketList } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import ErrorModal from '../../component/ErrorModal';
import { dateTimeFormat, priceFormat } from '../../helper';
import { Loading } from '../../component/Loading';

const Profile = ({navigation}) => {
    
  const user = useSelector((state) => state.user);

  const [boughtTicketList, setBoughtTicketList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };

  const fetchBoughtTicketList = async (user_id) => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Profile::fetchBoughtTicketList()");
    
    setIsLoading(true);

    const response = await getBoughtTicketList(1);
    
    if (response != undefined && response.error == null) {
      setBoughtTicketList(response.datas.ticketsDatas);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Profile::fetchBoughtTicketList()::response "+JSON.stringify(response));
  }

  const boughtTicketPress = (boughtTicketId) => {
    navigation.navigate('BoughtTicket', {
      "boughtTicketId": boughtTicketId
    });
  }
  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Profile::useEffect()");

    fetchBoughtTicketList(user.id);

  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader navigation={navigation}/>
        <Text style={{fontWeight:"bold",padding:10,fontSize:14}}>Mes Achats</Text>

        { boughtTicketList.map((boughtTicket,index) => (
        <Pressable key={index} onPress={()=>boughtTicketPress(boughtTicket.id)} 
          style={styles.profile_ticket_bought_container}>
          <View style={styles.profile_ticket_bought}>
            <View style={styles.ticket_detail_item_row}>
              <Text>Compagnie</Text>
              <Text style={{fontWeight:"bold"}}>{boughtTicket.ticket.partner.companyName}</Text>
            </View>
            <View style={styles.ticket_detail_item_row}>
              <Text>Trajet</Text>
              <Text style={{fontWeight:"bold"}}>{`${boughtTicket.ticket.travelDatas.from} - ${boughtTicket.ticket.travelDatas.to}`}</Text>
            </View>
            <View style={styles.ticket_detail_item_row}>
              <Text>Depart</Text>
              <Text style={{fontWeight:"bold"}}>{dateTimeFormat(boughtTicket.travelDate, boughtTicket.ticket.travelDatas.departureAt)}</Text>
            </View>
            <View style={styles.ticket_detail_item_row}>
              <Text>Montant payé</Text>
              <Text style={{fontWeight:"bold"}}>{priceFormat(boughtTicket.paymentConfigurationDatas.price)}</Text>
            </View>
          </View>         
        </Pressable>
        ))}
      </ScrollView>
      <Loading isLoading={isLoading} />
      <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
    </SafeAreaView>
  );
}

export default Profile;