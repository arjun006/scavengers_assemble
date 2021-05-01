import "react-native-gesture-handler";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { Camera } from "expo-camera";

export default function QuestionScreen() {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef();
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("picture source", source);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Timer</Text>
        <Text>Take a picture of</Text>
        <Text>Towel</Text>
        <Camera
          type={Camera.Constants.Type.front}
          onCameraReady={onCameraReady}
        >
          <TouchableOpacity>
            <Button
              title="Capture"
              disabled={!isCameraReady}
              onPress={takePicture}
            />
          </TouchableOpacity>
        </Camera>
        <Button title="Take a picture" onPress={onCameraReady} />
      </View>
      <View style={styles.bottom}>
        <Text>Footer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 1,
  },
});
