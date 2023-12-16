import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, TextInput } from 'react-native';
import styles from './assets/style/index';

const EditProfile = ({navigation}) => {
  
  const [firstname, setFirstname] = React.useState();
  const [lastname, setLastname] = React.useState();
  const [phone, setPhone] = React.useState();
  const [email, setEmail] = React.useState();
  
  const onSubmit = () => {
    console.log("onSubmit...");
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>        
        <View style={{margin: 20}}>
          <Text style={{marginBottom: 20, fontSize: 22, fontWeight: 'bold'}}>Mise à jour profil</Text>
          
          <Text style={styles.label}>Prenom</Text>
          <TextInput
            style={[styles.input,{marginBottom: 10}]}
            onChangeText={(text)=>setFirstname(text)}
            value={firstname} />
            
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={[styles.input,{marginBottom: 10}]}
            onChangeText={(text)=>setLastname(text)}
            value={lastname} />
            
          <Text style={styles.label}>Telephone</Text>
          <TextInput
            style={[styles.input,{marginBottom: 10}]}
            onChangeText={(text)=>setPhone(text)}
            value={phone} />
            
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input,{marginBottom: 10}]}
            onChangeText={(text)=>setEmail(text)}
            value={email} />
            
          <Pressable onPress={onSubmit} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Text style={[styles.ticket_trajet_button,{marginTop: 20, fontSize: 20}]}>Modifier</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProfile;