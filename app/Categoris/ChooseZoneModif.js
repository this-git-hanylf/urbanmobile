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
  Modal
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
  Badge
} from "native-base";

import NavigationService from "@Service/Navigation";

import PROPERTIES from "./Properties";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import ImageViewer from "react-native-image-zoom-viewer";

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get("window");
let isMount = false;

// create a component
class ChooseZoneModif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: null,

      tower: [],
      amen: [],
      pict_hardcode: require("@Asset/images/project_suite_urban.jpg"),
      towerDescs: "",
      title: "",
      isView: false,
      gallery: "",
      imagesPreview: [],
      picture_url: ""
    };
    isMount = true;
    console.log("props", this.props);
  }

  async componentDidMount() {
    isMount = true;

    const data = {
      towerDescs: this.props.items.towerDescs,
      title: this.props.items.title,
      picture_url: this.props.prevItems.picture_url,
      // towerDescs : item.towerDescs,
      // console.log('twr descs', towerDescs);
      hd: new Headers({
        Token: await _getData("@Token")
      })
    };
    console.log("data", data);

    this.setState(data, () => {
      // this.getTower();
      this.getDataAminities(this.props.items);
      this.getDataGallery(this.props.items);
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
              headers: this.state.hd
            }
          )
            .then(response => response.json())
            .then(res => {
              if (!res.Error) {
                const resData = res.Data;
                this.setState({ amen: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  alert(res.Pesan);
                });
              }
              console.log("amenitis", res);
            })
            .catch(error => {
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
              headers: this.state.hd
            }
          )
            .then(response => response.json())
            .then(res => {
              if (!res.Error) {
                const resData = res.Data;
                console.log(resData);
                this.setState({ gallery: resData.gallery });
                resData.gallery.map(item => {
                  this.setState(prevState => ({
                    imagesPreview: [
                      ...prevState.imagesPreview,
                      { url: item.gallery_url }
                    ]
                  }));
                });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  alert(res.Pesan);
                });
              }
              console.log("getData Galerry", res);
            })
            .catch(error => {
              console.log(error);
            })
        : null;
    }
  };

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
            <View style={{ top: 25 }}>
              <ImageBackground
                // source={this.state.picture_url}
                source={{
                  uri: this.state.picture_url
                }}
                // source={require("@Asset/images/project_suite_urban.png")}
                style={[Style.coverImg, { flex: 1 }]}
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
                      textAlign: "center"
                    }}
                    // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
                  >
                    {this.state.title}
                  </Text>
                  <Text style={Style.actionBarText}>
                    {this.state.towerDescs}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ paddingTop: 50 }}>
              <Button style={Style.signInBtnMedium}>
                <Text
                  style={{
                    width: "100%",
                    fontSize: 16,
                    alignItems: "center",
                    textAlign: "center",
                    fontFamily: Fonts.type.proximaNovaBold,
                    letterSpacing: 1
                  }}
                >
                  Booking Priority Pass
                </Text>
              </Button>
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
                  lineHeight: 25
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

              <FlatList
                data={this.state.amen}
                contentContainerStyle={Style.flatList}
                keyExtractor={item => item.rowID}
                numColumns={2}
                renderItem={({ item }) => this.renderItemNews(item)}
              />
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
                  keyExtractor={item => item.line_no}
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
