import React, { Component } from 'react';
import ViewShot from "react-native-view-shot";
import QRCode from 'react-native-qrcode';
import BackButton from '../../components/BackButton';
import {
  StyleSheet,
  Text,
  CameraRoll,
  ImageBackground,
} from 'react-native';
import { Images, Colors } from '../../theme';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Container, Button, Label } from 'native-base';
import { strings } from '../../services/i18n';

export default class ParentQRCode extends Component {

    componentDidMount() {
    }

    render() {
        let {qrCodeTxt} = this.props.navigation.state.params;
        return (
            <Container style={styles.container}>
                <BackButton onPress={()=>this.props.navigation.goBack()}/>
                <Container style={styles.innerBox}>
                    <ImageBackground source={Images.background}  style={styles.imageBk} ></ImageBackground>
                    <ViewShot ref="viewShot" options={{ format: "jpg", quality: 1 }}>
                        <QRCode
                            value={qrCodeTxt}
                            size={responsiveWidth(70)}
                            bgColor='black'
                            fgColor='white'
                            style={styles.qrCode}/>
                    </ViewShot>
                    <Label style={styles.label}>{strings('parent_qr_code_desc_title.value')}</Label>
                    <Button block onPress={this.saveToGallery.bind(this)} style={styles.button}><Text style={styles.text}>{strings('parent_qr_save_button_title.value')}</Text></Button>
                </Container>                
            </Container>
        )
    }

    saveToGallery() {
        let self = this;
        this.refs.viewShot.capture().then(uri => {
            let promise = CameraRoll.saveToCameraRoll(uri);
            promise.then(function(result) {
                alert(strings('parent_save_qrcode_to_gallery_msg.value'));
                self.props.navigation.navigate("ParentInfoScreen");
            }).catch(function (error) {
                console.log(error);
            });
            return;
        });
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Red,
    },
    innerBox: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Red,
    },
    qrCode: {
        borderColor: Colors.white,
        borderWidth: 10,
    },
    button: {
        width: responsiveWidth(80),
        marginLeft: responsiveWidth(10),
        padding: 10,
        marginTop: responsiveHeight(10),
        backgroundColor: Colors.buttonColor,
    },
    text: {
        color: Colors.white,
    },
    label: {
        marginTop: 30,
        color: Colors.white,
    },
    imageBk: {
        position: 'absolute',
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        left: 0,
        top: 0
    },
});