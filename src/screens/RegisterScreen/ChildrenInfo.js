import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { Images, Colors, globalStyles } from '../../theme';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import firebase from 'react-native-firebase';
import BackButton from '../../components/BackButton';
import { Container, Button, Input, Item, Label } from 'native-base';
import { strings } from '../../services/i18n';

export default class ChildrenInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
            childName: '',
            age: '',
            contactNumber: '',
            parentUid: '',
        }
    }

    componentDidMount() {
        let p_uid = this.props.navigation.getParam('uid', '');
        this.setState({parentUid: p_uid});
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                <Container style={styles.container}>
                    <ImageBackground source={Images.background}  style={styles.imageBk} ></ImageBackground>
                    <BackButton onPress={()=>this.props.navigation.goBack()}/>
                    <ImageBackground source={Images.children}  style={styles.image}></ImageBackground>
                    <Item floatingLabel style={styles.label}>
                        <Label style={styles.text}>{strings('child_name_label_placeholder_title.value')}</Label>
                        <Input autoCapitalize='none' autoCorrect={false} style={styles.input} value={this.state.childName} onChangeText={childNameTxt=>this.setState({childName: childNameTxt})}/>                
                    </Item>
                    <Item floatingLabel style={styles.label1}>
                        <Label style={styles.text}>{strings('child_age_label_placeholder_title.value')}</Label>
                        <Input autoCapitalize='none' autoCorrect={false} style={styles.input} value={this.state.age} onChangeText={ageTxt=>this.setState({age: ageTxt})}/>                
                    </Item>
                    <Item floatingLabel style={styles.label1}>
                        <Label style={styles.text}>{strings('child_contact_number_label_placeholder_title.value')}</Label>
                        <Input autoCapitalize='none' autoCorrect={false} style={styles.input} value={this.state.contactNumber} onChangeText={contactNumberTxt=>this.setState({contactNumber: contactNumberTxt})}/>                
                    </Item>
                    <Button style={styles.button} onPress={this.generateQR.bind(this)}><Text style={styles.text}>{strings('child_generate_qr_button_title.value')}</Text></Button>
                </Container>
            </KeyboardAvoidingView>
        )
    }

    async generateQR() {
        let {childName, age, contactNumber, parentUid} = this.state;
        let email = await AsyncStorage.getItem('email');
        let errorKey = '';
        if (!childName) {
            errorKey = 'alert_empty_child_name_title.value';
        } else if (!age) {
            errorKey = 'alert_empty_child_age_title.value';
        } else if (!contactNumber) {
            errorKey = 'alert_empty_child_number_title.value';
        }
        if (errorKey) {
            alert(strings(errorKey));
            return;
        }
        let ch_uid = firebase.database().ref('children/').child(parentUid).push({name: childName, age, contactNumber, device_token: '', location: {lat:0, lon: 0}, status: 'none'});
        let qrCodeTxt = parentUid + '/' + ch_uid.key;
        this.props.navigation.navigate(
            'QRCodeGenScreen',
            { qrCodeTxt },
        );
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Red,
        alignItems: 'center',
    },
    image: {
        marginTop: responsiveHeight(15),
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        marginBottom: 30,
    },
    label: {
        width: responsiveWidth(80),
    },
    label1: {
        width: responsiveWidth(80),
        marginTop: 10,
    },
    button: {
        width: responsiveWidth(80),
        left: responsiveWidth(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(10),
        backgroundColor: Colors.buttonColor,
    },
    text: {
        color: Colors.white,
    },
    input: {
        width: responsiveWidth(80),
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