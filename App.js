/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  state = {
    position: null
  };
  async componentDidMount() {
    let hasLocationPermission = false;

    if (Platform.OS === 'android') {
      try {
        let grantedFine = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (!grantedFine) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          grantedFine = granted === PermissionsAndroid.RESULTS.GRANTED;
        }

        let grantedCoarse = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        );
        if (!grantedCoarse) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
          );
          grantedCoarse = granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        // log(`Permissions fine=${grantedFine} coarse=${grantedCoarse}`);
        hasLocationPermission = grantedFine || grantedCoarse;
      } catch (err) {
        // log('ERROR', err);
      }
    } else {
      // ios
      hasLocationPermission = true;
    }



    // Instead of navigator.geolocation, just use Geolocation.
    if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
      position => {
        console.warn(position);
        this.setState({position});
      },
      error => {
        // See error code charts below.
        console.warn(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>POSITION:{JSON.stringify(this.state.position)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
