/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useEffect } from 'react';
import { Provider } from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from 'react-native';

import { store, persistor } from './src/Redux/Store';

import { DrawerStack } from './src/Navigation/RootNavigator';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ThemeProvider, useTheme } from './src/Utilities/ThemeContext';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  const { colors, isDark } = useTheme();

  console.log('isdark', colors);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <AppearanceProvider>
          <ThemeProvider>
            <StatusBar translucent animated barStyle={isDark ? "dark-content" : "light-content"} />
            <DrawerStack />
          </ThemeProvider>
        </AppearanceProvider>
      </PersistGate>
    </Provider>
  );
};


