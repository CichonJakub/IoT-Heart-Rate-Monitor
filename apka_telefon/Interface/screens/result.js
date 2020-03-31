import React, { useState} from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/global';
import RoundButton from '../styles/button';
import Tabs from './tabs';
import { socket } from './login';

let result;

function receiveResult(data){
  result = data;
  console.log('results???');
}


export default function Result({ navigation }) {

  socket.on('pomiarResult2', function(data){
    receiveResult(data);
  });


  const toImages = () => {
    navigation.navigate('Tabs');
  }
  const toVideos = () => {
    navigation.navigate('Tabs');
  }
  const toAdvice = () => {
    navigation.navigate('Tabs');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h5}>Twój wynik</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.h4}>{result}</Text>
      </View>
      <View style={styles.resultButtons}>
        <RoundButton text='Obrazek' onPress={toImages} />
        <RoundButton text='Wideo' onPress={toVideos} />
        <RoundButton text='Porada' onPress={toAdvice} />
      </View>
    </View>
  )
}
