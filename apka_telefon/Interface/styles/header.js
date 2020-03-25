import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

export default function Header({ navigation, title}){

  const openMenu = () => {
      navigation.openDrawer()
  }

  return (
    <View style={styles.header}>
      <MaterialIcons name='menu'size={28} onPress={openMenu} style={styles.icon} />
      <View>
        <Text style={styles.headerText}>{ title }</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    left: 40,
  },
  icon: {
    position: 'absolute',
    left: 1,
  }
})
