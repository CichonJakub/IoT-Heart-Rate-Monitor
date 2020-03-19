import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/global';

export default function Measure() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Measure Screen{"\n"}Hello!</Text>
    </View>
  )
}
