import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CreateGameScreen,
  HomeScreen,
  LeaderBoardScreen,
  QuestionScreen,
} from "./app/screens";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" />
        <Stack.Screen name="CreateGameScreen" component={LoginScreen} />
        <Stack.Screen name="LeaderBoardScreen" component={RegistrationScreen} />
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
