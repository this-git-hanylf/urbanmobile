import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Title,
  Left,
  Right,
  Body,
  Input,
  Item,
  Footer,
  View,
  FooterTab,
  Badge
} from "native-base";
import RadioGroup from "react-native-custom-radio-group";
import { Actions } from "react-native-router-flux";
import { Style, Fonts, Colors } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData } from "@Component/StoreAsync";
// import Shimmer from 'react-native-shimmer';
// import Shimmer from '@Component/Shimmer';
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class Search extends React.Component {
  state = {
    dataTower: [],
    isVisible: false,
    isLogin: false,
    isLoaded: false
  };

  async componentDidMount() {
    const data = {
      dataTower: await _getData("@UserProject"),
      isLogin: await _getData("@isLogin")
    };

    console.log("data progres", data);

    this.setState(data, () => {});

    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 2000);
  }

  componentWillMount() {}
  clickProject(item) {
    // console.log('property',item);
    Actions.propertydetail({ items: item });
    this.setState({ click: true });
  }
  signin() {
    Actions.Login();
  }

  render() {
    if (this.state.isLogin) {
      return (
        <Container style={Style.bgMain}>
          {/* <StatusBar
          backgroundColor="rgba(0,0,0,0)"
          animated
          barStyle="dark-content"
        />
        <Content style={Style.layoutContent}>
          <ScrollView scrollEventThrottle={200} directionalLockEnabled={true}>
            <View style={Styles.sectionGrey}>
              <View style={Styles.headerBg}>
                <Icon
                  name="building"
                  type="FontAwesome5"
                  style={Styles.headerIcon}
                />
                <Text style={Styles.sHeader}>
                  {"All Project".toUpperCase()}
                </Text>
                
              </View>

              {this.state.dataTower.length == 0 ? (
                <ActivityIndicator />
              ) : (
               
                <View style={Styles.city}>
                  {this.state.dataTower.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      style={Styles.btnCity}
                      onPress={() => this.clickProject(item)}
                    >
                      <Image
                        source={{
                          uri:
                            item.picture_url +
                            "?random_number=" +
                            new Date().getTime()
                        }}
                        resizeMode={"cover"}
                        style={Styles.btnCityImg}
                      />
                      <View style={Styles.btnCityLocation}>
                        <Text style={Styles.btnCityText}>
                          {item.project_descs}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </Content>
      */}
          <ImageBackground
            style={Styles.backgroundImage_2}
            source={require("../Images/background-blue.png")}
          >
            <Header style={Styles.header}>
              <StatusBar
                backgroundColor={"rgba(0, 0, 0, 0)"}
                animated
                barStyle="dark-content"
              />
              <Left style={Styles.left}>
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
              <Body style={Styles.body}>
                <Text
                  style={[Style.textWhite, Style.textMedium, Style.fontProxima]}
                >
                  {/* {"Registration"} */}
                  {/* {this.Capitalize("Registration")} */}
                </Text>
              </Body>
              <Right style={Styles.right}></Right>
            </Header>
            {/* <ScrollView> */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.type.proximaNovaBoldWeb,
                  fontSize: 20
                }}
              >
                Coming Soon
              </Text>
            </View>
            {/* </ScrollView> */}
          </ImageBackground>
        </Container>
      );
    } else {
      return this.state.isLoaded ? (
        <ImageBackground
          style={Styles.backgroundImage_2}
          source={require("../Images/Alert03-min.png")}
        >
          <View
            style={{
              position: "absolute",
              bottom: 100,
              alignSelf: "center",
              flexDirection: "row"
            }}
          >
            <Button style={Styles.btnSmall} onPress={() => this.signin()}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1,
                  textTransform: "capitalize"
                }}
              >
                Sign In
              </Text>
            </Button>
            <Button style={Styles.btnSmall} onPress={() => this.signin()}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1,
                  textTransform: "capitalize"
                }}
              >
                Sign Up
              </Text>
            </Button>
          </View>
        </ImageBackground>
      ) : (
        <ActivityIndicator style={{ justifyContent: "center" }} />
      );
    }
  }
}
