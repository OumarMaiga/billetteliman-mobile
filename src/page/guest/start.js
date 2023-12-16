import * as React from 'react';
import { SafeAreaView, Text, Image, Button, View, Pressable  } from 'react-native';
import styles from './assets/style/';

const Start = ({navigation}) => {

  const startButtonPress = () => {
    navigation.navigate('Login');
  }
    return (
      <SafeAreaView style={styles.start_container}>
        <Image source={require("./assets/image/start.jpg")} 
          style={styles.start_image} />
        <View style={styles.start_item_container}>
          <Text style={styles.start_title}>Réservez votre prochain voyage chez nous</Text>
          <View style={styles.button_container} >
            <Pressable style={styles.button_start}
              onPress={startButtonPress}>
              <Text style={styles.button_start_text}>DEMARRER</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }
export default Start;