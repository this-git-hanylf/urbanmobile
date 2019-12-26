import React from "react";
//import react in project
import {
    PermissionsAndroid,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    I18nManager
} from "react-native";
import {
    Container,
    Button,
    Icon,
    Right,
    Item,
    Input,
    Header,
    Left,
    Body,
    Title,
    Label
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: true,
            email: props.data && props.data.Email,
            fullname: props.data && props.data.Name,
            nohp: "",
            password: "",
            isHide: false
        };

        console.log("props", props);
    }

    SignupSosmed() {
        this.setState({ isLoaded: !this.state.isLoaded });

        data = {
            Email: this.state.email,
            FullName: this.state.fullname,
            Handphone: this.state.nohp,
            Medsos: 1,
            Id: this.props.data.LoginId,
            password: this.state.password
        };

        fetch(urlApi + "c_auth/SignUpGuest", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                console.log("Login Result", res);
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    alert(res.Pesan);
                    Actions.pop()
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    alert(error);
                });
            });
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

    render() {
        return (
            <Container>
                <ImageBackground style={styles.backgroundImage2} source={require("../Images/background-blue.png")}>
                    <Header style={styles.header}>
                        <Left style={styles.left}>
                            <Button
                                transparent
                                style={Style.actionBarBtn}
                                onPress={Actions.pop}
                            >
                                <Icon
                                    active
                                    name="arrow-left"
                                    style={Style.textWhite}
                                    type="MaterialCommunityIcons"
                                />
                            </Button>
                        </Left>
                        <Body style={styles.body}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#fff"
                                }}
                            >
                                {/* {"Sign Up as Guest"} */}
                                {this.Capitalize("Registration")}
                            </Text>
                        </Body>
                        <Right style={styles.right}></Right>
                    </Header>
                    <View style={styles.inputFieldStyles}>
                        {/* <Image
                            style={styles.images}
                            source={require("../Images/logo.png")}
                        /> */}
                        <View style={{width: 200,height: 100, marginBottom: 65}}>
                                <Image
                                    // style={styles.images}
                                style={styles.styleLogo}
                                source={require("../Images/logo.png")}
                            />
                        </View>

                        <View style={{justifyContent : 'center'}}>
                        <View style={{paddingBottom: 20}}>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Full Name</Text>
                                </View> */}
                                <Item floatingLabel style={styles.marginround}>
                                    <Label style={{color: "#fff", fontSize: 14}}>Email</Label>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
                                    <Input 
                                        // placeholder='Full Name' 
                                        keyboardType="email-address"
                                        autoCapitalize="words"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholderTextColor={'#666'} 
                                        value={this.state.email}
                                        onChangeText={val =>
                                            this.setState({ email: val })
                                        }
                                        style={styles.positionTextInput}
                                        ref="email"/>
                                        {this.state.erroremail ? (
                                        <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                        ) : null}
                                    {/* <Icon name='close-circle' /> */}
                                </Item>
                                {this.state.erroremail ? (<Text
                                    style={{
                                        position: "absolute",
                                        bottom:10,
                                        left: 15,
                                        color: "red",
                                        fontSize: 12
                                    }}
                                >
                                    Email Required
                                </Text>) : null}
                            </View>
                            {/* <View style={styles.containEmail}>
                                <Input
                                    ref="email"
                                    style={styles.inputEmail}
                                    editable={this.props.data ? false : true}
                                    keyboardType="email-address"
                                    onChangeText={val =>
                                        this.setState({ email: val })
                                    }
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    textAlign={
                                        I18nManager.isRTL ? "right" : "left"
                                    }
                                    placeholder="Email"
                                    placeholderTextColor="rgba(0,0,0,0.20)"
                                    value={this.state.email}
                                />
                            </View> */}

                        <View style={{paddingBottom: 20}}>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Full Name</Text>
                                </View> */}
                                <Item floatingLabel style={styles.marginround}>
                                    <Label style={{color: "#fff", fontSize: 14}}>Full Name</Label>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
                                    <Input 
                                        // placeholder='Full Name' 
                                        // keyboardType="email-address"
                                        autoCapitalize="words"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholderTextColor={'#666'} 
                                        value={this.state.fullname}
                                        onChangeText={val =>
                                            this.setState({ fullname: val })
                                        }
                                        style={styles.positionTextInput}
                                        ref="email"/>
                                        {this.state.errorfullname ? (
                                        <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                        ) : null}
                                    {/* <Icon name='close-circle' /> */}
                                </Item>
                                {this.state.errorfullname ? (<Text
                                    style={{
                                        position: "absolute",
                                        bottom:10,
                                        left: 15,
                                        color: "red",
                                        fontSize: 12
                                    }}
                                >
                                    Full Name Required
                                </Text>) : null}
                            </View>
                            {/* <View style={styles.containMid}>
                                <Input
                                    ref="fullname"
                                    style={styles.inputEmail}
                                    editable={true}
                                    onChangeText={val =>
                                        this.setState({ fullname: val })
                                    }
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    textAlign={
                                        I18nManager.isRTL ? "right" : "left"
                                    }
                                    placeholder="Full Name"
                                    placeholderTextColor="rgba(0,0,0,0.20)"
                                    value={this.state.fullname}
                                />
                            </View> */}
                            <View style={{paddingBottom: 20}}>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Full Name</Text>
                                </View> */}
                                <Item floatingLabel style={styles.marginround}>
                                    <Label style={{color: "#fff", fontSize: 14}}>Handphone</Label>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
                                    <Input 
                                        // placeholder='Full Name' 
                                        // keyboardType="email-address"
                                        keyboardType="numeric"
                                        autoCapitalize="words"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholderTextColor={'#666'} 
                                        value={this.state.nohp}
                                        onChangeText={val =>
                                            this.setState({ nohp: val })
                                        }
                                        style={styles.positionTextInput}
                                        ref="email"/>
                                        {this.state.errornohp ? (
                                        <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                        ) : null}
                                    {/* <Icon name='close-circle' /> */}
                                </Item>
                                {this.state.errornohp ? (<Text
                                    style={{
                                        position: "absolute",
                                        bottom:10,
                                        left: 15,
                                        color: "red",
                                        fontSize: 12
                                    }}
                                >
                                    Handphone Required
                                </Text>) : null}
                            </View>
                            {/* <View style={styles.containMid}>
                                <Input
                                    ref="nohp"
                                    style={styles.inputEmail}
                                    editable={true}
                                    onChangeText={val =>
                                        this.setState({ nohp: val })
                                    }
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    lkk
                                    textAlign={
                                        I18nManager.isRTL ? "right" : "left"
                                    }
                                    placeholder="Handphone"
                                    placeholderTextColor="rgba(0,0,0,0.20)"
                                    value={this.state.nohp}
                                />
                            </View> */}
                            <View style={{paddingBottom: 20}}>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Full Name</Text>
                                </View> */}
                                <Item floatingLabel style={styles.marginround}>
                                    <Label style={{color: "#fff", fontSize: 14}}>Password</Label>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
                                    <Input 
                                        // placeholder='Full Name' 
                                        // keyboardType="email-address"
                                        // keyboardType="numeric"
                                        // autoCapitalize="words"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholderTextColor={'#666'} 
                                        value={this.state.password}
                                        onChangeText={val =>
                                            this.setState({ password: val })
                                        }
                                        secureTextEntry={!this.state.isHide}
                                        style={styles.positionTextInput}
                                        ref="password"/>
                                        <Icon
                                            name={this.state.isHide ? "eye-off" : "eye"}
                                            style={styles.eye}
                                            onPress={() =>
                                                this.setState({
                                                    isHide: !this.state.isHide
                                                })
                                            }
                                        />
                                        {this.state.errorpassword ? (
                                        <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                        ) : null}
                                    {/* <Icon name='close-circle' /> */}
                                </Item>
                                {this.state.errorpassword ? (<Text
                                    style={{
                                        position: "absolute",
                                        bottom:10,
                                        left: 15,
                                        color: "red",
                                        fontSize: 12
                                    }}
                                >
                                    Password Required
                                </Text>) : null}
                            </View>
                            {/* <View style={styles.containPassword}>
                                <Input
                                    ref="password"
                                    style={styles.inputEmail}
                                    editable={true}
                                    onChangeText={val =>
                                        this.setState({ password: val })
                                    }
                                    keyboardType="default"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    textAlign={
                                        I18nManager.isRTL ? "right" : "left"
                                    }
                                    placeholder="Password"
                                    placeholderTextColor="rgba(0,0,0,0.20)"
                                    secureTextEntry={!this.state.isHide}
                                    value={this.state.password}
                                />
                                <Icon
                                    name={this.state.isHide ? "eye-off" : "eye"}
                                    style={styles.eye}
                                    onPress={() =>
                                        this.setState({
                                            isHide: !this.state.isHide
                                        })
                                    }
                                />
                            </View> */}
                        </View>
                    </View>
                    <View
                        style={styles.signbtnSec}
                        pointerEvents={this.state.isLoaded ? "auto" : "none"}
                    >
                        <Button
                            style={styles.signInBtn}
                            onPress={() => this.SignupSosmed()}
                        >
                            {!this.state.isLoaded ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.signInBtnText}>
                                    Register Now
                                </Text>
                            )}
                        </Button>
                    </View>
                </ImageBackground>
            </Container>
        );
    }
}
export default Signup;
