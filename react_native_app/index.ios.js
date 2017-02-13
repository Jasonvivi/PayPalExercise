/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict'

// loads modules and assigns them to variables euqivalent to linking and importing libraries.
var React = require('react');
var ReactNative = require('react-native');
var StartPage = require('./StartPage');

var styles = ReactNative.StyleSheet.create({
  text:{
    color:'black',
    backgroundColor:'white',
    fontSize:30,
    margin:80
  },
    container: {
        flex: 1
    }
})

class react_native_app extends React.Component {
    render() {
        return (
            <ReactNative.NavigatorIOS
        style={styles.container}
        initialRoute={{
            title: 'PayPage Exercise',
                component: StartPage,
        }}/>
    );
    }
}

//entry point to the application and root component.
ReactNative.AppRegistry.registerComponent('react_native_app', function() { return react_native_app });

