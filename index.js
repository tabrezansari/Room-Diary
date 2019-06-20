import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  
} from 'react-native';

import OneSignal from  'react-native-onesignal';


import MainScreenNavigator from './src/component/route';

export default class Index extends Component<{}> {
   componentWillMount() {
        OneSignal.init("b030ea6f-5640-421d-a6e3-8bf9542c05a2");
      
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onIds(device) {
    console.log('Device info: ', device);
    }
 constructor(props){
    super(props);
    this.state = {
      timePassed: false
    };
  }

     render() {

 
      return (<MainScreenNavigator/>
);
        
      
    }
  }







AppRegistry.registerComponent('test', () => Index);
