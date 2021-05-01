import "react-native-gesture-handler";
import React, { useState } from "react";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import GlobalStyles from './../config/GlobalStyles';
import colours from '../config/colours';
import { color } from "react-native-reanimated";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LeaderBoardScreen() {
  const [isHost] = useState(false);
  const score = [
    ['John', 234],
    ['Sarah', 234],
    ['Mary', 234],
    ['Austin', 234],
]
  return (
    <View style={GlobalStyles.background}>
        <Text style={GlobalStyles.title}>Leaderboard</Text>
        <View style={LBoardStyles.nameContainer}>
                {
                    score.map((pScore, index) => (
                      <View>
                        <Text style={LBoardStyles.pScore}>{pScore[0]}</Text>
                      </View>
                    ))
                }
          </View>
          <View style={LBoardStyles.scoreContainer}>
                {
                    score.map((pScore, index) => (
                      <View>
                        <Text style={LBoardStyles.pScore}>{pScore[1]}</Text>
                      </View>
                    ))
                }
          </View>
          
          {!isHost? 
            <View>
              <Text style={LBoardStyles.title}>Waiting for host to start next hunt </Text>
              <ActivityIndicator size="large" color={colours.black} style={WaitingStyles.loader} /> 
            </View>
            : 
              <View>
                <TouchableOpacity
                  activeOpacity={.9}
                  style={GlobalStyles.buttonBlack}>
                  <Text style={GlobalStyles.whiteText}>New Game</Text>
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
  scoreContainer: {
    marginTop: -236,
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: "wrap",
    paddingLeft: 250,
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

const WaitingStyles = StyleSheet.create({
  waitingTitleContainer: {
      marginTop: 100
  },
  loader: {
      marginTop: 50
  },
  tip: {
      flex: 1,
      alignItems: "center",
      marginTop: 290
  }
});