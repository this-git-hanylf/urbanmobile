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
  TextInput
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
  InputGroup
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

class SkipLoginBlank extends React.Component {
  signin() {
    Actions.Login();
  }
  render() {
    return (
      <Container>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../Images/Alert02-min.png")}
        >
          <View
            style={{
              position: "absolute",
              bottom: 140,
              alignSelf: "center"
            }}
          >
            <Button style={styles.btnLarge} onPress={() => this.signin()}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 18,
                  alignItems: "center",
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1,
                  textTransform: "capitalize",
                  color: Colors.white
                }}
              >
                Sign In
              </Text>
            </Button>
          </View>
        </ImageBackground>
        {/* <ImageBackground style={styles.backgroundImage} source={require("../Images/background-blue.png")}>
                    <StatusBar translucent={true}></StatusBar>
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
                            <Text style={[Style.textWhite, Style.textMedium, Style.fontProxima]}>
                               
                            </Text>
                        </Body>
                        <Right style={styles.right}></Right>
                    </Header>
                  
                        <View style={{flex: 1,justifyContent:'center',alignItems: 'center',alignContent:'center'}}>
                            <Text style={{color: Colors.white, fontFamily: Fonts.type.proximaNovaBoldWeb, fontSize: 20}}>Coming Soon</Text>
                        </View>
                  
                    
                </ImageBackground> */}
      </Container>
    );
  }
}
export default SkipLoginBlank;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    ...styles.inputEmail,
    fontSize: 17
  }
});
