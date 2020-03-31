import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/global';
import { LoginButton } from '../styles/button';
import { Formik } from 'formik';
import DrawerNavigator from '../routes/drawer';
//import { socket } from './home';
import io from 'socket.io-client';

export const socket = io('https://iot-pulsometr.herokuapp.com', {
  transports: ['websocket'],
});

export default function Login({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('DrawerNavigator');
    socket.emit('login', 17);
  }
  const toRegister = () => {
    navigation.navigate('Register');
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
              <TextInput
                style={styles.input}
                placeholder='Hasło'
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                selectionColor='#5d99c6'
                onChangeText={props.handleChange('password')}
                value={props.values.password}
              />
              <LoginButton text='Zaloguj' onPress={pressHandler} />
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
