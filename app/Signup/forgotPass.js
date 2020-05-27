//import react in project
import React from "react";
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
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  // Content
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
  ListItem,
  Content,
  Label,
  Switch,
  InputGroup,
  // CheckBox
} from "native-base";
import { CheckBox } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import { Style, Colors, Fonts } from "../Themes";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Sae } from 'react-native-textinput-effects';
// import FloatingLabelInput from "@Component/FloatingLabelInput";

class forgotPass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: true,
      email: "",
      Alert_Visibility: false,
      pesan: "",
    };
  }

  btnSend() {
    this.setState({ isLoaded: !this.state.isLoaded });

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = this.validating({
      email: { require: true },
    });
    if (isValid) {
      if (reg.test(this.state.email) === true) {
        const email = this.state.email;
        console.log("email", email);
        fetch(urlApi + "c_auth/resetpass", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((response) => response.json())
          .then((res) => {
            // const resp = JSON.parse(res.Data);
            // console.log('res error', resp)
            if (!res.Error) {
              this.setState({ isLoaded: true }, () => {
                //   alert(res.Pesan);
                const pesan = res.Pesan;
                this.alertFillBlank(true, pesan);
              });
            } else if (res.Error) {
              this.setState({ isLoaded: true }, () => {
                //   alert(res.Pesan);
                const pesan = res.Pesan;
                this.alertFillBlank(true, pesan);
              });
              console.log("res pesan", res.Pesan);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.setState({ isLoaded: true }, () => {
          // alert("Email not valid");
          const pesan = "Email not valid";
          this.alertFillBlank(true, pesan);
        });
      }
    } else {
      this.setState({ isLoaded: true }, () => {
        // alert('Email not valid');
        //   alert("Input email");
        const pesan = "Input email";
        this.alertFillBlank(true, pesan);
      });
    }
  }

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  // validate = (text) => {
  //     console.log(text);
  //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  //     if(reg.test(text) === false)
  //     {
  //     console.log("Email is Not Correct");
  //     this.setState({email:text})
  //     return false;
  //       }
  //     else {
  //       this.setState({email:text})
  //       console.log("Email is Correct");
  //     }
  //     }

  validating = (validationData) => {
    const keys = Object.keys(validationData);
    const errorKey = [];
    let isValid = false;

    keys.map((data, key) => {
      if (validationData[data].require) {
        let isError =
          !this.state[data] || this.state[data].length == 0 ? true : false;
        let error = "error" + data;
        errorKey.push(isError);
        this.setState({ [error]: isError });
      }
    });

    for (var i = 0; i < errorKey.length; i++) {
      if (errorKey[i]) {
        isValid = false;
        break;
      }
      isValid = true;
    }

    return isValid;
  };

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
            <Body style={styles.body}>
              <Text style={[Style.textWhite, Style.textMedium]}>
                {"Forgot Password"}
              </Text>
            </Body>
            <Right style={styles.right}></Right>
          </Header>

          <View style={{ paddingBottom: 20 }}>
            {/* <AlertCustom /> */}
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
                    {/* tes */}
                  </Text>
                  <View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.goldUrban,
                        height: 40,
                        width: 100,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        this.alertFillBlank(!this.state.Alert_Visibility);
                        Actions.pop();
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Email</Text>
                                </View> */}
            <Item floatingLabel style={styles.marginround}>
              <Label style={{ color: "#fff", fontSize: 14 }}>Email</Label>
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
              <Input
                // placeholder='Email'
                placeholderTextColor={"#fff"}
                value={this.state.email}
                ref="email"
                // onChangeText={(email) => this.setState({ email })}
                // onChangeText={(email) => this.validate(email)}
                onChangeText={(val) => this.setState({ email: val })}
                // onChangeText={(text) => this.validate(text)}
                style={styles.positionTextInput}
              />
              {this.state.erroremail ? (
                <Icon
                  style={{
                    color: "red",
                    bottom: 3,
                    position: "absolute",
                    right: 0,
                  }}
                  name="close-circle"
                />
              ) : null}
            </Item>
            {this.state.erroremail ? (
              <Text
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 15,
                  color: "red",
                  fontSize: 12,
                }}
              >
                Email Required
              </Text>
            ) : null}
          </View>

          <View
            style={{ marginTop: 40 }}
            pointerEvents={this.state.isLoaded ? "auto" : "none"}
          >
            <Button
              style={styles.signInBtnMedium}
              onPress={this.btnSend.bind(this)}
            >
              {!this.state.isLoaded ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signInBtnText}>Submit</Text>
              )}
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
export default forgotPass;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    ...styles.inputEmail,
    fontSize: 17,
  },
});
