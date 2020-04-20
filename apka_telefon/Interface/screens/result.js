import React, { useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/global';
import { AdviceButton } from '../styles/button';
import Tabs from './tabs';
import io from 'socket.io-client';
//import { socket } from './login';
import { results } from './home';
import { Dimensions } from 'react-native';

let result = '';
let helpText;
let header;
let resultText1;
let resultText2;

let circle;

function receiveResult(){
  if(results.pomiar == "FAILEDTOMEASURE"){
    header = "";
    result = "Coś poszło źle";
    helpText = "Sprawdź urządzenie \n i spróbuj ponownie";
    circle = "";
  }else if(results.pomiar == "BADMEASURE"){
    header = "";
    result = "Błąd pomiaru";
    helpText = "Spróbuj jeszcze raz";
    resultText1 = "";
    resultText2 = "";
    circle = "";
  }else if(results.pomiar == "WAITTOEND"){
    header = "";
    result = "Czujnik jest zajęty";
    helpText = "Poczekaj aż inna osoba\nskończy pomiar\ni spróbuj jeszcze raz";
    resultText1 = "";
    resultText2 = "";
    circle = "";
  }else if(results == ""){
    header = "";
    result = "Brak pomiaru";
    helpText = "";
    resultText1 = "";
    resultText2 = "";
    circle = "";
  }else{
    header = "Twój wynik";
    result = results.pomiar
    helpText = "";
    circle = styles.resultCircle;
    if(results.pomiar > 85){
      resultText1 = "Twój puls jest za wysoki";
      resultText2 = "Po kliknięcie przycisku poniżej\nznajdziesz porady,\nktóre pomogą Ci go obniżyć";
    }else{
      resultText1 = "Twój puls jest zbyt niski";
      resultText2 = "Kliknij przycisk poniżej,\naby poznać sposoby\n na podwyższenie pulsu";
    }
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
        <View style={circle}>
          <Text style={styles.h4}>{result}</Text>
        </View>
        <Text style={styles.s1}>{helpText}</Text>
        <Text style={styles.s1Result1}>{resultText1}</Text>
        <Text style={styles.s1Result2}>{resultText2}</Text>
      </View>
      <View style={styles.AdviceButton}>
        <AdviceButton text='Porady' onPress={toImages} />
      </View>
    </View>
  )
}
