import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()
import Login from "../Screens/login"
import Register from "../Screens/register"


class Menu extends Component {
    render() {
        return (
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="Login" component={Login}/>
                  <Stack.Screen name="Register" component={Register}/>
              </Stack.Navigator>
          </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({})

export default Menu;
