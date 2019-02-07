import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { Container, Label, Button, Spinner } from 'native-base';
import { Images, Colors, globalStyles, FontSizes} from '../../theme';
import firebase from 'react-native-firebase';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import PhoneInput from 'react-native-phone-input'
import { strings } from '../../services/i18n';
import BackButton from '../../components/BackButton';

export default class PhoneLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      loading: false,
      error: '',
      phoneNumber: '+',
      confirmResult: null,
    };
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  onPhoneLogin() {
    const { phoneNumber } = this.state;
    this.setState({ error: '', loading: true, });
    let p_uid = firebase.auth().currentUser.uid;
    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then((confirmResult) => {
        this.props.navigation.navigate('PhoneVerificationScreen', {confirmResult, p_uid});
        this.setState({ error: '', loading: false, });
      })
      .catch(error => {
        this.setState({error, loading: false});
        alert(error);
      });
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Container style={globalStyles.container}>
              <BackButton onPress={()=>this.props.navigation.goBack()}/>
              <Container style={styles.innerBox}>
                  <ImageBackground source={Images.background} style={styles.imageBk} ></ImageBackground>
                  <Image style={styles.image}
                      source={Images.parent}>
                  </Image>
                  <View style={styles.view}>
                    <PhoneInput ref='phone'
                      data={this.state.phoneNumber}
                      onChangePhoneNumber={(number) => this.setState({phoneNumber: number})}
                      textStyle={styles.input} />
                  </View>  
                  <View style={styles.viewone}>
                    <Label style={styles.labelTitle}>{strings('terms_and_condition_title.value')}</Label>
                    <Label style={styles.labelContent}>{strings('terms_and_condition_content.value')}</Label>
                  </View>
                  {this.renderButtonOrSpinner()}
              </Container>
          </Container>
        </TouchableWithoutFeedback>
    );
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <Spinner color={Colors.White} style={styles.spinner} />;    
    }
    return <Button block onPress={this.onPhoneLogin.bind(this)} style={styles.button}><Text style={styles.texts}>{strings('phone_auth_button_title.value')}</Text></Button>;       
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerBox: {
      marginTop: 0,
      backgroundColor: Colors.Red,
      alignItems: 'center',
    },
    label: {
      color: Colors.white,
    },
    labelTitle: {
      color: Colors.white,
      fontSize: FontSizes.smallMedium,
      width: responsiveWidth(80),
      marginTop: 10,
      textAlign: 'center',
      marginBottom: 10,
    },
    labelContent: {
      color: Colors.white,
      textAlign: 'center',
      width: responsiveWidth(80),
      fontSize: FontSizes.smallMedium,
      marginBottom: 5,
    },
    button: {
      padding: 20,
      marginTop: 10,
      marginLeft: responsiveWidth(10),
      marginRight: responsiveWidth(10),
      backgroundColor: Colors.pureRed,
    },
    spinner: {
      justifyContent: 'center',
    },
    text: {
        color: Colors.white,
        textAlign: 'center',
        margin: 20,
        fontSize: FontSizes.mediumLarge
    },
    input: {
      color: Colors.white,
      fontSize: FontSizes.medium,
      marginTop: 15,
      marginBottom: 15,
    },
    view: {
      width: responsiveWidth(80),
      marginBottom: 10,
    },
    viewone: {
      width: responsiveWidth(80),
      borderRadius: 5,
      backgroundColor: Colors.Brown,
      justifyContent: 'center',
    },
    texts: {
      color: Colors.white,
      fontSize: FontSizes.medium,
    },
    image: {
        alignItems: 'center',
        marginTop: 30,
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