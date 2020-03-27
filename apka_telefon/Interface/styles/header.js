import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

export default function MainHeader({ navigation, title}){

  const openMenu = () => {
      navigation.openDrawer()
  }

  return (
    <View style={styles.header}>
      <MaterialIcons name='menu'size={24} onPress={openMenu} style={styles.icon} />
      <Image source= {require('../assets/heart.png')} style={styles.headerIcon} />
    </View>
  );
}

export function MeasureHeader({ navigation: { goBack }, title}){

  return (
    <View style={styles.header}>
      <MaterialIcons name='arrow-back'size={24} onPress={() => goBack()} style={styles.icon} />
      <Image source= {require('../assets/heart.png')} style={styles.headerIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: 56,
    flexDirection: 'row',
    backgroundColor: '#90caf9',
  },
  icon: {
    padding: 16,
    paddingRight: 4,
  },
  headerIcon: {
  //  backgroundColor: 'green',
    height: 56,
    width: 32,
  }
})
