import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {auth} from "../Firebase/config";

class Profile extends Component {
    render() {
        console.log(auth.currentUser)
        return (
            <View>
               <Text>{auth.currentUser.email}</Text> 
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default Profile;
