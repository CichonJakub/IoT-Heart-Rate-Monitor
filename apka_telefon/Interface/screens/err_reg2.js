import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/global';
import DrawerNavigator from '../routes/drawer';
import Register from './register';

export default function Error_reg2({navigation}) {

    const toRegister = () => {
        navigation.navigate('Register');
      }

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.h5}>Dany użytkownik już istnieje{"\n"}</Text>
      <TouchableOpacity onPress={toRegister}>
                  <Text style={styles.s1}> Spróbuj ponownie</Text>
        </TouchableOpacity>
    </View>
  )
}
