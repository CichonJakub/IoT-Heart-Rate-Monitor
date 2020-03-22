import  React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Images from './images';
import Videos from './videos';
import Advice from './advice';

export default function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        style: {backgroundColor: '#adffff'}, indicatorStyle: {backgroundColor: '#78d6f9'}
      }}>
        <Tab.Screen name="Obrazki" component={Images} />
        <Tab.Screen name="Wideo" component={Videos} />
        <Tab.Screen name="Porady" component={Advice} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Tab = createMaterialTopTabNavigator();
