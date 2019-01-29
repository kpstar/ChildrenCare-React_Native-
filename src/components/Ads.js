/**
 * @providesModule @ads
 */

import React from 'react';
import { Platform } from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
} from 'react-native-admob';

const ads = Platform.select({
  android: {
    banner: 'ca-app-pub-3350101969936788/7847312035',
    inter: 'ca-app-pub-3350101969936788/2944794558',
    type: 'smartBanner',
  },
  ios: {
    banner: 'ca-app-pub-3350101969936788/1301073223',
    inter: 'ca-app-pub-3350101969936788/2323398909',
    type: 'smartBanner',
  },
});
export const InterShow = () => {
  // Display an interstitial
  AdMobInterstitial.setAdUnitID(ads.inter);
  AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
};
export const Banner = () => (
  <AdMobBanner
    adSize={ads.type}
    adUnitID={ads.banner}
    testDevices={[AdMobBanner.simulatorId]}
    // onAdFailedToLoad={error => console.error(error)}
  />
);
