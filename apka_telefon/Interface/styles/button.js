import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

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

export function LoginButton({ text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{ text }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 6,
    justifyContent: 'center',
    backgroundColor: '#8c2155',
  },
  homeButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#8c2155',
  },
  loginButton: {
    width: Dimensions.get('screen').width*0.6,
    height: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 40,
    justifyContent: 'center',
    backgroundColor: '#5a002c',
  },
  buttonText: {
    color: "#fff",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 14,
    textAlign: 'center',
  },
  homeButtonText: {
    color: "#fff",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
    textAlign: 'center',
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: 'rubik-medium',
    textTransform: 'uppercase',
    fontSize: 14,
    textAlign: 'center',
  },
})
