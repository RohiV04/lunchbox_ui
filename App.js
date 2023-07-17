import React from 'react';
import { StatusBar, Platform } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store'; // Import the Redux store
import Navigation from './Navigation.js';
import Login from './Login';
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Navigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

