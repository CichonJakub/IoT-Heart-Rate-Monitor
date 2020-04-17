import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/global';
import DrawerNavigator from '../routes/drawer';
import Register from './register';
import Home from './home';
import Login from './login';
import { socket } from './login';
//import e from 'express';
import io from 'socket.io-client';






export default function Wait({navigation}) {

    const toRegister = () => {
        navigation.navigate('Register');
    }
    


    

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>czekaj!</Text>
      <TouchableOpacity onPress={toRegister}>
                  <Text style={styles.registerText}> Spróbuj ponownie</Text>
        </TouchableOpacity>
    </View>
  )
}
