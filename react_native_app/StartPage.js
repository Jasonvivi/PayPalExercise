'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    width:100,
    backgroundColor: '#255eba',
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center'
  },
});

var PayPage = require('./PayPage');

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    message: ''
  };
}

_executeQuery(query) {
  console.log(query);
  fetch(query,{
    method: 'get',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error => this.setState({
      message: 'Something bad happened ' + error
   }));
}

_handleResponse(result) {
  this.setState({ message: '' });
  if (result.error === '200') {
    this.props.navigator.push({
    title: 'Pay Page',
    component: PayPage,
    passProps: {result: result}
    });  } else {
    this.setState({ message: 'Pay error'});
  }
}

onStartPressed() {
  var query = 'http://localhost:8888/';
  this._executeQuery(query);
}

render() {
    return (
      <View style={styles.container}>
	       <TouchableHighlight style={styles.button}>
	       <Text style={styles.buttonText} onPress={this.onStartPressed.bind(this)}>Start</Text>
	       </TouchableHighlight>
          <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

module.exports = StartPage;
