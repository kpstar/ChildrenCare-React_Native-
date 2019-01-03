import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AppRegistry
  } from 'react-native';
import firebase from 'react-native-firebase';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

export default class ChildMapScreen extends Component {

    render() {
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
                <Marker
                    title='Me'
                    coordinate={this.state.x}>
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