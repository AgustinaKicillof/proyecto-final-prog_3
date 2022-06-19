import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { auth, db } from "../Firebase/Config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidadDeLikes: this.props.dataPost.data.likes.length,
      myLike: false,
    };
  }

  componentDidMount() {
    if (this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        myLike: true,
      });
    }
  }

  like() {
    db.collection("posts")
      .doc(this.props.dataPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          cantidadDeLikes: this.props.dataPost.data.likes.length,
          myLike: true,
        })
      )
      .catch((error) => console.log(error));
  }

  unLike() {
    db.collection("posts")
      .doc(this.props.dataPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() =>
        this.setState({
          cantidadDeLikes: this.props.dataPost.data.likes.length,
          myLike: false,
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={styles.separator}>
        <Text style={styles.info}>
          Post de: {this.props.dataPost.data.owner}
        </Text>
        <Text style={styles.info}>
          Texto del Post: {this.props.dataPost.data.description}
        </Text>
        <Text style={styles.info}>
          Cantidad de likes: {this.state.cantidadDeLikes}
        </Text>
        <Image
          source={{ uri: this.props.dataPost.data.photo }}
          style={styles.image}
        />
        {this.state.myLike ? (
          <TouchableOpacity onPress={() => this.unLike()}>
            <Text style={styles.info}>Quitar Like</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.like()}>
            <Text style={styles.info}>Like</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Comments", {
              id: this.props.dataPost.id,
            })
          }
        >
          <Text style={styles.info}>Ver comentarios</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,

    borderTopColor: "#ddd",
    borderTopWidth: 1,
    rowGap: 2,
    alignItems: "center",
  },
  info: {
    fontFamily: "arial",
    marginTop: 3,
    marginBottom: 3,
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default Post;
