import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, Image, ShadowPropTypesIOS, setState } from 'react-native';
import { styles } from '../styles/global';
import { LoginButton } from '../styles/button';
import { Formik } from 'formik';
import DrawerNavigator from '../routes/drawer';
//import { socket } from './home';
import io from 'socket.io-client';
import Wait from './wait';
import Home from './home';
import Err_log from './err_log';
import * as Crypto from 'expo-crypto'
import { CryptoEncoding } from 'expo-crypto';
import { MaterialIcons } from '@expo/vector-icons';
import FormInput from '../styles/FormInput';



export const socket = io('https://iot-pulsometr.herokuapp.com', {
  transports: ['websocket'],
});




export default function Login({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('DrawerNavigator');
    //socket.emit('login', 17);
  }
  const toRegister = () => {
    navigation.navigate('Register');
  }

  const toWait = () => {
    navigation.navigate('Wait');
  }

  const toHome = () => {
    navigation.navigate('Home');
  }

  const toErr_log = () => {
    navigation.navigate('Err_log');
  }

  let iconName = 'visibility-off';
  let secureTextEntry = true;

  const showPassword = () => {
    if(iconName == 'visibility'){
      secureTextEntry = true;
      iconName = 'visibility-off';
      console.log('klik');
    }else{
      secureTextEntry = false;
      iconName = 'visibility';
      console.log('unklik');
    }
  }

  function stringToHash(string) {

    var hash = 0;

    if (string.length == 0) return hash;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
  }


  return(
    <View style={styles.loginScreen}>
      <View style={styles.logoContainer}>
        <Image source= {require('../assets/Logo.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>Zaloguj się</Text>
      </View>
      <View style={styles.loginScreen}>
        <Formik
          initialValues={{ login: '', password: ''}}
          onSubmit={(values) => {
            console.log(values);
            console.log(values.password);
            toWait();
            values.password = stringToHash(values.password);
            console.log(values);
            console.log(values.password);
            socket.emit('login', values);
            socket.on('confirmLogin', function(data){
            console.log(data);
            if(data == "BADLOGIN" || data == "DATABASEERROR"){
                toErr_log();
            }else{
                toHome();
            }
            });


          }}
        >
          {(props) => (
            <View style={styles.loginScreen}>
              <TextInput
                style={styles.input}
                placeholder='Login'
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                selectionColor='#5d99c6'
                onChangeText={props.handleChange('login')}
                value={props.values.login}
              />
            <FormInput
              name='password'
              secureTextEntry = {secureTextEntry}
              value={(props.values.password)}
              placeholder='Hasło'
              placeholderTextColor='rgba(0, 0, 0, 0.6)'
              selectionColor='#5d99c6'
              onChangeText={props.handleChange('password')}
              iconName={iconName}
              iconColor='rgba(0, 0, 0, 0.54)'
              iconAction= {() => showPassword()}
            />
              <LoginButton text='Zaloguj' onPress={() => {props.handleSubmit();}} />
              <View style={styles.inRow}>
                <Text style={styles.registerText}>Nie masz konta?</Text>
                <TouchableOpacity onPress={toRegister}>
                  <Text style={styles.registerText}> Zarejestruj się</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}
