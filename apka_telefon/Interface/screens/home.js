import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/global';
import RoundButton from '../shared/button';

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Measure');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Hello!</Text>
      <RoundButton text='Zacznij Pomiar' onPress={pressHandler} />
    </View>
  )
}
