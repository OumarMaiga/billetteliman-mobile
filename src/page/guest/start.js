import * as React from 'react';
import { SafeAreaView, Text, Image, View, TouchableOpacity  } from 'react-native';
import styles from './assets/style/';

const Start = ({navigation}) => {

  const startButtonPress = () => {
    navigation.navigate('Login');
  }
    return (
      <SafeAreaView style={styles.start_container}>
        <View style={styles.start_image_container}>
          <Image source={require("./assets/image/start.png")} 
            style={styles.start_image} />
          </View>
        <View style={styles.start_item_container}>
          <Text style={styles.start_title}>Réservez votre prochain voyage chez nous</Text>
          <TouchableOpacity style={styles.button_container}
            onPress={startButtonPress}>
            <Text style={styles.button_text}>DEMARRER</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
export default Start;