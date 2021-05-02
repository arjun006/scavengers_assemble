import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import LobbyScreen from "./app/screens/LobbyScreen";
import LeaderBoardScreen from "./app/screens/LeaderBoardScreen";
import WaitingScreen from "./app/screens/WaitingScreen";
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

import * as firebase from "firebase";
import QuestionScreen from "./app/screens/QuestionScreen";

const firebaseConfig = {
  apiKey: "AIzaSyCRTgDvOp21bQ3F4aY4QPdSjkFarshOSxY",
  authDomain: "scavengers-assemble.firebaseapp.com",
  databaseURL: "https://scavengers-assemble-default-rtdb.firebaseio.com",
  projectId: "scavengers-assemble",
  storageBucket: "scavengers-assemble.appspot.com",
  messagingSenderId: "91227724299",
  appId: "1:91227724299:web:1adf1aba8f1449fbacc50e",
  measurementId: "G-L8PH7QJ331",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#0000" },
        }}
      >
        
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LeaderBoardScreen" component={LeaderBoardScreen} />
        <Stack.Screen name="Lobby" component={LobbyScreen} />
        <Stack.Screen name="Waiting" component={WaitingScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
