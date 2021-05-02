import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import GlobalStyles from './../config/GlobalStyles';
import colours from '../config/colours';
import { color } from "react-native-reanimated";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from "firebase";

export default function LeaderBoardScreen({ route, navigation }) {
  const { lobbyId, isHost, isGameComplete, currentQuestionIndex } = route.params;
  const db = firebase.database();

  const scores = [
    ['John', 234],
    ['Sarah', 234],
    ['Mary', 234],
    ['Austin', 234],
  ];

  useEffect(() => {
    if (!isHost) {
      var debRef = db.ref(`${lobbyId}/currentQuestion`);

      debRef.on('value', (snapshot) => {
        const dbValue = snapshot.val();

        navigation.navigate('Question', {
          lobbyId,
          isHost,
          currentQuestionIndex: dbValue
        });
      });
    }
  }, []);

  const handleNextQuestion = () => {
    if (isGameComplete) {
      const dbRef = firebase.database().ref(`${lobbyId}`);
      dbRef.remove();
      navigation.navigate('Home');
    }
    else {

      //Increment database questionIndexCount
      let dbRef = db.ref(`${lobbyId}/`);

      //Increment questionIndex
      dbRef.update({
        currentQuestion: currentQuestionIndex
      });

      navigation.navigate('HostQuestion', { lobbyId, isHost, isGameComplete, currentQuestionIndex });
    }

  };

  return (
    <View style={GlobalStyles.background}>
      <Text style={GlobalStyles.title}>Leaderboard</Text>

      <View style={LBoardStyles.leaderboardContainer}>
        {
          scores.map((score, index) => (
            <View style={LBoardStyles.playerScoreContainer} key={index}>
              <Text style={GlobalStyles.nameList}>{score[0]}</Text>
              <Text style={GlobalStyles.nameList}>{score[1]}</Text>
            </View>
          ))
        }
      </View>

      {!isHost ?
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
      }
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
  }
});