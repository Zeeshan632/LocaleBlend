import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import React, {useState} from 'react'
import Routes from './src/routes/Routes'
import images from './src/assets/images';
import "./ignoreWarnings";
import Toast from 'react-native-toast-message'

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import {persistor} from './src/redux/store';


const App = () => {
  const [showGif, setShowGif] = useState(true)
  
  setTimeout(() => {
    setShowGif(false)
  }, 1000)

  if(showGif){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={images.logoSm}  />
      </View>
    )
  }
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor="white" barStyle='dark-content' />
          <Routes />
          <Toast />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})