import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import { Images, Colors, globalStyles } from '../../theme';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Container, Button, View } from 'native-base';
import { strings } from '../../services/i18n';

export default class Parent extends Component {

    constructor(props){
        super(props)
        this.state = {
            loginStatus: false,
        }

    }

    componentDidMount() {
    }

    render() {
        const {loginStatus} = this.state;
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Image
                            source={ Images.backBtn }
                            style={ globalStyles.backBtn }></Image>
                    </TouchableOpacity>
                </View>
                <Container style={styles.innerBox}>
                    <Image style={styles.image}
                        source={Images.parent}>
                    </Image>
                    {   loginStatus ?
                        <View style={styles.view}>
                            <Button block onPress={this.onPhoneLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('login_button_phone_title.value')}</Text></Button>
                            <Button block onPress={this.onEmailLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('login_button_email_title.value')}</Text></Button>
                            <TouchableOpacity onPress={this.onRegisterMode.bind(this)} style={styles.buttonTwo}><Text style={styles.text}>{strings('login_mode_button_title.value')}</Text></TouchableOpacity> 
                        </View>
                        :
                        <View style={styles.view}>
                            <Button block onPress={this.onPhoneLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('signup_button_phone_title.value')}</Text></Button>
                            <Button block onPress={this.onEmailLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('signup_button_email_title.value')}</Text></Button>
                            <TouchableOpacity onPress={this.onLoginMode.bind(this)} style={styles.buttonTwo}><Text style={styles.text}>{strings('signup_mode_button_title.value')}</Text></TouchableOpacity> 
                        </View> }                        
                </Container>
            </Container>
        )
    }

    onPhoneLogin() {
        alert('Phone Login');
        // this.props.navigation.navigate("PhoneScreen", {loginStatus: this.state.loginStatus});
    }

    onEmailLogin() {
        alert('Email Login');
        // this.props.navigation.navigate("EmailScreen", {loginStatus: this.state.loginStatus});
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
    container: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        alignSelf: 'stretch',        
        height: 40,
        width: responsiveWidth(100),
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    innerBox: {
        marginTop: 0,
        backgroundColor: Colors.Red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        marginBottom: 15
    },
    view: {
        width: responsiveWidth(80),
    },
    button: {
        padding: 20,
        marginTop: 10,
        backgroundColor: Colors.buttonColor,
    },
    buttonTwo: {
        marginTop: 10,
        marginLeft: 5,
    },
    text: {
        color: Colors.white,
    },
});