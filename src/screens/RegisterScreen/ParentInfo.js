import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  AsyncStorage,
} from 'react-native';
import { Images, Colors, FontSizes } from '../../theme';
import firebase from 'react-native-firebase';
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { Container, Button, View, Input, Item, Label } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { strings } from '../../services/i18n';

export default class ParentInfo  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            familyName: '',
            setMyHome: false,
            loading: true,
            uid: ''
        };
    }

    componentWillMount() {
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref('parents/').child(uid).once('family_name')
        .then((data)=>{
            console.log('Data = ', data);
            if (data._value)
                this.setState({uid, familyName:data._value.family_name, loading: false});
            else {
                this.setState({uid, familyName:'', loading: false});
            }
        });        
    }

    render() {
        return (
            <Container style={styles.container}>
                <Spinner
                    visible={this.state.loading}
                    textContent={strings('spinner_loading_information.value')}
                    textStyle={styles.spinnerTextStyle}
                />
                <ImageBackground source={Images.parent}  style={styles.image}></ImageBackground>
                <Item floatingLabel style={styles.label}>
                    <Label style={styles.labelText}>{strings('parent_family_name_placeholder_title.value')}</Label>
                    <Input autoCapitalize='none' autoCorrect={false} style={styles.input} value={this.state.familyName} onChangeText={(text) => {
                        this.setState({familyName: text});
                        firebase.database().ref('parents/').child(this.state.uid).update({family_name: text});
                    }}/>                
                </Item>
                <Button style={styles.button} onPress={this.setMyHome.bind(this)}><Text style={styles.text}>{strings('parent_set_home_button_title.value')}</Text></Button>
                <ImageBackground source={Images.children}  style={styles.imageTwo}></ImageBackground>
                <Button style={styles.buttonTwo} onPress={this.addMyChildren.bind(this)}><Text style={styles.text}>{strings('parent_add_children_button_title.value')}</Text></Button>
            </Container>
        )
    }

    addMyChildren() {
        let {familyName, uid} = this.state;
        if (!familyName) {
            alert(strings('alert_empty_familyname_text.value'));
            return;
        }
        this.props.navigation.navigate('ChildrenInfoStack', {uid});
    }

    setMyHome() {
        this.props.navigation.navigate('MapScreen', {setHome: true});
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.Red,
        alignItems: 'center',
    },
    image: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        marginTop: 0,
        marginBottom: 15
    },
    imageTwo: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        marginTop: 40,
        marginBottom: 15
    },
    label: {
        width: responsiveWidth(80),
    },
    labelText: {
        color: Colors.white,
    },
    view: {
        width: responsiveWidth(80),
    },
    button: {
        width: responsiveWidth(80),
        padding: 20,
        marginTop: 10,
        marginLeft: responsiveWidth(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.buttonColor,
    },
    buttonTwo: {
        width: responsiveWidth(80),
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: responsiveWidth(10),
    },
    text: {
        color: Colors.white,
        fontSize: FontSizes.medium,
    },
    input: {
        color: Colors.white,
    },
    spinnerTextStyle: {
        color: Colors.white,
        fontSize: FontSizes.medium,
    },
});