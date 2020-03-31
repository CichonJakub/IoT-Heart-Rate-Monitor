import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/global';
import { TemporaryButton } from '../styles/button';

export default function Measure({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Result');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h5}>Przytrzymaj palec na czujniku przez ? sekund</Text>
      <View style={styles.loadingIconContainer}>
        <Text>Loading Icon</Text>
      </View>
      <View style={styles.tmp}>
        <TemporaryButton text='Przycisk tymczasowy' onPress={pressHandler} />
      </View>
    </View>
  )
}
