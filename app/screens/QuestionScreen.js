import "react-native-gesture-handler";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import GlobalStyles from "./../config/GlobalStyles";
import callGoogleVIsionApi from "../googleVisionApi/callGoogleVIsionApi";
import colours from "../config/colours";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";

export default function QuestionScreen({ route, navigation }) {
  const { name, id, score, currentQuestionIndex, isHost, lobbyId, playerCount } = route.params;

  const [hasPermission, setHasPermission] = useState(null); //Permission State for Camera usage
  const [type, setType] = useState(Camera.Constants.Type.back); //Camera State front and back camera
  const [correct, setCorrect] = useState(false); //Turn Camera on and off
  const [isPlaying, setIsPlaying] = useState(true); //Countdown State playing
  const [answer, setAnswer] = useState(null); //Checkmark/Cross on off
  const [complete, setComplete] = useState(false); //Coundown finish state
  const [currentObject, setCurrentObject] = useState(""); //Object Name
  const [totalQuestion, setTotalQuestion] = useState(0); // Total questions
  const [currentUserScore, setCurrentUserScore] = useState(score ? score : 0);
  const [time, setTime] = useState(0);
  const cam = useRef();
  const db = firebase.database();

  //start timer here
  let start = Date.now();
  let end;
  let g_results = [];
  const takePicture = async () => {
    if (cam.current) {
      const options = { quality: 1, base64: true, skipProcessing: false };
      let photo = await cam.current.takePictureAsync(options);
      const source = photo.base64;
      if (source) {
        callGoogleVIsionApi(source).then((data) => {
          const labels = data.responses[0].labelAnnotations;
          labels.forEach((label) => g_results.push(label.description));
          validatePicture();

          //console.log(g_results);
        });
      }
    }
  };

  const validatePicture = () => {
    let checker = false;
    g_results.map((obj) => {
      if (obj.toLowerCase().includes(currentObject.toLowerCase())) {
        console.log(obj + " " + currentObject);
        checker = true;
        setCorrect(true);
        end = Date.now();
        let newScore = currentUserScore + (Math.floor((end - start) / 1000) * 7);
        setCurrentUserScore(newScore);
      }
    });
    setAnswer(checker);
    //if answer true stop time
    //scoreLost = timeElapsed * 7
    //calcScore = score - scoreLost 
    // if (checker) {
    //   const updates = {};
    //   updates[`${lobbyId}/Question/${currentQuestionIndex}/submission`] = firebase.database.ServerValue.increment(1);

    //   db.ref().update(updates);
    // }

  };

  useEffect(() => {
    db.ref(`${lobbyId}/score/${id}`).set({
      name,
      score: currentUserScore
    });
  }, [currentUserScore]);

  const handleTimerComplete = () => {

    //Navigate to leaderboard
    navigation.push("LeaderBoardScreen", {
      currentQuestionIndex: currentQuestionIndex + 1,
      isHost,
      lobbyId,
      isGameComplete: currentQuestionIndex + 1 >= totalQuestion,
      playerCount,
      score: currentUserScore,
      id,
      name
    });
  };
  // useEffect(()=>{
  //   console.log(answer);
  // },[answer]);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    let dbRef = db.ref();

    //Get Data
    dbRef
      .child(`${lobbyId}/`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const { totalQuestion, Question } = snapshot.val();

          const { object } = Question[currentQuestionIndex];

          setCurrentObject(object);
          setTotalQuestion(totalQuestion);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.background}>
      <View style={styles.topbar}>
        <Text style={styles.subs}>
          {currentQuestionIndex + 1}/{totalQuestion}
        </Text>
        <View style={styles.timer}>
          <CountdownCircleTimer
            size={70}
            isPlaying={isPlaying}
            duration={20}
            colors={[
              ["#00FF00", 0.83],
              ["#FF8C00", 0.17],
            ]}
            onComplete={handleTimerComplete}
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text style={{ color: animatedColor, fontSize: 30 }}>
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>
      </View>

      <View style={styles.new_background}>
        <Text style={GlobalStyles.title}>Take a Picture of</Text>
        <Text style={styles.subs}>
          {currentObject}
          {"  "}
          {answer == true ? (
            <FontAwesome name="check" size={24} color="green" />
          ) : answer == false ? (
            <Entypo name="cross" size={24} color="purple" />
          ) : null}
        </Text>

        {!correct ? (
          <>
          <Camera
            ref={cam}
            style={{
              flex: 7,
              alignItems: "center",
              width: "80%",
              height: "80%",
              borderRadius: 50,
              flexDirection: "row",
            }}
            type={type}
          />
          <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Image source={require('../images/camera-icon.png')}/>
            {/* <Text style={styles.buttonText}>Take a picture</Text> */}
          </TouchableOpacity>
        </View>
          </>
        ) : null}
        
      </View>
      <View style={styles.score}>
        <Text style={styles.score_name}>{name}</Text>
        <Text style={styles.score_text}>{currentUserScore}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 50,
    paddingLeft: 10,
    paddingBottom: 20,
  },
  buttonText: {
    fontSize: 17,
    color: colours.white,
  },
  cameraview: {
    flexDirection: "column",
    flex: 2,
  },
  text: {
    fontSize: 18,
    color: colours.yellow,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "10%",
    marginTop: 15,
  },
  score: {
    justifyContent: "space-between",
    backgroundColor: colours.yellow,
    height: "7%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  score_text: {
    color: colours.black,
    fontSize:20,
    fontWeight:"bold",
    textAlign: "right",
    marginRight: 20,
    marginBottom: 8,
  },
  score_name: {
    color: colours.black,
    fontSize:20,
    fontWeight:"bold",
    textAlign: "left",
    marginLeft: 20,
    marginBottom: 8,
  },
  subs: {
    fontSize: 25,
    color: colours.white,
    margin: 3,
  },
  background: {
    backgroundColor: colours.red,
    flex: 1,
    borderWidth: 1,
    display: "flex",

    paddingTop: 50,
  },
  timer: {
    height: "7%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  new_background: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  check: {
    margin: 5,
  },
});
