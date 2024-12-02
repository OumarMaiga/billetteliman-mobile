import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { update } from "../../../store/actions/user";
import { updateUser } from '../../../service/auth';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";

const EditProfile = ({navigation}) => {
  
  const user = useSelector((state) => state.user);
  
  const [firstname, setFirstname] = React.useState(user != undefined ? user.fname : "");
  const [lastname, setLastname] = React.useState(user != undefined ? user.name : "");
  const [phone, setPhone] = React.useState(user != undefined ? user.phonenumber : "");
  const [email, setEmail] = React.useState(user != undefined ? user.email : "");
  
  const onSubmit = async () => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("EditProfile::submitButtonPress()")
  
      const formData = new FormData();
      formData.append("user-firstname", firstname);
      formData.append("user-lastname", lastname);
      formData.append("user-phonenumber", phone);
      formData.append("user-email", email);

    const response = await updateUser(user.id, formData);
    
    if(response != undefined && response.error == null) {
      dispatch(update(response.datas.accountDatas));
    } else {
      alert("Echec de mise à jour");
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>        
        <View style={{margin: 20}}>
          <Text style={{marginBottom: 20, fontSize: 22, fontWeight: 'bold'}}>Mise à jour profil</Text>
          
          <Text style={styles.label}>Prenom</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setFirstname(text)}
            value={firstname} />
            
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setLastname(text)}
            value={lastname} />
            
          <Text style={styles.label}>Telephone</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setPhone(text)}
            value={phone} />
            
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setEmail(text)}
            value={email} />
            
          <Pressable onPress={onSubmit} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Text style={styles.custom_button}>Modifier</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProfile;