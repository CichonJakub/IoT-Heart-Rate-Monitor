import React, { useState} from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/global';
import RoundButton from '../shared/button';

export default function Result({ navigation }) {

  const toImages = () => {
    navigation.navigate('Images');
  }
  const toVideos = () => {
    navigation.navigate('Videos');
  }
  const toAdvice = () => {
    navigation.navigate('Advice');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Coś poszło nie tak...{"\n"}Powtórz pomiar</Text>
      <View style={styles.resultButtons}>
        <RoundButton text='Obrazek' onPress={toImages} />
        <RoundButton text='Wideo' onPress={toVideos} />
        <RoundButton text='Porada' onPress={toAdvice} />
      </View>
    </View>
  )
}
