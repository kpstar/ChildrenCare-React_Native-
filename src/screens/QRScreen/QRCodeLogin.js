import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  WebView,
} from 'react-native';
import { Images, Colors, globalStyles, FontSizes } from '../../theme';
import ImagePicker from 'react-native-image-picker';
import { Container, Button, Item, Label, Input, Spinner } from 'native-base';
import { strings } from '../../services/i18n';
import firebase from 'react-native-firebase';
import QRCode from 'react-native-qrcode';
import BackButton from '../../components/BackButton';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import QRdecoder from 'react-native-qrimage-decoder';

export default class QRCodeLogin extends Component {
  constructor(props) {
    super(props);
    this.method = this.props.navigation.getParam('method');
    this.state = {
      src: null,
      avatarSource: null,
      qrCode: '',
      p_uid: '',
      my_uid: '',
      isValid: false,
      phone: '',
      loading: false,
    };
  }

  openLibrary() {
    let options = {
      mediaTypes: 'Images',
      allowsEditing: false,
      aspect: [1, 1],
      base64: true,
    };
    let mimeType;
    ImagePicker.launchImageLibrary(options, (response)=>{
      if (!response.uri) return;
      if (response.uri.length > 0) {
        const ext = response.uri.substr(response.uri.lastIndexOf('.')).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.jpe') {
          mimetype = 'image/jpeg';
        } else if (ext === '.png') {
          mimetype = 'image/png';
        } else if (ext === '.gif') {
          mimetype = 'image/gif';
        }
        if (mimetype) {
          this.setState({
            src: `data:${mimetype};base64,${response.data}`,
          });
        }
      }
    });
  }

  onException(e) {
    if (e) {
      alert(e);
    }
    this.setState({src: null, uri: null, isValid: false, qrCode: '', loading: false});
    return;
  }

  onSuccess = (e) => {
    let data = e.data? e.data: e;
    if (data.includes('http')) {
      this.onException();
    }
    let p_uid = data.split('/')[0];
    let my_uid = data.split('/')[1];
    if (!p_uid || !my_uid) {
      this.onException();
    }
    if (p_uid.length < 10 || my_uid.length < 10) {
      this.onException();
    }
    let self = this;
    firebase.database().ref('children/' + p_uid).child(my_uid).on('value', function(snapshot) {
      console.log('Snapshot Value = ', snapshot.val());
      let phone = snapshot.val().contactNumber;
      if (phone.length > 7) {
        self.setState({p_uid, my_uid, phone, isValid: true, qrCode: data});
      } else {
        self.onException();
      }
    });
  }

  onError = (data) => {
    alert(data);
    this.setState({src: null, uri: null, isValid: false, qrCode: '', loading: false});
  }

  renderQRCodeValid() {
    let {qrCode} = this.state;
    return <View style={styles.scannedView}>
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
              {this.renderButtonOrSpinner()}
           </View>;
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <Spinner color={Colors.White} style={styles.spinner} />;    
    }
    return <Button style={styles.buttonText} onPress={this.acceptGPS.bind(this)}><Text style={styles.textBtn}>{strings('children_qr_accept_gps_button_title.value')}</Text></Button>;     
  }

  acceptGPS() {
      let {p_uid, my_uid, phone} = this.state;
      this.setState({loading: true});
      let self = this;
      // self.props.navigation.navigate('ChildMapScreen', {p_uid, my_uid});
      firebase.auth().signInWithPhoneNumber(phone)
          .then((confirmResult) => {
            self.props.navigation.navigate('PhoneVerificationScreen', {confirmResult, p_uid, my_uid});
            self.setState({ error: '', loading: false, });
          })
          .catch(error => {
            self.setState({error, loading: false});
            alert(error);
          });
  }

  renderQRCodeChecking() {
    if (this.method == 'Camera') {
      return <View>
                <QRCodeScanner
                    showMarker
                    onRead={this.onSuccess.bind(this)}
                    bottomContent={
                        <Text style={styles.descScanText}>{ strings('children_scan_description_text.value') }</Text>
                    }
                />
             </View>;
    } else {
      return <View style={{alignItems: 'center'}}>
                  <Image style={styles.qrCode} source={this.state.src? {uri: this.state.src}: Images.emptyQR} />
                  <Button block onPress={this.openLibrary.bind(this)} style={styles.button}><Text style={styles.text}>{strings('import_photo_from_library_title.value')}</Text></Button>
                  <QRdecoder src={this.state.src} onSuccess={this.onSuccess} onError={this.onError} />
             </View>;
    }
  }

  render() {
      return (
          <Container style={globalStyles.container}>
              <BackButton onPress={()=>this.props.navigation.goBack()}/>
              <Container style={styles.innerBox}>
                  <ImageBackground source={Images.background}  style={styles.imageBk} ></ImageBackground>
                  { this.state.isValid ? 
                    this.renderQRCodeValid():
                    this.renderQRCodeChecking()
                  }
              </Container>                
          </Container>
      )
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
  qrCode: {
      width: responsiveWidth(70),
      height: responsiveWidth(70),
      borderColor: Colors.white,
      borderWidth: 10,
  },
  button: {
      width: responsiveWidth(80),
      padding: 10,
      marginTop: responsiveHeight(10),
      backgroundColor: Colors.buttonColor,
  },
  text: {
      color: Colors.white,
  },
  buttonText: {
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
      width: responsiveWidth(80)
  },
  textBtn: {
      color: Colors.white,
      fontSize: FontSizes.medium
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
});