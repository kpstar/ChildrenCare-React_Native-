import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Text,
  Linking,
} from 'react-native';
import { Images, Colors, globalStyles } from '../../theme';
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
                        <View>
                            <QRCode 
                                value={qrCode}
                                size={200}
                                bgColor='black'
                                fgColor='white'
                                style={styles.qrCode}
                            />
                        </View>
                        :
                        <View>
                            <QRCodeScanner
                                onRead={this.onSuccess.bind(this)} />
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
        backgroundColor: Colors.Red,
    },
    qrCode: {
        marginTop: 20,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        marginBottom: 15,
    },
});