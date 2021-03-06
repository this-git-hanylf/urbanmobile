import React, { PropTypes } from "react";
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
  Alert,
  Modal,
  PermissionsAndroid,
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
  Tabs,
} from "native-base";

import { Fonts, Metrics, Colors, Style } from "../Themes/";
import Styles from "./Style2";
import {
  _storeData,
  _getData,
  _getAllData,
  _removeData,
} from "@Component/StoreAsync";
import { Actions } from "react-native-router-flux";
import { urlApi } from "@Config/services";
import Mailer from "react-native-mail";
import DeviceInfo from "react-native-device-info";
import Icon_ from "react-native-vector-icons/FontAwesome";
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

import {
  // SettingsDividerShort,
  // SettingsDividerLong,
  // SettingsEditText,
  // SettingsCategoryHeader,
  SettingsSwitch,
  // SettingsPicker,
} from "react-native-settings-components";

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
      datasysspec: "",
      Alert_Visibility: false,
      pesan: "",
      files: [],
      cntNotif: "",
      allowPushNotifications: false,
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
      isLogin: await _getData("@isLogin"),
    };

    console.log("datra", data);
    this.setState(data, () => {
      if (data.isLogin) {
        this.getProfile();
        this.getDatasysspec();
        this.getFile();
        this.getCountNotif();
      }
    });

    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 2000);
  }

  receiveProps = async () => {
    const data = {
      name: await _getData("@Name"),
    };

    if (await _getData("@ProfileUpdate")) {
      _storeData("@ProfileUpdate", false);
      this.setState(data);
      this.getProfile();
      this.getDatasysspec();
    }
  };

  getFile = () => {
    fetch(urlApi + "c_termcondition/getTermCondition/IFCAMOBILE", {
      method: "GET",
      // headers : this.state.hd,
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;
          this.setState({ files: resData });
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            alert(res.Pesan);
          });
        }
        console.log("getFiles", res);
      })
      .catch((error) => {
        console.log(error);
      });
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
          Token: this.state.token,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const resData = res.Data[0];

        // ? Agar Gambar Tidak ter cache
        let url = resData.pict + "?random_number=" + new Date().getTime();
        this.setState({ fotoProfil: url });
        console.log("res Profileee", this.state);
      })
      .catch((error) => {
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
        Token: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ datasysspec: resData });
          console.log("datasysspec", resData);
        }
      })
      .catch((error) => {
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
        isHTML: true,
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: "Ok",
              onPress: () => console.log("OK: Email Error Response"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("CANCEL: Email Error Response"),
            },
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
      (supported) => {
        supported && Linking.openURL(link);
      },
      (err) => console.log(err)
    );
  };

  logout = () => {
    const pesan = "Are you want to Sign Out?";
    this.alertFillBlank(true, pesan);
    // Alert.alert(
    //   "",
    //   "Are you want to Sign Out",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     { text: "OK", onPress: () => this.signOut() }
    //   ],
    //   { cancelable: false }
    // );
  };

  signOut = async () => {
    // const mac = await DeviceInfo.getMACAddress().then((mac) => {
    //   return mac;
    // });
    const formData = {
      email: this.state.email,
      ipAddress: await DeviceInfo.getMACAddress().then((mac) => mac),
      device: Platform.OS,
    };

    // console.log("ipaddress", ipAddress);
    fetch(urlApi + "c_auth/Logout/" + this.state.email, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        // alert("tes");
        // alert(res.Pesan);
        console.log("save profile", res);
      })
      .catch((error) => {
        console.log(error);
      });

    const data = await _getAllData();
    data.map((val) => {
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
    console.log("files", this.state.files);
    var files = this.state.files;
    Actions.PageTerm({ files: files });
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
    // Actions.project({ goTo: "Subordinate" }); yg lama
    Actions.SubWebView();
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
  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  getCountNotif = async () => {
    //  let result = res.Data;
    const email = this.state.email;

    // console.log("datatower", dataTower);
    console.log("email buat count", email);
    fetch(urlApi + "c_notification/getNotificationBadge/IFCAMOBILE/" + email, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res notif di notif", res);
        if (res.Error === false) {
          let resData = res.Data;
          let data = [];
          console.log("resdata", resData);
          resData.map((item) => {
            let items = {
              // ...item,
              jumlahnotif: item.cnt,
            };
            data.push(items);
          });

          if (data) {
            this.setState({ cntNotif: data });

            console.log("data update", this.state.cntNotif);
          }

          _storeData("@CountNotif", this.state.cntNotif);
          // Actions.push("notif", _storeData("@CountNotif", this.state.cntNotif));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  requestPermissionNotif = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_WAP_PUSH,
        {
          title: "Urban Mobile want to acces your storage",
          message: "Please be careful with agreement permissions ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    if (this.state.isLogin) {
      return (
        <Container style={Style.bgMain}>
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
              {/* tes switch allow pushnotif  */}
              {/* <SettingsSwitch
                title={"Allow Push Notifications"}
                onValueChange={(value) => {
                  console.log("allow push notifications:", value);
                  this.setState({
                    allowPushNotifications: value,
                  });
                }}
                // onSaveValue={(value) => {
                //   console.log("allow push notifications:", value);
                //   this.setState({
                //     allowPushNotifications: value,
                //   });
                // }}
                value={this.state.allowPushNotifications}
                thumbTintColor={
                  this.state.allowPushNotifications
                    ? colors.switchEnabled
                    : colors.switchDisabled
                }
              /> */}

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
                          // Actions.Login();
                          this.alertFillBlank(!this.state.Alert_Visibility);
                          this.signOut();
                        }}
                        // activeOpacity={0.7}
                      >
                        <Text style={{ color: Colors.white }}>Yes</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

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
            {/* footer navigasi */}
            <Footer>
              <FooterTab style={{ backgroundColor: "white" }}>
                <Button vertical onPress={() => Actions.home()}>
                  <Icon_
                    name="home"
                    color="#b7b7b7"
                    style={{ color: "#b7b7b7", fontSize: 24 }}
                  />
                  <Text
                    style={{ color: "#b7b7b7", textTransform: "capitalize" }}
                  >
                    Home
                  </Text>
                </Button>
                <Button vertical onPress={() => Actions.Menu()}>
                  <Icon_
                    name="building"
                    color="#b7b7b7"
                    style={{ color: "#b7b7b7", fontSize: 24 }}
                  />
                  <Text
                    style={{
                      color: "#b7b7b7",
                      textTransform: "capitalize",
                      width: 110,

                      textAlign: "center",
                    }}
                  >
                    Progress
                  </Text>
                </Button>
                {/* <Button vertical onPress={() => Actions.Menu()}> */}
                <Button vertical onPress={() => Actions.NewsPage()}>
                  <Icon_
                    name="newspaper-o"
                    style={{ color: "#b7b7b7", fontSize: 24 }}
                  />
                  <Text
                    style={{ color: "#b7b7b7", textTransform: "capitalize" }}
                  >
                    News
                  </Text>
                </Button>

                {this.state.cntNotif != 0 ? (
                  this.state.cntNotif[0].jumlahnotif > 0 ? (
                    <Button badge vertical onPress={() => Actions.notif()}>
                      <Badge style={{ top: 5 }}>
                        <Text>{this.state.cntNotif[0].jumlahnotif}</Text>
                      </Badge>

                      <Icon_
                        name="bell"
                        style={{ color: "#b7b7b7", fontSize: 24, bottom: 5 }}
                      />
                      <Text
                        style={{
                          color: "#b7b7b7",
                          textTransform: "capitalize",
                          bottom: 5,
                          width: 110,

                          textAlign: "center",
                        }}
                      >
                        Notification
                      </Text>
                    </Button>
                  ) : (
                    <Button vertical onPress={() => Actions.notif()}>
                      <Icon_
                        name="bell"
                        style={{ color: "#b7b7b7", fontSize: 24 }}
                      />
                      <Text
                        style={{
                          color: "#b7b7b7",
                          textTransform: "capitalize",
                          width: 110,

                          textAlign: "center",
                        }}
                      >
                        Notification
                      </Text>
                    </Button>
                  )
                ) : (
                  <Button vertical onPress={() => Actions.notif()}>
                    <Icon_
                      name="bell"
                      style={{ color: "#b7b7b7", fontSize: 24 }}
                    />
                    <Text
                      style={{
                        color: "#b7b7b7",
                        textTransform: "capitalize",
                        width: 110,

                        textAlign: "center",
                      }}
                    >
                      Notification
                    </Text>
                  </Button>
                )}

                {/* dibawah ini adalah pushdata dari firebase */}
                {/* {this.state.badge_notif_db > 0 ? (
                  <Button badge vertical onPress={() => Actions.notif()}>
                    <Badge style={{ top: 8 }}>
                      <Text>{this.state.badge_notif_db[0].jumlahnotif}</Text>
                    </Badge>

                    <Icon_
                      name="bell"
                      style={{ color: "#b7b7b7", fontSize: 24 }}
                    />
                    <Text
                      style={{ color: "#b7b7b7", textTransform: "capitalize" }}
                    >
                      Notification
                    </Text>
                  </Button>
                ) : (
                  <Button badge vertical onPress={() => Actions.notif()}>
                    <Icon_
                      name="bell"
                      style={{ color: "#b7b7b7", fontSize: 24 }}
                    />
                    <Text
                      style={{ color: "#b7b7b7", textTransform: "capitalize" }}
                    >
                      Notification
                    </Text>
                  </Button>
                )} */}
                <Button vertical>
                  <Icon_
                    name="user"
                    style={{ color: "#AB9E84", fontSize: 24 }}
                  />
                  <Text
                    style={{ color: "#AB9E84", textTransform: "capitalize" }}
                  >
                    Profile
                  </Text>
                </Button>
              </FooterTab>
            </Footer>
          </ImageBackground>
        </Container>
      );
    } else {
      return (
        <ImageBackground
          style={Styles.backgroundImage}
          source={require("../Images/Alert01-min.png")}
        >
          <View
            style={{
              position: "absolute",
              bottom: 140,
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <Button style={Styles.btnSmall_2} onPress={() => this.signin()}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1,
                  textTransform: "capitalize",
                }}
              >
                Sign In
              </Text>
            </Button>
            <Button style={Styles.btnSmall_2} onPress={() => this.signin()}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1,
                  textTransform: "capitalize",
                }}
              >
                Sign Up
              </Text>
            </Button>
          </View>
        </ImageBackground>
      );
    }
  }
}

const colors = {
  iosSettingsBackground: "rgb(235,235,241)",
  white: "#FFFFFF",
  monza: "#C70039",
  switchEnabled: Platform.OS === "android" ? "#C70039" : null,
  switchDisabled: Platform.OS === "android" ? "#efeff3" : null,
  switchOnTintColor: Platform.OS === "android" ? "rgba(199, 0, 57, 0.6)" : null,
  blueGem: "#27139A",
};
