import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator, BackHandler } from 'react-native';
import GlobalStyles from './../config/GlobalStyles';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colours from '../config/colours';
import * as firebase from "firebase";

export default function WaitingScreen({ route, navigation }) {
    const { lobbyId, name, id } = route.params;
    const db = firebase.database();

    console.log(`User ${name} has entered Lobby ${lobbyId}: ${id}`);

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    useEffect(() => {
        var debRef = db.ref(`${lobbyId}/gameStarted`);
        BackHandler.addEventListener("hardwareBackPress", backAction);
        debRef.on('value', (snapshot) => {

            const gameStarted = snapshot.val();

            if (gameStarted) {
                navigation.navigate('Question', {
                    currentQuestionIndex: 0,
                    isHost: false,
                    lobbyId
                });
            }

        });



        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    return (
        <View style={GlobalStyles.background}>

            <View style={WaitingStyles.waitingTitleContainer}>
                <Text style={GlobalStyles.title}>Waiting for host to start the game</Text>
            </View>

            <ActivityIndicator size="large" color={colours.black} style={WaitingStyles.loader} />

            <View style={WaitingStyles.tip}>
                <Text style={GlobalStyles.subtitle}>Tip</Text>
                <Text style={GlobalStyles.whiteText}>
                    To earn the most points, take the picture as
                    quick as possible
                </Text>
            </View>

        </View>
    );
};

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
