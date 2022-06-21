import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
import { auth, db } from "../Firebase/Config";
import firebase from 'firebase';


class Comments extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:[],
            commentText:''
        }
    }

    componentDidMount(){
        
        db.collection('posts')
        .doc(this.props.route.params.id)
        .onSnapshot( doc => {
                this.setState({
                    comments:doc.data().comments
                })
            }
        )
    }

    
    agregarComentarios(){
        
        db.collection('posts')
        .doc(this.props.route.params.id) 
        .update({
            comments:firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                text:this.state.commentText,
                createdAt: Date.now()
            })
        })
        .then( () => {
            this.setState({
                commentText: ''
            })
        })
    }

    render(){
        
        return(
                <View style={styles.container}>
                    {this.state.comments.length===0?
                    <Text> Aún no hay comentarios. Sé el primero en opinar</Text>:
                    
                    
                    <FlatList 
                        data={this.state.comments}
                        keyExtractor={ post => post.createdAt}
                        renderItem = { ({item}) => <Text>{item.owner}: {item.text}</Text> }
                    />
                }
                    <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Agregar un comentario'
                    onChangeText={text => this.setState({ commentText: text})}
                    value={this.state.commentText}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.agregarComentarios()} disabled={this.state.commentText.length===0?true:false}>
                    <Text style={ styles.buttonText}>Comentar</Text>
                </TouchableOpacity>   
                </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10,
        rowGap: 20
    },
    title:{
        marginBottom:20
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
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
        paddingHorizontal:10,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center'
    }
})

export default Comments;