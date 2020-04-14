import React, { useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/global';
import RoundButton from '../styles/button';
import Tabs from './tabs';
import { socket } from './login';
import { results } from './home';

let result;
let helpText;
let header;



function receiveResult(){
  if(results.pomiar == "FAILEDTOMEASURE"){
    header = "";
    result = "Coś poszło źle";
    helpText = "Sprawdź urządzenie \n i spróbuj ponownie";
  }else if(results.pomiar == "BADMEASURE"){
    header = "";
    result = "Błąd pomiaru";
    helpText = "Spróbuj jeszcze raz";
  }else{
    header = "Twój wynik";
    result = results.pomiar
    helpText = "";
  }
}

export default function Result({ navigation }) {

  const toImages = () => {
    navigation.navigate('Tabs');
  }
  const toVideos = () => {
    navigation.navigate('Tabs');
  }
  const toAdvice = () => {
    navigation.navigate('Tabs');
  }

  //console.log(results.pomiar);
  receiveResult();

  return (
    <View style={styles.container}>
      <Text style={styles.h5}>{header}</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.h4}>{result}</Text>
        <Text style={styles.s1}>{helpText}</Text>
      </View>
      <View style={styles.resultButtons}>
        <RoundButton text='Obrazek' onPress={toImages} />
        <RoundButton text='Wideo' onPress={toVideos} />
        <RoundButton text='Porada' onPress={toAdvice} />
      </View>
    </View>
  )
}
