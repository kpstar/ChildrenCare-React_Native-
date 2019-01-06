import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View
} from 'react-native';
import { strings } from '../../services/i18n';
import { Images, Colors, FontSizes } from '../../theme';
import { Container, Text } from 'native-base';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import colors from '../../theme/colors';

export default class Emergency extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <View>
                    <TouchableOpacity onPress={ () => this.onPress('ParentLoginScreen')}>
                        <Text />
                    </TouchableOpacity>
                </View>
                <View>
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
        backgroundColor: colors.alphaRed,
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
    }
});