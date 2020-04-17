import React, { useState} from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/global';
import { results } from './home';

export default function Videos() {
  if(results.pomiar == "FAILEDTOMEASURE" || results.pomiar == "BADMEASURE"){
    return(
      <View style={styles.badResultImageView}>
        <Image source={require('../assets/nothingToSee.png')}
          style={{width: 350, height: 350}} />
      </View>
    )
  }else{
    return(
      <View style={styles.container}>
        <Text style={styles.txt}>Wideo here</Text>
      </View>
    )
  }
}
