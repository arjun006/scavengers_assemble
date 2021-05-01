import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, LoadingScreen, LobbyScreen, LeaderBoardScreen } from './app/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRTgDvOp21bQ3F4aY4QPdSjkFarshOSxY",
  authDomain: "scavengers-assemble.firebaseapp.com",
  databaseURL: "https://scavengers-assemble-default-rtdb.firebaseio.com",
  projectId: "scavengers-assemble",
  storageBucket: "scavengers-assemble.appspot.com",
  messagingSenderId: "91227724299",
  appId: "1:91227724299:web:1adf1aba8f1449fbacc50e",
  measurementId: "G-L8PH7QJ331"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}