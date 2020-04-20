import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/global';
import DrawerNavigator from '../routes/drawer';
import Login from './login';

export default function Error_log({navigation}) {

    const toLogin = () => {
        navigation.navigate('Login');
      }

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.h5}>Błąd w logowaniu</Text>
      <TouchableOpacity onPress={toLogin}>
        <Text style={styles.s1}> Spróbuj ponownie</Text>
      </TouchableOpacity>
    </View>
  )
}
