import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
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
  Fab,
  Form,
  Label,
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "./styles/SliderEntry";
import SliderEntry from "../components/SlideEntry";
import styles, { colors } from "./styles/index";
import { Fonts } from "../Themes";
import { ENTRIES1, ENTRIES2 } from "./static/entries";
import { scrollInterpolators, animatedStyles } from "./utils/animations";
import CardSlide from "../components/CardSlide";
const { height, width } = Dimensions.get("window");
import { urlApi } from "@Config/services";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { Actions } from "react-native-router-flux";
import Styles from "./Style";
const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 0;
import SIMILAR from "../Property/Similar";
import ImageResizeMode from "react-native/Libraries/Image/ImageResizeMode";
import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";
import Siren from "react-native-siren";
import NotifService from "../components/NotifService";
var PushNotification = require("react-native-push-notification");
import Icon_ from "react-native-vector-icons/FontAwesome";
//manggil notifservice yang ditaro di componen.

// const versionSpecificRules = [
//   {
//     localVersion: "3.1.1",
//     forceUpgrade: true,
//     title: "Update your app now",
//     message:
//       "This version contains a bug that might corrupt your data. You must update to be able to use our app.",
//   },
// ];
// const defaultOptions = {
//   title: "Urban Jakarta has a new update!",
// };
// Siren.promptUser(defaultOptions, versionSpecificRules);

// // or

// Siren.performCheck().then(({ updateIsAvailable }) => {
//   if (updateIsAvailable) {
//     showCustomUpdateModal();
//   }
//   console.log("siren");
// });

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      name: "",
      email: "",
      dataTower: [],
      dataPromo: [],
      dataNews: [],
      tes: "",
      klikt: true,
      cntNotif: "",
      isCorLoaded: false,
      token: "",
      pushData: [],
      // badge_notif_db: await _getData("@CountNotif")
    };

    // buat di notif
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this)
    );
  }
  onPress = () => {
    PushNotification.localNotification({
      /* iOS and Android properties */
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
    });
  };
  onRegister(token) {
    this.setState({
      registerToken: token.token,
      fcmRegistered: true,
    });
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }
  async componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }

    // this.props.onBack();
  }
  // componentWillReceiveProps(props) {
  //   console.log("props cntnotif dari notif", )
  //   // // props dari B
  //   // console.log("props back", props.lemparDataCnt);
  //   // // const count = props.lemparDataCnt;
  //   // const count_notif_dari_home = props.lemparDataCnt;
  //   // console.log("count_notif_dari_home", count_notif_dari_home);

  //   // this.setState({ isLoaded: true }, () => {
  //   //   Actions.reset("tabbar");
  //   // });

  //   // Actions.push("notif", count_notif_dari_home);
  // }

  async componentDidMount() {
    console.log("Data Project", await _getData("@UserProject"));
    console.log("Data Notif", await _getData("@CountNotif"));

    const data = {
      email: await _getData("@User"),
      name: await _getData("@Name"),
      dataTower: await _getData("@UserProject"),
      isCorLoaded: true,
      debtor_acct: await _getData("@Debtor"),
      // badge_notif_db: await _getData("@CountNotif"),
    };
    // const CountnotifdiHome = await _getData("@CountNotif");
    // console.log("count notif di home", CountnotifdiHome);
    // Actions.refresh("tabbar", {
    //   // klik: _storeData("@CountNotif", CountnotifdiHome),
    // });
    // _storeData("@CountNotif", CountnotifdiHome);
    // _storeData("@CountNotif", CountnotifdiHome);
    console.log('data di home', data);
    this.setState(data, () => {
      this.getPromo();
      this.getNews();
      this.getCountNotif();
      // this.checkPermission();
      // this.createNotificationListeners();
    });

    //notif dari firebase terbaru
    let self = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN di HOME:", token);

        // Actions.notif();
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION DI HOME:", notification);

        // process the notification here

        // required on iOS only
        // notification.finish(PushNotificationIOS.FetchResult.NoData);

        // process the notification
        self._addDataToList(notification);
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: "945884059945",
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
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

  //untuk ngambil data length notif dari firebase
  _addDataToList(data) {
    let array = this.state.pushData;
    array.push(data);
    _storeData("@ArrayPushDataLengthFirebase", array);
    this.setState({
      pushData: array,
    });
    console.log("adddatatolist", this.state.pushData);
  }

  // async checkPermission() {
  //   const enabled = await firebase.messaging().hasPermission();
  //   console.log("checkpermision", await firebase.messaging().hasPermission());
  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     // this.requestPermission();
  //     console.log("else");
  //   }
  // }

  // async getToken() {
  //   let fcmToken = await firebase.messaging().getToken();
  //   console.log("fcm token kalo null", fcmToken);
  //   // let fcmToken = await AsyncStorage.getItem("fcmToken");
  //   // console.log("fcmToken", await AsyncStorage.getItem("fcmToken"));
  //   // if (fcmToken == null || fcmToken == 0) {
  //   //   fcmToken = await firebase.messaging().getToken();
  //   //   console.log("fcm token kalo null", await firebase.messaging().getToken());
  //   //   if (fcmToken) {
  //   //     // user has a device token
  //   //     await AsyncStorage.setItem("token", fcmToken);
  //   //     console.log("fcmToken", fcmToken);
  //   //     // this.setState({
  //   //     //   token: fcmToken,
  //   //     // });
  //   //   }
  //   // }
  // }

  // async requestPermission() {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorised
  //     this.getToken();
  //   } catch (error) {
  //     // User has rejected permissions
  //     console.log("permission rejected");
  //   }
  // }

  // async createNotificationListeners() {
  //   firebase.notifications().setBadge(0);
  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification((notification) => {
  //       const { title, body } = notification;
  //       this.showAlert(title, body);
  //     });

  //   this.notificationOpenedListener = firebase
  //     .notifications()
  //     .onNotificationOpened((notificationOpen) => {
  //       const { title, body } = notificationOpen.notification;
  //       this.showAlert(title, body);
  //     });

  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   if (notificationOpen) {
  //     const { title, body } = notificationOpen.notification;
  //     this.showAlert(title, body);
  //   }

  //   this.messageListener = firebase.messaging().onMessage((message) => {
  //     console.log(JSON.stringify(message));
  //   });
  // }

  // showAlert = (title, message) => {
  //   Alert.alert(
  //     title,
  //     message,
  //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
  //     { cancelable: false }
  //   );
  // };
  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  getPromo = () => {
    fetch(urlApi + "c_newsandpromo/getDatapromo2/IFCAMOBILE", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataPromo: resData });
          console.log("dataPRopmo", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getNews = () => {
    fetch(urlApi + "c_newsandpromo/getDatanews2/IFCAMOBILE", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataNews: resData });
          console.log("dataNews", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // _renderItem({ item, index }) {
  //   return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  // }

  _renderItemPromo({ item, index }, parallaxProps) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => Actions.NewsAndPromoDetail({ items: item })}
      >
        <ParallaxImage
          source={{ uri: item.picture }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View style={styles.newsTitle}>
          <Text style={styles.newsTitleText} numberOfLines={2}>
            {item.subject}
          </Text>
          <Text style={styles.newsTitleText_small}>{item.descs}</Text>
        </View>
        {/* <View style={styles.newsTitle_small}>
              <Text style={styles.newsTitleText_small} numberOfLines={2}>
                  { item.descs }
              </Text>
            </View> */}
      </TouchableOpacity>
    );
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        onPress={() => Actions.propertydetail({ items: item })}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  handleNavigation = () => {
    // alert('Coming soon');
    // console.log('itrem',item);
    Actions.ChooseLocation();
    // this.goToScreen("screen.CategoryHelp");
    // this.setState({ isDisabled: true }, () => {
    //     if (this.state.appType == "") {
    //         this.goToScreen("screen.CategoryHelp");
    //     } else {
    //         this.goToScreen("screen.SubmitHelpDesk");
    //     }
    // });
  };

  mainExample(number, title) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        {/* //??? Di Matiin Belum nemu Solusi Biar ke refresh */}
        {/* <Text style={styles.title}>Hey {this.state.name}</Text> */}
        {/* <Text style={styles.title}>Urban Jakarta Propertindo</Text>
        <Text style={styles.subtitle}>{`This is what you need!`}</Text> */}

        <View style={{ flexDirection: "column" }}>
          <ImageBackground
            style={styles.backgroundImage2}
            source={require("../Images/tes3copy.png")}
          >
            <Text
              style={{
                color: "#fff",
                top: "15%",
                alignItems: "center",
                alignContent: "center",
                alignSelf: "center",
                fontSize: 20,
              }}
            >
              Hello {this.state.name}
            </Text>
          </ImageBackground>

          {/* <Button
            onPress={this.notif.scheduleNotif("my_sound.mp3", {
              fullName: this.state.fullname,
            })}
          >
            <Text>tes</Text>
          </Button> */}
          <View style={{ marginLeft: 20, marginRight: 20 }}>
            {/* <Item style={styles.marginround}  > */}
            <Item
              style={styles.marginround}
              onPress={() => this.handleNavigation()}
            >
              <Input
                editable={false}
                placeholder="Find a residence"
                value={this.state.tes}
                style={{
                  fontFamily: this.state.tes
                    ? Fonts.type.proximaNovaBold
                    : Fonts.type.proximaNovaBold,
                  fontWeight: this.state.tes ? "100" : "400",
                  marginLeft: 20,
                  fontSize: 17,
                }}
              ></Input>
              {/* <Icon
                style={{
                  color: colors.greyUrban,
                  bottom: 4,
                  position: "absolute",
                  right: 10,
                  fontSize: 26,
                }}
                name="search"
              /> */}
            </Item>
          </View>
        </View>

        <View style={{ paddingVertical: 30 }}>
          <Text
            style={{
              color: "#fff",
              fontFamily: Fonts.type.proximaNovaBold,
              letterSpacing: 2,
              alignItems: "center",
              textAlign: "center",
              paddingTop: 10,
              fontSize: 15,
            }}
          >
            DISCOVER
          </Text>
        </View>

        {/* <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            flex: 1,
            paddingRight: 16,
            marginTop: -20
          }}
        >
          <Button
            small
            rounded
            style={Styles.sBtnHead}
            onPress={()=>Actions.ListingProjectPage()}>
            <Text style={Styles.sLinkHead}>ALL PROJECT</Text>
          </Button>
        </View> */}

        {/* <Button
            small
            rounded
            style={Styles.sBtnHead}
            onPress={()=>Actions.ListingProjectPage()}>
            <Text style={Styles.sLinkHead}>ALL PROJECT</Text>
          </Button> */}

        <View style={styles.corContainerStyle}>
          {this.state.dataTower.length == 0 ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Carousel
              ref={(c) => (this._slider1Ref = c)}
              data={this.state.dataTower}
              renderItem={this._renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              firstItem={SLIDER_1_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              inactiveSlideShift={20}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={false}
              loopClonesPerSide={2}
              enableMomentum={false}
              lockScrollWhileSnapping={true}
              autoplay={false}
              autoplayDelay={1000}
              autoplayInterval={3000}
            />
          )}
        </View>
      </View>
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 0, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  renderItemNews(item) {
    return (
      <TouchableOpacity
        style={Styles.item}
        underlayColor="transparent"
        onPress={() => Actions.NewsAndPromoDetail({ items: item })}
      >
        <View>
          <View>
            <Image source={{ uri: item.picture }} style={Styles.itemImg} />
          </View>
          <Text style={Styles.itemPrice}>{item.descs}</Text>
          <Text style={Styles.itemLocation}>{item.subject}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderItemPromo(item) {
    return (
      <TouchableOpacity
        style={Styles.item}
        underlayColor="transparent"
        onPress={() => Actions.NewsAndPromoDetail({ items: item })}
      >
        <View>
          <View>
            <Image source={{ uri: item.picture }} style={Styles.itemImg} />
          </View>
          <Text style={Styles.itemPrice}>{item.descs}</Text>
          <Text style={Styles.itemLocation}>{item.subject}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const example1 = this.mainExample(1, "");
    // console.log("badge dari db", this.state.badge_notif_db[0].jumlahnotif);

    console.log("badge dari db1", this.state.badge_notif_db);
    // const example2 = this.momentumExample(2, 'Momentum | Left-aligned | Active animation');
    // const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
    // const example4 = this.layoutExample(4, '"Tinder-like" layout | Loop', 'tinder');
    // const example5 = this.customExample(5, 'Custom animation 1', 1, this._renderItem);
    // const example6 = this.customExample(6, 'Custom animation 2', 2, this._renderLightItem);
    // const example7 = this.customExample(7, 'Custom animation 3', 3, this._renderDarkItem);
    // const example8 = this.customExample(8, 'Custom animation 4', 4, this._renderLightItem);

    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../Images/background-blue.png")}
      >
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
          {/* {this.gradient} */}

          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            <ScrollView
              scrollEventThrottle={16}
              source={require("../Images/background-blue.png")}
            >
              <View style={{ flex: 1 }}>
                {/* <View style={Styles.sectionTransparent}>
                  <View style={Styles.headerBg}>
                    <Text style={Styles.sTitleWhite}>
                      {"Promo".toUpperCase()}
                    </Text>
                    <Right>
                      <Button
                        small
                        rounded
                        style={Styles.sBtn}
                        onPress={()=>Actions.Feed()}
                        >
                        <Text style={Styles.sLink}>See All</Text>
                      </Button>
                    </Right>
                  </View>
                  <Carousel
                    autoplay={true}
                    autoplayDelay={1000}
                    autoplayInterval={3000}
                    sliderWidth={width}
                    sliderHeight={width}
                    itemWidth={width - 60}
                    data={this.state.dataPromo}
                    renderItem={this._renderItemPromo}
                    hasParallaxImages={true}
                    // resizeMode={ImageResizeMode.contain}
                  />
                
                </View> */}

                {/* <View style={Styles.sectionTransparent}>
                  <View style={Styles.headerBg}>
                    <Text style={Styles.sTitleWhite}>
                      {"News".toUpperCase()}
                    </Text>
                    <Right>
                      <Button
                        small
                        rounded
                        style={Styles.sBtn}
                        onPress={()=>Actions.Feed()}>
                        <Text style={Styles.sLink}>See All</Text>
                      </Button>
                    </Right>
                  </View>
                  <FlatList
                    data={this.state.dataNews}
                    contentContainerStyle={Styles.flatList}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => this.renderItemNews(item)}
                  />
                </View> */}
              </View>
            </ScrollView>
          </ScrollView>
        </View>

        {/* footer navigasi */}
        <Footer>
          <FooterTab style={{ backgroundColor: "white" }}>
            <Button vertical>
              <Icon_
                name="home"
                color="#AB9E84"
                style={{ color: "#AB9E84", fontSize: 24 }}
              />
              <Text style={{ color: "#AB9E84", textTransform: "capitalize" }}>
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
              <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
                News
              </Text>
            </Button>

            {this.state.cntNotif != 0 ? (
              this.state.cntNotif[0].jumlahnotif > 0 ? (
                <Button
                  badge
                  vertical
                  onPress={() =>
                    Actions.notif({ pass_pushData: this.state.pushData })
                  }
                >
                  <Badge style={{ top: 5 }}>
                    <Text>{this.state.cntNotif[0].jumlahnotif}</Text>
                  </Badge>

                  <Icon_
                    name="bell"
                    style={{ color: "#b7b7b7", fontSize: 23, bottom: 5 }}
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
                    Notificationn
                  </Text>
                </Button>
              ) : (
                <Button
                  vertical
                  onPress={() =>
                    Actions.notif({ pass_pushData: this.state.pushData })
                  }
                >
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
                    Notificationn
                  </Text>
                </Button>
              )
            ) : (
              <Button
                vertical
                onPress={() =>
                  Actions.notif({ pass_pushData: this.state.pushData })
                }
              >
                <Icon_ name="bell" style={{ color: "#b7b7b7", fontSize: 24 }} />
                <Text
                  style={{
                    color: "#b7b7b7",
                    textTransform: "capitalize",
                    // fontSize: 10,
                    width: 110,

                    textAlign: "center",
                  }}
                >
                  Notification
                </Text>
              </Button>
            )}
            {/* dibawah ini pushdata dari Firebase */}
            {/* {this.state.pushData != 0 ? (
              <Button
                badge
                vertical
                onPress={() =>
                  Actions.notif({ pass_pushData: this.state.pushData })
                }
              >
                <Badge style={{ top: 8 }}>
                  <Text>{this.state.pushData.length}</Text>
                </Badge>

                <Icon_ name="bell" style={{ color: "#b7b7b7", fontSize: 24 }} />
                <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
                  Notification
                </Text>
              </Button>
            ) : (
              <Button badge vertical onPress={() => Actions.notif()}>
                <Icon_ name="bell" style={{ color: "#b7b7b7", fontSize: 24 }} />
                <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
                  Notification
                </Text>
              </Button>
            )} */}
            <Button vertical onPress={() => Actions.akun()}>
              <Icon_ name="user" style={{ color: "#b7b7b7", fontSize: 24 }} />
              <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
                Profile
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </ImageBackground>
    );
  }
}

// const RemotePushController = () => {
//   useEffect(() => {
//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function (token) {
//         console.log("TOKEN:", token);
//       },
//       // (required) Called when a remote or local notification is opened or received
//       onNotification: function (notification) {
//         console.log("REMOTE NOTIFICATION ==>", notification);
//         // process the notification here
//       },
//       // Android only: GCM or FCM Sender ID
//       senderID: "945884059945",
//       popInitialNotification: true,
//       requestPermissions: true,
//     });
//   }, []);
//   return null;
// };

const messaging = firebase.messaging();

messaging
  .hasPermission()
  .then((enabled) => {
    if (enabled) {
      messaging
        .getToken()
        .then((token) => {
          console.log(token);
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
    console.log("TOKEN NotiveService:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION on:", notification);

    console.log("number notif", notification.number);
    // Actions.reset("tabbar", { lempar_number: notification.number });
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION DI HOME:", notification.action);
    console.log("NOTIFICATION action DI HOME:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

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
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
