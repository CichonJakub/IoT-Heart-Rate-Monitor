import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/global';
import { LoginButton } from '../styles/button';
import { Formik } from 'formik';
import DrawerNavigator from '../routes/drawer';
import Login from './login';
import Err_reg from './err_reg';
import Wait from './wait';
import { socket } from './login';



export default function Register({ navigation }) {

  const pressHandler = () => {
  //  navigation.navigate('DrawerNavigator');
    if(values.password != values.repeatPassword){

      console.log('przekierowuje');
      navigation.navigate('Err_reg');
    }
  }

  const toErr_reg = () => {
    console.log('probuje');
    navigation.navigate('Err_reg');
  }

  const toLogin = () => {
    navigation.navigate('Login');
  }

  const toWait = () => {
    navigation.navigate('Wait');
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
        <Text style={styles.logoText}>Utwórz konto</Text>
      </View>
      <View style={styles.loginScreen}>
        <Formik
          initialValues={{ login: '', password: '', repeatPassword: ''}}
          onSubmit={(values) => {
            if(values.password == values.repeatPassword){
              
              toWait();
              values.password = stringToHash(values.password);
              values.repeatPassword = stringToHash(values.repeatPassword);
              console.log(values);
              socket.emit('register', values);
              socket.on('confirmRegister', function(data){
                  console.log(data);
                  if(data == true){
                      toLogin();
                  }
                  else{
                      toRegister();
                  }
                });
              
              
              
            } else {
            console.log('zle');
            toErr_reg();
            //toWait();
          }

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
                //value={props.values.password}
                value = {(props.values.password)}
              />
              <TextInput
                style={styles.input}
                placeholder='Powtórz Hasło'
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                selectionColor='#5d99c6'
                onChangeText={props.handleChange('repeatPassword')}
                //value={props.values.repeatPassword}
                value = {(props.values.repeatPassword)}
              />
              <LoginButton text='Zarejestruj się' onPress={() => {  props.handleSubmit();}} />
              <View style={styles.inRow}>
                <Text style={styles.registerText}>Masz już konto?</Text>
                <TouchableOpacity onPress={toLogin}>
                  <Text style={styles.registerText}> Zaloguj się</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}
