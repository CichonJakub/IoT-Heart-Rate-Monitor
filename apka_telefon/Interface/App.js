import React, {useState} from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/AppNavigation';

const getFonts = () => Font.loadAsync({
  'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
  'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf'),
});


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return (
      <Navigator />
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=> setFontsLoaded(true)}
      />
    )
  }
}
