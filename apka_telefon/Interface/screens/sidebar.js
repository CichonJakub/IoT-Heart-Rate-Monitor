import React from 'react';
import { View, Text, state, Image, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { socket } from './login';

export default class Sidebar extends React.Component {
    state1 = {
      routes:[
        {
          name: "Home",
          title: "Strona Główna",
          icon: "home"
        },
        {
          name: "Result",
          title: "Wynik",
          icon: "assignment-turned-in"
        },
        {
          name: "Statistics",
          title: "Statystyki",
          icon: "show-chart"
        },
      ]
    }
      state2 = {
        routes:[
          {
            name: "Help",
            title: "Pomoc",
            icon: "help"
          },
          {
            name: "Login",
            title: "Wyloguj",
            icon: "exit-to-app"
          },
        ]
    }
    render(){
      return(
        <View style={styles.sidebarContainer}>
          <View style={styles.sidebarHeader}></View>
          <Image source={require("../assets/Logo.png")} style={styles.sidebarLogo}/>
          <Text style={styles.h5}>Login</Text>
          <View style={styles.sidebarDivider}></View>
          <FlatList
            style={{width:"100%", marginLeft:20, flex:1}}
            data={this.state1.routes}
            renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
            keyExtractor={item => item.name}
          />
        <View style={styles.sidebarDivider}></View>
          <FlatList
            style={{width:"100%", marginLeft:20}}
            data={this.state2.routes}
            renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
            keyExtractor={item => item.name}
          />
        </View>
      )
    }
}

const logout = (item) => {
  if(item.name == 'Login'){
    console.log('logout');
    socket.emit('logout');
  }
}

function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.sidebarListItem} onPress={()=>{navigate(item.name); logout(item);}}>
      <MaterialIcons name={item.icon} size={24} style={styles.icon}/>
      <Text style={styles.body2}>{item.title}</Text>
    </TouchableOpacity>
  );
}
""
