import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Fonts from 'expo-font';
import {AppLoading} from 'expo';
import MealNavigator from './Navigation/MealNavigator';
import {enableScreens} from 'react-native-screens'; // Method for screen optimization
import {createStore, combineReducers} from 'redux';
import MealsReducer from './store/reducers/Meals'
import {Provider} from 'react-redux'


enableScreens(); // It runs before main App loads for optimization

const rootReducer = combineReducers({
  meals:MealsReducer
})

const store = createStore(rootReducer)


const fetchFonts =  () => {
  return Fonts.loadAsync({
    'opan-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'opan-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
 
  const [fontLoaded, setFontLoaded] = useState(false);

  if( !fontLoaded ){
    return (
      <AppLoading
        startAsync = {fetchFonts}
        onFinish = {() => setFontLoaded(true)}
      
      />
    )
  }
 
 
  return <Provider store = {store}><MealNavigator/></Provider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
