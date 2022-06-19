import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {auth} from "../Firebase/Config";

class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
           
        }
    }
    render() {
        console.log(auth.currentUser)
        return (
            <View style={styles.container}>
               <Text style={styles.title}>Mi perfil</Text>
               <Text style={styles.info}>Username: {auth.currentUser.displayName}</Text>
               <Text style={styles.info}>Correo: {auth.currentUser.email}</Text> 
               <Text style={styles.info}>Fecha de ultimo ingreso: </Text>
               <Text style={styles.info}>Cantidad de posteos: </Text>
               <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
               </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        rowGap:10
    },
    title:{
        marginBottom:15,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    info: {
        textAlign: 'center',
        fontFamily: 'arial'
    },
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
        paddingHorizontal:10,
        marginHorizontal: 100
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'arial'
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8,
        rowGap: 10
    }
})

export default Profile;

/*<Text>Username: {auth.currentUser.username}</Text>*/