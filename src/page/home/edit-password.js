import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { changePassword } from '../../../service/auth';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";

const EditPassword = ({navigation}) => {
  
  const user = useSelector((state) => state.user);

  const [currentPassword, setCurrentPassword] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConfirm, setPasswordConfirm] = React.useState();
  
  const onSubmit = async () => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("EditProfile::submitButtonPress()")
  
    const formData = new FormData(); 
    formData.append("current-password", currentPassword);
    formData.append("new-password", password);
    formData.append("new-password-confirm", passwordConfirm);
    
    const response = await changePassword(user.id, formData);
    
    if(response != undefined && response.error == null) {
      alert("Mise à jour du mot de passe effectué enregistré !");
    } else {
      alert("Echec de mise à jour");
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>        
        <View style={{margin: 20}}>
          <Text style={{marginBottom: 20, fontSize: 22, fontWeight: 'bold'}}>Changer mot de passe</Text>
          
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput secureTextEntry
            style={styles.input}
            onChangeText={(text)=>setCurrentPassword(text)}
            value={currentPassword} />
            
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
                        
          <Pressable onPress={onSubmit} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Text style={styles.custom_button}>Modifier</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditPassword;