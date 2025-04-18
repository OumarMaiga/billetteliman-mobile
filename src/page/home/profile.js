import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from 'react-native-vector-icons';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import ErrorModal from '../../component/ErrorModal';
import { dateTimeFormat, priceFormat } from '../../helper';
import { Loading } from '../../component/Loading';

const Profile = ({navigation}) => {
    
  const user = useSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };

  const boughtTicketPress = (boughtTicketId) => {
    navigation.navigate('BoughtTicket', {
      "boughtTicketId": boughtTicketId
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        
        <Text style={{fontWeight:"bold",padding:20,fontSize:16}}>Information personnelle</Text>

        <View style={styles.profile_info_perso_container}>
          <View style={styles.profile_info_perso_item_container}>
            <View style={styles.profile_info_perso_item_icon}>
              <Ionicons name="person-circle-sharp" size={22} color="#000" />
            </View>
            <View style={styles.profile_info_perso_item}>
              <Text style={styles.profile_info_perso_item_label}>Prenom & Nom</Text>
              <Text style={styles.profile_info_perso_item_text}>{`${user.firstname} ${user.lastname}`}</Text>
            </View>
          </View>
          
          <View style={styles.profile_info_perso_item_container}>
            <View style={styles.profile_info_perso_item_icon}>
              <Ionicons name="mail" size={22} color="#000" />
            </View>
            <View style={styles.profile_info_perso_item}>
              <Text style={styles.profile_info_perso_item_label}>Email</Text>
              <Text style={styles.profile_info_perso_item_text}>{`${user.email}`}</Text>
            </View>
          </View>
          
          <View style={styles.profile_info_perso_item_container}>
            <View style={styles.profile_info_perso_item_icon}>
              <Ionicons name="call-sharp" size={22} color="#000" />
            </View>
            <View style={styles.profile_info_perso_item}>
              <Text style={styles.profile_info_perso_item_label}>Téléphone</Text>
              <Text style={styles.profile_info_perso_item_text}>{`${user.phonenumber}`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Loading isLoading={isLoading} />
      <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
    </SafeAreaView>
  );
}

export default Profile;