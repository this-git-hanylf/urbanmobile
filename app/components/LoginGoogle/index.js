import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    Image
} from "react-native";
import { Style, Colors, Metrics, Fonts } from "../../Themes";
import { Icon } from "native-base";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from "react-native-google-signin";

export default class GoogleLoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        };
    }

    handleEnable = () => {
        this.setState({ disabled: !this.state.disabled });
    };

    handleLogin = async () => {
        this.handleEnable();

        try {
            await GoogleSignin.configure({
                webClientId:
                    // "945884059945-0treh3o5vujr85pba419nb9dqttt310m.apps.googleusercontent.com",

                    "945884059945-0treh3o5vujr85pba419nb9dqttt310m.apps.googleusercontent.com",
                offlineAccess: true,
                forceConsentPrompt: true
            });
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            this._responseInfoCallback(userInfo);
        } catch (error) {
            this.handleEnable();            
            console.log("Error ", error);
        }
    };

    _responseInfoCallback = userInfo => {
        this.handleEnable();
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        const data = {
            Email: userInfo.user.email,
            Medsos: 1,
            LoginId: userInfo.user.id,
            device: Platform.OS,
            Token: userInfo.idToken,
            Name: userInfo.user.givenName + " " + userInfo.user.familyName
        };
        this.props.onPress(data);
    };

    render() {
        return (
            <TouchableOpacity
                disabled={this.state.disabled}
                style={styles.container}
                onPress={this.handleLogin}
            >
                {/* <Icon name="google" style={styles.icon} type="FontAwesome5" />
                 */}
                 <View style={{left: 33}}>
                 <Image style={{width: 33, height: 33}} source={require('@Asset/images/icon/google.png')}></Image> 
                 </View>
                <View style={{left: 43}}>
                <Text style={{fontFamily: Fonts.type.proximaNovaReg, fontWeight: "500", color: Colors.facebook, fontSize: 12}}>
                    Continue with email
                </Text>

                </View>
                
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        width: 250,
        height: 40,
        padding: 12,
        backgroundColor: Colors.white,
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        elevation: 2,
        borderRadius: 15
    },
    
    text: {
        // fontFamily: "Montserrat-Regular.ttf",
        fontSize: 12,
        color: "#333",
        textAlign: 'left',
        // paddingHorizontal: 10
        
        
    },
    icon: {
        // textAlign: 'center',
        // fontSize: 24,
        justifyContent: "flex-start",
        color: Colors.fire
    }
});
