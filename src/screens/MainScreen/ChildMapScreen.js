import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    AppRegistry
  } from 'react-native';
import firebase from 'react-native-firebase';
import { Label } from 'native-base';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { Colors, Images, FontSizes } from '../../theme';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { strings } from '../../services/i18n';
import store from '../../Store'

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

export default class ChildMapScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.container}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onRegionChange={() => this.onRegionChange.bind(this)}
                    region={this.state.region}>     
                    <Marker
                        style={this.state.visible?styles.empty:styles.none}
                        title='Me'
                        coordinate={this.state.x}>
                        <Image source={Images.location} style={this.state.visible?styles.location:styles.none} />
                    </Marker>
                    <Marker title='Home'
                        coordinate={this.state.pHome}>
                        <Image source={Images.home} style={this.state.visible?styles.imageHome:styles.none} />
                    </Marker>
                </MapView>
                <View style={this.state.visible? styles.none:styles.emergency}>
                    <View>
                        <TouchableOpacity style={styles.touchOne} onPress={ () => this.onManualUpdate()}>
                            <Label style={styles.label}>{strings('main_manually_update_button_title.value')}</Label>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.touchTwo} onPress={ () => this.onEmergency()}>
                            <Label style={styles.label}>{strings('main_painc_mode_title.value')}</Label>
                        </TouchableOpacity> 
                    </View>                               
                </View>
            </View>
        )
    }

    onManualUpdate() {
        const message = new firebase.messaging.RemoteMessage()
            .setMessageId('unique id')
            .setTo('senderId@gcm.googleapis.com')
            .setData({
                key1: 'value1',
                key2: 'value2',
            });
        // Send the message
        firebase.messaging().sendMessage(message);
        this.setState({visible: true});
    }

    onEmergency() {
        
        this.setState({visible: true});
    }

    constructor(props) {
        super(props);
        store.childMapScreen = this;
        this.state = {
          region: {
            latitude: 39.7392,
            longitude: -104.9903,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          x: {
            latitude: 39.7392,
            longitude: -104.9903,
          },
          pHome: {
            latitude: 39.7392,
            longitude: -104.9903,
          },
          p_uid: '',
          my_uid: '',
          visible: true,
        };
    }

    onChangeVisible(visible){
        this.setState({
            visible
        })
    }

    componentDidMount() {
        let lat = 0, lon = 0;
        let {navigation} = this.props;
        let p_uid = navigation.getParam('p_uid');

        let my_uid = navigation.getParam('my_uid');
        this.setState({p_uid, my_uid});
        firebase.database().ref('parents/').child(p_uid).once('location')
        .then((data)=>{
            lat = data._value.location.lat;
            lon = data._value.location.lon;
            this.setState({
                region: {
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                },
                pHome: {
                    latitude: lat,
                    longitude: lon,
                },
            });
            return getCurrentLocation().then(position => {
                if (position) {
                    this.setState({
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.003,
                        },
                        x: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                    });
                }
            });
        });
    }
    onRegionChange(region) {
        this.setState({ region });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emergency: {
        position: 'absolute',
        flex: 1,
        left: 0,
        top: 0,
        backgroundColor: Colors.alphaRed,
        height: responsiveHeight(100),
        width: responsiveWidth(100)
    },
    empty: {
    },
    touchOne: {
        position: 'absolute',
        left: responsiveWidth(20),
        top: 50,
        width: responsiveWidth(60),
        height: responsiveWidth(60),
        borderRadius: responsiveWidth(30),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Brown,
    },
    touchTwo: {
        position: 'absolute',
        left: responsiveWidth(20),
        width: responsiveWidth(60),
        height: responsiveWidth(60),
        borderRadius: responsiveWidth(30),
        top: responsiveHeight(100) - responsiveWidth(60) - 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.pureRed,
    },
    label: {
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        color: Colors.white,

        fontSize: FontSizes.mediumLarge,
    },
    location: {
        width: 80,
        height: 80,
    },
    imageHome: {
        width: 50,
        height: 58,
    },
    none: {
        height: 0,
    },
});