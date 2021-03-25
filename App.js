import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation'
import Splash from './Splash'
import Authorised from './Authorised'

export default class App extends React.Component {
  render() {
    return (
      <View style ={styles.container}>
        <AppNavigator/>
      </View>
    )
  }
}

const AppNavigator = StackNavigator({
    Splash: {screen : Splash,
    navigationOptions: ({navigation}) => ({
    header:false
    })},
    Authorised: {screen : Authorised,
    navigationOptions: ({navigation}) => ({
    header:false
    })},
},
);

const styles = StyleSheet.create ({
  container: {
  display:'flex',
  flex: 1,
  backgroundColor: '#FFF'
},
});

