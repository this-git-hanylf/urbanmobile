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
  Modal,
  ActivityIndicator,
  Linking,
  Alert,
  YellowBox,
  // WebView
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

import { Actions } from "react-native-router-flux";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import { urlApi } from "@Config/services";
import GALLERY from "./Gallery";
import AMENITIES from "./Amenities";
import SIMILAR from "./Similar";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";

import { Style, Colors, Fonts } from "../Themes/index";
import Styles from "./Style";

import ImageViewer from "react-native-image-zoom-viewer";
import HTML from "react-native-render-html";
import Mailer from "react-native-mail";
import { WebView } from "react-native-webview";
import styles, { colors } from "./componen/index";
import { Col, Row, Grid } from "react-native-easy-grid";
import NavigationService from "@Service/Navigation";
import FooterTabsIconText from "@Component/BottomBar";
// import Routes from './../Router';
// import BottomBarDua from '@Component/BottomBarDua';
// import { sliderWidth, itemWidth } from "./componen/SliderEntry";
// import SliderEntry from "../components/SlideEntry";
// const { height, width } = Dimensions.get('window')

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const { height, width } = Dimensions.get("window");

let isMount = false;

const API_KEY = "AIzaSyBY0EdmxQjo65OoFYIlQZ8jQ1FS8VOTFC8";
// const API_KEY = "AIzaSyBFhdZb-_5FCA5IhbLhB9-KimWC_QlOKLs";

const IS_IOS = Platform.OS === "ios";

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.45;
const slideWidth = wp(62);
const itemHorizontalMargin = wp(4);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

class DetailAmenitiesMall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amenitis_title: "",
      amenitis_info: "",
      amenitis_url: "",
      stat: "M",
      gallery_1: require("@Asset/images/amenitis/mall/gallery1.jpg"),
      gallery_2: require("@Asset/images/amenitis/mall/gallery2.jpg"),
      periode_book: [],
      // require("@Asset/images/project_suite_urban.jpg")
    };

    console.log("props", props);
    this.nupBooking = this.nupBooking.bind(this); //add this line

    // this.renderItemNews = this.renderItemNews.bind(this);
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    Actions.refresh({ backTitle: () => this.props.title });

    const data = {
      group: await _getData("@Group"),
      hd: new Headers({
        Token: await _getData("@Token"),
      }),
    };
    console.log("dataIm", data);

    isMount = true;

    this.setState(data, () => {
      this.getDataAminities();
      this.getPeriodeBooking();
      // this.goTo()
    });
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

  getDataAminities = () => {
    const stat = this.state.stat;
    console.log("stat", stat);
    const item = this.props.items;
    console.log("item tower", item);
    {
      isMount
        ? fetch(
          urlApi +
          "c_reservation/getDataDetailsAmenitiesMall/" +
          item.db_profile +
          "/" +
          item.entity_cd +
          "/" +
          item.project_no +
          "/" +
          stat,
          {
            method: "GET",
            headers: this.state.hd,
          }
        )
          .then((response) => response.json())
          .then((res) => {
            if (!res.Error) {
              const resData = res.Data;
              console.log(resData);
              this.setState({ amen: resData });
            } else {
              this.setState({ isLoaded: !this.state.isLoaded }, () => {
                alert(res.Pesan);
              });
            }
            console.log("amenitis", res);
          })
          .catch((error) => {
            console.log(error);
          })
        : null;
    }
  };

  nupBooking = () => {
    // alert('tes')
    const data = this.props.items;
    console.log("lempar data", data);

    if (data) {
      Actions.NupBooking({ items: data });
      // alert('ada data');
      // console.log('da')
    }
    // else{
    //   alert('gada');
    // }
  };

  alertNUP = () => {
    Alert.alert(
      "Attention",
      "Please contact your agent for booking",
      [
        {
          text: "Close",
          onPress: () => console.log("Close"),
          style: "default",
        },
        // { text: "Camera", onPress: () => this.fromCamera() },
        // {
        //     text: "Cancel",
        //     onPress: () => console.log("User Cancel"),
        //     style: {backgroundColor: "#000"}
        // }
      ],
      { cancelable: false }
    );
  };

  getPeriodeBooking() {
    const item = this.props.items;
    // const prevItems = this.props.prevItems;
    // console.log('previtems periode', prevItems);
    console.log("item get periode", item);

    {
      isMount
        ? fetch(
          urlApi +
          "c_periode_book/getPeriode_propertydetail/" +
          item.db_profile +
          "/" +
          item.entity_cd +
          "/" +
          item.project_no,
          // +
          // "/" +
          // item.property_cd,
          // +
          // "/" +
          // start_date,
          // "/" +
          // item.product_cd,
          {
            method: "GET",
            headers: this.state.hd,
          }
        )
          .then((response) => response.json())
          .then((res) => {
            if (!res.Error) {
              const resData = res.Data;
              this.setState({ periode_book: resData });
            } else {
              this.setState({ isLoaded: !this.state.isLoaded }, () => {
                alert(res.Pesan);
              });
            }
            console.log("periode_book", res);
          })
          .catch((error) => {
            console.log(error);
          })
        : null;
    }
  }

  bookingnow() { // ngarah ke screen pilih tower
    const items = this.props.items;
    console.log("items buat ke choose tower", items);
    Actions.ProductProjectPage({ items: items }); //booking now yang lama
    // Actions.New_NupBookingBlock({ items: items }); //booking now yang baru, pilih block langsung
  }

  render() {
    // let feature = ''
    // if(this.state.feature){
    //   feature = this.state.feature[0].feature_info.replace(/<div class="col-md-6">|<\/div>|<\/b>|<b>|<ul class="list-unstyled">|<\/ul>/gi, '')
    //   feature = feature.replace(/<\/li>/gi,'\n')
    //   feature = feature.replace(/<li>/gi,'• ')
    //   feature = feature.replace(/<br>/gi,' ')
    // }

    return (
      <Container style={Style.bgMain}>
        <ImageBackground
          style={Styles.backgroundImage}
          source={require("../Images/background-blue.png")}
        >
          <StatusBar
            backgroundColor={Colors.statusBarNavy}
            animated
            barStyle="light-content"
            translucent={true}
          />

          {/* <Header style={Style.navigation}>
          
          <StatusBar backgroundColor={Colors.statusBarNavy} animated barStyle="light-content" />          
         
          <View style={Style.actionBarLeft}>
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
          </View>
          <View style={[Style.actionBarMiddle,{backgroundColor: 'transparent'}]}>
            <Text style={Style.actionBarText}>
              {this.state.title.toUpperCase()}
            </Text>
          </View>
            
        </Header> */}

          <ScrollView style={Styles.scroll}>
            {/* <View>
              <Image source={this.state.gallery_1}></Image>
            </View> */}
            {this.state.amen ? (
              <View style={{ top: 25 }}>
                <ImageBackground
                  source={{ uri: this.state.amen[0].amenities_url }}
                  // style={Styles.coverImg}
                  style={{ height: 700 }}
                >
                  <View style={{ paddingLeft: 15, paddingTop: 15 }}>
                    <Button
                      transparent
                      style={Style.actionBarBtn}
                      onPress={Actions.pop}
                    >
                      <Icon
                        active
                        name="arrow-left"
                        style={[Style.textWhite, { fontSize: 28 }]}
                        type="MaterialCommunityIcons"
                      />
                    </Button>
                  </View>

                  <View>
                    {this.state.amen ? (
                      <Text
                        style={{
                          fontWeight: "900",
                          color: "#FFFFFF",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        {this.state.amen[0].amenities_title}
                      </Text>
                    ) : null}
                    <Text
                      style={{
                        fontWeight: "900",
                        color: "#FFFFFF",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      Amenities
                    </Text>
                  </View>
                  {this.state.group !== "AGENT" ? (
                    <View style={{ paddingTop: "130%" }}>
                      <Button
                        style={Style.signInBtnMedium}
                        onPress={() => this.alertNUP()}
                      // onPress={() => this.nupBooking()}
                      >
                        <Text
                          style={{
                            width: "100%",
                            fontSize: 16,
                            alignItems: "center",
                            textAlign: "center",
                            fontFamily: Fonts.type.proximaNovaBold,
                            letterSpacing: 1,
                          }}
                        >
                          Booking Priority Pass
                        </Text>
                      </Button>
                    </View>
                  ) : (
                    <View style={{ paddingTop: "130%" }}>
                      {
                        this.state.periode_book ? (
                          this.state.periode_book != 0 ? (
                            <Button
                              style={Style.signInBtnMedium}
                              onPress={() =>
                                this.state.periode_book[0].booking_type == "BU"
                                  ? this.bookingnow()
                                  : this.nupBooking()
                              }
                            >
                              <Text
                                style={{
                                  width: "100%",
                                  fontSize: 16,
                                  alignItems: "center",
                                  textAlign: "center",
                                  fontFamily: Fonts.type.proximaNovaBold,
                                  letterSpacing: 1,
                                }}
                              >
                                {this.state.periode_book[0].booking_descs}
                              </Text>
                            </Button>
                          ) : (
                            <View style={{ paddingTop: "110%" }}>
                              <Button
                                style={Style.signInBtnMedium}
                                onPress={() => this.alertNUP()}
                              // onPress={() => this.nupBooking()}
                              >
                                <Text
                                  style={{
                                    width: "100%",
                                    fontSize: 16,
                                    alignItems: "center",
                                    textAlign: "center",
                                    fontFamily: Fonts.type.proximaNovaBold,
                                    letterSpacing: 1,
                                  }}
                                >
                                  Booking Priority Pass
                              </Text>
                              </Button>
                            </View>
                          )
                        ) : (
                          <ActivityIndicator />
                        )
                      }
                    </View>
                  )}
                </ImageBackground>
              </View>
            ) : (
              <ActivityIndicator />
            )}

            <View style={{ paddingTop: 30 }}>
              {this.state.amen ? (
                <Text
                  style={{
                    color: Colors.white,
                    textAlign: "center",
                    // alignContent:'center',
                    fontSize: 18,
                    paddingVertical: 10,

                    paddingHorizontal: 25,
                    fontFamily: Fonts.type.proximaNovaReg,
                    letterSpacing: 2,
                    lineHeight: 25,
                  }}
                >
                  {this.state.amen[0].amenities_info.replace(
                    /<\/?[^>]+(>|$)/g,
                    ""
                  )}
                </Text>
              ) : (
                <ActivityIndicator />
              )}
            </View>

            <View style={{ paddingTop: 30, paddingBottom: 20 }}>
              <Text style={[Styles.titleGold, { fontSize: 18 }]}>GALLERY</Text>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>
              <Image
                source={this.state.gallery_1}
                style={{ width: "100%", height: 160, resizeMode: "contain" }}
              ></Image>
            </View>
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 20,
                alignSelf: "center",
              }}
            >
              <Image
                source={this.state.gallery_2}
                style={{ width: 340, height: 340, resizeMode: "contain" }}
              ></Image>
            </View>
          </ScrollView>
        </ImageBackground>
        {/* <FooterTabsIconText /> */}
      </Container>
    );
  }
}

export default DetailAmenitiesMall;
