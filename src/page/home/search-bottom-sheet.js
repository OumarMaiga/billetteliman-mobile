import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as GLOBAL from "../../../data/global.js";
import { getCities } from '../../../service/city';
import { formatDate } from '../../helper';

const SearchBottomSheet = ({navigation}) => {
  
  const [start_point, setStart_point] = useState("Bamako");
  const [end_point,setEnd_point] = useState("");
  const [departure_date, setDeparture_date] = useState(formatDate(new Date()));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    

  // Ouvrir le DatePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Fermer le DatePicker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Gérer la date sélectionnée
  const dateSelected = (date) => {
    const formattedDate = formatDate(date);
    setDeparture_date(formattedDate);
    hideDatePicker();
  };
    
  const searchPress = () => {
    navigation.navigate('Search', {
      'start_point': start_point,
      'end_point': end_point,
      'departure_date': departure_date
    });
  }

  useEffect(() => {

	if (global.debug >= GLOBAL.LOG.INFO) console.log("SearchBttomSheet::useEffect()");

	fetchCities();

  }, [navigation]);

  const closePress = () => {
    navigation.goBack();
  }
  
  const fetchCities = async () => {
    try {
      if (global.debug >= GLOBAL.LOG.INFO) console.log("SearchBttomSheet::fetchCities()");
      setIsLoading(true);
      const response = await getCities();

      if (response && !response.error) {
        setCities(response.datas.citiesDatas);
      } else {
        throw new Error((response != undefined && response.error) || "Erreur de récupération des villes");
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.book_container}>
          <Text style={styles.book_title}>Reservez votre billet</Text>
          <TouchableOpacity onPress={closePress} style={styles.icon_close}>
            <Ionicons name='close' size={32} color="#000" />
          </TouchableOpacity>
          <Text style={styles.label}>Départ</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={start_point}
                onValueChange={(itemValue) => setStart_point(itemValue)}
              >
                <Picker.Item label="Bamako" value="Bamako" />
                {cities.map((city,index) => (
                  <Picker.Item key={index} label={city.name} value={city.name} />
                ))}
              </Picker>
            </View>
          <Text style={styles.label}>Destination</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={end_point}
              onValueChange={(itemValue) => setEnd_point(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="" value="" />
              {cities.map((city,index) => (
                <Picker.Item key={index} label={city.name} value={city.name} />
              ))}
            </Picker>
          </View>
            
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={[styles.input,{justifyContent: 'center'}]}
            onPress={showDatePicker}>
              {isDatePickerVisible && (
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={dateSelected}
                onCancel={hideDatePicker}
              />
              )}
            <Text style={{fontSize: 18}}>{departure_date}</Text>
          </TouchableOpacity>
            
          <TouchableOpacity onPress={searchPress} style={styles.button_search_container}>
            <Text style={styles.custom_button}>Recherche</Text>
          </TouchableOpacity>          
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
	container: {
		flex: 1,
		justifyContent: "flex-end",
	},
	icon_close: {
		width: 50,
		height: 50,
		borderRadius: 50,
		position: 'absolute',
		right: 5,
		top: 15
	},	
	book_container: {
		padding: 16,
		backgroundColor: '#fff',
		paddingBottom: 40,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	book_title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20
	},
	label: {
		fontSize: 16,
		marginBottom: 5
	},
	input: {
		paddingLeft: 10,
		height: 40,
		borderWidth: 1,
		borderColor: '#D9D9D9',
		fontSize: 18,
		borderRadius: 5,
		marginBottom: 10,
		justifyContent: 'center',
	},
	button_search_container: {
		marginTop: 20,
		display: 'flex',
	} ,
	custom_button: {
		backgroundColor: "#22812B",
		color: "#fff",
		textAlign: 'center',
		paddingHorizontal: 10,
		paddingVertical: 4,
		fontSize: 18,
	},
})

export default SearchBottomSheet;