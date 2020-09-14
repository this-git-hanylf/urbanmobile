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
  ListView,
  Linking,
  // Picker
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
  Picker,
  // Col,
  ListItem,
  Segment,
} from "native-base";

// import NavigationService from "@Service/Navigation";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts, Metrics } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from "@Component/numFormat";
// import ImageViewer from 'react-native-image-zoom-viewer';
import { Col, Row, Grid } from "react-native-easy-grid";
import { act } from "react-test-renderer";
//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get("window");
const dw = Dimensions.get("window").width;
let isMount = false;

class SelectUnit extends React.Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      Alert_Visibility: false,
      pesan: "",
      Alert_Visibility_remove: false,
      pesan_remove: "",

      getLevel: [],

      // dataBlock: "",
    };
    // console.log()
    isMount = true;
    console.log("props", this.props);

    // this.addItem = this.addItem.bind(this);
    // this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
  }

  async componentDidMount() {
    isMount = true;
    isLoaded = true;
    const items = this.props.items;
    console.log("items", items);

    const data = {
      hd: new Headers({
        Token: await _getData("@Token"),
      }),

      title: this.props.items.title,
      projectdesc: this.props.items.projectdesc,
      project_no: this.props.items.project_no,
      entity: this.props.items.entity_cd,
      db_profile: this.props.items.db_profile,
      audit_user: await _getData("@UserId"),
      property_cd: this.props.items.property_cd,
      towerDescs: this.props.items.towerDescs,
      room_unit: this.props.items.room_unit,
      imageback: require("@Asset/images/header/001.jpg"),
      block_no: this.props.items.block_no,
      lot_type: this.props.items.lot_type,
      getpict_roomtype: this.props.items.getpict_roomtype,
    };
    console.log("data", data);

    this.setState(data, () => {
      this.getLevelNo();
    });
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

  getLevelNo() {
    const item = this.props.items;
    console.log("item get level no", item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getLevelNo/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no +
              "/" +
              item.property_cd +
              "/" +
              item.block_no +
              "/" +
              item.lot_type +
              "/" +
              item.room_unit,
            {
              method: "GET",
              headers: this.state.hd,
              //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                this.setState({ getLevel: resData });

                // this.getRoomUnit(this.state.getLot);
                // this.getLot_room_default({ dataLotType: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  alert(res.Pesan);
                });
              }
              console.log("getLevel", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  }

  render() {
    // this.setState({subTotal:subTotal});
    // console.log("this.state.image.back", this.state.block);
    return (
      <Container>
        {/* <StatusBar
          backgroundColor={Colors.statusBarNavy}
          animated
          barStyle="light-content"
        /> */}

        {/* <Header
          style={[
            Style.navigation,
            { backgroundImage: require("@Asset/images/header/001.jpg") },
          ]}
        >
          <StatusBar
      
            backgroundImage={require("@Asset/images/header/001.jpg")}
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
            <Text style={Style.actionBarText}>{this.state.title}</Text>
            <Text style={Style.actionBarText}>tes</Text>
          </View>
          <View style={Style.actionBarRight} />
      
        </Header> */}
        <ImageBackground
          source={this.state.imageback}
          style={{
            // flex: 1,
            marginBottom: 30,
            top: 25,
            width: Metrics.WIDTH,
            height: 80,
          }}
        >
          <View
            style={{
              top: 20,
              // marginBottom: 50,
              // paddingBottom: 45,
              // backgroundColor: "yellow",
              // backgroundImage: this.state.imageback,
              width: "100%",
              height: "10%",
              flexDirection: "row",
            }}
          >
            <View style={{ paddingLeft: 20 }}>
              <Button
                transparent
                style={[Style.actionBarBtn]}
                onPress={Actions.pop}
              >
                <Icon
                  active
                  name="arrow-left"
                  // style={[Style.textWhite,{fontSize: 28}]}
                  style={{ color: "#000" }}
                  type="MaterialCommunityIcons"
                />
              </Button>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 2,
                top: 15,
              }}
            >
              <Text style={{ color: "#000" }}>{this.state.title}</Text>
              <Text style={{ color: "#000" }}>tes</Text>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Button
                transparent
                style={[Style.actionBarBtn]}
                onPress={Actions.pop}
              >
                <Icon
                  active
                  name="menu"
                  style={{ color: "#000" }}
                  type="MaterialCommunityIcons"
                />
              </Button>
            </View>
          </View>
        </ImageBackground>

        {/* <ScrollView>
          <View style={{ marginHorizontal: 30, marginTop: 15 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Today's Deals
            </Text>
            <Text style={{ fontSize: 13, textAlign: "left" }}>
              This is what you miss already. Don't miss another
            </Text>
            <Text style={{ fontSize: 13, textAlign: "left" }}>
              opportunity by not having this One and Only Urban Suites
            </Text>
          </View> */}
        {/* <View
            style={{
              flex: 1,
              paddingLeft: 0,
              alignItems: "center",
              width: "100%",
            }}
          >
            {this.state.getLevel ? (
              this.state.getLevel.map((data, key) => (
                <View
                  style={{
                    marginHorizontal: 5,
                    flexDirection: "column",
                    width: "100%",
                    //   flex: 1,
                  }}
                >
                  <TouchableOpacity key={key}>
                    <View
                      style={{
                        backgroundColor: Colors.goldUrban,
                        borderRadius: 3,
                        width: "50%",
                        // width: Metrics.WIDTH / 2,
                        flexDirection: "row",
                        marginVertical: 8,
                        marginLeft: 0,
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        justifyContent: "center",
                        // flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        {data.level_no}
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontSize: 13,
                        }}
                      >
                        {data.land_net_price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text>gada isinya</Text>
            )}
          </View> */}
        {/* </ScrollView> */}
        <Content style={Style.layoutContent}>
          <ScrollView scrollEventThrottle={200} directionalLockEnabled={true}>
            <View style={{ marginHorizontal: 30, marginTop: 15 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Today's Deals
              </Text>
              <Text style={{ fontSize: 13, textAlign: "left" }}>
                This is what you miss already. Don't miss another
              </Text>
              <Text style={{ fontSize: 13, textAlign: "left" }}>
                opportunity by not having this One and Only Urban Suites
              </Text>
            </View>

            <View style={{ flex: 1, paddingTop: 20, backgroundColor: "#FFF" }}>
              {this.state.getLevel.length == 0 ? (
                <ActivityIndicator />
              ) : (
                //   null
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingHorizontal: 20,
                    justifyContent: "space-between",
                  }}
                >
                  {this.state.getLevel.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      style={{
                        width: "48%",
                        height: 50,
                        marginBottom: 10,
                        // borderRadius: 3,
                      }}
                      onPress={() => this.clickProject(item)}
                    >
                      <View
                        style={{
                          borderRadius: 3,
                          flex: 1,
                          position: "absolute",
                          width: dw * 0.44,
                          height: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: Colors.goldUrban,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontFamily: Fonts.type.proximaNovaBold,
                            fontSize: 16,
                            textAlign: "center",
                          }}
                        >
                          {item.level_no}
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                            fontFamily: Fonts.type.proximaNovaReg,
                            fontSize: 16,
                            textAlign: "center",
                          }}
                        >
                          Rp. {numFormat(parseInt(item.land_net_price))}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View
              style={{
                backgroundColor: Colors.gray,
                width: "100%",
                height: 10,
              }}
            ></View>

            <View style={{ marginHorizontal: 30, marginTop: 15 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Choose Your Payment
              </Text>
              <Text style={{ fontSize: 13, textAlign: "left" }}>
                This limited offer is your last chance, since the unit price
                alway up-to-date following market price. Lock this unit now and
                get the benefit of up to 8% capital gain a year.
              </Text>
            </View>

            <View>
              <Image
                style={{
                  width: Metrics.WIDTH,
                  height: Metrics.HEIGHT / 1.6,
                  // alignSelf: "center",
                  resizeMode: "contain",
                  // flex: 1,
                  top: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  bottom: 0,
                }}
                source={{
                  uri: this.state.getpict_roomtype,
                }}
              ></Image>
            </View>

            <View style={{ alignItems: "center" }}>
              <ScrollView horizontal>
                <Segment
                  style={{
                    backgroundColor: Colors.white,
                    alignItems: "center",
                  }}
                >
                  {/* {this.state.block.map((data, key) => (
                    <Button
                      first
                      key={key}
                      active={this.state.activePage === key}
                      onPress={this.selectComponent(key, {
                        dataBlock: data.block_no,
                      })}
                      style={
                        this.state.activePage === key
                          ? {
                              backgroundColor: "#fff",
                              borderBottomWidth: 5,
                              borderBottomColor: "#226f9e", //biru baru urban
                              width: "auto",
                            }
                          : {
                              backgroundColor: "#fff",
                              width: "auto",
                              borderBottomWidth: 1,
                              borderBottomColor: "#565c5c", //abu-abu baru urban
                            }
                      }
                    >
                      <Text
                        style={
                          this.state.activePage === key
                            ? {
                                color: "#226f9e",
                                textAlign: "center",
                              }
                            : {
                                color: "#565c5c",
                                textAlign: "center",
                              }
                        }
                      >
                        {data.descs}
                      </Text>
                    </Button>
                  ))} */}
                </Segment>
              </ScrollView>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

//make this component available to the app
export default SelectUnit;
