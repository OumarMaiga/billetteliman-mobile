import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import styles from './assets/style/index';

const Setting = () => {  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={[styles.title,{margin: 20}]}>Réglage</Text>
        <View style={styles.setting_item}>
          <View style={styles.setting_item_content}>
            <Ionicons name="notifications" size={22} color="#000" />
            <Text style={styles.setting_item_text}>Notification</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </View>
        <View style={styles.setting_item}>
          <View style={styles.setting_item_content}>
            <Ionicons name="earth-sharp" size={22} color="#000" />
            <Text style={styles.setting_item_text}>Langage</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </View>
        <View style={styles.setting_item}>
          <View style={styles.setting_item_content}>
            <Ionicons name="moon" size={22} color="#000" />
            <Text style={styles.setting_item_text}>Mode sombre</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </View>
        <View style={styles.setting_item}>
          <View style={styles.setting_item_content}>
            <Ionicons name="help-circle" size={22} color="#000" />
            <Text style={styles.setting_item_text}>Aide</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Setting;