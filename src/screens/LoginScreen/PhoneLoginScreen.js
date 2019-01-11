import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Container, Item, Label, Button, Input, Spinner } from 'native-base';
import { Images, Colors, globalStyles, FontSizes} from '../../theme';
import firebase from 'react-native-firebase';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import PhoneInput from 'react-native-phone-input'
import { strings } from '../../services/i18n';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class PhoneLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      loading: false,
      error: '',
      phoneNumber: '+8613941520975',
      confirmResult: null,
    };
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  onPhoneLogin() {
    const { phoneNumber } = this.state;
    this.setState({ error: '', loading: true, });
    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then((confirmResult) => {
        this.props.navigation.navigate('PhoneVerificationScreen', {confirmResult});
      })
      .catch(error => {
        this.setState({error, loading: false});
        alert(error);
      });
  }

  render() {
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
                  <Item floatingLabel>
                      <Label style={styles.label}>{strings('mobile_number_text_placeholder.value')}</Label>
                      <Input autoCapitalize='none' style={styles.input} autoCorrect={false} value={this.state.phoneNumber} onChangeText={text=>this.setState({phoneNumber: text})}/>
                  </Item>
                </View>  
                <View style={styles.viewone}>
                  <Label style={styles.labelTitle}>{strings('terms_and_condition_title.value')}</Label>
                  <Label style={styles.labelContent}>{strings('terms_and_condition_content.value')}</Label>
                </View>
                {this.renderButtonOrSpinner()}
            </Container>
        </Container>
    );
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <Spinner color={Colors.White} style={styles.spinner} />;    
    }
    return <Button block onPress={this.onPhoneLogin.bind(this)} style={styles.button}><Text style={styles.texts}>{strings('phone_auth_button_title.value')}</Text></Button>;       
  } 

  goBack = () => {
    this.props.navigation.goBack();
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Red,
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
    }
});