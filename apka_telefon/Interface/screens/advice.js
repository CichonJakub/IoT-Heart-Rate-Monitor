import React, { useState} from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { styles } from '../styles/global';
import { results, resultsAdvice, resultsShortAdvice } from './home';

export default function Advice() {
  if(results.pomiar == "FAILEDTOMEASURE" || results.pomiar == "BADMEASURE" || results == '' || results.pomiar < 85 || results.pomiar > 75){
    return(
      <View style={styles.badResultImageView}>
        <Image source={require('../assets/nothingToSee.png')}
          style={{width: 350, height: 350}} />
      </View>
    )
  }else{
    return(
      <View style={styles.container}>
        <Text style={styles.shortAdviceText}>{resultsShortAdvice.porada}</Text>
        <Text style={styles.s1}>Jeśli chcesz dowiedzieć się więcej{"\n"}o prawidłowym poziomie{"\n"}ciśnienia krwi</Text>
        <TouchableOpacity onPress={ ()=>{Linking.openURL(resultsAdvice.link)}}>
          <Text style={styles.boldLink}>Kliknij Tutaj</Text>
        </TouchableOpacity>

      </View>
    )
  }
}
