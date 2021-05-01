import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Permissions from "expo-permissions";
import colours from "../config/colours";
import GlobalStyles from "../config/GlobalStyles";
import QuestionGenerator from './../QuestionGenerator/QuestionGenerator';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState(0);

  const onEnterPress = () => {
    navigation.navigate('Waiting');
  };
  const onHostPress = () => {
    // navigation.navigate('Lobby');
    // var database = firebase.database();
    // console.log('working');

    generateLobby();
    // database.ref('1234/score/').set({
    //   name: 'BOB',
    //   score: 10
    // });

  };

  const generateLobby = () => {
    //Genere Random Lobby ID
    let lobbyId = Math.floor(Math.random() * 97999) + 10000;

    //Check if it exists in DB
    let isValid = false;
    console.log(lobbyId);

    //If exist => Regenerate
    // do {
    //   lobbyId = Math.floor(Math.random() * 99999) + 10000;
    //   isValid = lobbyIdValidation(lobbyId);
    // } while (!isValid);

    const randomGeneratedQuestion = QuestionGenerator(5);
    //Else => Push it to DB
    const db = firebase.database();

    db.ref(`${lobbyId}/`).set({
      gameStarted: false,
      score: {

      },
      currentQuestion: 0,
      totalQuestion: 5,
      Question: randomGeneratedQuestion
    });
  };

  const lobbyIdValidation = (lobbyId) => {
    const dbRef = firebase.database().ref();

    dbRef.child(lobbyId).get().then((snapshot) => {
      if (snapshot.exists()) {
        return false;
      } else {
        return true;
      }
    }).catch((error) => {
      return false;
    });
  };

  //   const [hasPermission, setHasPermission] = useState(null);

  //   useEffect(() => {
  //     (async () => {
  //     //   const { status } = await Camera.requestPermissionsAsync();
  //     //   setHasPermission(status === "granted");
  //     })();
  //   }, []);

  //   if (hasPermission === null) {
  //     return <View />;
  //   }
  //   if (hasPermission === false) {
  //     return <Text>No access to camera</Text>;
  //   }
  return (
    <>
      <View
        style={{ backgroundColor: styles.background.backgroundColor }}
      ></View>
      <ImageBackground style={styles.background}>
        <View style={styles.logoContainer}>
          <Image source={require("../images/Title.png")} />
        </View>
        <View
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.textInput}
            placeholder="     Display Name     "
            onChangeText={(name) => {
              setName(name);
            }}
          />
        </View>
        <View
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.textInput}
            placeholder="   Scavenger Code   "
            autoCapitalize="characters"
            onChangeText={(code) => {
              setCode(code);
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={.9}
          style={styles.roomButton}
          onPress={() => onEnterPress()}>
          <Text style={styles.buttonText}>Enter Room</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Click to host a game.</Text>
        <TouchableOpacity
          activeOpacity={.9}
          style={styles.hostButton}
          onPress={() => onHostPress()}>
          <Text style={styles.buttonText}>Host Game</Text>
        </TouchableOpacity>

      </ImageBackground>

    </>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colours.red,
  },
  logoContainer: {
    padding: 10,
    justifyContent: "flex-start",
    marginTop: "57%",
  },
  inputContainer: {
    backgroundColor: colours.white,
    borderRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 70,
    marginTop: 20
  },
  textInput: {
    fontSize: 20
  },
  roomButton: {
    backgroundColor: colours.black,
    color: colours.white,
    borderRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 100,
    fontSize: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: colours.white,
  },
  text: {
    color: colours.white,
    marginTop: 75,
  },
  hostButton: {
    backgroundColor: colours.yellow,
    color: colours.white,
    borderRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 100,
    fontSize: 20,
    marginTop: 5,
  },
});
