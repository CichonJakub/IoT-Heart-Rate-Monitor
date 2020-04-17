import React, { useState} from 'react';
import { View, Text, Image, ScrollView, FlatList} from 'react-native';
import { styles } from '../styles/global';
import { results } from './home';

export default function Images() {
  if(results.pomiar == "FAILEDTOMEASURE" || results.pomiar == "BADMEASURE"){
    return(
      <View style={styles.badResultImageView}>
        <Image source={require('../assets/nothingToSee.png')}
          style={{width: 350, height: 350}} />
      </View>
    )
  }else{
    return(
      <View style={styles.imageScroll}>
        <ScrollView  contentContainerStyle={styles.imagesScrollView}>
          <Image source={{uri: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/03/58c64a00e2531_Y3ibubf__605.jpg'}}
            style={{width: 300, height: 350, margin: 7}} />
          <Image source={{uri: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/03/58c64a00e2531_Y3ibubf__605.jpg'}}
            style={{width: 300, height: 350, margin: 7}} />
          <Image source={{uri: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/03/58c64a00e2531_Y3ibubf__605.jpg'}}
            style={{width: 300, height: 350, margin: 7}} />
        </ScrollView>
      </View>
    )
  }
}
