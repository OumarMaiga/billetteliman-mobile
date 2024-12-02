import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, Button, ScrollView, Pressable, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { register as registerService } from '../../../service/auth';
import { useDispatch } from "react-redux";
import { login as loginState } from "../../../store/actions/user";
import { getIdentifiers } from '../../../service/identifier';
import * as GLOBAL from "../../../data/global.js";
import styles from './assets/style/';

const Register = ({navigation}) => {

  const dispatch = useDispatch();

  const [phone, setPhone] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConfirm, setPasswordConfirm] = React.useState();
  const [identifiers, setIdentifiers] = useState([]);
  const [identifierSelected, setIdentifierSelected] = useState(identifiers[0].value);
  /*const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  
  function close() {
    pickerRef.current.blur();
  }*/
  useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Register::useEffect()");

    fetchIdentifiers();

  }, []);

  const fetchIdentifiers = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Register::fetchIdentifiers()");
    
    setIsLoading(true);

    const response = await getIdentifiers();
    
    if (response != undefined && response.error == null) {
      setIdentifiers(response.data);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Register::fetchIdentifiers()::response "+JSON.stringify(response));
  }
  
  const submitButtonPress = async () => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("Register::submitButtonPress()")
  
    if(password == "" || password != passwordConfirm) {
      alert("Mot de passe non conforme !");
      return;
    }

    const formData = new FormData();
    formData.append("user-phonenumber", phone);
    formData.append("user-password", password);
    formData.append("country-identifier", identifierSelected);

    const response = await registerService(formData);
    
    if(response != undefined && response.error == null) {
      dispatch(loginState(response.datas.accountDatas));
    } else {
      alert(response.error);
    }
    
  }

  const connexionLinkPress = () => {
    navigation.navigate('Register');
  }

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={{flex:1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{margin: 20}}>
              <Text style={[styles.title,{marginTop: 80, marginBottom: 20}]}>Inscrivez-vous</Text>
              <Text style={styles.label}>Pays</Text>
              <Picker
                selectedValue={identifierSelected}
                onValueChange={(itemValue, itemIndex) =>
                  setIdentifierSelected(itemValue)
                }>
                  {identifiers.map((identifier) => <Picker.Item label={identifier.identifier} value={identifier.id} /> )}
              </Picker>
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
              <Button onPress={submitButtonPress}
                title='Inscription' />
              <Text style={{textAlign: 'center', marginTop: 20, fontSize: 16}}>Vous avez déjà un compte?</Text>
              <Pressable onPress={connexionLinkPress} 
                style={styles.link}>
                <Text style={[styles.link,{textAlign: 'center', marginTop: 10, fontSize: 16}]}>Connectez-vous</Text>
              </Pressable>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
}
export default Register;