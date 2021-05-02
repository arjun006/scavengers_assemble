import React from 'react';
import { Text, View, Button } from 'react-native';
import GlobalStyles from './../config/GlobalStyles';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colours from '../config/colours';

export default LobbyScreen = ({ route, navigation }) => {

    /* 2. Get the param */
    const { lobbyId } = route.params;

    console.log('Lobby ID: ' + lobbyId);

    const list = ['John', 'Mary', 'Sarah', 'Austin', 'Austin', 'Austin', 'Austin', 'Austin'];

    return (
        <View style={GlobalStyles.background}>
            <Text style={GlobalStyles.title}>SCAVENGER CODE</Text>
            <Text style={GlobalStyles.subtitle}>{lobbyId}</Text>

            <View style={LobbyStyles.playerContainer}>
                {
                    list.map((player, index) => (
                        <Text key={index} style={LobbyStyles.player}>{player}</Text>
                    ))
                }
            </View>

            <TouchableOpacity
                activeOpacity={.9}
                style={GlobalStyles.buttonBlack}>
                <Text style={GlobalStyles.whiteText}>Start Game</Text>
            </TouchableOpacity>

        </View>
    );
};

const LobbyStyles = StyleSheet.create({
    playerContainer: {
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: "wrap"
    },
    player: {
        backgroundColor: colours.white,
        borderRadius: 50,
        margin: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20
    }
});
