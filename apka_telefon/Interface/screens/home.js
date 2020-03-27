import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/global';
import { HomeButton } from '../styles/button';

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Measure');
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
