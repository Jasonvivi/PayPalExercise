'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  titleText: {
  alignSelf:'center',
  fontSize: 40,
  color: 'black',
  padding:100,
  fontWeight: 'bold',
}
});

class PayResult extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      message:this.props.message,
    };
  }
 
render() {
    return (
        <View >
          <Text style={styles.titleText}>{this.state.message}</Text>
      </View>
    );
  }
}

module.exports = PayResult;
