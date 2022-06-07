import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

class TabNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.route.params.logout()}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default TabNavigation;
