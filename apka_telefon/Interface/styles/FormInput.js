import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/global';




const FormInput = ({
  iconName,
  iconColor,
  iconAction,
  returnKeyType,
  KeyboardType,
  name,
  placeholder,
  value,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      rightIcon={<MaterialIcons name={iconName} onPress={iconAction} size={24} color={iconColor} />}
      placeholderTextColor='rgba(0, 0, 0, 0.6)'
      name={name}
      value={value}
      placeholder={placeholder}
      style={styles.input}
      inputContainerStyle={{borderBottomWidth:0}}
      inputStyle={{fontFamily: 'rubik-regular', fontSize: 16}}
    />
  </View>
)

export default FormInput;
