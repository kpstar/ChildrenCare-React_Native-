import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import { Images, Colors, globalStyles, FontSizes } from '../../theme';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Container, Button, View } from 'native-base';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { AdMobBanner } from 'react-native-admob';
import { strings } from '../../services/i18n';

export default class Parent extends Component {

    constructor(props){
        super(props)
        this.unsubscribe = null;
        this.state = {
            loginStatus: true,
            loading: true,
            user: '',
        }
    }

    componentWillMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loading: false});
                this.props.navigation.navigate('ParentInfoScreen');
            } else {
                // Initialize all variables
                this.setState({loading: false});
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        const {loginStatus} = this.state;
        return (
            <Container style={globalStyles.container}>
                <View style={globalStyles.header}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Image
                            source={ Images.backBtn }
                            style={ globalStyles.backBtn }></Image>
                    </TouchableOpacity>
                </View>
                <Container style={styles.innerBox}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={strings('spinner_loading_.value')}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <Image style={styles.image}
                        source={Images.parent}>
                    </Image>
                    {   loginStatus ?
                        <View style={styles.view}>
                            <Button block onPress={this.onPhoneLogin.bind(this)} style={styles.buttonPhone}><Text style={styles.text}>{strings('login_button_phone_title.value')}</Text></Button>
                            <Button block onPress={this.onEmailLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('login_button_email_title.value')}</Text></Button>
                            <TouchableOpacity onPress={this.onRegisterMode.bind(this)} style={styles.buttonTwo}><Text style={styles.text}>{strings('login_mode_button_title.value')}</Text></TouchableOpacity> 
                        </View>
                        :
                        <View style={styles.view}>
                            <Button block onPress={this.onPhoneLogin.bind(this)} style={styles.buttonPhone}><Text style={styles.text}>{strings('signup_button_phone_title.value')}</Text></Button>
                            <Button block onPress={this.onEmailLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('signup_button_email_title.value')}</Text></Button>
                            <TouchableOpacity onPress={this.onLoginMode.bind(this)} style={styles.buttonTwo}><Text style={styles.text}>{strings('signup_mode_button_title.value')}</Text></TouchableOpacity> 
                        </View> }
                </Container>
                <AdMobBanner
                    adSize="fullBanner"
                    adUnitID="ca-app-pub-8622592331654235/4043224001"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)}
                /> 
            </Container>
        )
    }

    onPhoneLogin() {
        this.props.navigation.navigate("PhoneLoginScreen", {loginStatus: this.state.loginStatus});
    }

    onEmailLogin() {
        this.props.navigation.navigate("EmailLoginScreen", {loginStatus: this.state.loginStatus});
    }

    onRegisterMode() {
        this.setState({loginStatus: false});
    }

    onLoginMode() {
        this.setState({loginStatus: true});
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    innerBox: {
        marginTop: 0,
        backgroundColor: Colors.Red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: responsiveWidth(50),
        height: responsiveWidth(50),
        marginBottom: 50,
    },
    view: {
        width: responsiveWidth(80),
    },
    button: {
        padding: 20,
        marginTop: 10,
        backgroundColor: Colors.buttonColor,
    },
    buttonPhone: {
        padding: 20,
        marginTop: 10,
        backgroundColor: Colors.Blue,
    },
    buttonTwo: {
        marginTop: 10,
        marginLeft: 5,
    },
    text: {
        color: Colors.white,
        fontSize: FontSizes.smallMedium,
    },
    spinnerTextStyle: {
        color: Colors.white,
        fontSize: FontSizes.medium,
    },
});