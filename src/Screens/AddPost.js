import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth, db} from '../Firebase/Config';
import MyCamera from '../components/MyCamera';

class AddPost extends Component{
    constructor(props){
        super(props)
        this.state={
            description:'',
            likes:[],
            comments: [],
            showCamera: true,
            url:''
        }
    }

    guardarPost(){
         db.collection('posts').add({
                createdAt: Date.now(),
                owner: auth.currentUser.email,
                description: this.state.description,
                likes:[],
                comments:[],
                photo: this.state.url
            })
            .then( response => this.setState({
                description:'',
            },
            ()=>this.props.navigation.navigate('Home')))
            .catch(error => console.log(error) )
    }

    onImageUpload(url){
        this.setState({
            url: url,
            showCamera: false,
        })
    }


    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Nuevo Post</Text>
            {
                this.state.showCamera ?
                    <MyCamera onImageUpload={url => this.onImageUpload(url)}/> 
                :
                <View style={styles.container}>
                    
                    <TextInput 
                        style={styles.field}
                        keyboardType='default'
                        placeholder='Description'
                        onChangeText={text => this.setState({ description: text})}
                        multiline
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>this.guardarPost()} disabled={this.state.description.length===0?true:false}>
                        <Text style={styles.buttonText}>Guardar Post</Text>
                    </TouchableOpacity>               
                </View>

            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10,
        height:'100%'
    },
    title:{
        marginBottom:15,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
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
    buttonText:{
        color: '#fff',
        textAlign: 'center'
    }
})

export default AddPost;