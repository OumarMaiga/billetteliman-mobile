import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, Button, ScrollView, Pressable, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
  import { register as registerService } from '../../../service/auth';
  import { useDispatch } from "react-redux";
  import { login as loginState } from "../../../store/actions/user";
import * as GLOBAL from "../../../data/global.js";
import styles from './assets/style/';

const Register = ({navigation}) => {

  const dispatch = useDispatch();

  const [phonenumber_country_id, setPhonenumber_country_id] = React.useState(223);
  const [phone, setPhone] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConfirm, setPasswordConfirm] = React.useState();
  
  const submitButtonPress = async () => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("Register::submitButtonPress()")
  
    if(password == "" || password != passwordConfirm) {
      alert("Mot de passe non conforme !");
      return;
    }

    const response = await registerService({user_phonenumber_country_id: phonenumber_country_id, user_phonenumber: phone, user_password: password});
    
    if(response != undefined && response.success) {
      dispatch(loginState(response.data));
    } else {
      alert("Compte non enregistré");
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
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setPhonenumber_country_id(text)}
                value={phonenumber_country_id}
                keyboardType='phone-pad' />
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