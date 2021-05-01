import React from 'react';
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import colours from '../config/colours';
const handlePress = (name) => {
    Alert.alert(name)
}
function HomeScreen(props){
    return(
        <ImageBackground 
            style={styles.background}
        >
            
       
            <View style={styles.playButton}>
            <Button 
                onPress={handlePress("Play")}
                title="Play"
            />
            </View>
    
            

            
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems:'center'
    },
    button: {
        
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: colours.primary,
        color: 'red'
    },
    playButton:{
        marginBottom: "20%",
        marginVertical: 10,
        width: '70%',
        height: 70,
        backgroundColor: colours.secondary
    },
    logo:{
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    logoContainer:{
        position: 'absolute',
        top: 100, 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column'
    }
})

export default HomeScreen; 
