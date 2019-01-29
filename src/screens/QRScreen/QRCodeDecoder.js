import React from 'react';
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
import { Images, Colors, globalStyles } from '../../theme';
import ImagePicker from 'react-native-image-picker';
import { Container, Button, Item, Label, Input } from 'native-base';
import { strings } from '../../services/i18n';
import firebase from 'react-native-firebase';
import BackButton from '../../components/BackButton';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import QRdecoder from 'react-native-qrimage-decoder';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
      avatarSource: null,
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

  onSuccess = (data) => {
    if (data.includes('http')) {
        return;
    }
    let p_uid = data.split('/')[0];
    let my_uid = data.split('/')[1];
    let device_token = firebase.messaging().getToken()
    .then(token => {
        firebase.database().ref('children/' + p_uid).child(my_uid).update({device_token: token});
        this.props.navigation.navigate('ChildMapScreen', {p_uid, my_uid});
    });
  }

  onError = (data) => {
    this.alert(data);
    this.setState({src: null, uri: null});
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
      return (
          <Container style={globalStyles.container}>
              <BackButton onPress={()=>this.props.navigation.goBack()}/>
              <Container style={styles.innerBox}>
                  <ImageBackground source={Images.background}  style={styles.imageBk} ></ImageBackground>
                  <Image style={styles.qrCode} source={this.state.src? {uri: this.state.src}: Images.emptyQR} />
                  { this.renderButton() }
                  <QRdecoder src={this.state.src} onSuccess={this.onSuccess} onError={this.onError} />
              </Container>                
          </Container>
      )
  }

  confirmChild() {

  }

  renderButton() {
      if (!this.state.src) {
        return <Button block onPress={this.openLibrary.bind(this)} style={styles.button}><Text style={styles.text}>{strings('import_photo_from_library_title.value')}</Text></Button>;
      } else {
        return <Button block onPress={this.confirmChild.bind(this)} style={styles.button}><Text style={styles.text}>{strings('confirm_child_button_title.value')}</Text></Button>;
      }
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
      width: responsiveWidth(70),
      height: responsiveWidth(70),
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