import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  Text
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
        alert(qrCodeTxt);
        return (
            <Container style={styles.container}>
                <Container style={styles.innerBox}>
                    <QRCode
                        value={qrCodeTxt}
                        size={200}
                        bgColor='black'
                        fgColor='white'
                        style={styles.qrCode}/>
                    <Label style={styles.label}>{strings('parent_qr_code_desc_title.value')}</Label>
                    <Button block onPress={this.saveToGallery.bind(this)} style={styles.button}><Text style={styles.text}>{strings('parent_qr_save_button_title.value')}</Text></Button>
                </Container>                
            </Container>
        )
    }

    saveToGallery() {
        alert('Save to Gallery');
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
});