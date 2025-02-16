import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { update } from "../../features/userSlice";
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import { Loading } from '../../component/Loading';
import ErrorModal from '../../component/ErrorModal';
import { updateUser } from '../../../service/user';
import { Picker } from '@react-native-picker/picker';
import { getIdentifiers } from '../../../service/identifier';
import SuccessModal from '../../component/SuccessModal';

const EditProfile = ({navigation}) => {
  
  const user = useSelector((state) => state.user.user);
  
  const [firstname, setFirstname] = React.useState(user != undefined && user.firstname != null ? user.firstname : "");
  const [lastname, setLastname] = React.useState(user != undefined && user.lastname != null ? user.lastname : "");
  const [phone, setPhone] = React.useState(user != undefined && user.phonenumber != null ? user.phonenumber : "");
  const [email, setEmail] = React.useState(user != undefined && user.email != null ? user.email : "");
  const [identifiers, setIdentifiers] = React.useState([]);
  const [identifierSelected, setIdentifierSelected] = React.useState(user != undefined ? user.phonenumberIdentifier.id : 0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };
  
  const toggleSuccessModal = () => {
    setIsSuccessModalVisible(!isSuccessModalVisible);
  };

  const fetchIdentifiers = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("EditProfile::fetchIdentifiers()");
    
    setIsLoading(true);
    
    const response = await getIdentifiers();
    
    if (response != undefined && response.error == null) {
      setIdentifiers(response.datas.identifiers);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("EditProfile::fetchIdentifiers()::response "+JSON.stringify(response));
  }
  const onSubmit = async () => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("EditProfile::onSubmit()")
  
    setIsLoading(true);

    const formData = new FormData();
    formData.append("user-firstname", firstname);
    formData.append("user-lastname", lastname);
    formData.append("user-phonenumber", phone);
    formData.append("user-email", email);
    formData.append("country-identifier", identifierSelected);
    
    const response = await updateUser(user.id, formData);
    
    if(response != undefined && response.error == null) {
      dispatch(update(response.datas.accountDatas));
      setSuccessMessage("Mise à jour du profil effectué effectué !");
      setIsSuccessModalVisible(!isSuccessModalVisible);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);
  }
  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("EditProfile::useEffect()");

    fetchIdentifiers();

  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>        
        <View style={{margin: 20}}>
          <Text style={{marginBottom: 20, fontSize: 22, fontWeight: 'bold'}}>Mise à jour profil</Text>
          
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

          <Text style={styles.label}>Indicatif</Text>
          <View style={[styles.input,{paddingLeft:0}]}>
            <Picker
              selectedValue={identifierSelected}
              onValueChange={(itemValue, itemIndex) =>
                setIdentifierSelected(itemValue)
              }>
                <Picker.Item label="Selectionnez" value="0" />
                {identifiers.map((identifier, index) => <Picker.Item key={index} label={identifier.identifier} value={identifier.id} /> )}
            </Picker>
          </View>
          
          <Text style={styles.label}>Telephone</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setPhone(text)}
            value={phone} />
            
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setEmail(text)}
            value={email} />
            
          <TouchableOpacity onPress={onSubmit} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Text style={styles.custom_button}>Modifier</Text>
          </TouchableOpacity>
        </View>
        <Loading isLoading={isLoading} />
        <SuccessModal isVisible={isSuccessModalVisible} toggleModal={toggleSuccessModal} message={successMessage} />
        <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProfile;