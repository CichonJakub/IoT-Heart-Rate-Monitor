import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/global';
import { HomeButton } from '../shared/button';

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Measure');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Hello!</Text>
      <HomeButton text='Zacznij Pomiar' onPress={pressHandler} />
    </View>
  )
}
