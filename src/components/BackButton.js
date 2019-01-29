import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { View } from 'native-base';
import { Images, Colors, globalStyles, FontSizes} from '../theme';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default (props) => (
    <View style={styles.view}>
        <TouchableOpacity style={styles.touchableView} onPress={props.onPress} >
            <Image
                source={ Images.backBtn }
                style={ styles.backBtn }></Image>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
  view: {
      height: 60,
      backgroundColor: Colors.alphaWhite,
      width: responsiveWidth(100)
  },
  touchableView: {
    height: 25,
    width: 30,
  },
  backBtn: {
    marginLeft: 15,
    marginTop: 25,
    height: 25,
    width: 30,
  }
});
