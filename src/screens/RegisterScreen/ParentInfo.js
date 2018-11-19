import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text
} from 'react-native';
import { Images, Colors, globalStyles } from '../../theme';
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { Container, Button, View, Input, Item, Label } from 'native-base';
import { strings } from '../../services/i18n';

export default class ParentInfo  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            familyName: '',
        };
    }

    render() {
        return (
            <Container style={globalStyles.container}>
                <ImageBackground source={Images.parent}  style={styles.image}></ImageBackground>
                <Item floatingLabel>
                    <Label style={styles.label}>{strings('parent_family_name_placeholder_title.value')}</Label>
                    <Input autoCapitalize='none' autoCorrect={false} style={styles.input} value={this.state.familyName} onChangeText={text=>this.setState({familyName: text})}/>                
                </Item>
                <Button style={styles.button} onPress={this.setMyHome.bind(this)}><Text style={styles.text}>{strings('parent_set_home_button_title.value')}</Text></Button>
                <ImageBackground source={Images.children}  style={styles.image}></ImageBackground>
                <Button style={styles.button2} onPress={this.addMyChildren.bind(this)}><Text style={styles.text}>{strings('parent_add_children_button_title.value')}</Text></Button>
            </Container>
        )
    }

    addMyChildren() {
        this.props.navigation.navigate('ChildInfoScreen');
    }

    setMyHome() {
        // this.props.navigation.navigate('MapScreen');
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
        color: Colors.white,
    },
    input: {
        color: Colors.white,
    },
});