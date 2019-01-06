import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';

import firebase from 'react-native-firebase';
import { strings } from '../../services/i18n';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class PhoneLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+44',
      confirmResult: null,
    };
  }

  componentDidMount() {
    // this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({ user: user.toJSON() });
    //   } else {
    //     // User has been signed out, reset the state
    //     this.setState({
    //       user: null,
    //       message: '',
    //       codeInput: '',
    //       phoneNumber: '+44',
    //       confirmResult: null,
    //     });
    //   }
    // });
  }

  componentWillUnmount() {
    //  if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }
  
  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;
      
    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'Phone number ... '}
          value={phoneNumber}
        />
        <Button title="Sign In" color="green" onPress={this.signIn} />
      </View>
    );
  }
  
  renderMessage() {
    const { message } = this.state;
  
    if (!message.length) return null;
  
    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }
  
  renderVerificationCodeInput() {
    const { codeInput } = this.state;
  
    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
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
                    <Image style={styles.image}
                        source={Images.parent}>
                    </Image>
                    <View style={styles.view}>
                        <Button block onPress={this.onPhoneLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('signup_button_phone_title.value')}</Text></Button>
                        <Button block onPress={this.onEmailLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('signup_button_email_title.value')}</Text></Button>
                        <TouchableOpacity onPress={this.onLoginMode.bind(this)} style={styles.buttonTwo}><Text style={styles.text}>{strings('signup_mode_button_title.value')}</Text></TouchableOpacity> 
                    </View>                   
                </Container>
            </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Red,
    },
    text: {
        color: Colors.white,
        textAlign: 'center',
        margin: 20,
        fontSize: FontSizes.mediumLarge
    },
    image: {
        alignItems: 'center',
        width: responsiveWidth(50),
        height: responsiveWidth(50),
    }
});