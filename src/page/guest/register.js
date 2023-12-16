import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, Button, ScrollView, Pressable, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import styles from './assets/style/';

const Register = ({navigation}) => {
  const [phone, setPhone] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConfirm, setPasswordConfirm] = React.useState();
  
  const submitButtonPress = () => {
    console.log("soumission...");
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
              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setPhone(text)}
                value={phone}
                keyboardType='phone-pad' />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setEmail(text)}
                value={email}
                keyboardType='email-address' />
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