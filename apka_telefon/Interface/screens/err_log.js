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
    <View style={styles.container}>
      <Text style={styles.txt}>Błąd w logowaniu!</Text>
      <TouchableOpacity onPress={toLogin}>
                  <Text style={styles.registerText}> Spróbuj ponownie</Text>
        </TouchableOpacity>
    </View>
  )
}
