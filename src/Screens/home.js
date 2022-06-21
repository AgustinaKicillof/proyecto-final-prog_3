
import React, {Component} from 'react';
import { auth, db } from "../Firebase/Config";
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
import Post from './Post';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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


    render(){
        // console.log(this.state);
        return(
                <View style={styles.container}>
                    <Text style={styles.title}>Posteos</Text>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
                    />
                    
                </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        marginBottom:15,
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'arial',
        fontWeight: 'bold'
    }
})

export default Home;