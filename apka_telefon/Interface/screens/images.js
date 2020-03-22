import React, { useState} from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/global';

export default function Images() {
    return(
      <View style={styles.container}>
        <Text style={styles.txt}>Testowy obrazek</Text>
        <Image source={{uri: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/03/58c64a00e2531_Y3ibubf__605.jpg'}}
          style={{width: '90%', height: '90%'}} />
      </View>
    )
}
