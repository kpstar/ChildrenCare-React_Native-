import React, { Component } from 'react';
import { TouchableOpacity, View, Text, AsyncStorage, Image, StyleSheet, ImageBackground } from 'react-native';
import { Container, Item, Label, Input } from 'native-base';
import { Images, Colors, globalStyles, FontSizes} from '../../theme';
import firebase from 'react-native-firebase';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import CodeInput from 'react-native-confirmation-code-input';
import { strings } from '../../services/i18n';
import BackButton from '../../components/BackButton';

export default class PhoneVerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      phone: '',
      user: null,
      confirmResult: null,
      p_uid: '',
      my_uid: '',
    };
  }

  componentDidMount() {
    let {navigation} = this.props;
    let confirmResult = navigation.getParam('confirmResult', null);
    let p_uid = navigation.getParam('p_uid', null);
    let my_uid = navigation.getParam('my_uid', null);
    this.setState({confirmResult, p_uid, my_uid});
  }

  confirmCode = (code) => {
    let self = this;
    const { confirmResult, p_uid, my_uid } = this.state;
    if (confirmResult) {
      confirmResult.confirm(code)
        .then((user) => {
          if (my_uid) {
            self.props.navigation.navigate('ChildMapScreen', {p_uid, my_uid});
            firebase.auth().signOut();
            return;
          }
          let token = AsyncStorage.getItem('device_token')
          .then(token=>{
              firebase.database().ref('parents/').child(p_uid).update({device_token: token, phone: user.phoneNumber})
              .then((data)=>{
                  console.log('Update', data);
              });
          });
        })
        .catch((error) => {
          alert(error);
          self.props.navigation.goBack();
          self.ref.codeInputRef1.clear();
        });
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
        <Container style={globalStyles.container}>
            <BackButton onPress={()=>this.props.navigation.goBack()}/>
            <Container style={styles.innerBox}>
                <ImageBackground source={Images.background} style={styles.imageBk} ></ImageBackground>
                <Image style={styles.image}
                    source={Images.setting}>
                </Image>
                <Label style={styles.labelTitle}>{strings('phone_verification_label_title.value')}</Label>
                <View style={styles.inputView} >
                  <CodeInput
                    ref="codeInputRef1"
                    className={"border-b"}
                    codeLength={6}
                    keyboardType={"phone-pad"}
                    space={5}
                    size={30}
                    inputPosition='left'
                    onFulfill={(code)=> this.confirmCode(code)}
                  />
                </View>
                <Label style={styles.labelHint}>{strings('phone_verification_hint_title.value')}</Label>
            </Container>
        </Container>
    );
  }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.Red,
    },
    innerBox: {
      backgroundColor: Colors.Red,
      alignItems: 'center',
    },
    labelTitle: {
      color: Colors.white,
      fontSize: FontSizes.medium,
      width: responsiveWidth(80),
      marginTop: 10,
      textAlign: 'center',
    },
    labelHint: {
      color: Colors.white,
      marginTop: 10,
      fontSize: FontSizes.smallMedium,
      width: responsiveWidth(80),
      textAlign: 'center',
    },
    input: {
      marginTop: 10,
      width: responsiveWidth(80),
      color: Colors.white,
    },
    inputView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: responsiveWidth(80),
      height: 50,
      marginTop: 10,
      marginBottom: 10,
    },
    image: {
      alignItems: 'center',
      marginTop: responsiveHeight(10),
      marginBottom: 20,
      width: responsiveWidth(40),
      height: responsiveWidth(40),
    },
    imageBk: {
      position: 'absolute',
      width: responsiveWidth(100),
      height: responsiveHeight(100),
      left: 0,
      top: 0
    },
});