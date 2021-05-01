import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground, Image, Button } from "react-native";
import colours from '../config/colours';

export default function HomeScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === "granted");
        })();
      }, []);
    
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
  return (
    <>
    <View style={{backgroundColor: styles.background.backgroundColor}}>
    </View>
    <ImageBackground style={styles.background}>
    <View style={styles.logoContainer}>
        <Image
        
        source={require('../assets/Title.png')}/>
    </View>
    <View>
        <Button

        />
    </View>
    </ImageBackground>
    </>

  );
 

}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems:'center',
        backgroundColor: colours.red
    },
    logoContainer: {
        padding: 10,
        justifyContent: "flex-start",
        marginTop: '55%'

    }
})
