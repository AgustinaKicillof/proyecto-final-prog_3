import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Login from "../Screens/login";
import Register from "../Screens/register";
import { auth, db } from "../Firebase/config";
import TabNavigation from "./TabNavigation";

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      registerErrorMessage: "",
      loginErrorMessage: ""
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
        });
      }
    });
  }
  register(email, password, username) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((responseRegister) => {
        console.log(responseRegister);

        db.collection("users")
          .add({
            email: email,
            username: username,
            createdAt: Date.now(),
          })
          .then((responseUsers) => console.log(responseUsers))
          .catch((error) => console.log(error));
      })
      .catch((error) => this.setState({
        registerErrorMessage: error.message,
      }));
  }

  login(email, password) {
    //Debería loguear en Firebase y cambiar el estado loggedIn: true
    //Debe pasar como método a el componente login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => console.log(response))
      .catch((error) => this.setState({
        loginErrorMessage: error.message,}));
  }

  logout() {
    auth.signOut().then((response) => {
      this.setState({
        loggedIn: false,
      });
    });
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.loggedIn ? (
            <Stack.Screen name="Menu" component={TabNavigation} options={ { headerShown: false } } 
            initialParams={{
                logout: () =>
                  this.logout(),
              }}/>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="Login"
                children={(props)=><Login errores ={this.state.loginErrorMessage}{...props}/>}
                initialParams={{
                  login: (email, password) => this.login(email, password),
                }}
              />
              <Stack.Screen
                name="Register"
                children={(props)=><Register errores ={this.state.registerErrorMessage}{...props}/>}
                initialParams={{
                  register: (email, password, username) =>
                    this.register(email, password, username),
                }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});

export default Menu;
