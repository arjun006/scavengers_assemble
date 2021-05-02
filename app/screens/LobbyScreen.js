import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import GlobalStyles from './../config/GlobalStyles';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colours from '../config/colours';
import * as firebase from "firebase";

export default LobbyScreen = ({ route, navigation }) => {

    const [playerList, setPlayerList] = useState([]);
    const db = firebase.database();

    /* 2. Get the param */
    const { lobbyId, isHost } = route.params;

    // const list = ['John', 'Mary', 'Sarah', 'Austin', 'Austin', 'Austin', 'Austin', 'Austin'];

    useEffect(() => {
        var debRef = db.ref(`${lobbyId}/score`);

        debRef.on('value', (snapshot) => {

            if (snapshot.exists()) {
                const dbValue = snapshot.val();

                let players = [];

                for (let userId in dbValue) {
                    const userObject = dbValue[userId];
                    const { name } = userObject;
                    players.push(name);
                }

                console.log(players);
                setPlayerList(players);

            }
        });

        return () => { debRef.off(); };

    }, []);

    const startGame = () => {
        var dbRef = db.ref(`${lobbyId}/`);

        dbRef.update({
            gameStarted: true
        });

        navigation.push('HostQuestion', {
            lobbyId,
            isHost,
            currentQuestionIndex: 0,
            playerCount: playerList.length
        });
    };

    return (
        <View style={GlobalStyles.background}>
            <Text style={GlobalStyles.title}>SCAVENGER CODE</Text>
            <Text style={GlobalStyles.subtitle}>{lobbyId}</Text>

            <View style={LobbyStyles.playerContainer}>
                {
                    playerList.length > 0 && playerList.map((player, index) => (
                        <Text key={index} style={LobbyStyles.player}>{player}</Text>
                    ))
                }
            </View>

            <TouchableOpacity
                activeOpacity={.9}
                style={GlobalStyles.buttonBlack}
                onPress={() => startGame()}>
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
