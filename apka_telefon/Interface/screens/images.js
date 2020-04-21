import React, { useState} from 'react';
import { View, Text, Image, ScrollView, FlatList} from 'react-native';
import { styles } from '../styles/global';
import { results, resultsImages } from './home';

export default function Images() {
  if(results.pomiar == "FAILEDTOMEASURE" || results.pomiar == "BADMEASURE" || results == '' || (results.pomiar < 85 && results.pomiar > 75)){
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
          <Image source={{uri: resultsImages.link}}
            style={{width: 300, height: 350, margin: 7}} />
        </ScrollView>
      </View>
    )
  }
}
