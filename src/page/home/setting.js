import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { ProfileHeader } from '../../component';
import styles from './assets/style/index';

const Setting = () => {  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader />
        
      </ScrollView>
    </SafeAreaView>
  );
}

export default Setting;