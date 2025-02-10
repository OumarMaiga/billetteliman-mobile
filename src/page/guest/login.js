import * as React from 'react';
import { Text, TextInput, SafeAreaView, Button, ScrollView, Pressable, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Platform, 
  View} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { login as loginService } from '../../../service/auth';
import { getIdentifiers } from '../../../service/identifier';
import { useDispatch } from "react-redux";
import { login as loginState, logout } from "../../features/userSlice";
import styles from './assets/style/';
import "../../../data/global.js";
import * as GLOBAL from "../../../data/global.js";
import { Loading } from '../../component/Loading';
import ErrorModal from '../../component/ErrorModal';

const Login = ({navigation}) => {

  const dispatch = useDispatch();

  const [login, setLogin] = React.useState();
  const [password, setPassword] = React.useState();
  const [identifiers, setIdentifiers] = React.useState([]);
  const [identifierSelected, setIdentifierSelected] = React.useState(identifiers.length > 0 ?? identifiers[0].value);
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

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Login::useEffect()");

    fetchIdentifiers();

  }, []);

  const fetchIdentifiers = async () => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Login::fetchIdentifiers()");
    
    setIsLoading(true);
    
    const response = await getIdentifiers();
    
    if (response != undefined && response.error == null) {
      setIdentifiers(response.datas.identifiers);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Login::fetchIdentifiers()::response "+JSON.stringify(response));
  }

  const submitButtonPress = async () => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("Login::submitButtonPress()")
      
    const formData = new FormData();
    formData.append("user-login", login);
    formData.append("user-password", password);
    formData.append("country-identifier", identifierSelected);

    const response = await loginService(formData);
    
    if(response != undefined && response.error == null) {
      dispatch(loginState(response.datas.accountDatas));
    } else {
      setErrorMessage(response.error);
      setIsErrorModalVisible(!isErrorModalVisible);
    }
  }

  const inscriptionLinkPress = () => {
    navigation.navigate('Register');
  }

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex:1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{margin: 20}}>
              <Text style={[styles.title,{marginTop: 80, marginBottom: 20}]}>Bienvenue</Text>
              
              <Text style={styles.label}>Pays</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={identifierSelected}
                  onValueChange={(itemValue, itemIndex) =>
                    setIdentifierSelected(itemValue)
                  }>
                    {identifiers.map((identifier, index) => <Picker.Item key={index} label={identifier.identifier} value={identifier.id} /> )}
                </Picker>
              </View>
              
              <Text style={styles.label}>Telephone</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setLogin(text)}
                value={login}
                keyboardType='phone-pad' />
              
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput secureTextEntry
                style={styles.input}
                onChangeText={(text)=>setPassword(text)}
                value={password} />
                
              <Button onPress={submitButtonPress}
                title='Connexion' />
              <Text style={{textAlign: 'center', marginTop: 20, fontSize: 16}}>Vous n'avez pas de compte?</Text>
              <Pressable onPress={inscriptionLinkPress}
                style={styles.link}>
                <Text style={[styles.link,{textAlign: 'center', marginTop: 10, fontSize: 16}]}>Inscrivez-vous</Text>
              </Pressable>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <Loading isLoading={isLoading}/>
        <ErrorModal isVisible={isErrorModalVisible} toggleModal={toggleErrorModal} message={errorMessage} />
      </SafeAreaView>
    );
  }
export default Login;