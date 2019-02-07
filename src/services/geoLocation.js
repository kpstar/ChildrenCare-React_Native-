import BackgroundGeolocation from "react-native-background-geolocation";
import {Component} from 'react';

export default class GeoLocation extends Component {
    componentWillMount() {
      ////
      // 1.  Wire up event-listeners
      //
  
      // This handler fires whenever bgGeo receives a location update.
      BackgroundGeolocation.onLocation(this.onLocation, this.onError);
  
      // This handler fires when movement states changes (stationary->moving; moving->stationary)
      BackgroundGeolocation.onMotionChange(this.onMotionChange);
  
      // This event fires when a change in motion activity is detected
      BackgroundGeolocation.onActivityChange(this.onActivityChange);
  
      // This event fires when the user toggles location-services authorization
      BackgroundGeolocation.onProviderChange(this.onProviderChange);
  
      ////
      // 2.  Execute #ready method (required)
      //
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
  
    // You must remove listeners when your component unmounts
    componentWillUnmount() {
      BackgroundGeolocation.removeListeners();
    }
    onLocation(location) {
      console.log('[location] -', location);
    }
    onError(error) {
      console.warn('[location] ERROR -', error);
    }
    onActivityChange(event) {
      console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'
    }
    onProviderChange(provider) {
      console.log('[providerchange] -', provider.enabled, provider.status);
    }
    onMotionChange(event) {
      console.log('[motionchange] -', event.isMoving, event.location);
    }
}