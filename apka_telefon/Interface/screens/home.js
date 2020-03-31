import React from 'react';
import { View, Text, Button, ComponentDidMount } from 'react-native';
import { styles } from '../styles/global';
import { HomeButton } from '../styles/button';
import { YellowBox } from 'react-native';
import { socket } from './login';

import _ from 'lodash';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
  'Setting a timer'
])
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


socket.on('confirmLogin', function(data){
  console.log(data);
});

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Measure');
    socket.emit('requestPomiar');
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
