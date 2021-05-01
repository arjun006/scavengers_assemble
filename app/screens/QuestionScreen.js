import "react-native-gesture-handler";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Camera } from "expo-camera";

export default function QuestionScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cam = useRef();

  const takePicture = async () => {
    if (cam.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: false };
      let photo = await cam.current.takePictureAsync(options);
      const source = photo.uri;
      if (source) {
        cam.current.resumePreview();
        console.log(source);
      }
    }
  };
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
    <View style={styles.container}>
      <Camera ref={cam} style={{ flex: 1, alignItems: "center" }} type={type}>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={takePicture}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Button title="Take a picture" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  cameraview: {
    flexDirection: "column",
    flex: 2,
  },
  text: {
    fontSize: 18,
    color: "yellow",
  },
});
