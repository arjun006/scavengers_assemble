import React from 'react';
import '../config/colours'
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import colours from '../config/colours';
const handlePress = (name) => {
    Alert.alert(name)
}
function WelcomeScreen(props){
    return(
        <ImageBackground 
            style={styles.background}
            source={require("../assets/welcomeScreen.jpg")}
        >
            <View style={styles.logoContainer}>
            <Image
                style={styles.logo} 
                source={require("../assets/adaptive-icon.png")}
            />
            <Text>VacTrax</Text>
            </View>
            <View style={styles.loginButton}>  
            <Button 
                    onPress={handlePress("Login")}
                    title="Log In"
                    color={colours.primary}
            />
            </View>
            <View style={styles.registerButton}>
            <Button 
                onPress={handlePress("Registration")}
                title="Registration"
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
    loginButton:{
        width: '70%',
        height: 80,
        backgroundColor: colours.primary,
        
    },
    registerButton:{
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

export default WelcomeScreen; 
