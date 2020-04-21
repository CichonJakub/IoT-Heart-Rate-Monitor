//import 'react-native-get-random-values';
import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { styles } from '../styles/global';
import { results, resultsVideos } from './home';
import YouTube from 'react-native-youtube';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import YouTubePlayer from 'react-native-youtube-iframe';
import { Dimensions } from 'react-native';

export default function Videos() {

  //const playerRef = useRef();
  const [playing, setPlaying] = useState(true);
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
        <YouTubePlayer
            //ref={playerRef}
            height={500}
            width={Dimensions.get('screen').width*0.95}
            videoId={resultsVideos.link}
            onError={e => console.log(e)}
            origin="http://youtube.com"
        />
      </View>

    )
  }
}
