import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/global';
import { LoginButton } from '../styles/button';
import { Formik } from 'formik';
import DrawerNavigator from '../routes/drawer';
import Login from './login';

export default function Register({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('DrawerNavigator');
  }
  const toLogin = () => {
    navigation.navigate('Login');
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
              <TextInput
                style={styles.input}
                placeholder='Powtórz Hasło'
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                selectionColor='#5d99c6'
                onChangeText={props.handleChange('repeatPassword')}
                value={props.values.repeatPassword}
              />
              <LoginButton text='Zarejestruj się' onPress={pressHandler} />
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
