import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, Text} from 'react-native';

class register extends Component {
    constructor(props){
        super(props)
        this.state={
            email: "",
            password: "",
            username: ""
        }
    }
    render() {
        return (
            
                 <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Nombre de Usuario'
                    onChangeText={text => this.setState({ username: text})}
                />
               
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
                <TouchableOpacity style={styles.button} onPress={()=>this.props.route.params.register(this.state.email, this.state.password, this.state.username)} disabled={this.state.email.length===0 || this.state.username.length===0 || this.state.password.length===0?true:false}>
                    <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>       
            

              <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>  
              <Text>{this.props.errores}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
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
        marginBottom:8,
        

    },
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center'
    }
})

export default register;
