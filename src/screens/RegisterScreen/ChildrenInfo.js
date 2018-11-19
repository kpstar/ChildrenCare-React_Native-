import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  AsyncStorage
} from 'react-native';
import { Images, Colors, globalStyles } from '../../theme';
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { Container, Button, Input, Item, Label } from 'native-base';
import { strings } from '../../services/i18n';

export default class ChildrenInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
            childName: '',
            age: '',
            contactNumber: '',
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Container style={globalStyles.container}>
                <ImageBackground source={Images.children}  style={styles.image}></ImageBackground>
                <Item floatingLabel>
                    <Label style={styles.label}>{strings('child_name_label_placeholder_title.value')}</Label>
                    <Input autoCapitalize='none' autoCorrect={false} style={styles.input} value={this.state.childName} onChangeText={childNameTxt=>this.setState({childName: childNameTxt})}/>                
                </Item>
                <Item floatingLabel>
                    <Label style={styles.label}>{strings('child_age_label_placeholder_title.value')}</Label>
                    <Input autoCapitalize='none' autoCorrect={false} style={styles.input} value={this.state.age} onChangeText={ageTxt=>this.setState({age: ageTxt})}/>                
                </Item>
                <Item floatingLabel>
                    <Label style={styles.label}>{strings('child_contact_number_label_placeholder_title.value')}</Label>
                    <Input autoCapitalize='none' autoCorrect={false} style={styles.input} value={this.state.contactNumber} onChangeText={contactNumberTxt=>this.setState({contactNumber: contactNumberTxt})}/>                
                </Item>
                <Button style={styles.button} onPress={this.generateQR.bind(this)}><Text style={styles.text}>{strings('child_generate_qr_button_title.value')}</Text></Button>
            </Container>
        )
    }

    generateQR() {
        let {childName, age, contactNumber} = this.state;
        let email = AsyncStorage.getItem('email');
        // let email = localStorage.getItem('email');
        if (!email) {
            alert('Please insert Email info');
            return;
        }
        let qrCodeTxt = email + "/" + childName + "/" + age + '/' + contactNumber;
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
    innerBox: {
        marginTop: 0,
        backgroundColor: Colors.Red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        marginBottom: 15
    },
    view: {
        width: responsiveWidth(80),
    },
    button: {
        padding: 20,
        marginTop: 10,
        backgroundColor: Colors.buttonColor,
    },
    buttonTwo: {
        marginTop: 10,
        marginLeft: 5,
    },
    text: {
        color: Colors.black,
    },
    input: {
        color: Colors.black,
    },
});