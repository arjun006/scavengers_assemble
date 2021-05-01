import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {View, Text, Button} from "react-native";
import GlobalStyles from './../config/GlobalStyles';

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
        <Text style={GlobalStyles.nameList}>John</Text>

    </View>
  );
}
