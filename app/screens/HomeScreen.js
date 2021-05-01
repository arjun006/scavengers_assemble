import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import * as Permissions from "expo-permissions";
import colours from "../config/colours";
import { TextInput } from "react-native-gesture-handler";

export default function HomeScreen() {
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
            placeholder='     Display Name     '
          />
        </View>
        <View
        style={styles.inputContainer}
        >
          <TextInput 
            style={styles.textInput}
            placeholder='   Scavenger Code   '
          />
        </View>
        <View
      style={styles.buttonContainer}
      >
          <Button
            title="Enter Room"
          />
      </View>
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 70,
    marginTop: 20   
  },
  textInput: {
      fontSize: 20
  },
  buttonContainer: {
    justifyContent: "flex-start"
    
  },
  button: {

  }
});
