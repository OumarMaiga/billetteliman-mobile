import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, TextInput } from 'react-native';
import styles from './assets/style/index';

const EditPassword = ({navigation}) => {
  
  const [currentPassword, setCurrentPassword] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConfirm, setPasswordConfirm] = React.useState();
  
  const onSubmit = () => {
    console.log("onSubmit...");
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>        
        <View style={{margin: 20}}>
          <Text style={{marginBottom: 20, fontSize: 22, fontWeight: 'bold'}}>Changer mot de passe</Text>
          
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput secureTextEntry
            style={[styles.input,{marginBottom: 10}]}
            onChangeText={(text)=>setCurrentPassword(text)}
            value={currentPassword} />
            
          <Text style={styles.label}>Nouveau mot de passe</Text>
          <TextInput secureTextEntry
            style={[styles.input,{marginBottom: 10}]}
            onChangeText={(text)=>setPassword(text)}
            value={password} />
            
          <Text style={styles.label}>Confirmer nouveau mot de passe</Text>
          <TextInput secureTextEntry
            style={styles.input}
            onChangeText={(text)=>setPasswordConfirm(text)}
            value={passwordConfirm} />
                        
          <Pressable onPress={onSubmit} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Text style={[styles.ticket_trajet_button,{marginTop: 20, fontSize: 20}]}>Modifier</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditPassword;