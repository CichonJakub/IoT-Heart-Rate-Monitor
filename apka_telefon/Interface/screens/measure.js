import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/global';
import RoundButton from '../shared/button';

export default function Measure({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Result');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Measure Screen{"\n"}Hello!</Text>
      <RoundButton text='Wynik' onPress={pressHandler} />
    </View>
  )
}
