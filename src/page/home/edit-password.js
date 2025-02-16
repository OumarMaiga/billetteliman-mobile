import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";
import { changePassword } from '../../../service/user';
import SuccessModal from '../../component/SuccessModal';
import ErrorModal from '../../component/ErrorModal';
import { Loading } from '../../component/Loading';

const EditPassword = ({navigation}) => {
  
  const user = useSelector((state) => state.user.user);

  const [password, setPassword] = React.useState();
  const [passwordConfirm, setPasswordConfirm] = React.useState();
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
  
  const onSubmit = async () => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("EditProfile::submitButtonPress()")
    
    setIsLoading(true);

    const formData = new FormData(); 
    formData.append("new-password", password);
    formData.append("new-password-confirm", passwordConfirm);
    
    const response = await changePassword(user.id, formData);
    
    if(response != undefined && response.error == null) {
      setSuccessMessage("Mise à jour du mot de passe effectué enregistré !");
      setIsSuccessModalVisible(!isSuccessModalVisible);
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>        
        <View style={{margin: 20}}>
          <Text style={{marginBottom: 20, fontSize: 22, fontWeight: 'bold'}}>Changer mot de passe</Text>
                      
          <Text style={styles.label}>Nouveau mot de passe</Text>
          <TextInput secureTextEntry
            style={styles.input}
            onChangeText={(text)=>setPassword(text)}
            value={password} />
            
          <Text style={styles.label}>Confirmer nouveau mot de passe</Text>
          <TextInput secureTextEntry
            style={styles.input}
            onChangeText={(text)=>setPasswordConfirm(text)}
            value={passwordConfirm} />
                        
          <TouchableOpacity onPress={onSubmit} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Text style={styles.custom_button}>Modifier</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
        <Loading isLoading={isLoading} />
        <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
        <SuccessModal isVisible={isSuccessModalVisible} toggleModal={toggleSuccessModal} message={successMessage} />
    </SafeAreaView>
  );
}

export default EditPassword;