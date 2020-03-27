import React from 'react';
import { View, Text, Button, ComponentDidMount } from 'react-native';
import { styles } from '../styles/global';
import { HomeButton } from '../styles/button';
import io from 'socket.io-client';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
  'Setting a timer'
])

const socket = io('https://iot-pulsometr.herokuapp.com', {
  transports: ['websocket'],
})

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Measure');
    socket.emit('hello', 'Test');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h4}>Uszanowanko</Text>
      <Text style={styles.s1}>Naciśnij przycisk poniżej {"\n"} i przyłóż palec do czujnika</Text>
      <View style={styles.buttonContainer}>
        <HomeButton text='Zacznij Pomiar' onPress={pressHandler} />
      </View>
    </View>
  )
}
