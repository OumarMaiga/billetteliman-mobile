import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, Image, Pressable } from 'react-native';
import styles from './assets/style/index';

const Detail = () => {
  const [ticket_count, setTicket_count] = React.useState();
  const [firstname, setFirstname] = React.useState();
  const [lastname, setLastname] = React.useState();
  const [phone, setPhone] = React.useState();
    
  const buyPress = () => {
    console.log("Acheter button pressed!");
  }

  return (
    <SafeAreaView style={styles.container}>
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
            style={[styles.input,{marginBottom: 10}]}
            onChangeText={(text)=>setTicket_count(text)}
            keyboardType = 'numeric'
            value={ticket_count} />
          <Text style={styles.ticket_detail_form_billet}>Billet N1</Text>
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
            style={styles.input}
            onChangeText={(text)=>setPhone(text)}
            value={phone} />
            
          <Pressable onPress={buyPress} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Text style={[styles.ticket_trajet_button,{marginTop: 20, fontSize: 20}]}>Acheter</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Detail;