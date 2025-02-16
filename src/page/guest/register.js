import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { register } from '../../../service/auth';
import { useDispatch } from "react-redux";
import { login as loginState } from "../../features/userSlice";
import { getIdentifiers } from '../../../service/identifier';
import * as GLOBAL from "../../../data/global.js";
import styles from './assets/style/';
import ErrorModal from '../../component/ErrorModal';
import { Loading } from '../../component/Loading';

const Register = ({navigation}) => {

  const dispatch = useDispatch();

  const [phone, setPhone] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConfirm, setPasswordConfirm] = React.useState();
  const [identifiers, setIdentifiers] = React.useState([]);
  const [identifierSelected, setIdentifierSelected] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  
  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };

  /*const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  
  function close() {
    pickerRef.current.blur();
  }*/
  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Register::useEffect()");

    fetchIdentifiers();

  }, []);

  const fetchIdentifiers = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Register::fetchIdentifiers()");
    
    setIsLoading(true);

    const response = await getIdentifiers();
    
    if (response != undefined && response.error == null) {
      setIdentifiers(response.datas.identifiers);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Register::fetchIdentifiers()::response "+JSON.stringify(response));
  }
  
  const submitButtonPress = async () => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("Register::submitButtonPress()")
  
    setIsLoading(true);
  
    if(password == "" || password != passwordConfirm) {
      setErrorMessage("Mot de passe non conforme !");
      setIsErrorModalVisible(!isErrorModalVisible);
      setIsLoading(false);
      return false;
    }

    const formData = new FormData();
    formData.append("user-phonenumber", phone);
    formData.append("user-password", password);
    formData.append("country-identifier", identifierSelected);
    
    const response = await register(formData);
    
    if(response != undefined && response.error == null) {
      dispatch(loginState(response.datas.accountDatas));
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
    setIsLoading(false);
  }

  const connexionLinkPress = () => {
    navigation.navigate('Login');
  }

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={{flex:1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{margin: 20}}>
              <Text style={[styles.title,{marginTop: 80, marginBottom: 20}]}>Inscrivez-vous</Text>
              <Text style={styles.label}>Pays</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={identifierSelected}
                  onValueChange={(itemValue, itemIndex) =>
                    setIdentifierSelected(itemValue)
                  }
                  style={styles.picker}>
                    <Picker.Item label="Selectionnez" value="0" />
                    {identifiers.map((identifier, index) => <Picker.Item key={index} label={identifier.identifier} value={identifier.id} /> )}
                </Picker>
              </View>
              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setPhone(text)}
                value={phone}
                keyboardType='phone-pad' />
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput secureTextEntry
                style={styles.input}
                onChangeText={(text)=>setPassword(text)}
                value={password} />
              <Text style={styles.label}>Confirmation mot de passe</Text>
              <TextInput secureTextEntry
                style={styles.input}
                onChangeText={(text)=>setPasswordConfirm(text)}
                value={passwordConfirm} />
                
              <TouchableOpacity style={styles.button_container} onPress={submitButtonPress}>
                <Text style={styles.button_text}>Inscription</Text>
              </TouchableOpacity>
              <Text style={{textAlign: 'center', marginTop: 20, fontSize: 16}}>Vous avez déjà un compte?</Text>
              <TouchableOpacity onPress={connexionLinkPress} 
                style={styles.link}>
                <Text style={[styles.link,{textAlign: 'center', marginTop: 10, fontSize: 16}]}>Connectez-vous</Text>
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <Loading isLoading={isLoading}/>
        <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
      </SafeAreaView>
    );
}
export default Register;