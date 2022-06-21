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
                <TouchableOpacity style={styles.button} onPress={()=>this.props.route.params.login(this.state.email, this.state.password)} disabled={this.state.email.length===0 || this.state.password.length===0?true:false}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>       
            

              <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("Register")}>
                <Text style={styles.buttonText}>Register</Text></TouchableOpacity>  
                {
                this.props.errores==0 ?
                null:
                <View style={styles.buttonDenial}>
              <Text style={styles.buttonText}>{this.props.errores}</Text>
              </View>

              }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    majorContainer:{
        rowGap: 10,
        paddingHorizontal:10,
        marginTop: 10,
    },
    container:{
        paddingHorizontal:10,
        marginTop: 10,
        rowGap: 10
    },
    title:{
        marginBottom:15,
        fontSize: 25,
        textAlign: 'center'
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8

    },
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
    },
    buttonDenial: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'red',
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center'
    },
    buttonTextDenial:{
        color: 'black',
        textAlign: 'center'
    }
})

export default login;
