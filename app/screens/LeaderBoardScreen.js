import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Animated } from "react-native";
import GlobalStyles from './../config/GlobalStyles';
import colours from '../config/colours';
import { color } from "react-native-reanimated";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import * as firebase from "firebase";

export default function LeaderBoardScreen({ route, navigation }) {

  const [scoreBoard, setScoreBoard] = useState([]);

  const { lobbyId, isHost, isGameComplete, currentQuestionIndex } = route.params;
  const db = firebase.database();

  useEffect(() => {
    //Get player score
    let dbRef = db.ref();

    //Get Data
    dbRef.child(`/${lobbyId}/score`).get().then((snapshot) => {

      let unorderedScore = {};
      let orderedScore = [];

      if (snapshot.exists()) {
        const players = snapshot.val();

        for (userId in players) {
          const { name, score } = players[userId];
          unorderedScore[score] = name;
        }

        let keys = Object.keys(unorderedScore);
        keys.sort(function (a, b) { return a - b; });

        keys.forEach(key => {
          orderedScore.push([unorderedScore[key], key]);
        });

        setScoreBoard(orderedScore);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const scores = [
    ['John', 234],
    ['Sarah', 234],
    ['Mary', 234],
    ['Austin', 234],
  ];

  const onTimerComplete = () => {
    if (isGameComplete) {
      const dbRef = firebase.database().ref(`${lobbyId}`);
      dbRef.remove();
      navigation.navigate('Home');
    }
    else {

      if (isHost) {
        navigation.push('HostQuestion', { lobbyId, isHost, isGameComplete, currentQuestionIndex });
      }
      else {
        navigation.push('Question', {
          lobbyId,
          currentQuestionIndex,
          isHost,
          isGameComplete
        });
      }
    }
  };

  return (
    <View style={GlobalStyles.background}>
      <View style={LBoardStyles.timer}>
        <CountdownCircleTimer
          size={70}
          isPlaying={true}
          duration={5}
          colors={[
            ["#00FF00", 0.83],
            ["#FF8C00", 0.17],
          ]}
          onComplete={onTimerComplete}
        >
          {({ remainingTime, animatedColor }) => (
            <Animated.Text style={{ color: animatedColor, fontSize: 30 }}>
              {remainingTime}
            </Animated.Text>
          )}
        </CountdownCircleTimer>
      </View>

      <Text style={GlobalStyles.title}>Leaderboard</Text>

      <View style={LBoardStyles.leaderboardContainer}>
        {
          scoreBoard.map((score, index) => (
            <View style={LBoardStyles.playerScoreContainer} key={index}>
              <Text style={GlobalStyles.nameList}>{score[0]}</Text>
              <Text style={GlobalStyles.nameList}>{score[1]}</Text>
            </View>
          ))
        }
      </View>

      {/* {!isHost ?
        <View>
          <Text style={LBoardStyles.title}>Waiting for host to start next hunt </Text>
          <ActivityIndicator size="large" color={colours.black} style={LBoardStyles.loader} />
        </View>
        :
        <View>
          <TouchableOpacity
            activeOpacity={.9}
            style={GlobalStyles.buttonBlack}
            onPress={handleNextQuestion}>
            <Text style={GlobalStyles.whiteText}>
              {isGameComplete ? 'Complete Game' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      } */}
    </View>
  );
}
const LBoardStyles = StyleSheet.create({
  nameContainer: {
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: "wrap",
    paddingRight: 250,
    marginBottom: 100
  },
  leaderboardContainer: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 25,
    paddingBottom: 100
  },
  playerScoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  title: {
    fontSize: 20,
    color: colours.yellow
  },
  loader: {
    marginTop: 50
  },
  timer: {
    height: "7%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
});