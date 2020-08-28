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
//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get("window");
let isMount = false;

class New_NupBookingBlock extends React.Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      // hd: null,
      // title: '',
      // project_no:''
      tower: [],
      unit: {},
      harga: [],
      descs_project: "",
      lot_type: "",
      UnitName: "",
      chooseUn: "",
      paramsUnit: "",
      // products: [],
      qty: 0,
      namaUnit: "",
      nup_amount: "",
      property_cd: "",
      // descNamaTower:'',
      PropName: "",

      // nama_unit:''
      // nama:[],
      // descNama:[]
      descNamaTower: [],

      descProp: [],
      towerDes: "",
      unitDes: "",
      amenities: null,
      feature: null,
      overview: null,
      project: null,
      gallery: null,
      plans: null,

      Alert_Visibility: false,
      pesan: "",
      Alert_Visibility_remove: false,
      pesan_remove: "",

      activePage: 0,
      activePage_Lot: 0,
      block: [],
      getLot: [],
    };
    // console.log()
    isMount = true;
    console.log("props", this.props);

    this.selectComponent = this.selectComponent.bind(this);
    this.selectComponent_Lot = this.selectComponent_Lot.bind(this);

    // this.addItem = this.addItem.bind(this);
    // this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
  }

  async componentDidMount() {
    isMount = true;

    const items = this.props.items;
    console.log("items", items);

    const data = {
      hd: new Headers({
        Token: await _getData("@Token"),
      }),
      //   towerDescs : this.props.items.towerDescs,
      title: this.props.items.project_descs,
      projectdesc: this.props.items.project_descs,
      project_no: this.props.items.project_no,
      entity: this.props.items.entity_cd,
      db_profile: this.props.items.db_profile,
      audit_user: await _getData("@UserId"),
      property_cd: this.props.items.property_cd,
      towerDescs: this.props.items.towerDescs,
      imageback: require("@Asset/images/header/001.jpg"),

      //   namtow : this.state.descNamaTower,
      //   harga_qty: this.state.harga[0].nup_amount

      //   picture_url: this.props.prevItems.picture_url,
      // towerDescs : item.towerDescs,
      // console.log('twr descs', towerDescs);
      // hd: new Headers({
      //     Token: await _getData("@Token")
      // })
    };
    console.log("data", data);

    this.setState(data, () => {
      this.getTower();
      this.getDataDetails(this.props.items);
      this.getBlock();
      this.getLot();
      // this.getUnit();
      // this.getHarga();
      // this.getTowerDescs();
      // this.getUnitDescs();
      // this.getDataAminities(this.props.items)
      // this.getDataGallery(this.props.items)
    });
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

  getTower = () => {
    const item = this.props.items;
    // console.log('item tower', item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getTowerMap/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no,
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
                this.setState({ tower: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  alert(res.Pesan);
                });
              }
              console.log("getTower", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ disabled: false });
  };

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  alertFillBlank_remove(visible, pesan_remove) {
    this.setState({
      Alert_Visibility_remove: visible,
      pesan_remove: pesan_remove,
    });
  }

  getDataDetails = (item) => {
    {
      isMount
        ? fetch(
            urlApi +
              "c_reservation/getDataDetails/" +
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
                const data = {
                  amenities: resData.amenities,
                  feature: resData.feature,
                  overview: resData.overview,
                  project: resData.project,
                };
                console.log("data", data);
                this.setState(data);
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("error", res.Pesan);
                });
              }
              console.log("getDAtaDetails", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  getBlock = () => {
    const item = this.props.items;
    // console.log('item tower', item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getBlock_new/" +
              item.db_profile +
              "/" +
              // item.entity_cd +
              // "/" +
              item.project_no,
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
                this.setState({ block: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  alert(res.Pesan);
                });
              }
              console.log("block", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  getLot = () => {
    const item = this.props.items;
    // const property_cd = this.state.tower[0].value;
    console.log("item tower", item);
    // console.log("property cd", property_cd);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getLot_new/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no +
              "/" +
              item.property_cd,
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
                this.setState({ getLot: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  alert(res.Pesan);
                });
              }
              console.log("getLot", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  _renderData = () => {
    <Text>tes 123</Text>;
  };

  selectComponent = (activePage, data) => () => {
    this.setState({ activePage });
    console.log("data", data);
  };
  selectComponent_Lot = (activePage_Lot) => () =>
    this.setState({ activePage_Lot });

  _renderComponent = () => {
    // console.log("this tower", this.state.data);
    // {
    //   this.state.tower.map((data, key) =>
    //     this.state.activePage === 0 ? (
    //       <Content key={key}>
    //         <Text>{data.label}</Text>
    //       </Content>
    //     ) : (
    //       <Text>nnull</Text>
    //     )
    //   );
    // }
    if (this.state.activePage === 0)
      return (
        <Content>
          {/* {this.state.tower ? 
          <Text>{this.state.tower[0].</Text>  
        } */}
          <Text> tab 1</Text>
        </Content>
      );
    //... Your Component 1 to display
    if (this.state.activePage === 1)
      return (
        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          <Text> tab 2</Text>
        </Content>
      );
    else
      return (
        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          <Text> tab 3</Text>
        </Content>
      );
  };

  _renderComponent_Lot = () => {
    // console.log("this tower", this.state.tower);
    // {
    //   this.state.tower.map((data, key) =>
    //     this.state.activePage === 0 ? (
    //       <Content key={key}>
    //         <Text>{data.label}</Text>
    //       </Content>
    //     ) : (
    //       <Text>nnull</Text>
    //     )
    //   );
    // }
    if (this.state.activePage_Lot === 0)
      return (
        <Content>
          {/* {this.state.tower ? 
          <Text>{this.state.tower[0].</Text>  
        } */}
          <Text> tab lot type 1</Text>
        </Content>
      );
    //... Your Component 1 to display
    if (this.state.activePage_Lot === 1)
      return (
        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          <Text> tab lot type 2</Text>
        </Content>
      );
    else
      return (
        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          <Text> tab 3</Text>
        </Content>
      );
  };

  render() {
    // this.setState({subTotal:subTotal});
    console.log("this.state.image.back", this.state.imageback);
    return (
      <Container style={Style.bgMain}>
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

        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <ScrollView horizontal>
              <Segment
                style={{
                  backgroundColor: Colors.white,
                  alignItems: "center",
                }}
              >
                {this.state.block.map((data, key) => (
                  <Button
                    first
                    key={key}
                    active={this.state.activePage === key}
                    onPress={this.selectComponent(key, data)}
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
                ))}
              </Segment>
            </ScrollView>
          </View>

          <Content padder>{this._renderComponent()}</Content>

          <View style={{ alignItems: "center" }}>
            <ScrollView horizontal>
              <Segment
                style={{
                  backgroundColor: Colors.white,
                  alignItems: "center",
                }}
              >
                {this.state.getLot.map((data, key) => (
                  <Button
                    first
                    key={key}
                    active={this.state.activePage_Lot === key}
                    onPress={this.selectComponent_Lot(key)}
                    style={
                      this.state.activePage_Lot === key
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
                        this.state.activePage_Lot === key
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
                ))}
              </Segment>
            </ScrollView>
          </View>

          <Content padder>{this._renderComponent_Lot()}</Content>

          <View
            style={{
              // backgroundColor: "yellow",
              flexDirection: "row",
              // width: "80%",
            }}
          >
            <ScrollView horizontal>
              {this.state.getLot.map((data, key) => (
                <TouchableOpacity
                  key={key}
                  style={{
                    width: 45,
                    height: 45,
                    backgroundColor: "blue",
                    justifyContent: "center",
                    margin: 5,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    {data.descs}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        {/* <ScrollView style={{height: '100%'}}>
                    
                </ScrollView> */}
      </Container>
    );
  }
}

//make this component available to the app
export default New_NupBookingBlock;
