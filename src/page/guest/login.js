import * as React from 'react';
import { View, Text, TextInput, SafeAreaView, Button, ScrollView, Pressable, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import styles from './assets/style/';

const Login = ({navigation}) => {
  const [login, setLogin] = React.useState();
  const [password, setPassword] = React.useState();

  const submitButtonPress = () => {
    console.log("soumission...");
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
              <Text style={styles.label}>Telephone</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setLogin(text)}
                value={login} />
              
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
      </SafeAreaView>
    );
  }
export default Login;