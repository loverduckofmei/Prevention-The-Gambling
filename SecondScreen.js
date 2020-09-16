import React, {Component, useState} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import PropTypes from 'prop-types';

export default class SecondScreen extends Component{

   
    render() {
      const {navigate} = this.props.navigation;
   
      return (
        <View>
          <Text>Second Screen</Text>
          <Button
            title="Go to First Screen"
            onPress={() => navigate('FirstScreen')}
          />
        </View>
      );
    }
  };

  