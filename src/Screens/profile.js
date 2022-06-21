import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import {auth, db} from "../Firebase/Config";
import Post from './Post';
class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
        user:{},
        loading:true,
        posts:[],
        }
    }
    componentDidMount(){
        db.collection("users").where("email","==",auth.currentUser.email).onSnapshot(
            doc=>{
                let user = [];
                doc.forEach( oneDoc => {
                    user.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    user: user[0],
                    loading: false
                })
            }
        )
        db.collection('posts').where("owner","==",auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts
                })
            }
        )
    }
    render() {
        console.log(this.state.user)
        return (
            <View style={styles.container}>
               <Text style={styles.title}>Mi perfil</Text>
               {this.state.loading?
               <ActivityIndicator size="large" color="red"/>
            :
            <>
             <View style={styles.infoContainer}>
             <Text style={styles.info}>Username: {this.state.user.data.username}</Text>
               <Text style={styles.info}>Correo: {auth.currentUser.email}</Text> 
               <Text style={styles.info}>Fecha de ultimo ingreso: {auth.currentUser.metadata.lastSignInTime} </Text>
               <Text style={styles.info}>Cantidad de posteos: {this.state.posts.length} </Text>
               </View></>
            }
               <TouchableOpacity style={styles.button} onPress={()=>this.props.route.params.logout()}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
               </TouchableOpacity>
               <View style={styles.view}>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
                    />
               </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        
    },
    title:{
        marginBottom:15,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    info: {
        textAlign: 'center',
        fontFamily: 'arial',
        
    },
    infoContainer:{
        rowGap: 10
    },
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
        paddingHorizontal:10,
        marginHorizontal: 100,
        marginTop: 5
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
    },
    view:{
        flex:1,
        marginTop: 10,
    }
})

export default Profile;

/*<Text>Username: {auth.currentUser.username}</Text>*/