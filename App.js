import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootNavigator } from "./src/navigation";
import AppLoading from "expo-app-loading";
import useFonts from "./assets/fonts";
import { initialWindowMetrics } from "react-native-safe-area-context";
import persistence from "./Storage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as Network from "expo-network";
const { store, persistor } = persistence();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: null,
      fonts: false,
    };
  }

  async componentDidMount() {
    this.loadFonts();
    await this.getStoragePermission();
  }

  async loadFonts() {
    const fonts = await useFonts();
    this.setState({
      fonts: true,
    });
  }

  async getStoragePermission() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      await this.getStoragePermission();
    } else {
      await this.getLocationPermission();
    }
  }

  async getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      await this.getLocationPermission();
    }
  }

  render() {
    if (this.state.fonts) {
      return (
        <Provider initialMetrics={initialWindowMetrics} store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
