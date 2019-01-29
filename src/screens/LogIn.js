import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  View
} from 'react-native';
import { strings } from '../services/i18n';
import { Images, Colors, FontSizes } from '../theme';
import { Container, Text } from 'native-base';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

export default class LogIn extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <ImageBackground source={Images.background}  style={styles.image} ></ImageBackground>
                <View>
                    <Text style={styles.text}>{ strings('login_parent_title.value') }</Text>
                    <TouchableOpacity onPress={ () => this.onPress('ParentLoginScreen')}>
                        <Image
                            style={styles.button}
                            source={Images.parent}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.text}>{ strings('login_children_title.value') }</Text>
                    <TouchableOpacity onPress={ () => this.onPress('ChildrenLoginScreen')}>
                        <Image
                            style={styles.button}
                            source={Images.children}
                        />
                    </TouchableOpacity> 
                </View>                               
            </Container>
        )
    }

    onPress = (option) => {
        this.props.navigation.navigate(option);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Colors.Red,
    },
    text: {
        color: Colors.white,
        textAlign: 'center',
        margin: 20,
        fontSize: FontSizes.mediumLarge
    },
    button: {
        alignItems: 'center',
        width: responsiveWidth(50),
        height: responsiveWidth(50),
    },
    image: {
        position: 'absolute',
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        left: 0,
        top: 0
    },
});