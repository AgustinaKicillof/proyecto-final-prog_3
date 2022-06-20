import  React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import {Camera} from 'expo-camera';
import { db, storage } from '../Firebase/Config';

class MyCamera extends Component{

    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            url:''
        }  
        this.metodosDeCamara = '' 
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( () => this.setState({
            permission: true,
                })
            )
            .catch(error => console.log(error))

    }

    sacarFoto(){
        //usar un método de la cámara para sacar la foto.abs
        this.metodosDeCamara.takePictureAsync()
            .then(  photo => {
                this.setState({
                    //obtener la url temporal para guardarla en un estado.
                    url:photo.uri,
                    showCamera: false,
                })
            })
            .catch()


    }

    guardarFoto(){
        fetch(this.state.url)
            .then( response => response.blob())
            .then( 
                image => {
                    const ref = storage.ref(`photos/${Date.now()}.jpg`);
                    ref.put(image)
                        .then( () => {
                            ref.getDownloadURL()
                            .then( url => {
                                this.props.onImageUpload(url) 
                            })
                            .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))
                }
            )
            .catch(error => console.log(error))

    }

    eliminarPreview(){
        this.setState({
            url:"",
            showCamera: true,
        })  
    }


    render(){
        return(
            <View style={styles.cameraBody}>
            { this.state.permission ?
                this.state.showCamera ?
                    <View style={styles.cameraContainer}> 
                        <Camera 
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.front}
                            ref= {metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                        />
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>this.sacarFoto()}>
                            <Text style={styles.buttonText}>Tomar foto</Text>
                        </TouchableOpacity>
                    </View> 
                    :
                    <View style={styles.cameraBody}>
                        <Image 
                            style={styles.preview}
                            source={{uri:this.state.url}}
                            resizeMode='cover'
                        />
                        <TouchableOpacity 
                            style={styles.smallButton}
                            onPress={()=>this.guardarFoto()}>
                            <Text style={styles.smallButtonText}>Guardar Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.smallButton}
                            onPress={()=>this.eliminarPreview()}>
                            <Text style={styles.smallButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View> 
                :
                <View style={styles.denialContainer}>
                    <Text style={styles.denialText}> No tengo permisos de cámara</Text>
                </View>
            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    cameraContainer:{
        height: '90%'
    },
    cameraBody: {
        height: '90%',
        
    },
    button:{
        height: '20%',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20,
        backgroundColor: 'green',
        alignItems: 'center'
        
    },
    smallButton:{
        height: '10%',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 10,
        backgroundColor: 'green',
        alignItems: 'center'
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        marginTop: 18,
        fontSize: 20
    },
    smallButtonText:{
        textAlign: 'center',
        color: 'white',
        
        fontSize: 20
    },
    preview:{
        height:'80%'
    },
    denialContainer:{
        height: '20%',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20,
        backgroundColor: 'red',
        alignItems: 'center'
    },
    denialText:{
        textAlign: 'center',
        color: 'white',
        marginTop: 18,
        fontSize: 20
    }
}) 

export default MyCamera;