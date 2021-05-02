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

  const { lobbyId, name, id, score, isHost, isGameComplete, currentQuestionIndex, playerCount } = route.params;
  const db = firebase.database();

  useEffect(() => {
    //Get player score
    let dbRef = db.ref();

    //Get Data
    dbRef.child(`/${lobbyId}/score`).get().then((snapshot) => {

      let scores = [];

      if (snapshot.exists()) {
        const players = snapshot.val();

        for (let userId in players) {
          const { name, score } = players[userId];
          scores.push([name, 0]);
        }

        scores.sort(function (a, b) { return b[1] - a[1]; });


        setScoreBoard(scores);
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
        navigation.push('HostQuestion', { lobbyId, isHost, isGameComplete, currentQuestionIndex, playerCount });
      }
      else {
        navigation.push('Question', {
          lobbyId,
          currentQuestionIndex,
          isHost,
          isGameComplete,
          playerCount,
          score,
          id,
          name
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
          duration={10}
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

      {
        isGameComplete ? <Text style={GlobalStyles.subtitle}>Game Over</Text> : null
      }

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