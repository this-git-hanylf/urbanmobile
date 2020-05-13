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
  I18nManager,
  Modal,
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
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import { Style, Colors, Fonts } from "../Themes";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
class Reset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: true,

      conpass: "",
      newpass: "",
      isHide: false,
      Alert_Visibility: false,
      pesan: "",
    };
  }

  ResetPress = () => {
    const { conpass, newpass } = this.state;
    if (conpass != newpass) {
      alert("Password does not match");
    } else {
      const formData = {
        matching_passwords: {
          newpass: newpass,
        },
        email: this.props.email,
      };

      console.log("form", formData);

      fetch(urlApi + "c_auth/resetpass_newlogin/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log("res", res.Data);

          if (!res.Error) {
            // alert(res.Pesan)
            const pesan = res.Pesan;
            this.alertFillBlank(true, pesan);
            Actions.pop();
            // setTimeout(() => {
            //   Actions.refresh({
            //     p: Math.random(),
            //   });
            // }, 0);
            setTimeout(() => {
              Actions.refresh({
                someprop: Math.random() * 100,
              });
            }, 10);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  render() {
    return (
      <Container>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../Images/background-blue.png")}
        >
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
            <Body style={styles.body}></Body>
            <Right style={styles.right}></Right>
          </Header>
          <View style={styles.inputFieldStyles}>
            {/* <Image  style={styles.images} source={ require("../Images/logo.jpg")}/> */}
            {/* <View style={{width: 200,height: 100, marginBottom: 65}}>
                                <Image
                                    // style={styles.images}
                                    style={styles.styleLogo}
                                    source={require("../Images/logo.png")}
                                />
                            </View> */}
            <Modal
              visible={this.state.Alert_Visibility}
              transparent={true}
              animationType={"slide"}
              onRequestClose={() => {
                this.alertFillBlank(!this.state.Alert_Visibility, pesan);
              }}
              // activeOpacity={1}
            >
              <View
                style={{
                  // backgroundColor: "red",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "70%",
                    height: "20%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.type.proximaNovaReg,
                      fontSize: 17,
                      paddingBottom: 15,
                      color: Colors.black,
                      textAlign: "center",
                    }}
                  >
                    {this.state.pesan}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.goldUrban,
                        height: 40,
                        width: 100,
                        alignContent: "space-around",
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 10,
                      }}
                      onPress={() => {
                        this.alertFillBlank(!this.state.Alert_Visibility);
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.goldUrban,
                        height: 40,
                        width: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "space-around",
                        marginHorizontal: 10,
                      }}
                      onPress={() => {
                        Actions.home();
                        //   this.alertFillBlank(!this.state.Alert_Visibility);
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>Yes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={styles.containEmail}>
              <Input
                ref="newpass"
                style={styles.inputEmail}
                editable={true}
                onChangeText={(val) => this.setState({ newpass: val })}
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="New Password"
                placeholderTextColor="rgba(0,0,0,0.20)"
                secureTextEntry={true}
                onChangeText={(val) => this.setState({ newpass: val })}
                value={this.state.newpass}
                secureTextEntry={!this.state.isHide}
              />
              <Icon
                name={this.state.isHide ? "eye-off" : "eye"}
                style={styles.eye}
                onPress={() =>
                  this.setState({
                    isHide: !this.state.isHide,
                  })
                }
              />
            </View>
            {/* <View style={styles.divider}/> */}
            <View style={styles.containPassword}>
              <Input
                ref="conpass"
                style={styles.inputEmail}
                editable={true}
                onChangeText={(val) => this.setState({ conpass: val })}
                keyboardType="default"
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(0,0,0,0.20)"
                secureTextEntry={true}
                onChangeText={(val) => this.setState({ conpass: val })}
                value={this.state.conpass}
                secureTextEntry={!this.state.isHide}
              />
              <Icon
                name={this.state.isHide ? "eye-off" : "eye"}
                style={styles.eye}
                onPress={() =>
                  this.setState({
                    isHide: !this.state.isHide,
                  })
                }
              />
            </View>
          </View>
          <View
            style={styles.signbtnSec}
            pointerEvents={this.state.isLoaded ? "auto" : "none"}
          >
            <Button style={styles.signInBtn} onPress={() => this.ResetPress()}>
              {!this.state.isLoaded ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signInBtnText}>Reset Password</Text>
              )}
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
export default Reset;
