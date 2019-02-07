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
import BackgroundGeolocation from "react-native-background-geolocation";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
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
                            <Label style={styles.label}>{strings('main_painc_mode_button_title.value')}</Label>
                        </TouchableOpacity> 
                    </View>                               
                </View>
            </View>
        )
    }

    onManualUpdate() {
        this.setState({visible: true});
    }

    onEmergency() {
        let {p_uid, my_uid} = this.state;
        console.log('Uids = ', p_uid + '/' +my_uid);
        firebase.database().ref('children/' + p_uid).child(my_uid).update({status: 'emergency'})
        .then((data)=>{
            console.log('Update', data);
        });
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
            if (data._value.location) {
                lat = data._value.location.lat;
                lon = data._value.location.lon;
            }
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
        BackgroundGeolocation.onLocation(this.onLocation.bind(this), this.onError);
        BackgroundGeolocation.ready({
            // Geolocation Config
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 10,
            // Activity Recognition
            stopTimeout: 1,
            // Application config
            debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
            logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
            stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
            startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
            // HTTP / SQLite config
            url: 'http://yourserver.com/locations',
            batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
            autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
            headers: {              // <-- Optional HTTP headers
              "X-FOO": "bar"
            },
            params: {               // <-- Optional HTTP params
              "auth_token": "maybe_your_server_authenticates_via_token_YES?"
            }
          }, (state) => {
            console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      
            if (!state.enabled) {
              ////
              // 3. Start tracking!
              //
              BackgroundGeolocation.start(function() {
                console.log("- Start success");
              });
            }
          });
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    onLocation(location) {
        let {latitude, longitude} = location.coords;
        let {p_uid, my_uid, pHome} = this.state;
        this.setState({
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            },
            x: {
                latitude: latitude,
                longitude: longitude,
            }});
        if ((latitude > pHome.latitude - 0.001) && (latitude < pHome.latitude + 0.001) && (longitude > pHome.longitude - 0.001) && (longitude < pHome.longitude + 0.001)) {
            firebase.database().ref('children/' + p_uid).child(my_uid).update({location:{lat: latitude, lon: longitude}, status: 'home'});
        } else {
            firebase.database().ref('children/' + p_uid).child(my_uid).update({location:{lat: latitude, lon: longitude}, status: 'away'});
        }
        firebase.database().ref('children/' + p_uid).child(my_uid).update({location:{lat: latitude, lon: longitude}});
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
        top: responsiveHeight(100) - responsiveWidth(60) - 170,
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