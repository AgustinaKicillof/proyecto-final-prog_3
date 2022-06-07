import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, Text} from 'react-native';

class login extends Component {
    constructor(props){
        super(props)
        this.state={
            email: "",
            password: ""
        }
    }
    render() {
        return (
            <View>
                 <View style={styles.container}>
                <Text style={styles.title}>Inicio de Sesión</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text})}
                />
                <TouchableOpacity onPress={()=>this.props.route.params.login(this.state.email, this.state.password)}>
                    <Text>Iniciar Sesión</Text>
                </TouchableOpacity>       
            </View>

              <TouchableOpacity onPress={()=>this.props.navigation.navigate("Register")}>Register</TouchableOpacity>  
              <Text>{this.props.errores}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10
    },
    title:{
        marginBottom:20
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8

    }
})

export default login;
