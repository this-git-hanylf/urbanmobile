/*This is an example of React Native App Intro Slider */
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
  Dimensions,
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
import styles from "../Intro/styles";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
// import FBLoginButton from "../components/LoginFB";
import GoogleLoginButton from "../components/LoginGoogle";
import { Colors, Fonts } from "../Themes";
import { Overlay } from "react-native-elements";

let isMount = false;

import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";

var PushNotification = require("react-native-push-notification");

import { Linking } from "react-native";
import VersionCheck from "react-native-version-check";

// VersionCheck.getCountry().then((country) => console.log(country)); // KR
// console.log("package name", VersionCheck.getPackageName()); // com.reactnative.app
// console.log("build number", VersionCheck.getCurrentBuildNumber()); // 10
// console.log("current version", VersionCheck.getCurrentVersion()); // 0.1.1

// VersionCheck.getLatestVersion().then((latestVersion) => {
//   console.log("lates version", latestVersion); // 0.1.2
// });

// VersionCheck.getLatestVersion({
//   provider: "appStore", // for iOS
// }).then((latestVersion) => {
//   console.log(latestVersion); // 0.1.2
// });

// VersionCheck.getLatestVersion({
//   provider: "playStore", // for Android
// }).then((latestVersion) => {
//   console.log("lates version playstore", latestVersion); // 0.1.2
// });

// VersionCheck.getLatestVersion() // Automatically choose profer provider using `Platform.select` by device platform.
//   .then((latestVersion) => {
//     console.log(latestVersion); // 0.1.2
//   });

// VersionCheck.getLatestVersion({
//   forceUpdate: true,
//   provider: () =>
//     fetch("http://your.own/api")
//       .then((r) => r.json())
//       .then(({ version }) => version), // You can get latest version from your own api.
// }).then((latestVersion) => {
//   console.log(latestVersion);
// });

// VersionCheck.needUpdate().then(async (res) => {
//   console.log(res.isNeeded); // true
//   console.log("store url", res.storeUrl);
//   if (res.isNeeded) {
//     Linking.openURL(res.storeUrl); // open store if update is needed.
//   }
// });

// VersionCheck.needUpdate({
//   depth: 2,
// }).then((res) => {
//   console.log(res.isNeeded);
//   // false; because first two fields of current and the latest versions are the same as "0.1".
// });

// VersionCheck.needUpdate({
//   currentVersion: "1.0",
//   latestVersion: "2.0",
// }).then((res) => {
//   console.log(res.isNeeded); // true
// });

// VersionCheck.needUpdate({
//   depth: 1,
//   currentVersion: "2.1",
//   latestVersion: "2.0",
// }).then((res) => {
//   console.log(res.isNeeded); // false
// });

//import AppIntroSlider to use it
export default class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: true, //To show the main page of the app
      isLoaded: true,

      email: "",
      password: "",
      isHide: false,
      isLogin: false,
      userDetails: "",
      GoogleLogin: false,
      Alert_Visibility: false,
      pesan: "",
      Alert_CheckVersion: false,
      pesan_ver: "",
      Alert_CheckOSVersion: false,
      pesan_OSver: "",
      msg: "",
      token: "",
      current_version: "1.0.37", // harus di isi samain kayak di package.json
      currentVersion: null,
      latestVersion: null,
      isNeeded: false,
      storeUrl: "",
    };
  }
  async componentWillMount() {
    isMount = true;

    this.requestStorage();
    this.tes();
    // this.getVersion();
  }

  requestStorage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "IFCA S + want to acces your storage",
          message: "Please be careful with agreement permissions ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async componentDidMount() {
    const isIntro = await _getData("@isIntro");
    this.setState({ showRealApp: isIntro });

    //cek versi app
    VersionCheck.getLatestVersion() // Automatically choose profer provider using `Platform.select` by device platform.
      .then((latestVersion) => {
        this.setState({ latestVersion: latestVersion });
        console.log(latestVersion); // 0.1.2
      });
    // dan cek update app
    VersionCheck.needUpdate({
      latestVersion: this.state.latestVersion,
    }).then((res) => {
      this.setState(res);
      console.log("res need updaate", res);
      console.log("res store url", res.storeUrl);
      if (this.state.isNeeded == true) {
        this.setState({ storeUrl: res.storeUrl });
        const pesan_ver = "Updates ready to install";
        const msg = "Some apps could not be updated automatically.";
        this.alertCheckVersion(true, pesan_ver, msg);
      }
    });
    //tutup cek versi app

    //cek versi device / android version
    let systemVersion = DeviceInfo.getSystemVersion();
    console.log("systemVersion", systemVersion);
    if (systemVersion < "8") {
      // alert("This Available Version Android 8 or Later");
      const pesan_OSver = "Information";
      const msg_os = "This Available Version Android 8 or Later";
      this.alertCheckOSVersion(true, pesan_OSver, msg_os);
    }
  }

  alertCheckVersion(visible, pesan_ver, msg) {
    this.setState({
      Alert_CheckVersion: visible,
      pesan_ver: pesan_ver,
      msg: msg,
    });
  }

  alertCheckOSVersion(visible, pesan_OSver, msg_os) {
    this.setState({
      Alert_CheckOSVersion: visible,
      pesan_OSver: pesan_OSver,
      msg_os: msg_os,
    });
  }

  componentWillUnmount() {
    isMount = false;
  }

  clickHome() {
    Actions.tabbar();
    this.setState({ click: true });
  }

  _onDone = () => {
    this.setState({ showRealApp: true }, () => {
      _storeData("@isIntro", true);
    });
  };

  _onSkip = () => {
    this.setState({ showRealApp: true }, () => {
      _storeData("@isIntro", true);
    });
  };

  btnLoginClick = async () => {
    const mac = await DeviceInfo.getMACAddress().then((mac) => {
      return mac;
    });
    console.log("token_fire", this.state.token_fire);
    const formData = {
      email: this.state.email,
      password: this.state.password,
      token: "",
      // token_firebase: "",
      token_firebase: this.state.token_fire, //nottif
      device: Platform.OS,
      mac: mac,
    };
    var lengthPass = this.state.password.length;
    if (lengthPass < 4) {
      alert("Wrong password !!!");
    } else {
      this.setState({ isLogin: true }, () => {
        this.doLogin(formData);
      });
    }
  };

  getVersion() {
    fetch(urlApi + "c_auth/getVersion/IFCAMOBILE/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res", res);
        if (res.Error === false) {
          let resData = res.Data;
          console.log("res version", resData);
          const db_version = resData[0].version;
          const link_update = resData[0].link_update;
          this.setState({ db_version: db_version, link_update: link_update });
          if (this.state.current_version != db_version) {
            alert("you must update");
          } else {
            console.log("you are updated");
          }
          // let data = [];
          // resData.map((item) => {
          //   let items = {
          //     ...item,
          //     illustration: item.picture_url,
          //     title: item.project_descs,
          //     subtitle: item.db_profile + item.project_no,
          //   };
          //   data.push(items);
          // });

          // result["UserProject"] = data;
          // this.signIn(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  tes() {
    const messaging = firebase.messaging();

    messaging
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          messaging
            .getToken()
            .then((token) => {
              console.log(token);
              this.setState({
                token_fire: token,
              });
            })
            .catch((error) => {
              /* handle error */
            });
        } else {
          messaging
            .requestPermission()
            .then(() => {
              /* got permission */
            })
            .catch((error) => {
              /* handle error */
            });
        }
      })
      .catch((error) => {
        /* handle error */
      });

    firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      PushNotification.localNotification({
        title: title,
        message: body, // (required)
      });
    });

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
        // this.setState({
        //   token_fire: token,
        // });
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      // senderID: '945884059945',
      // popInitialNotification: true,
      // requestPermissions: true,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }

  doLogin(value) {
    console.log("formdata ada tokennya", value);
    this.setState({ isLoaded: !this.state.isLoaded });
    data = JSON.stringify(value);

    fetch(urlApi + "c_auth/Login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          if (res.Data.isResetPass != 1) {
            this.getTower(res);
            this.getCountNotif(res);
            this.setState({ isLoaded: !this.state.isLoaded });
            // this.skipLoginBlank();
          } else {
            this.setState({ isLoaded: !this.state.isLoaded });
            Actions.ResetPass({ email: res.Data.user });
          }
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            // alert(res.Pesan);
            const pesan = res.Pesan;
            this.alertFillBlank(true, pesan);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoaded: !this.state.isLoaded }, () => {
          alert(error);
        });
      });
  }

  skipLoginBlank = () => {
    Actions.SkipLoginBlank();
  };

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  doLoginSosMed = async (data) => {
    data.ipAddress = await DeviceInfo.getIPAddress().then((mac) => mac);

    console.log("data", data);

    fetch(urlApi + "c_auth/LoginWithSosmed", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // body: data
    })
      .then((response) => response.json())
      .then((res) => {
        // try {
        if (res.Error && res.olduser) {
          // this.setState({ isLoaded: !this.state.isLoaded }, () => {
          // alert(res.Pesan);
          const pesan = res.Pesan;
          this.alertFillBlank(true, pesan);
          // alert("udah pernah regis");
          // });
        } else {
          Actions.SignupGuest({ sosmed: true, data });
        }

        // if (res.Error) {
        //   console.log("error", res.Error);
        //   alert(res.Pesan);
        //   // this.setState({ isLogin: true }, () => {
        //   //   // this.getTower(res);
        //   //   this.skipLoginBlank();
        //   // });
        // } else {
        //   console.log("error", res.Error);
        //   Actions.SignupGuest({ sosmed: true, data });
        //   // this.setState({ isLoaded: !this.state.isLoaded });
        //   // this.skipLoginBlank();
        // }
        // } catch (error) {
        //   console.log("error", error);
        // }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoaded: !this.state.isLoaded }, () => {
          alert(error);
        });
      });
  };

  getTower = (res) => {
    let result = res.Data;
    const email = result.user;
    fetch(urlApi + "c_product_info/getData/IFCAMOBILE/" + email + "/S", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res", res);
        if (res.Error === false) {
          let resData = res.Data;
          let data = [];
          resData.map((item) => {
            let items = {
              ...item,
              illustration: item.picture_url,
              title: item.project_descs,
              subtitle: item.db_profile + item.project_no,
            };
            data.push(items);
          });

          result["UserProject"] = data;
          this.signIn(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCountNotif = (res) => {
    let result = res.Data;
    const email = result.user;
    console.log("email buat count", email);
    fetch(urlApi + "c_notification/getNotificationBadge/IFCAMOBILE/" + email, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res notif di intro", res);
        if (res.Error === false) {
          let resData = res.Data;
          let data = [];
          // console.log("resdata", resData);
          resData.map((item) => {
            let items = {
              // ...item,
              jumlahnotif: item.cnt,
            };
            data.push(items);
          });

          result["CountNotif"] = data;
          console.log("count notif di intro", data);
          this.signIn(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  signIn = async (res) => {
    try {
      _storeData("@DashMenu", res.DashMenu);
      _storeData("@UserId", res.UserId);
      _storeData("@Name", res.name);
      _storeData("@Token", res.Token);
      _storeData("@User", res.user);
      _storeData("@Group", res.Group);
      _storeData("@Handphone", res.handphone);
      _storeData("@isLogin", this.state.isLogin);
      _storeData("@isReset", res.isResetPass);
      _storeData("@AgentCd", res.AgentCd);
      _storeData("@Debtor", res.Debtor_acct);
      _storeData("@rowID", res.rowID);
      _storeData("@RefreshProfile", false);
      _storeData("@UserProject", res.UserProject);
      _storeData("@CountNotif", res.CountNotif);
    } catch (err) {
      console.log("error:", err);
    } finally {
      this.setState({ isLoaded: true }, () => {
        Actions.reset("tabbar");
      });
    }
  };

  skipLogin = async () => {
    const mac = await DeviceInfo.getMACAddress().then((mac) => {
      return mac;
    });

    const formData = {
      email: "guest@ifca.co.id",
      password: "pass1234",
      token: "",
      token_firebase: "",
      device: Platform.OS,
      mac: mac,
    };
    this.setState({ isLogin: false }, () => {
      this.doLogin(formData);
    });
  };

  skipLoginBlank = () => {
    Actions.SkipLoginBlank();
  };

  signInGoogle = (data) => {
    this.doLoginSosMed(data);
  };

  signInFacebook = async (data) => {
    this.doLoginSosMed(data);
  };
  _renderNextButton = () => {
    return (
      <View style={styles.bottom_next}>
        <Text style={styles.title_next}>SKIP</Text>
      </View>
    );
  };
  _renderSkipButton = () => {
    return (
      <View>
        <Text style={styles.title_skip}>Skip</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.bottom_next}>
        <Text style={styles.title_next}>MULAI</Text>
      </View>
    );
  };
  _activeDotStyle = () => {
    <View>
      <Text style={{ color: "red" }}></Text>
    </View>;
  };

  //   _renderDefaultButton = () => {
  //     return (
  //         <View style={{backgroundColor: '#000'}}>
  //             <Text style={styles.title_done}>
  //                 Skip
  //             </Text>
  //         </View>

  //     );
  //   };

  render() {
    // let BG_Image = { uri : 'https://antiqueruby.aliansoftware.net/Images/signin/ic_main_bg_stwo.png'};
    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return (
        <Container>
          <ImageBackground
            style={[styles.backgroundImage, styles.fixedBackground]}
            source={require("../Images/urban-home-min.jpg")}
          >
            <Header style={styles.header}>
              <Left style={styles.left}></Left>
              <Body style={styles.body}></Body>
              <Right style={styles.right}></Right>
            </Header>
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
                    height: "30%",
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
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            {/* alert check version */}
            <Modal
              visible={this.state.Alert_CheckVersion}
              transparent={true}
              animationType={"slide"}
              // style={{ width: 100 }}
              onRequestClose={() => {
                this.alertCheckVersion(
                  !this.state.Alert_CheckVersion,
                  pesan_ver
                );
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
                    width: "75%",
                    height: "25%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 15,
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
                    {this.state.pesan_ver}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.type.proximaNovaReg,
                      fontSize: 17,
                      paddingBottom: 15,
                      color: Colors.black,
                      textAlign: "center",
                    }}
                  >
                    {this.state.msg}
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
                        Linking.openURL(this.state.storeUrl);
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>Update</Text>
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
                        this.alertCheckVersion(!this.state.Alert_CheckVersion);
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>Later</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            {/* alert check os version */}
            <Modal
              visible={this.state.Alert_CheckOSVersion}
              transparent={true}
              animationType={"slide"}
              // style={{ width: 100 }}
              onRequestClose={() => {
                this.alertCheckOSVersion(
                  !this.state.Alert_CheckOSVersion,
                  pesan_OSver
                );
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
                    width: "75%",
                    height: "25%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 15,
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
                    {this.state.pesan_OSver}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.type.proximaNovaReg,
                      fontSize: 17,
                      paddingBottom: 15,
                      color: Colors.black,
                      textAlign: "center",
                    }}
                  >
                    {this.state.msg_os}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignContent: "space-around",
                    }}
                  >
                    {/* <TouchableOpacity
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
                        Linking.openURL(this.state.storeUrl);
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>Update</Text>
                    </TouchableOpacity> */}
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
                        this.alertCheckOSVersion(
                          !this.state.Alert_CheckOSVersion
                        );
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>Ok</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <View style={styles.inputFieldStyles}>
              <View style={{ width: 300, height: 100, marginBottom: 65 }}>
                <Image
                  // style={styles.images}
                  style={styles.styleLogo}
                  source={require("../Images/logo4.png")}
                />
              </View>

              <View style={styles.containEmail}>
                <Input
                  ref="email"
                  style={styles.inputEmail}
                  editable={true}
                  onChangeText={(val) => this.setState({ email: val })}
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  placeholder="Your username or email"
                  placeholderTextColor="#7d7d7d"
                />
              </View>
              {/* <View style={styles.divider} /> */}
              <View style={styles.containPassword}>
                <Input
                  ref="password"
                  style={styles.inputEmail}
                  editable={true}
                  onChangeText={(val) => this.setState({ password: val })}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  placeholder="Your password"
                  placeholderTextColor="#7d7d7d"
                  secureTextEntry={!this.state.isHide}
                  value={this.state.password}
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
              <Button
                style={styles.signInBtnSmall}
                onPress={() => this.btnLoginClick()}
              >
                {!this.state.isLoaded ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.signInBtnText}>Sign in</Text>
                )}
              </Button>

              <View style={{ paddingTop: 20, paddingBottom: 15 }}>
                <TouchableOpacity onPress={() => Actions.forgotPass()}>
                  <Text style={styles.forgotPassword}>Forgot Password</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <Text
                            style={styles.forgotPassword}
                        >
                            OR
                        </Text> */}
            <View style={styles.signInGoogle}>
              {/* <GoogleLoginButton onPress={this.signInGoogle} /> */}
              {/* <FBLoginButton onPress={this.signInFacebook} /> */}
            </View>
            <View style={styles.socialSec}>
              <TouchableOpacity onPress={() => Actions.chooseRegist()}>
                <Text style={styles.fbButtonText}>
                  New here? Register Agent
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.skiplog}>
              <TouchableOpacity
                style={styles.textRight}
                onPress={() => this.props.navigation.navigate("Guest")}
              >
                <Text
                  style={styles.fbButtonText}
                  onPress={() => this.skipLogin()}
                >
                  Skip Log in
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Container>
      );
    } else {
      return (
        <AppIntroSlider
          // dotStyle={{backgroundColor: 'red'}}
          activeDotStyle={{ backgroundColor: Colors.navyUrban }}
          slides={slides}
          bottomButton
          // buttonStyle={styles.bottom_Button}
          // buttonTextStyle={styles.bottom_text_Button}
          // renderDefaultButton={this._renderDefaultButton}

          // renderItem={this._renderItem}
          // activeDotStyle={{borderColor: 'red'}}
          onDone={this._onDone}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          // renderSkipButton={this._renderSkipButton}
          // showSkipButton={true}
          // showNextButton={false}
          // showNextButton={false}
          // onSkip={this._onSkip}
        />
      );
    }
  }
}

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
        // this.setState({ token_fire: token });
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("REMOTE NOTIFICATION ==>", notification);
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: "945884059945",
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  return null;
};

const slides = [
  {
    key: "s1",
    text:
      "Agent sales dapat melakukan penjualan Priority Pass secara online untuk customer yang ingin menggunakan pembayaran secara online.",
    title: "PENJUALAN PRIORITY PASS",
    titleStyle: styles.title_urban,
    textStyle: styles.text_urban,
    image: require("@Asset/images/walktrough/urban_sky.png"),
    // image:  require('@Asset/icon/save_file.png'),
    // imageStyle: styles.image,
    imageStyle: styles.images_urban,
    backgroundColor: Colors.white,
    width: 200,
    height: 200,
    // bottomSpacer:
    //
    bottomSpacer: styles.bottom_Spacer,
    // topSpacer: styles.top_Spacer
    // buttonStyle: styles.bottom_Button,
    // buttonTextStyle: styles.text_urban
    // backgroundColor: Colors.grey
  },
  {
    key: "s2",
    title: "PRODUK",
    titleStyle: styles.title_urban,
    textStyle: styles.text_urban,
    text:
      "Aplikasi ini dilengkapi dengan fitur untuk melihat denah lokasi, unit, diagramatic, dan sebagainya untuk menjamin unit yang paling cocok sebagai pilihan customer.",
    image: require("@Asset/images/walktrough/unit_plan.png"),
    // image: {
    //     uri:
    //         "http://aboutreact.com/wp-content/uploads/2018/08/flight_ticket_booking.png"
    // },
    imageStyle: styles.images_urban,
    // backgroundColor: "#febe29"
    backgroundColor: Colors.white,
  },
  {
    key: "s3",
    title: "NEWS",
    titleStyle: styles.title_urban,
    textStyle: styles.text_urban,
    text:
      "Aplikasi Urban Jakarta juga digunakan untuk membagi informasi mengenai produk dan berbagai promosi menarik lainnya.",
    image: require("@Asset/images/walktrough/nup_regis.png"),
    // image: {
    //     uri:
    //         "http://aboutreact.com/wp-content/uploads/2018/08/discount1.png"
    // },
    imageStyle: styles.images_urban,
    // backgroundColor: "#22bcb5"
    backgroundColor: Colors.white,
  },
];
