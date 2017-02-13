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
    color: 'black',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    width:100,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
  },
});
var PayPage = require('./PayPage');

function urlForQueryAndPage(key, value, pageNumber) {
  return 'http://localhost:8888/'
};

function createRequest(){
   var data = {};
   data['request']= {
        'name':'Kenneth Thomepson',
        'addr':'8114 Grow Drive #9, Cape Neddick, ME 03902',
        'payinfo':'BANK OF AMERICA CHECKING x-5567',
        'paydetail':'Visa x-4512(backup)',
        'amount':'$28.98',
    }
    return data;
}

class StartPage extends Component {
constructor(props) {
  super(props);
  this.state = {
  message: ''
};
}

onSearchTextChanged(event) {
  console.log('onSearchTextChanged');
  this.setState({ searchString: event.nativeEvent.text });
  console.log(this.state.searchString);
}

_executeQuery(query,requestBody) {
  console.log(query);
  this.setState({ isLoading: true });
  fetch(query,{
  method: 'post',
  dataType: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
        'name':'Kenneth Thomepson',
        'addr':'8114 Grow Drive #9, Cape Neddick, ME 03902',
        'payinfo':'BANK OF AMERICA CHECKING x-5567',
        'paydetail':'Visa x-4512(backup)',
        'amount':'$28.98',
  })
})
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
}

 _handleResponse(response) {
  console.log(response);
  this.setState({ isLoading: false , message: '' });
  if (response.error === '200') {
this.props.navigator.push({
  title: 'PayPage',
  component: PayPage,
  passProps: {result: response}
});  } else {
    this.setState({ message: 'Pay error'});
  }
}

onSearchPressed() {
  var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
  var requestBody = createRequest();
  this._executeQuery(query, requestBody);
}

render() {
    return (
      <View style={styles.container}>
	       <TouchableHighlight style={styles.button}>
	       <Text style={styles.buttonText} onPress={this.onSearchPressed.bind(this)}>Start</Text>
	       </TouchableHighlight>
          <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

module.exports = StartPage;
