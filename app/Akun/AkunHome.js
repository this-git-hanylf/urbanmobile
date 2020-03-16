import React from "react";
import {
  Linking,
  StatusBar,
  WebView,
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
  Alert
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
  Badge,
  List,
  ListItem,
  Tab,
  Tabs
} from "native-base";

import { Fonts, Metrics, Colors, Style } from "../Themes/";
import Styles from "./Style2";
import {
  _storeData,
  _getData,
  _getAllData,
  _removeData
} from "@Component/StoreAsync";
import { Actions } from "react-native-router-flux";
import { urlApi } from "@Config/services";
import Mailer from "react-native-mail";
import DeviceInfo from "react-native-device-info";
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      group: "",
      dashmenu: [],
      fotoProfil: "http://35.198.219.220:2121/alfaAPI/images/profil/avatar.png",
      isLogin: false,
      isLoaded: false,
      emailto: "",
      emailacc: "",
      email_add: "",
      descs: "",
      datasysspec: ""
    };
    // this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const data = {
      email: await _getData("@User"),
      userId: await _getData("@UserId"),
      name: await _getData("@Name"),
      group: await _getData("@Group"),
      token: await _getData("@Token"),
      dashmenu: (await _getData("@DashMenu"))
        ? await _getData("@DashMenu")
        : [],
      isLogin: await _getData("@isLogin")
    };

    console.log("datra", data);
    this.setState(data, () => {
      if (data.isLogin) {
        this.getProfile();
        this.getDatasysspec();
      }
    });

    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 2000);
  }

  receiveProps = async () => {
    const data = {
      name: await _getData("@Name")
    };

    if (await _getData("@ProfileUpdate")) {
      _storeData("@ProfileUpdate", false);
      this.setState(data);
      this.getProfile();
      this.getDatasysspec();
    }
  };

  getProfile = () => {
    fetch(
      urlApi +
        "c_profil/getData/IFCAMOBILE/" +
        this.state.email +
        "/" +
        this.state.userId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Token: this.state.token
        }
      }
    )
      .then(response => response.json())
      .then(res => {
        const resData = res.Data[0];

        // ? Agar Gambar Tidak ter cache
        let url = resData.pict + "?random_number=" + new Date().getTime();
        this.setState({ fotoProfil: url });
        console.log("res Profileee", this.state);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getDatasysspec = () => {
    // alert('syspec');

    fetch(urlApi + "c_profil/getDatasysspec/IFCAMOBILE/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: this.state.token
      }
    })
      .then(response => response.json())
      .then(res => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ datasysspec: resData });
          console.log("datasysspec", resData);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleEmail = () => {
    const email_add = this.state.datasysspec[0].email_splus;
    // const descs = this.state.descs

    console.log("email send", email_add);

    Mailer.mail(
      {
        subject: "",
        recipients: [`${email_add}`],
        ccRecipients: [""],
        bccRecipients: [""],
        body: "",
        isHTML: true
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: "Ok",
              onPress: () => console.log("OK: Email Error Response")
            },
            {
              text: "Cancel",
              onPress: () => console.log("CANCEL: Email Error Response")
            }
          ],
          { cancelable: true }
        );
      }
    );
  };

  handleRateUs = () => {
    let link = "market://details?id=com.splus";
    console.log("link", link);
    Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      err => console.log(err)
    );
  };

  logout = () => {
    Alert.alert(
      "",
      "Are you want to Sign Out",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.signOut() }
      ],
      { cancelable: false }
    );
  };

  signOut = async () => {
    const formData = {
      email: this.state.email,
      ipAddress: await DeviceInfo.getIPAddress().then(mac => mac),
      device: Platform.OS
    };

    fetch(urlApi + "c_auth/Logout/" + this.state.email, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: this.state.token
      }
    })
      .then(response => response.json())
      .then(res => {
        alert(res.Pesan);
        console.log("save profile", res);
      })
      .catch(error => {
        console.log(error);
      });

    const data = await _getAllData();
    data.map(val => {
      if (val != "@isIntro") {
        _removeData(val);
      }
    });
    Actions.reset("Login");
  };

  skipLoginBlank() {
    Actions.SkipLoginBlank2();
  }

  term() {
    Actions.PageTerm();
  }
  signin() {
    Actions.Login();
  }

  mybooking() {
    // Actions.MyBooking();
    Actions.project({ goTo: "MyBooking" });
    // Actions.project({ goTo: "MyBooking_segment" });

    // if (val.isProject == 1) {
    //   Actions.project({ goTo: val.URL_angular });
    // } else {
    //   Actions[val.URL_angular]();
    // }
    // console.log("menu", val);
  }

  myevent() {
    // Actions.MyBooking();
    Actions.project({ goTo: "Event" });

    // if (val.isProject == 1) {
    //   Actions.project({ goTo: val.URL_angular });
    // } else {
    //   Actions[val.URL_angular]();
    // }
    // console.log("menu", val);
  }

  subordinat() {
    // Actions.MyBooking();
    Actions.project({ goTo: "Subordinate" });

    // if (val.isProject == 1) {
    //   Actions.project({ goTo: val.URL_angular });
    // } else {
    //   Actions[val.URL_angular]();
    // }
    // console.log("menu", val);
  }
  toProfile() {
    Actions.profile({ onBack: () => this.receiveProps() });
  }
  // goToFeed = (val) =>{
  //       if(val.isProject == 1){
  //           Actions.project({goTo : val.URL_angular})
  //       } else {
  //           Actions[val.URL_angular]()
  //       }
  //       console.log('menu',val);
  //   }

  render() {
    return (
      <Container style={Style.bgMain}>
        {this.state.isLogin ? (
          <ImageBackground
            style={Styles.backgroundImage}
            source={require("../Images/background-blue.png")}
          >
            <StatusBar
              backgroundColor="rgba(0,0,0,0)"
              animated
              barStyle="dark-content"
            />

            <Content
              style={Style.layoutInner}
              contentContainerStyle={Style.layoutContent}
            >
              <View style={Styles.owner}>
                <View style={Styles.ownerAvatar}>
                  <Image
                    source={{ uri: this.state.fotoProfil }}
                    style={Styles.ownerAvatarImg}
                  />
                </View>

                <View>
                  <Text style={Styles.ownerName}>{this.state.name}</Text>
                </View>

                <View>
                  <Text style={Styles.ownerGrup}>{this.state.group}</Text>
                </View>

                <View style={{ paddingVertical: 25 }}>
                  <Button
                    style={Styles.btnSmall}
                    onPress={() => this.toProfile()}
                    // onPress={() =>
                    //   Actions.profile({ onBack: () => this.receiveProps() })
                    // }
                  >
                    <Text style={Styles.textBtnSmall}>Profile Setting</Text>
                  </Button>
                </View>

                <View>
                  {/* <ListItem
                    style={Styles.infoItem}
                    onPress={() => this.myevent()}
                  >
                    <View>
                      <Text style={Styles.textMenu}>Event</Text>
                    </View>
                  </ListItem> */}
                  <ListItem
                    style={Styles.infoItem}
                    onPress={() => this.skipLoginBlank()}
                  >
                    <View>
                      <Text style={Styles.textMenu}>My Customer</Text>
                    </View>
                  </ListItem>

                  <ListItem
                    style={Styles.infoItem}
                    onPress={() => this.mybooking()}
                  >
                    <View>
                      <Text style={Styles.textMenu}>My Booking</Text>
                    </View>
                  </ListItem>

                  <ListItem
                    style={Styles.infoItem}
                    onPress={() => this.myevent()}
                  >
                    <View>
                      <Text style={Styles.textMenu}>My QR Code</Text>
                    </View>
                  </ListItem>

                  <ListItem
                    style={Styles.infoItem}
                    // onPress={() => this.myevent()}
                    // onPress={() => alert("tes")}
                    onPress={() => this.subordinat()}
                  >
                    <View>
                      <Text style={Styles.textMenu}>Subordinate</Text>
                    </View>
                  </ListItem>

                  <ListItem style={Styles.infoItem} onPress={() => this.term()}>
                    <View>
                      <Text style={Styles.textMenu}>Terms & Condition</Text>
                    </View>
                  </ListItem>

                  <ListItem
                    style={Styles.infoItem}
                    onPress={() => Actions.ContactUs()}
                  >
                    <View>
                      <Text style={Styles.textMenu}>Contact Us</Text>
                    </View>
                  </ListItem>

                  <ListItem
                    style={Styles.infoItem}
                    onPress={() => Actions.AboutUs()}
                  >
                    <View>
                      <Text style={Styles.textMenu}>About Us</Text>
                    </View>
                  </ListItem>

                  <ListItem
                    style={Styles.infoItem}
                    onPress={() => this.logout()}
                  >
                    <View>
                      <Text style={Styles.textMenu}>Sign Out</Text>
                    </View>
                  </ListItem>
                </View>
              </View>
            </Content>
          </ImageBackground>
        ) : (
          <ImageBackground
            style={Styles.backgroundImage}
            source={require("../Images/Alert01-min.png")}
          >
            <View
              style={{ position: "absolute", bottom: 140, alignSelf: "center" }}
            >
              <Button style={Styles.btnLarge} onPress={() => this.signin()}>
                <Text
                  style={{
                    width: "100%",
                    fontSize: 18,
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
            </View>
          </ImageBackground>
        )}
      </Container>
    );
  }
}
