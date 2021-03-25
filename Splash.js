import React, { Component } from 'react';
import Constants from 'expo-constants'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';//consistent sizing across all devices
import { LinearGradient } from 'expo-linear-gradient';
import {
    getTrackingStatus,
    requestTrackingPermission,
    TrackingStatus,
} from 'react-native-tracking-transparency';


//Firstly 'NSUserTrackingUsageDescription' added in app.json under the iOS section under info.plist subheading

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AR = windowHeight / windowWidth
var scalingfactor = 1

//Scaling factor accounts for tablets
if (AR <= 1.5) {
    scalingfactor = 0.9
}
else if (AR > 1.5) {
    scalingfactor = 1
}

export default class Splash extends Component {
    state = {
        isSelected: false,
        authorised: false,
    };

    request = async () => {
        // extracts current tracking status which is 'unavailable' for devices other than iOS14
        const trackingStatus = await getTrackingStatus();
        if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
            //allowing all 'other' devices to pass
            this.setState({ isSelected: !this.state.isSelected })
            this.setState({ authorised: !this.state.authorised })
            
        }
        else if (trackingStatus === 'not-determined') {
            // requesting permission from iOS 14 users
            this.requestPermission()
        }
        else if (trackingStatus === 'denied') {
            // tracking denied so no entry 
            this.setState({ isSelected: false })
            
        }
    }

    requestPermission = async () => {

        const trackingStatus = await requestTrackingPermission();
        // if tracking is authorised or unavailable ('other device') allow passage
        if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
            this.setState({ isSelected: !this.state.isSelected })
            
        }
        else if (trackingStatus === 'denied') {
            // deny entry
            this.setState({ isSelected: false })
            
        }
    }

    render() {
        return (
            <LinearGradient style={styles.wrapper} colors={['#FFB6C1', '#F08080']}>
                <View style={styles.header}>
                    <Image style={styles.logo}
                        source={require('./assets/logoPlt.jpg')}
                    />
                </View>
                <View style={styles.mainTextViewWrapper}>
                    <Text style={styles.mainText}>
                        <Text style={styles.mainTextbold}>PLT</Text>
                        <Text> makes a conscious effort to respect the customers privacy and stay up to date with the latest GDPR and privacy policy requirements.
                               As such, if you are a customer with </Text>
                        <Text style={styles.mainTextbold}>iOS 14 </Text>
                        <Text>or above please provide appropriate permissions to proceed.</Text>
                    </Text>
                    {/* using 'state' to display the permission dialogue box */}
                    <View style={styles.checkboxInput}>
                        <TouchableOpacity
                            onPress={this.request}>
                            {this.state.isSelected ? <Image style={styles.tickb} source={require('./assets/ticked.png')} /> : <Image style={styles.tickb} source={require('./assets/unticked.png')} />}
                        </TouchableOpacity>
                        <Text style={styles.label}>  I agree to the PrettyLittleThing </Text>
                        <Text style={styles.labelunderline}>Tracking Policy </Text>
                    </View>
                </View>
                {/* using 'state' to allow or deny entry based on permission */}
                <View style={[styles.buttonWrapper]}>
                    <TouchableOpacity 
                            disabled = {!this.state.authorised}
                            style={[styles.flipButton]}
                            onPress={() =>
                                this.props.navigation.navigate('Authorised')}> 
                            {this.state.authorised? <Text style={styles.btntxt}>Enter the full website</Text> : <Text style={styles.btntxt}>No Entry</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.footerWrapper}>
                    <Text style={styles.footerUpper}>Created by</Text>
                    <Text style={styles.footerLower}>PrettyLittleThing.</Text>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingVertical: s(Constants.statusBarHeight) * scalingfactor,
        paddingHorizontal: s(10) * scalingfactor,
    },
    header: {
        flex: 0.38,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: s(10) * scalingfactor
    },
    tickb: {
        height: s(25) * scalingfactor,
        width: s(25) * scalingfactor
    },
    logo: {
        width: s(225) * scalingfactor,
        height: s(225) * scalingfactor,
    },
    mainTextViewWrapper: {
        flex: 0.40,
        marginTop: s(50) * scalingfactor,
        marginHorizontal: s(20) * scalingfactor,
        justifyContent: 'flex-start',
    },
    mainText: {
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: ms(20) * scalingfactor,
    },
    mainTextbold: {
        fontWeight: 'bold',
    },
    checkboxInput: {
        flexDirection: "row",
        marginVertical: s(25) * scalingfactor,
        marginHorizontal: s(25) * scalingfactor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: 'white',
        fontSize: ms(14) * scalingfactor,
    },
    checkbox: {
        alignSelf: "center",
    },
    labelunderline: {
        color: 'white',
        fontSize: ms(14) * scalingfactor,
        fontWeight: 'bold',
        borderBottomColor: 'white',
        borderBottomWidth: s(2) * scalingfactor
    },
    buttonWrapper: {
        flex: 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: s(20) * scalingfactor,
    },
    flipButton: {
        height: s(50)*scalingfactor,
        width:"80%",
        borderRadius: s(10)*scalingfactor,
        borderColor: 'white',
        borderWidth: s(1)*scalingfactor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
      },
      btntxt: {
        color: 'white',
        fontSize: ms(18) * scalingfactor,
        fontWeight: 'bold',
    },
    footerWrapper: {
        flex: 0.10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    footerUpper: {
        fontSize: ms(14) * scalingfactor,
        fontWeight: '100',
        color: 'white'
    },
    footerLower: {
        fontSize: ms(18) * scalingfactor,
        fontWeight: 'bold',
        color: 'white'
    },
});
