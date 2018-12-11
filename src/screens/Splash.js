import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground
} from 'react-native';
import { Images } from '../theme';
import firebase from 'react-native-firebase';
import { Container } from 'native-base';

export default class Splash extends Component {

    componentDidMount() {
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    firebase.messaging().getToken().then(token => {
                        console.log("LOG: ", token);
                    })
                // user has permissions
                } else {
                    firebase.messaging().requestPermission()
                        .then(() => {
                            console.log('Success');
                        })
                        .catch(error => {
                            console.log(error)
                        });
            }
        });
        setTimeout(()=>{
            this.props.navigation.navigate('LogInScreen');
        }, 200)
    }

    render() {
        return (
            <Container style={styles.container}>
                <ImageBackground source={Images.spalshBk}  style={styles.image} ></ImageBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    image: {
        flex: 1
    },
});