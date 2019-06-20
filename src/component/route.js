
import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';



import Login from './login';
import verify from './verify';
import Home from './home';
import deposite from './deposites';
import cart from './cart';

import diary from './diary';
import profile from './profile';

const MainScreenNavigator = StackNavigator({
    Home: { screen: Home },



        cart: { screen: cart },

          
          profile: { screen: profile },
       




      deposite: { screen: deposite },


  diary: { screen: diary },



      Login: { screen: Login },

verify: { screen: verify },





},{
  headerMode: 'none'
});

export default MainScreenNavigator;
