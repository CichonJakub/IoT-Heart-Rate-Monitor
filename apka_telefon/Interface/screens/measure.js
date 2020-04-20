import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { styles } from '../styles/global';
import { AdviceButton } from '../styles/button';

export default function Measure({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Result');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h5}>Przytrzymaj palec na czujniku przez 10 sekund</Text>
      <View style={styles.loadingIconContainer}>
        <Image source={require('../assets/loadingCat.gif')}
          style={{width: 180, height: 180}} />
      </View>
    </View>
  )
}
