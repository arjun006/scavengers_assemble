import { StyleSheet } from 'react-native';
import colours from '../config/colours';

export default StyleSheet.create({
    background: {
        backgroundColor: colours.red,
        flex: 1,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 100,
    },
    title: {
        fontSize: 28,
        color: colours.yellow,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 25,
        color: colours.white
    },
    whiteText: {
        fontSize: 18,
        color: colours.white,
        textAlign: 'center'
    },
    yellowText: {
        fontSize: 18,
        color: colours.yellow
    },
    buttonBlack: {
        backgroundColor: colours.black,
        color: colours.white,
        borderRadius: 100,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 70
    }
});