import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function RoundButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{ text }</Text>
      </View>
    </TouchableOpacity>
  )
};

export function HomeButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.homeButton}>
        <Text style={styles.homeButtonText}>{ text }</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 6,
    justifyContent: 'center',
    backgroundColor: '#78d6f9',
  },
  homeButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#78d6f9',
  },
  buttonText: {
    color: "#000",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 14,
    textAlign: 'center',
  },
  homeButtonText: {
    color: "#000",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
    textAlign: 'center',
  },
})
