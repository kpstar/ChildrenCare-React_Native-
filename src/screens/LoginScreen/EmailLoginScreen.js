import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  AsyncStorage,
} from 'react-native';
import { Images, Colors, globalStyles, FontSizes} from '../../theme';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { Container, Button, View, Item, Label, Input, Spinner } from 'native-base';
import { strings } from '../../services/i18n';
import firebase from 'react-native-firebase';
import { Banner } from '../../components/Ads';
import BackButton from '../../components/BackButton';

export default class EmailLogin extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false,
            uid: '',
        }
    }

    componentDidMount() {
        
    }

    render() {
        const {navigation} = this.props;
        const loginStatus = navigation.getParam('loginStatus', false);
        return (
            <Container style={globalStyles.container}>
                <BackButton onPress={()=>this.props.navigation.goBack()}/>
                <Container style={styles.innerBox}>
                    <ImageBackground source={Images.background}  style={styles.imageBk} ></ImageBackground>
                    <Image style={styles.image}
                        source={Images.parent}>
                    </Image>
                    {   loginStatus ?
                        <View style={styles.view}>
                            <Item floatingLabel>
                                <Label style={styles.label}>{strings('login_text_email_placeholder.value')}</Label>
                                <Input keyboardType="email-address" autoCapitalize='none' style={styles.input} autoCorrect={false} value={this.state.email} onChangeText={text=>this.setState({email: text})}/>
                            </Item>
                            <Item floatingLabel style={globalStyles.marginTop}>
                                <Label style={styles.label}>{strings('login_text_password_placeholder.value')}</Label>
                                <Input secureTextEntry={true} style={styles.input} value={this.state.password} onChangeText={text=>this.setState({password: text})} onSubmitEditing={this.onLogin.bind(this)}/>
                            </Item>
                            {this.renderButtonOrSpinner()}                           
                        </View>
                        :
                        <View style={styles.view}>
                            <Item floatingLabel>
                                <Label style={styles.label}>{strings('login_text_email_placeholder.value')}</Label>
                                <Input keyboardType="email-address" autoCapitalize='none' autoCorrect={false} style={styles.input} value={this.state.email} onChangeText={text=>this.setState({email: text})}/>
                            </Item>
                            <Item floatingLabel style={globalStyles.marginTop}>
                                <Label style={styles.label}>{strings('login_text_password_placeholder.value')}</Label>
                                <Input secureTextEntry={true} style={styles.input} value={this.state.password} onChangeText={text=>this.setState({password: text})} onSubmitEditing={this.onSignup.bind(this)}/>
                            </Item>
                            {this.renderButtonOrSpinner()}
                        </View> }
                </Container>
                <Banner />
            </Container>
        )
    }

    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <Spinner color={Colors.White} style={styles.spinner} />;    
        }
        if (this.props.navigation.getParam('loginStatus', false)) {
            return <Button block onPress={this.onLogin.bind(this)} style={styles.button}><Text style={styles.text}>{strings('email_login_button_title.value')}</Text></Button>;
        } else {
            return <Button block onPress={this.onSignup.bind(this)} style={styles.button}><Text style={styles.text}>{strings('email_signup_button_title.value')}</Text></Button>;
        }        
    }

    onLogin() {
        this.setState({ error: '', loading: true, });
        const {email, password} =  this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((credential) => {
                this.setState({ error: '', loading: false });
                let token = AsyncStorage.getItem('device_token')
                .then(token=>{
                    let uid = firebase.auth().currentUser.uid;
                    firebase.database().ref('parents/').child(uid).update({device_token: token})
                    .then((data)=>{
                        console.log('Update', data);
                    });
                });
                this.props.navigation.navigate("ParentInfoScreen");
            })
            .catch((error) => {
                this.setState({error: error, loading: false});
                alert(error);
            });
    }

    onSignup() {
        let ref = firebase.database().ref('parents/');
        this.setState({ error: '', loading: true, });
        const {email, password} =  this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((credential) => {
                let token = AsyncStorage.getItem('device_token')
                .then(token=>{
                    let uid = firebase.auth().currentUser.uid;
                    this.setState({ error: '', loading: false });
                    ref.child(uid).set({device_token: token, family_name: '', location: {lat:0, lon:0}, email, phone: ''});
                    this.props.navigation.navigate("PhoneLoginScreen");
                });
            })
            .catch((error) => {
                alert(error);
                this.setState({error: error, loading: false});
            });
    }
}

const styles = StyleSheet.create({
    innerBox: {
        marginTop: 0,
        alignItems: 'center',
    },
    image: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        marginTop: responsiveHeight(10),
        marginBottom: responsiveHeight(5),
    },
    label: {
        color: Colors.white,
    },
    view: {
        width: responsiveWidth(80),
    },
    spinner: {
        justifyContent: 'center',
    },
    button: {
        padding: 20,
        marginTop: 20,
        backgroundColor: Colors.buttonColor,
    },
    buttonTwo: {
        marginTop: 10,
        marginLeft: 5,
    },
    text: {
        color: Colors.white,
        fontSize: FontSizes.medium,
    },
    input: {
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