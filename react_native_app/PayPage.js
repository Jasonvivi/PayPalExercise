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
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  headingText: {
    marginTop:5,
    fontSize: 15,
    color: 'black',
  },
  subHeadingText: {
    marginTop:5,
    fontSize: 10,
    color: 'black',
  },
  arrow: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  priceTitleText: {
    fontSize: 15,
    color: 'black',
    textAlign: "left",
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  priceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: "right",
    justifyContent: 'center'
  },
  payButton:{
    height: 45,
    width: 350,
    backgroundColor: '#255eba',
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  payButtonText:{
    alignSelf:'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  readBigText:{
    fontSize: 10,
    color: 'black',
  },
  readBigBlueText:{
    fontSize: 10,
    color: '#255eba',
  },
  readSmallText:{
    fontSize: 8,
    color: 'black',
  },
  readSmallBlueText:{
     fontSize: 8,
    color: '#255eba',
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 20
  },
  footerRowContainer: {
    padding: 20,
    alignItems: 'center'
  },  
  totalContainer:{
    alignItems: 'center' ,
    justifyContent: 'center', 
    backgroundColor:'#dedfe0',
    flexDirection: 'row',
    padding: 20
  },
  textContainer: {
    flex: 1
  },
});

var PayResult = require('./PayResult');

class PayPage extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.result.listings),
      totalPrice:this.props.result.total,
      message: ''
    };
    console.log(this.state.totalPrice)
  }
 
renderRow(rowData, sectionID, rowID) {
  return (
    <TouchableHighlight onPress={() => this.rowPressed(rowID)}
        underlayColor='#dddddd'>
      <View>
        <View style={styles.rowContainer}>
          <View  style={styles.textContainer}>
            <Text style={styles.titleText}>{rowData.title}</Text>
            <Text style={styles.headingText}>{rowData.heading}</Text>
            <Text style={styles.subHeadingText}
                  numberOfLines={1}>{rowData.subheading}</Text>
          </View>
          <Image style={styles.arrow} source={require('./Resource/right_arrow.png')} />
        </View>
      </View>
    </TouchableHighlight>
  );
}

rowPressed(rowID) {
  console.log('edit '+rowID+' row');
}

payButtonPress(){
  console.log("press pay now");
  var query = 'http://localhost:8888/';
  var resquestBody = this.props.result;
  this._executeQuery(query);
}

_executeQuery(query) {
  console.log(query);
  fetch(query,{
  method: 'post',
  dataType: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
        'request':{
        'listings':[
            {'title':'Ship to', 'heading':'Kenneth Thomepson', 'subheading':'8114 Grow Drive #9, Cape Neddick, ME 03902'},
            {'title':'Pay with','heading':'BANK OF AMERICA CHECKING x-5567', 'subheading':'Visa x-4512(backup)'},
        ],
        'total':'$28.98',
        'error':'200',
      }
  })
})
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error =>
     this.setState({
      message: 'Something bad happened ' + error
   }));
}

 _handleResponse(response) {
  console.log(response);
  this.setState({ message: '' });
  if (response.error === '200') {
    this.setState({ message: 'Pay Success'});
    this.props.navigator.push({
      title: 'Pay Result',
      component: PayResult,
      passProps: {result: response, message:this.state.message}
      });  
    } else {
      this.setState({ message: 'Pay error'});
  }
}

renderFooter() {
    return (
      <View>
        <Text style={styles.description}>{this.state.message}</Text>
        <View style={styles.totalContainer}>
          <View  style={styles.textContainer}>
            <Text style={styles.priceTitleText}>Total</Text>
            </View>
          <View  style={styles.textContainer}>
            <Text style={styles.priceText}>{this.state.totalPrice}</Text>
            </View>
          <Image style={styles.arrow} source={require('./Resource/right_arrow.png')} />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.titleText}>View 
            <Text style={styles.readBigBlueText}>PayPal Policies 
            </Text>
            and your payment method rights
          </Text>
        </View>
          <TouchableHighlight style={styles.payButton}>
            <Text style={styles.payButtonText} onPress={this.payButtonPress.bind(this)}>Pay Now</Text>
          </TouchableHighlight>
          <View style={styles.rowContainer}>
            <Text style={styles.titleText}>if money is added to your PayPal balance before this transaction completes, the additional balance maybe used to complete your payment. 
              <Text style={styles.readSmallBlueText}>
              PayPal Policies 
              </Text>
            </Text>
          </View>
        </View>
  )}

render() {
    return (
      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderFooter={this.renderFooter.bind(this)}/>
    );
  }
}

module.exports = PayPage;
