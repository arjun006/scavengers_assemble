import React from 'react';
import { Text, View, Button, ActivityIndicator } from 'react-native';
import GlobalStyles from './../config/GlobalStyles';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colours from '../config/colours';

export default function WaitingScreen({ route, navigation }) {
    const { lobbyId, name } = route.params;

    console.log(`User ${name} has entered Lobby ${lobbyId}`);

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
