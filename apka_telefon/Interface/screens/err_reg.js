import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/global';
import DrawerNavigator from '../routes/drawer';
import Register from './register';

export default function Error_reg({navigation}) {

    const toRegister = () => {
        navigation.navigate('Register');
      }

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Podane hasła nie są identyczne!</Text>
      <TouchableOpacity onPress={toRegister}>
                  <Text style={styles.registerText}> Spróbuj ponownie</Text>
        </TouchableOpacity>
    </View>
  )
}
