import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, 
  Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { getTicket, buyTicket } from '../../../service/ticket';
import styles from './assets/style/index';
import * as GLOBAL from "../../../data/global.js";

const Detail = ({route}) => {
  const { ticket_id } = route.params;

  const [ticket_count, setTicket_count] = React.useState();
  const [firstname, setFirstname] = React.useState();
  const [lastname, setLastname] = React.useState();
  const [phone, setPhone] = React.useState();
  const [ticket, setTicket] = React.useState();

  const buyPress = async (ticket_id) => {
    
    if(global.debug >= GLOBAL.LOG.INFO) console.log("Detail::submitButtonPress()")
  
    const response = await buyTicket(ticket_id, [{firstname: firstname, lastname: lastname, phonenumber: phone}]);
    
    if(response != undefined && response.success) {
      alert("Achat enregistré !");
    } else {
      console.error(response);
    }
  }

  const fetchTicket = async (ticket_id) => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Detail::fetchTicket()");
    
    setIsLoading(true);

    const response = await getTicket(ticket_id);
    
    if (response != undefined && response.success) {
      setTicket(response.data);
    } else {
      console.error(response);
    }
    setIsLoading(false);

    if (global.debug >= GLOBAL.LOG.ROOT)  console.log("Detail::fetchTicket()::response "+JSON.stringify(response));
  }

  React.useEffect(() => {

    if (global.debug >= GLOBAL.LOG.INFO) console.log("Detail::useEffect()");

    //fetchTicket(ticket_id);

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
          <ScrollView>
            <View style={styles.ticket_detail_container}>
              <Text style={styles.ticket_detail_station}>Tilemsi</Text>
              <View style={styles.ticket_detail_item}>
                <Text style={styles.ticket_detail_item_title}>Trajet</Text>
                <Text style={styles.ticket_detail_item_text}>Bamako - Segou</Text>
              </View>
              <View style={styles.ticket_detail_item}>
                <Text style={styles.ticket_detail_item_title}>Tarif</Text>
                <Text style={styles.ticket_detail_item_text}>12 500F</Text>
              </View>
              <View style={styles.ticket_detail_item}>
                <Text style={styles.ticket_detail_item_title}>Depart</Text>
                <Text style={styles.ticket_detail_item_text}>Sam 12 Nov à 12h00</Text>
              </View>
            </View>
            <View style={styles.ticket_detail_form_container}>
              <Text style={styles.label}>Nombre de ticket</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text)=>setTicket_count(text)}
                keyboardType = 'numeric'
                value={ticket_count} />
              <Text style={styles.ticket_detail_form_billet}>Billet N1</Text>
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
                
              <Pressable onPress={() => buyPress(1)} style={{display: 'flex', flexWrap: 'wrap', marginBottom: 20}}>
                <Text style={styles.custom_button}>Acheter</Text>
              </Pressable>
            </View>
          </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Detail;