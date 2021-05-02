import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Alert,
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
  const db = firebase.database();

  const onEnterPress = () => {

    if (name && code > 0) {
      console.log(code);
      const dbRef = db.ref();

      dbRef.child(code).get().then((snapshot) => {
        if (snapshot.exists()) {
          addUserToLobby(name, code);
          navigation.navigate('Waiting',
            {
              lobbyId: code,
              name
            });
        } else {
          showErrorMessage();

        }
      }).catch((error) => {
        console.log(error);
        showErrorMessage();
      });

    }

  };

  const addUserToLobby = (name, lobbyId) => {
    //If score node exist
    db.ref(`${lobbyId}/score`).push({
      name,
      score: 0
    });

  };

  const showErrorMessage = () => {
    Alert.alert(
      "Alert Title",
      "Invalid Lobby Code",
      [
        { text: "OK" }
      ]
    );

  };
  const onHostPress = () => {
    // var database = firebase.database();
    // console.log('working');

    const lobbyId = generateLobby();

    navigation.navigate('Lobby', {
      lobbyId
    });

    // database.ref('1234/score/').set({
    //   name: 'BOB',
    //   score: 10
    // });

  };

  const generateLobby = () => {
    //Genere Random Lobby ID
    let lobbyId = Math.floor(Math.random() * 97999) + 10000;

    const randomGeneratedQuestion = QuestionGenerator(5);
    //Else => Push it to DB

    db.ref(`${lobbyId}/`).set({
      gameStarted: false,
      score: {

      },
      currentQuestion: 0,
      totalQuestion: 5,
      Question: randomGeneratedQuestion
    });

    return lobbyId;
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});
