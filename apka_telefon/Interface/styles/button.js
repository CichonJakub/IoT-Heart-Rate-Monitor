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
};

export function AdviceButton({ text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.AdviceButton}>
        <Text style={styles.AdviceButtonText}>{ text }</Text>
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
    backgroundColor: '#8c2155',
  },
  buttonText: {
    color: "#fff",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 14,
    textAlign: 'center',
  },
  homeButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#8c2155',
  },
  homeButtonText: {
    color: "#fff",
    fontFamily: 'rubik-medium',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
  loginButton: {
    width: Dimensions.get('screen').width*0.6,
    height: 40,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 40,
    justifyContent: 'center',
    backgroundColor: '#5a002c',
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: 'rubik-medium',
    textTransform: 'uppercase',
    fontSize: 14,
    textAlign: 'center',
  },
  AdviceButton: {
    width: Dimensions.get('screen').width*0.6,
    height: 55,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 40,
    marginBottom: 30,
    justifyContent: 'center',
    backgroundColor: '#8c2155',
  },
  AdviceButtonText: {
    color: "#fff",
    fontFamily: 'rubik-medium',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
})
