import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text
} from 'react-native';
import { Images, Colors, globalStyles, FontSizes } from '../../theme';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { Container, Button, View } from 'native-base';
import { Banner } from '../../components/Ads';
import { strings } from '../../services/i18n';
import BackButton from '../../components/BackButton';

export default class Children extends Component {

    render() {
        return (
            <Container style={globalStyles.container}>
                <BackButton onPress={()=>this.props.navigation.goBack()}/>
                <Container style={styles.innerBox}>
                    <ImageBackground source={Images.background} style={styles.imageBk} ></ImageBackground>
                    <Image style={styles.image}
                        source={Images.children}>
                    </Image>
                    <Button block onPress={this.onQRLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('login_button_scanqr_title.value')}</Text></Button>
                    <Button block onPress={this.onLibraryLogin.bind(this)} style={styles.buttonTwo}><Text style={styles.text}>{strings('login_button_library_title.value')}</Text></Button>              
                </Container>
                <Banner />
            </Container>
        )
    }

    onQRLogin() {
        this.props.navigation.navigate("QRCodeLoginScreen", {method: 'Camera'});
    }

    onLibraryLogin() {
        this.props.navigation.navigate("QRCodeLoginScreen", {method: 'Library'});
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
        marginBottom: 40
    },
    imageBk: {
        position: 'absolute',
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        left: 0,
        top: 0
    },
    view: {
        width: responsiveWidth(80),
    },
    button: {
        padding: 20,
        marginTop: 10,
        marginLeft: responsiveWidth(10),
        marginRight: responsiveWidth(10),
        backgroundColor: Colors.buttonColor,
    },
    buttonTwo: {
        padding: 20,
        marginTop: 10,
        marginLeft: responsiveWidth(10),
        marginRight: responsiveWidth(10),
        backgroundColor: Colors.Green,
    },
    text: {
        color: Colors.white,
        fontSize: FontSizes.medium,
    },
});