import React, {Component, useState} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default function FirstScreen({navigation : {navigate}} ){
  return(
    <View>
      <Text>asdasdsd</Text>
      <Button
        onPress={() => 
          navigate('Loading')
        }
        title="Go to Loding Page"
      />
    </View>
  );
}
  