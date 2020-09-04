//import liraries
import React from "react";
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  View,
  FlatList,
  Modal,
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
  FooterTab,
  Badge,
} from "native-base";

import NavigationService from "@Service/Navigation";

import PROPERTIES from "./Properties";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import ImageViewer from "react-native-image-zoom-viewer";
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import moment from "moment";

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(62);
const itemHorizontalMargin = wp(4);

let isMount = false;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

// create a component
class ChooseZoneModif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: null,

      tower: [],
      amen: [],
      pict_hardcode: require("@Asset/images/bg_headertowerurbain.png"),
      towerDescs: "",
      title: "",
      isView: false,
      gallery: "",
      imagesPreview: [],
      picture_url: "",
      unit: [],
      property_cd: "",
      hidden_pict: "",
      Alert_Visibility: false,
      pesan: "",
      periode_book: [],
      start_date: moment(new Date()).format("DD/MM/YYYY"),
    };
    isMount = true;
    console.log("props", this.props);
    this._renderItemUnit = this._renderItemUnit.bind(this);
  }

  async componentDidMount() {
    isMount = true;

    const data = {
      towerDescs: this.props.items.towerDescs,
      title: this.props.items.title,
      picture_url: this.props.prevItems.picture_url,
      property_cd: this.props.prevItems.property_cd,
      hidden_pict: this.props.prevItems.hidden_picture_url,
      group: await _getData("@Group"),

      // towerDescs : item.towerDescs,
      // console.log('twr descs', towerDescs);
      hd: new Headers({
        Token: await _getData("@Token"),
      }),
    };
    console.log("data", data);

    this.setState(data, () => {
      // this.getTower();
      this.getDataAminities(this.props.items);
      this.getDataGallery(this.props.items);
      this.getUnit();
      // this.getPeriodeBooking();
    });
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

  // getTower = () => {
  //     const item = this.props.items;
  //     {
  //         isMount
  //             ? fetch(
  //                   urlApi +
  //                       "c_product_info/getZone/" +
  //                       item.db_profile +
  //                       "/" +
  //                       item.entity_cd +
  //                       "/" +
  //                       item.project_no +
  //                       "/" +
  //                       item.tower,
  //                   {
  //                       method: "GET",
  //                       headers: this.state.hd
  //                   }
  //               )
  //                   .then(response => response.json())
  //                   .then(res => {
  //                       if (!res.Error) {
  //                           const resData = res.Data;
  //                           this.setState({ tower: resData });
  //                       } else {
  //                           this.setState(
  //                               { isLoaded: !this.state.isLoaded },
  //                               () => {
  //                                   alert(res.Pesan);
  //                               }
  //                           );
  //                       }
  //                       console.log("getTower", res);
  //                   })
  //                   .catch(error => {
  //                       console.log(error);
  //                   })
  //             : null;
  //     }
  // };

  // goTo(item) {
  //     const data = this.props.items;
  //     data['zoneCd'] = item.zone_cd;
  //     if(item.zone_cd == 'NA'){
  //         alert('Not available unit');
  //     }else{
  //         _navigate("categoris", { items: data });
  //     }

  // }
  getDataAminities = () => {
    const item = this.props.items;
    console.log("item tower", item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_reservation/getDataDetailsAmenities/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no,
            {
              method: "GET",
              headers: this.state.hd,
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                this.setState({ amen: resData });
              } else {
                // this.setState({ isLoaded: !this.state.isLoaded }, () => {
                //   alert(res.Pesan);
                // });
                console.log("amenitis", res);
              }
              console.log("amenitis", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  getDataGallery = () => {
    const item = this.props.items;
    console.log("item for params gallery", item);
    const db_profile = item.db_profile;
    console.log("db_pro", db_profile);
    const entity = item.entity_cd;
    console.log("db_pro", entity);
    const project = item.project_no;
    console.log("db_pro", project);
    {
      isMount
        ? fetch(
            urlApi +
              "c_reservation/getGallery/" +
              db_profile +
              "/" +
              entity +
              "/" +
              project,
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
                this.setState({ gallery: resData.gallery });
                resData.gallery.map((item) => {
                  this.setState((prevState) => ({
                    imagesPreview: [
                      ...prevState.imagesPreview,
                      { url: item.gallery_url },
                    ],
                  }));
                });
              } else {
                // this.setState({ isLoaded: !this.state.isLoaded }, () => {
                //   alert(res.Pesan);
                // });
                console.log("getData Galerry", res);
              }
              console.log("getData Galerry", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  _renderItemUnit({ item, index }, parallaxProps) {
    return (
      <TouchableOpacity style={Styles.item_unit} onPress={() => this.tes(item)}>
        <ParallaxImage
          source={{ uri: item.picture_url }}
          containerStyle={Styles.imageContainer}
          style={Styles.image}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
        <View style={Styles.newsTitle}>
          <Text style={Styles.newsTitleText_small}>{item.descs}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  tes(item) {
    console.log("item dari unit", item);
    // alert("tes");
    Actions.SkipLoginBlank2();
  }

  renderItemNews(item) {
    return (
      <View
        style={Style.itemBoxAmen_not_gold}
        underlayColor="transparent"
        // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
      >
        <View>
          <View>
            <Image
              source={{ uri: item.amenities_url }}
              style={Style.itemAmen_not_gold}
            />
            {/* <Text>
                    tes
                </Text> */}
          </View>
          {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
          {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
        </View>
      </View>
    );
  }

  getUnit = () => {
    const property_cd = this.state.property_cd;
    const item = this.props.items;
    console.log("item tower", item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getUnitPropTower/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no +
              "/" +
              property_cd,
            {
              method: "GET",
              headers: this.state.hd,
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                this.setState({ unit: resData });
              } else {
                console.log("unit", res);
                // this.setState({ isLoaded: !this.state.isLoaded }, () => {
                //   alert(res.Pesan);
                // });
              }
              console.log("unit", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  selectAmenDining() {
    const items = this.props.items;
    console.log("items", items);
    Actions.DetailAmenitiesDining({ items: items });
  }

  selectAmenMall() {
    const items = this.props.items;
    console.log("items", items);

    Actions.DetailAmenitiesMall({ items: items });
  }

  selectAmenGym() {
    const items = this.props.items;
    console.log("items", items);

    Actions.DetailAmenitiesGym({ items: items });
  }
  selectAmenPool() {
    const items = this.props.items;
    console.log("items", items);

    Actions.DetailAmenitiesPool({ items: items });
  }

  nupBooking() {
    // alert('tes')
    const data = this.props.items;
    console.log("lempar data", data);

    if (data) {
      Actions.NupBooking({ items: data });

      //masalahnya adalah: ketika klik nupbooking ini, kan menuju ke screen Nup Booking yg tab sebelah nih...
      //nah di screen sebelah itu, ada dropdown kan yg waktu itu lu bikin. harus muncul nama tower yg udah dipiliih

      // alert('ada data');
      // console.log('da')
    }
    // else{
    //   alert('gada');
    // }
  }

  alertNUP = () => {
    const pesan = "Please contact your agent for booking";
    this.alertFillBlank(true, pesan);
    // Alert.alert(
    //   "Attention",
    //   "Please contact your agent for booking",
    //   [
    //     { text: "Close", onPress: () => console.log("Close"), style: "default" }
    //     // { text: "Camera", onPress: () => this.fromCamera() },
    //     // {
    //     //     text: "Cancel",
    //     //     onPress: () => console.log("User Cancel"),
    //     //     style: {backgroundColor: "#000"}
    //     // }
    //   ],
    //   { cancelable: false }
    // );
  };
  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  // getPeriodeBooking() {
  //   const item = this.props.items;
  //   console.log("item get periode", item);

  //   {
  //     isMount
  //       ? fetch(
  //           urlApi +
  //             "c_periode_book/getPeriode/" +
  //             item.db_profile +
  //             "/" +
  //             item.entity_cd +
  //             "/" +
  //             item.project_no +
  //             "/" +
  //             item.property_cd +
  //             // "/" +
  //             // start_date,
  //             "/" +
  //             item.product_cd,
  //           {
  //             method: "GET",
  //             headers: this.state.hd,
  //           }
  //         )
  //           .then((response) => response.json())
  //           .then((res) => {
  //             if (!res.Error) {
  //               const resData = res.Data;
  //               this.setState({ periode_book: resData });
  //             } else {
  //               this.setState({ isLoaded: !this.state.isLoaded }, () => {
  //                 alert(res.Pesan);
  //               });
  //             }
  //             console.log("periode_book", res);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           })
  //       : null;
  //   }
  // }

  // newnupBooking = () => {
  //   // alert('tes')
  //   const data = this.props.items;
  //   console.log("lempar data", data);

  //   if (data) {
  //     Actions.New_NupBooking({ items: data });
  //     // alert('ada data');
  //     // console.log('da')
  //   }
  //   // else{
  //   //   alert('gada');
  //   // }
  // };

  render() {
    return (
      <Container style={Style.bgMain}>
        <ImageBackground
          style={Style.backgroundImage_bg}
          source={require("../Images/background-blue.png")}
        >
          <StatusBar
            backgroundColor={Colors.statusBarNavy}
            animated
            barStyle="light-content"
          />
          {/* <Header style={[Style.navigation,{backgroundColor: 'transparent'}]}>
                    <StatusBar
                        backgroundColor={Colors.statusBarNavy}
                        animated
                        barStyle="light-content"
                    />

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
                    <View style={Style.actionBarMiddle}>
                        <Text style={Style.actionBarText}>
                         
                            {this.state.title}
                            
                        </Text>
                        <Text style={Style.actionBarText}>
                        
                            {this.state.towerDescs}
                            
                        </Text>
                        
                    </View>
                    <View style={Style.actionBarRight} />
                </Header> */}

          <ScrollView>
            {/* {Alert custom} */}
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
                      <Text style={{ color: Colors.white }}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <View
              style={{
                top: 25,
                // width: "100%"
              }}
            >
              <ImageBackground
                // source={this.state.pict_hardcode}
                source={{
                  uri: this.state.hidden_pict,
                }}
                // source={require("@Asset/images/project_suite_urban.png")}
                style={{
                  flex: 1,
                  height: 700,
                  // width: "100%"
                  resizeMode: "contain",

                  // width: 30
                }}
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
                  <Text
                    style={{
                      fontWeight: "900",
                      color: "#FFFFFF",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                    // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
                  >
                    {this.state.title}
                  </Text>
                  <Text style={Style.actionBarText}>
                    {this.state.towerDescs}
                  </Text>
                </View>
                {this.state.group !== "AGENT" ? (
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
                ) : (
                  <View style={{ paddingTop: "110%" }}>
                    <Button
                      style={Style.signInBtnMedium}
                      // onPress={() => this.alertNUP()}
                      onPress={() => this.nupBooking()}
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
                    {/* {
                      this.state.periode_book ? (
                        this.state.periode_book != 0 ? (
                          <Button
                            style={Style.signInBtnMedium}
                            onPress={() =>
                              this.state.periode_book[0].booking_type == "BU"
                                ? this.newnupBooking()
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
                          <ActivityIndicator />
                        )
                      ) : (
                        <ActivityIndicator />
                      )

                      // <Button
                      //   style={Style.signInBtnMedium}
                      //   // onPress={() => this.nupBooking()}
                      // >
                      //   <Text
                      //     style={{
                      //       width: "100%",
                      //       fontSize: 16,
                      //       alignItems: "center",
                      //       textAlign: "center",
                      //       fontFamily: Fonts.type.proximaNovaBold,
                      //       letterSpacing: 1,
                      //     }}
                      //   >
                      //     Booking Now
                      //   </Text>
                      // </Button>
                    } */}
                  </View>
                )}
              </ImageBackground>
            </View>

            <View style={{ paddingTop: 20 }}>
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
                Tower 1 terdiri 18 lantai dengan luas bangunan sekitar 11.253m2.
                Tower ini memliki beberapa fasilitas menarik yang bisa anda
                nikmati.
              </Text>
            </View>

            <View style={Style.sectionTransparent}>
              <View style={{ paddingVertical: 10 }}>
                <Text style={[Styles.titleGold, { fontSize: 18 }]}>
                  AMENITIES
                </Text>
              </View>
              <Grid>
                <Row>
                  <Col
                    style={{ textAlign: "center", alignItems: "center" }}
                    onPress={() => this.selectAmenMall()}
                  >
                    <View
                      style={Styles.itemBoxAmen_not_gold}
                      underlayColor="transparent"
                      // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                    >
                      <View>
                        <View>
                          <Image
                            source={require("@Asset/images/amenitis/mall.png")}
                            style={Styles.itemAmen_not_gold}
                          />
                        </View>
                        {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                        {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                      </View>
                    </View>
                  </Col>
                  <Col
                    style={{ textAlign: "center", alignItems: "center" }}
                    onPress={() => this.selectAmenDining()}
                  >
                    <View
                      style={Styles.itemBoxAmen_not_gold}
                      underlayColor="transparent"
                      // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                    >
                      <View>
                        <View>
                          <Image
                            source={require("@Asset/images/amenitis/dining.png")}
                            style={Styles.itemAmen_not_gold}
                          />
                        </View>
                        {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                        {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                      </View>
                    </View>
                  </Col>
                </Row>

                <Row>
                  <Col
                    style={{ textAlign: "center", alignItems: "center" }}
                    onPress={() => this.selectAmenGym()}
                  >
                    <View
                      style={Styles.itemBoxAmen_not_gold}
                      underlayColor="transparent"
                      // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                    >
                      <View>
                        <View>
                          <Image
                            source={require("@Asset/images/amenitis/gym.png")}
                            style={Styles.itemAmen_not_gold}
                          />
                        </View>
                        {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                        {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                      </View>
                    </View>
                  </Col>
                  <Col
                    style={{ textAlign: "center", alignItems: "center" }}
                    onPress={() => this.selectAmenPool()}
                  >
                    <View
                      style={Styles.itemBoxAmen_not_gold}
                      underlayColor="transparent"
                      // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                    >
                      <View>
                        <View>
                          <Image
                            source={require("@Asset/images/amenitis/pool.png")}
                            style={Styles.itemAmen_not_gold}
                          />
                        </View>
                        {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                        {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                      </View>
                    </View>
                  </Col>
                </Row>
              </Grid>

              {/* <FlatList
                data={this.state.amen}
                contentContainerStyle={Style.flatList}
                keyExtractor={item => item.rowID}
                numColumns={2}
                renderItem={({ item }) => this.renderItemNews(item)}
              /> */}
            </View>

            <View style={{ paddingBottom: 20 }}>
              <View style={{ paddingVertical: 10 }}>
                <Text style={[Styles.titleGold, { fontSize: 18 }]}>UNIT</Text>
              </View>
              {/* <View style={styles.corContainerStyle}> */}
              <Carousel
                autoplay={false}
                autoplayDelay={1000}
                autoplayInterval={3000}
                // sliderWidth={width}
                // sliderHeight={width}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                // itemWidth={width - 60}
                data={this.state.unit}
                renderItem={this._renderItemUnit}
                hasParallaxImages={true}
                containerCustomStyle={Styles.slider_unit}
                // contentContainerCustomStyle={styles.sliderContentContainer}
                // resizeMode={ImageResizeMode.contain}
              />

              {/* </View> */}

              {/* <View style={{paddingVertical: 10}}>
                    <Text style={Styles.titleWhiteSmall}>See all unit</Text>
                  </View> */}
            </View>

            <View style={Styles.overview}>
              <View style={{ paddingVertical: 10 }}>
                <Text style={[Styles.titleGold, { fontSize: 18 }]}>
                  GALLERY
                </Text>
              </View>
              {this.state.gallery ? (
                <FlatList
                  data={this.state.gallery}
                  horizontal
                  style={[Styles.slider, { paddingTop: 10 }]}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.line_no}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      underlayColor="transparent"
                      onPress={() => {
                        this.setState({ isView: true, index: index });
                      }}
                    >
                      <View>
                        <Image
                          source={{ uri: item.gallery_url }}
                          style={Styles.sliderImg}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <ActivityIndicator />
              )}
            </View>
            <Modal
              visible={this.state.isView}
              transparent={true}
              onRequestClose={() => {
                this.setState({ isView: !this.state.isView });
              }}
            >
              <Header style={Style.navigationModal}>
                <StatusBar
                  backgroundColor={Colors.statusBarNavy}
                  animated
                  barStyle="light-content"
                />
                <View style={Style.actionBarRight}>
                  <Button
                    transparent
                    style={Style.actionBtnRight}
                    onPress={() => {
                      this.setState({ isView: !this.state.isView });
                    }}
                  >
                    <Icon
                      active
                      name="close"
                      style={Style.actionIcon}
                      type="FontAwesome"
                    />
                  </Button>
                </View>
              </Header>
              {this.state.imagesPreview ? (
                <ImageViewer
                  enableImageZoom={true}
                  enableSwipeDown={true}
                  onSwipeDown={() =>
                    this.setState({ isView: !this.state.isView })
                  }
                  index={this.state.index}
                  imageUrls={this.state.imagesPreview}
                />
              ) : null}
            </Modal>
          </ScrollView>
        </ImageBackground>
      </Container>
    );
  }
}

//make this component available to the app
export default ChooseZoneModif;
