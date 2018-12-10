import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Text,
  Linking,
} from 'react-native';
import { Images, Colors, globalStyles, FontSizes } from '../../theme';
import QRCode from 'react-native-qrcode';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Container, Button, View } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { strings } from '../../services/i18n';
import images from '../../theme/images';

export default class QRCodeScan extends Component {

    onSuccess(e) {
        let qrCode = e.data;
        let p_mail = qrCode.split("/")[0];
        if (p_mail.includes("@")) {
            AsyncStorage.setItem('email', p_mail);
            this.setState({qrCodeScan: true, qrCode: qrCode});
        }
        return;
    }

    constructor(props){
        super(props)
        this.state = {
            qrCodeScan: false,
            qrCode: '',
        }
    }

    acceptGPS = () => {
        this.props.navigation.navigation(
            "MapScreen", {qrCode: this.state.qrCode}
        );
    }

    componentDidMount() {
    }

    render() {
        const {qrCodeScan, qrCode} = this.state;
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
                    { qrCodeScan ?
                        <View style={styles.scannedView}>
                            <QRCode 
                                value={qrCode}
                                size={responsiveWidth(70)}
                                bgColor='black'
                                fgColor='white'
                                style={styles.qrCode}
                            />
                            <Image source={Images.success} style={styles.image} />
                            <Text style={styles.scanText}>{ strings('children_qr_scan_complete_button_title.value') }</Text>
                            <Text style={styles.descText}>{ strings('children_qr_description_label_title.value') }</Text>
                            <Button style={styles.button} onPress={this.acceptGPS.bind(this)}><Text style={styles.text}>{strings('children_qr_accept_gps_button_title.value')}</Text></Button>
                        </View>
                        :
                        <View>
                            <QRCodeScanner
                                showMarker
                                onRead={this.onSuccess.bind(this)}
                                bottomContent={
                                    <Text style={styles.descScanText}>{ strings('children_scan_description_text.value') }</Text>
                                }
                            />
                        </View>
                    }
                </Container>
            </Container>
        )
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    innerBox: {
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Red,
    },
    scannedView: {
        alignItems: 'center',
        width: responsiveWidth(80),
        marginTop: 30,
    },
    image: {
        width: 40,
        height: 40,
        marginTop: 10
    },
    scanText: {
        fontSize: FontSizes.medium,
        color: Colors.white,
        marginTop: 10
    },
    descScanText: {
        fontSize: FontSizes.medium,
        marginTop: 20,
        color: Colors.white
    },
    descText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: FontSizes.smallMedium,
        color: Colors.white
    },
    button: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(80)
    },
    text: {
        color: Colors.white,
        fontSize: FontSizes.medium
    }
});