import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/global';

export default function Result() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Result Screen{"\n"}Hello!</Text>
    </View>
  )
}
