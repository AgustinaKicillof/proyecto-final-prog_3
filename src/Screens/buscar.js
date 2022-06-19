import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

class Buscar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Buscador de usuarios</Text>
                <Text style={styles.subtitle}>Ingresa el email del usuario que quieras encontrar</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Buscar usuario'
                    
                    
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        rowGap: 10
    },
    title:{
        marginBottom:10,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subtitle:{
        marginBottom:15,
        fontSize: 15,
        textAlign: 'center'
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8,
        rowGap: 10,
        marginHorizontal: 10
    },
})

export default Buscar;
