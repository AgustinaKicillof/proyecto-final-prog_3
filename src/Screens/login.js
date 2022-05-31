import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

class login extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render() {
        return (
            <View>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("Register")}>Register</TouchableOpacity>  
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default login;
