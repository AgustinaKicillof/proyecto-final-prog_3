import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { auth, db } from "../Firebase/Config";
import Post from './Post';

class Buscar extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            searchText: '',
        }
    }
    buscar(searchText){
        db.collection('posts').where('owner','==',searchText).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts,
                    searchText: '',
                    
                })
            }
        )

        
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Buscador de usuarios</Text>
                <Text style={styles.subtitle}>Ingresa el email del usuario que quieras encontrar</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Buscar usuario'
                    onChangeText={(text) => this.setState({ searchText: text})}
                    value={this.state.searchText}
                    
                />
                <TouchableOpacity 
                style={styles.button}
                onPress={()=>this.buscar(this.state.searchText)}
                >
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>
                
                {
                    this.state.posts.length===0 ? 
                    <View style={styles.button2}>
                    <Text style={styles.buttonText2}>El usuario no existe o aún no tiene publicaciones</Text>
                </View>
                    
                
                :
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={post => post.id}
                    renderItem = { ({item}) => <Post dataPost={item} 
                    {...this.props} />}
                    />
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        rowGap: 10,
        flex: 1
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
    button:{
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
        marginHorizontal: 10
    },
    button2:{
        borderRadius: 2,
        padding:3,
        backgroundColor: 'red',
        marginHorizontal: 10
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center'
    },
    buttonText2:{
        color: '#fff',
        textAlign: 'center'
    }
})

export default Buscar;
