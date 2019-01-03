import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AppRegistry
  } from 'react-native';
import firebase from 'react-native-firebase';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import images from '../../theme/images';

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

export default class MapScreen extends Component {

    render() {
        let {navigation} = this.props;
        let uid = firebase.auth().currentUser.uid;
        
        let canDraggable = navigation.getParam('setHome', false);
        return (
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
                <Marker draggable={canDraggable}
                    coordinate={this.state.x}
                    image={images.home}
                    onDragEnd={(e) => {
                        this.setState({ x: e.nativeEvent.coordinate });
                        firebase.database().ref('parents/').child(uid).update({location:{lat: this.state.x.latitude, lon: this.state.x.longitude}});
                    }} >
                </Marker>
            </MapView>
        )
    }    
    constructor(props) {
        super(props);
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
        };
    }

    componentDidMount() {
        let uid = firebase.auth().currentUser.uid;
        let lat = 0, lon = 0;
        // firebase.database().ref('parents/').child(uid).once
        firebase.database().ref('parents/').child(uid).once('location')
        .then((data)=>{
            console.log('Family Name = ', data._value.location);
            lat = data._value.location.lat;
            lon = data._value.location.lon;
            if (lat == 0 && lon == 0) {
                getCurrentLocation().then(position => {
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
            } else {
                console.log(lat, lon);
                this.setState({
                    region: {
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003,
                    },
                    x: {
                        latitude: lat,
                        longitude: lon,
                    },
                });
            }
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
});