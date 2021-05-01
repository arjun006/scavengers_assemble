import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import GlobalStyles from './../config/GlobalStyles';
import colours from '../config/colours';
import { color } from "react-native-reanimated";

export default function LeaderBoardScreen() {
  const score = [
    ['John', 234],
    ['Sarah', 234],
    ['Mary', 234],
    ['Austin', 234],
]
  return (
    <View style={GlobalStyles.background}>
        <Text style={GlobalStyles.title}>Leaderboard</Text>
        <View style={LBoardStyles.scoreContainer}>
                {
                    score.map((pScore, index) => (
                      <View>
                        <Text style={LBoardStyles.pScore}>{pScore[0] + "                      " + pScore[1]}</Text>
                      </View>
                    ))
                }
          </View>
        <Text style={LBoardStyles.title}>Waiting for host to start next hunt</Text>

    </View>
  );
}
const LBoardStyles = StyleSheet.create({
  scoreContainer: {
      marginTop: 30,
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexWrap: "wrap",
      marginBottom: 100
  },
  pScore: {
      borderRadius: 50,
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: 20,
      paddingLeft: 0,
      color: colours.white
  },
  title: {
    fontSize: 20,
    color: colours.yellow
  }
});
