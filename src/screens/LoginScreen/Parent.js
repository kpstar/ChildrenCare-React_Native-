import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Alert,
  Text,
  ImageBackground
} from 'react-native';
import { Images, Colors, globalStyles, FontSizes } from '../../theme';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Container, Button, View } from 'native-base';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { strings } from '../../services/i18n';
import { Banner } from '../../components/Ads';
import BackButton from '../../components/BackButton';

export default class Parent extends Component {

    constructor(props){
        super(props)
        this.unsubscribe = null;
        this.state = {
            loading: true,
            user: '',
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            this.setState({loading: false});
            if (!user) return;
            if (user.phoneNumber) {
                firebase.auth().signOut();
                navigation.navigate("EmailLoginScreen", {loginStatus: true});
                Alert.alert('Success', 'Successfully created your account', [
                    {text: 'OK', style: 'cancel'}
                ]);
                return;
            } else if (user.email) {
                navigation.navigate('ParentInfoScreen');
            }
            return;
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        return (
            <Container style={globalStyles.container}>
                <BackButton onPress={()=>this.props.navigation.goBack()}/>
                <Container style={styles.innerBox}>
                    <ImageBackground source={Images.background}  style={styles.imageBk} ></ImageBackground>
                    <Spinner
                        visible={this.state.loading}
                        textContent={strings('spinner_loading_information.value')}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <Image style={styles.image}
                        source={Images.parent}>
                    </Image>
                    <View style={styles.view}>
                        <Button block onPress={this.onLogin.bind(this)} style={styles.buttonPhone}><Text style={styles.text}>{strings('login_button_email_title.value')}</Text></Button>
                        <Button block onPress={this.onSignUp.bind(this)} style={styles.button}><Text style={styles.text}>{strings('signup_button_email_title.value')}</Text></Button>
                    </View>
                </Container>
                <Banner />
            </Container>
        )
    }

    onLogin() {
        this.props.navigation.navigate("EmailLoginScreen", {loginStatus: true});
    }

    onSignUp() {
        this.props.navigation.navigate("EmailLoginScreen", {loginStatus: false});
    }
}

const styles = StyleSheet.create({
    innerBox: {
        marginTop: 0,
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
    imageBk: {
        position: 'absolute',
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        left: 0,
        top: 0
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