import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Profile from "../Screens/Profile";
import Home from "../Screens/Home";
import Buscar from "../Screens/Buscar";
import AgregarPost from "../Screens/AddPost";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
class TabNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name = "Home" component={Home}
        options={ 
          { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
         } 
       />
       <Tab.Screen name = "Buscar" component={Buscar}
        options={ 
          { tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }
         } 
       />
       <Tab.Screen name = "Agregar Post" component={AgregarPost}
        options={ 
          { tabBarIcon: () => <FontAwesome name="plus" size={24} color="black" /> }
         } 
       />
       <Tab.Screen name = "Profile" component={Profile}
        options={ 
          { tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }
         }
         initialParams={{logout:()=>this.props.route.params.logout()}}
       />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({});

export default TabNavigation;
