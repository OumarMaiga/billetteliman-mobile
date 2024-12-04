import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import { ProfileHeader } from '../../component';
import { useSelector } from 'react-redux';
import { getBoughtTicketList } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import ErrorModal from '../../component/ErrorModal';
import { dateTimeFormat, priceFormat } from '../../helper';

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

  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Profile::useEffect()");

    fetchBoughtTicketList(user.id);

  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader navigation={navigation}/>

        { boughtTicketList.map((boughtTicket,index) => (
        <View key={index} style={styles.profile_ticket_bought_container}>
          <View style={styles.profile_ticket_bought_left}>
            <View>
              <Text>Compagnie: {boughtTicket.ticket.partner.companyName}</Text>
            </View>
            <View>
              <Text>{`Trajet: ${boughtTicket.ticket.travelDatas.from} - ${boughtTicket.ticket.travelDatas.to}`}</Text>
            </View>
            <View>
              <Text>Depart: {dateTimeFormat(boughtTicket.travelDate, boughtTicket.ticket.travelDatas.departureAt)}</Text>
            </View>
            <View>
              <Text>Montant payé: {priceFormat(boughtTicket.paymentConfigurationDatas.price)}</Text>
            </View>
          </View>          
          <View style={styles.profile_ticket_bought_right}>
            <View>
              <Text style={{textAlign:'right'}}>ID: {boughtTicket.paymentConfigurationDatas.code}</Text>
            </View>
            <View>
              <Text style={{textAlign:'right'}}>Pour: {boughtTicket.boughtFor.map(user => `${user.firstname} ${user.lastname}`).join(", ")}</Text>
            </View>
            <View>
              <Text style={{textAlign:'right'}}>Achété le {dateTimeFormat(boughtTicket.buyDate, boughtTicket.ticket.travelDatas.departureAt)}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image source={require("./assets/image/qr-code.png")} 
                style={styles.profile_ticket_bought_image} />
            </View>
          </View>          
        </View>
        ))}
        <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;