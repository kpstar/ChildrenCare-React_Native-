import {
    StyleSheet,
} from 'react-native';
import { Images, Colors } from '../theme';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        color: Colors.white,
    },
    header: {
        alignSelf: 'stretch',        
        height: 40,
        marginTop: 20,
        width: responsiveWidth(100),
        justifyContent: 'center',
    },
    backBtn: {
        marginLeft: 15,
        height: 25,
        width: 30,
    },
    marginTop: {
        marginTop: 10,
    }
});