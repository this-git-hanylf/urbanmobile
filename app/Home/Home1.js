import React, { Component, useState, useEffect } from "react";
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
  DeviceEventEmitter,
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
import { Fonts } from "../Themes/";
import { ENTRIES1, ENTRIES2 } from "./static/entries";
import { scrollInterpolators, animatedStyles } from "./utils/animations";
import CardSlide from "../components/CardSlide";
const { height, width } = Dimensions.get("window");
import { urlApi } from "@Config/services";
import { _storeData, _getData } from "@Component/StoreAsync";
import { Actions } from "react-native-router-flux";
import Styles from "./Style";
const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 0;
import SIMILAR from "../Property/Similar";
import ImageResizeMode from "react-native/Libraries/Image/ImageResizeMode";

// import { fcmService } from "../components/FCMService";
// import DeviceInfo from "react-native-device-info";

import firebase from "react-native-firebase";

var PushNotification = require("react-native-push-notification");

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
      device: "",
      token: "",

      isCorLoaded: false,
    };
    this.fcmNotification = null;
  }
  onPress = () => {
    PushNotification.localNotification({
      /* iOS and Android properties */
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
    });
  };

  componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  async componentDidMount() {
    console.log("Data Project", await _getData("@UserProject"));
    const data = {
      email: await _getData("@User"),
      name: await _getData("@Name"),
      dataTower: await _getData("@UserProject"),
      isCorLoaded: true,
    };

    this.setState(data, () => {
      this.getPromo();
      this.getNews();
      // this.checkPermission();
      // this.messageListener();
    });
  }

  // componentDidMount() {
  //    this.fcmNotification = fcmService
  //   this.fcmNotification.register(this.onRegister, this.onNotification, this.onOpenNotification)

  // }

  //  onRegister(token) {
  //   console.log("[NotificationFCM] onRegister: ", token)
  // }

  // onNotification(notify) {
  //   console.log("[NotificationFCM] onNotification: ", notify)

  //   const channelObj = {
  //     channelID: "SampleChannelID",
  //     channelName: "SampleChannelName",
  //     channelDes: "SampleChannelDes"
  //   }
  //   const channel = this.fcmNotification.buildChannel(channelObj)
  // }

  // onOpenNotification(notify) {
  //   console.log("[NotificationFCM] onNotification: ", notify)

  // }

  // checkPermission = async () => {
  //   const enabled = await firebase.messaging().hasPermission();
  //   if (enabled) {
  //       this.getFcmToken();
  //   } else {
  //       this.requestPermission();
  //   }
  // }

  // getFcmToken = async () => {
  //   const fcmToken = await firebase.messaging().getToken();
  //   if (fcmToken) {
  //     console.log('tokenfirebase',fcmToken);
  //     this.showAlert('Your Firebase Token is:', fcmToken);
  //   } else {
  //     this.showAlert('Failed', 'No token received');
  //   }
  // }

  // requestPermission = async () => {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorised
  //   } catch (error) {
  //       // User has rejected permissions
  //   }
  // }

  // messageListener = async () => {
  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
  //       const { title, body } = notification;
  //       this.showAlert(title, body);
  //   });

  //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //       const { title, body } = notificationOpen.notification;
  //       this.showAlert(title, body);
  //   });

  //   const notificationOpen = await firebase.notifications().getInitialNotification();
  //   if (notificationOpen) {
  //       const { title, body } = notificationOpen.notification;
  //       this.showAlert(title, body);
  //   }

  //   this.messageListener = firebase.messaging().onMessage((message) => {
  //     console.log(JSON.stringify(message));
  //   });
  // }

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

          <View style={{ marginLeft: 20, marginRight: 20 }}>
            {/* <Item style={styles.marginround}  > */}
            <Item
              style={styles.marginround}
              onPress={() => this.handleNavigation()}
            >
              <View
                editable={false}
                placeholder="Find a residence"
                value={this.state.tes}
                onPress={() => this.handleNavigation()}
                style={{
                  fontFamily: this.state.tes
                    ? Fonts.type.proximaNovaThin
                    : Fonts.type.proximaNovaThin,
                  fontWeight: this.state.tes ? "100" : "400",
                  marginLeft: 20,
                  fontSize: 16,
                }}
              >
                <Text>Find a residence</Text>
              </View>
              <Icon
                style={{
                  color: colors.greyUrban,
                  bottom: 4,
                  position: "absolute",
                  right: 10,
                  fontSize: 26,
                }}
                name="search"
              />
            </Item>
          </View>
        </View>

        <View style={{ paddingVertical: 30 }}>
          <Text
            style={{
              color: colors.gold,
              fontFamily: Fonts.type.proximaNovaBoldWeb,
              letterSpacing: 1.5,
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
      </ImageBackground>
    );
  }
}

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
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "945884059945",

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
