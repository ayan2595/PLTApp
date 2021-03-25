import React, {Component} from 'react';
import Constants from 'expo-constants'
import {View, Text, StyleSheet, Image, Button, TouchableOpacity, Dimensions} from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AR = windowHeight/windowWidth
var scalingfactor = 1

if(AR <= 1.5){
    scalingfactor = 0.9
}
else if (AR > 1.5){
    scalingfactor = 1
}

//page that is accessed if permission is provided

export default class Authorised extends Component {


    render() {
      return (
          <LinearGradient style= {styles.wrapper} colors={['#FFB6C1', '#F08080']}>
            <View style= {styles.header}>
                <Image style= {styles.logo}
                    source={require('./assets/logoPlt.jpg')}
                />
            </View>
            <View style= {styles.mainTextViewWrapper}>
                <Text style= {styles.mainText}>
                <Text style= {styles.mainTextbold}>Welcome</Text>
                <Text> to the full </Text>
                    <Text style= {styles.mainTextbold}>PLT </Text><Text>experience.
                </Text>
                </Text>
          </View>
          </LinearGradient>
      );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingVertical: s(Constants.statusBarHeight)*scalingfactor,
        paddingHorizontal: s(10)*scalingfactor,
    },
    header:{
        flex: 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: s(10)*scalingfactor
    },
    mainTextViewWrapper:{
        flex: 0.35,
        marginTop: s(50)*scalingfactor,
        marginHorizontal: s(50)*scalingfactor,
        justifyContent: 'flex-start',
    },
    mainText:{
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: ms(21)*scalingfactor,
    },
    mainTextbold:{
        fontWeight:'bold',
    },

});
