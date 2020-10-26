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
  Alert,
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
import Mailer from "react-native-mail";
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
let isMount = false;

class New_NupBooking extends React.Component {
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
      activePage_LotRoom: 0,
      block: [],
      getLot: [],
      getLot_room: [],
      block_no: "",
      lot_type: "",
      klik: false,
      isLoaded: false,
      isLoadedBlock: false,
      isLoadedType: false,
      // getpict: [],
      getpict: "",
      getpict_roomtype: "",

      // dataBlock: "",
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
    isLoaded = true;
    const items = this.props.items;
    console.log("items", items);
    const prev = this.props.prevItems;
    console.log("prev", prev);

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
      picture_booking_url: this.props.prevItems.picture_booking_url,
      picture_booking_descs_url: this.props.prevItems.picture_booking_descs_url,

      //   namtow : this.state.descNamaTower,
      //   harga_qty: this.state.harga[0].nup_amount

      //   picture_url: this.props.prevItems.picture_url,
      // towerDescs : item.towerDescs,
      // console.log('twr descs', towerDescs);
      // hd: new Headers({
      //     Token: await _getData("@Token")
      // })
    };
    console.log("data new_nupbooking", data);

    this.setState(data, () => {
      this.getTower();
      this.getDataDetails(this.props.items);
      this.getBlock();
      this.getLot();
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
                  // alert(res.Pesan);
                  console.log("ERROR DI GET TOWER", res.Pesan);
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
              item.project_no +
              "/" +
              this.state.property_cd,
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
                this.setState({ isLoadedBlock: true });
                this.setState({ block: resData });
                console.log("state block", this.state.block);
                console.log("statte isloadedblock", this.state.isLoadedBlock);

                // this.getRoomUnit(this.state.block);
                // console.log("blockMo", resData[0].block_no);
                // const block_no_res = resData[0].block_no;
                this.getDataRoom();

                // this.getLot_room_default({ block: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("ERROR DI GET BLOCK", res.Pesan);
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
    console.log("item tower", item);
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
                this.setState({ isLoadedType: true });
                this.getDataRoom();
                // this.getRoomUnit(this.state.getLot);
                // this.getLot_room_default({ dataLotType: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("ERROR DI GET LOT", res.Pesan);
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

  selectComponent = (activePage, dataBlock) => () => {
    this.setState({ activePage });
    console.log("activ page", activePage);
    console.log("dataBlock", dataBlock);
    // console.log("klik select", klik);
    //kirim datablock ke getRoomUnit
    // this.setState({ dataBlock: dataBlock });
    // if (dataBlock) {

    //   this.setState({ klik: true });
    //   var klik_select = true;
    //   this.getDataRoom(klik_select, dataBlock);
    // }

    this.setState({ dataBlock: dataBlock });
    this.setState({ klik: true });
    var klik_select = true;
    this.setState({ isLoaded: !this.state.klik }, () => {
      // alert("true");
      // this.getDataRoom(klik_select, dataBlock);
      this.getDataRoom();
    });

    // this.setState({ klik: true });
  };
  selectComponent_Lot = (activePage_Lot, dataLotType) => () => {
    this.setState({ activePage_Lot });

    console.log("active page lot type", activePage_Lot);
    console.log("lot type", dataLotType);
    //kirim datalottype ke getRoomUnit
    this.setState({ dataLotType: dataLotType });
    this.setState({ klik: true });
    this.setState({ isLoaded: !this.state.klik }, () => {
      // alert("true");
      this.getDataRoom();
    });
  };

  _renderComponent = () => {
    // this.setState({ klik: true });
    if (this.state.activePage === 0)
      return (
        <Content>
          {this.state.isLoadedBlock == true ? (
            this.state.block ? (
              this.state.block == null ||
              this.state.block == "" ||
              this.state.block == 0 ? (
                <Text>null gambar </Text>
              ) : (
                <View>
                  {/* <Text>gambarr blok</Text> */}
                  <Image
                    style={{
                      width: "100%",
                      height: 250,
                      // alignSelf: "center",
                      resizeMode: "contain",
                      // flex: 1,
                      top: 0,
                      marginTop: 0,
                      marginBottom: 0,
                      bottom: 0,
                    }}
                    source={{ uri: this.state.block[0].picture_url }}
                  ></Image>

                  {/* <Text>{this.state.block[0].picture_url}</Text> */}
                </View>
              )
            ) : (
              <Text>gak ada block</Text>
            )
          ) : (
            <Text>No Image</Text>
          )}
        </Content>
      );
    //... Your Component 1 to display
    if (this.state.activePage === 1)
      return (
        <Content>
          {this.state.isLoadedBlock == true ? (
            this.state.block ? (
              this.state.block == null ||
              this.state.block == "" ||
              this.state.block == 0 ? (
                <Text>null gambar </Text>
              ) : (
                <View>
                  <Image
                    style={{
                      width: "100%",
                      height: 250,
                      // alignSelf: "center",
                      resizeMode: "contain",
                      // flex: 1,
                      top: 0,
                      marginTop: 0,
                      marginBottom: 0,
                      bottom: 0,
                    }}
                    source={{ uri: this.state.block[1].picture_url }}
                  ></Image>

                  {/* <Text>{this.state.block[1].picture_url}</Text> */}
                </View>
              )
            ) : (
              <Text>gak ada block</Text>
            )
          ) : (
            <Text>No Image</Text>
          )}
        </Content>
      );
    // else
    //   return (
    //     <Content
    //       style={Style.layoutInner}
    //       contentContainerStyle={Style.layoutContent}
    //     >
    //       <Text> tab 3</Text>
    //     </Content>
    //   );
  };

  _renderComponent_Lot = () => {
    if (this.state.activePage_Lot === 0)
      return (
        // <Content>
        //   {/* {this.state.tower ?
        //   <Text>{this.state.tower[0].</Text>
        // } */}
        //   <Text> tab lot type 1</Text>
        // </Content>
        null
      );
    //... Your Component 1 to display
    if (this.state.activePage_Lot === 1)
      return (
        // <Content
        //   style={Style.layoutInner}
        //   contentContainerStyle={Style.layoutContent}
        // >
        //   <Text>
        //     {" "}
        //     tab lot type 2 {console.log("getlotroom", this.state.getLot_room)}
        //   </Text>
        // </Content>

        null
      );
    else
      return (
        // <Content
        //   style={Style.layoutInner}
        //   contentContainerStyle={Style.layoutContent}
        // >
        //   <Text> tab 3</Text>
        // </Content>
        null
      );
  };

  getDataRoom() {
    if (
      this.state.dataBlock == undefined &&
      this.state.dataLotType == undefined
    ) {
      console.log("data blok dari select component", this.state.dataBlock);
      if (this.state.isLoadedBlock == true) {
        console.log("datablock dari block[0]", this.state.block[0].block_no);
        var block_no = this.state.block[0].block_no;
        this.setState({ block_no: this.state.block[0].block_no });
      }
      if (this.state.isLoadedType == true) {
        console.log("datablock dari getlot[0]", this.state.getLot[0].lot_type);
        var lot_type = this.state.getLot[0].lot_type;
        this.setState({ lot_type: this.state.getLot[0].lot_type });
      }
      console.log("datablock getdataroom room null");
    } else if (
      this.state.dataBlock != undefined ||
      this.state.dataLotType != undefined
    ) {
      console.log("data blok dari select component else", this.state.dataBlock);
      console.log("datablock getdataroom room not null");
      if (this.state.dataBlock != undefined) {
        console.log("state datablock klik", this.state.dataBlock.dataBlock);
        var block_no = this.state.dataBlock.dataBlock;
        this.setState({ block_no: block_no });
      } else {
        console.log(
          "datablock dari block[0] else",
          this.state.block[0].block_no
        );
        var block_no = this.state.block[0].block_no;
        this.setState({ block_no: block_no });
      }
      if (this.state.dataLotType == undefined) {
        console.log(
          "datablock dari getlot[0] else",
          this.state.getLot[0].lot_type
        );
        var lot_type = this.state.getLot[0].lot_type;
        this.setState({ lot_type: lot_type });
      } else {
        console.log("state datatype", this.state.dataLotType.dataLotType);
        var lot_type = this.state.dataLotType.dataLotType;
        this.setState({ lot_type: lot_type });
      }
      console.log("block klik", block_no);
      console.log("lot_type klik", lot_type);
    }
    const item = this.props.items;
    console.log("item tower", item);
    console.log("block no diluar if else", block_no);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getLot_room/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no +
              "/" +
              item.property_cd +
              "/" +
              block_no +
              "/" +
              lot_type,
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
                this.setState({ getLot_room: resData });
                this.setState({ isLoadedRoom: true });
                this.selectRoomUnit();
                this.getPictRoomUnit();
                // this.getRoomUnit(this.state.getLot);
                // this.getLot_room_default({ dataLotType: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("ERROR DI GET DATA ROOM", res.Pesan);
                });
              }
              console.log("getLot_room else", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  }

  selectRoomUnit(activePage_LotRoom, data) {
    console.log("key select room unit", activePage_LotRoom);
    if (activePage_LotRoom == undefined) {
      this.setState({ activePage_LotRoom: 0 });
    } else {
      this.setState({ activePage_LotRoom });
    }
    if (
      this.state.dataBlock == undefined &&
      this.state.dataLotType == undefined &&
      data == undefined
    ) {
      console.log("if blue");
      if (this.state.isLoadedBlock == true) {
        console.log("datablock dari block[0]", this.state.block[0].block_no);
      }
      if (this.state.isLoadedType == true) {
        console.log("datablock dari getlot[0]", this.state.getLot[0].lot_type);
      }
      if (this.state.isLoadedRoom == true) {
        console.log("data room unit", this.state.getLot_room[0].room_unit);
        this.setState({ room_unit: this.state.getLot_room[0].room_unit });
      }
      console.log("datablock getdataroom room null");
      const item = this.props.items;
      console.log("item tower", item);
      // const params_items = {
      //   db_profile: item.db_profile,
      //   entity_cd: item.entity_cd,
      //   project_no: item.project_no,
      //   property_cd: item.property_cd,
      //   block_no: this.state.block[0].block_no,
      //   lot_type: this.state.getLot[0].lot_type,
      //   room_unit: this.state.getLot_room[0].room_unit,
      // };
      // console.log("params_items", params_items);
      {
        isMount
          ? fetch(
              urlApi +
                "c_product_info/getLotRoom_pict/" +
                item.db_profile +
                "/" +
                item.entity_cd +
                "/" +
                item.project_no +
                "/" +
                item.property_cd +
                "/" +
                this.state.block[0].block_no +
                "/" +
                this.state.getLot[0].lot_type +
                "/" +
                this.state.getLot_room[0].room_unit,
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
                  this.setState({ getpict: resData });
                  this.change(data);
                  // this.getPictRoomUnit({ data: params_items });
                  // this.setState({ isLoadedType: true });
                } else {
                  this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    // alert(res.Pesan);
                    console.log("ERROR DI IF SELECT ROOM UNIT", res.Pesan);
                  });
                }
                console.log("getpict", res);
              })
              .catch((error) => {
                console.log(error);
              })
          : null;
      }

      // for (let x = 0; x < this.state.getLot_room.length; x++) {
      //   if (
      //     this.state.getLot_room[x].room_unit ==
      //     this.state.getLot_room[0].room_unit
      //   ) {
      //     console.log("room unit sama");
      //     console.log(
      //       "this.state.getLot_room[x].room_unit",
      //       this.state.getLot_room[x].room_unit
      //     );
      //     console.log(
      //       "this.state.getLot_room[0].room_unit",
      //       this.state.getLot_room[0].room_unit
      //     );
      //     this.setState({ backgroundColor: "blue" });
      //     console.log("backgtound", this.state.backgroundColor);
      //   } else {
      //     console.log("room unit beda");
      //     this.setState({ backgroundColor: "red" });
      //   }
      // }
    } else if (
      this.state.dataBlock != undefined ||
      this.state.dataLotType != undefined ||
      data != undefined
    ) {
      // this.setState({ backgroundColor: "red" });
      console.log("datablock getdataroom room not null");
      if (this.state.dataBlock == undefined) {
        console.log("datablock dari block[0]", this.state.block[0].block_no);
        var block_no = this.state.block[0].block_no;
      } else {
        console.log("state datablock klik", this.state.dataBlock.dataBlock);
        var block_no = this.state.dataBlock.dataBlock;
      }
      if (this.state.dataLotType == undefined) {
        console.log("datablock dari getlot[0]", this.state.getLot[0].lot_type);
        var lot_type = this.state.getLot[0].lot_type;
      } else {
        console.log("state datatype", this.state.dataLotType.dataLotType);
        var lot_type = this.state.dataLotType.dataLotType;
      }
      if (data == undefined) {
        console.log("data room unit", this.state.getLot_room[0].room_unit);
        var room_unit = this.state.getLot_room[0].room_unit;
        this.setState({ room_unit: room_unit });
      } else {
        console.log("data room klik nih", data.room_unit);
        var room_unit = data.room_unit;
        this.setState({ room_unit: room_unit });
      }
      console.log("block klik", block_no);
      console.log("lot_type klik", lot_type);
      const item = this.props.items;
      console.log("item tower", item);
      {
        isMount
          ? fetch(
              urlApi +
                "c_product_info/getLotRoom_pict/" +
                item.db_profile +
                "/" +
                item.entity_cd +
                "/" +
                item.project_no +
                "/" +
                item.property_cd +
                "/" +
                block_no +
                "/" +
                lot_type +
                "/" +
                room_unit,
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
                  this.setState({ getpict: resData });
                  this.change(data);
                  // this.setState({ isLoadedType: true });
                } else {
                  this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    // alert(res.Pesan);
                    console.log("ERROR DI ELSE SELECT ROOM UNIT", res.Pesan);
                  });
                }
                console.log("getpict", res);
              })
              .catch((error) => {
                console.log(error);
              })
          : null;
      }
    }
  }

  getPictRoomUnit(data) {
    if (
      this.state.dataBlock == undefined &&
      this.state.dataLotType == undefined &&
      data == undefined
    ) {
      console.log("if blue");
      if (this.state.isLoadedBlock == true) {
        console.log("datablock dari block[0]", this.state.block[0].block_no);
      }
      if (this.state.isLoadedType == true) {
        console.log("datablock dari getlot[0]", this.state.getLot[0].lot_type);
      }
      if (this.state.isLoadedRoom == true) {
        console.log("data room unit", this.state.getLot_room[0].room_unit);
      }
      console.log("datablock getdataroom room null");
      const item = this.props.items;
      console.log("item tower", item);

      {
        isMount
          ? fetch(
              urlApi +
                "c_product_info/getLotRoomType_pict/" +
                item.db_profile +
                "/" +
                item.entity_cd +
                "/" +
                item.project_no +
                "/" +
                item.property_cd +
                "/" +
                this.state.block[0].block_no +
                "/" +
                this.state.getLot_room[0].room_unit,
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
                  this.setState({ getpict_roomtype: resData });
                  // this.change(data);
                  // this.setState({ isLoadedType: true });
                } else {
                  this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    // alert(res.Pesan);
                    console.log("ERROR DI IF GET PICT ROOM UNIT", res.Pesan);
                  });
                }
                console.log("getpict", res);
              })
              .catch((error) => {
                console.log(error);
              })
          : null;
      }
    } else if (
      this.state.dataBlock != undefined ||
      this.state.dataLotType != undefined ||
      data != undefined
    ) {
      // this.setState({ backgroundColor: "red" });
      console.log("datablock getdataroom room not null");
      if (this.state.dataBlock == undefined) {
        console.log("datablock dari block[0]", this.state.block[0].block_no);
        var block_no = this.state.block[0].block_no;
      } else {
        console.log("state datablock klik", this.state.dataBlock.dataBlock);
        var block_no = this.state.dataBlock.dataBlock;
      }
      if (this.state.dataLotType == undefined) {
        console.log("datablock dari getlot[0]", this.state.getLot[0].lot_type);
        var lot_type = this.state.getLot[0].lot_type;
      } else {
        console.log("state datatype", this.state.dataLotType.dataLotType);
        var lot_type = this.state.dataLotType.dataLotType;
      }
      if (data == undefined) {
        console.log("data room unit", this.state.getLot_room[0].room_unit);
        var room_unit = this.state.getLot_room[0].room_unit;
      } else {
        console.log("data room klik nih", data.room_unit);
        var room_unit = data.room_unit;
      }
      console.log("block klik", block_no);
      console.log("lot_type klik", lot_type);
      const item = this.props.items;
      console.log("item tower", item);
      {
        isMount
          ? fetch(
              urlApi +
                "c_product_info/getLotRoomType_pict/" +
                item.db_profile +
                "/" +
                item.entity_cd +
                "/" +
                item.project_no +
                "/" +
                item.property_cd +
                "/" +
                block_no +
                "/" +
                room_unit,
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
                  this.setState({ getpict_roomtype: resData });
                  // this.change(data);
                  // this.setState({ isLoadedType: true });
                } else {
                  this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    // alert(res.Pesan);
                    console.log("ERROR DI ELSE GET PICT ROOM UNIT", res.Pesan);
                  });
                }
                console.log("getpict", res);
              })
              .catch((error) => {
                console.log(error);
              })
          : null;
      }
    }
  }

  change(data) {
    for (let x = 0; x < this.state.getLot_room.length; x++) {
      if (this.state.getLot_room[x].room_unit === data.room_unit) {
        console.log("room unit sama");
        console.log(
          "this.state.getLot_room[x].room_unit",
          this.state.getLot_room[x].room_unit
        );

        console.log("this.state.getLot_room[0].room_unit", data.room_unit);
        this.setState({ change_color: "red" });
        console.log("backgtound", this.state.change_color);
      } else {
        console.log("room unit beda");
        this.setState({ change_color: false });
      }
    }
  }

  sendEmail() {
    // noHp = '';
    const email_add = this.state.project[0].email_add;
    const descs = this.props.items.project_descs;

    // alert(email_add);

    console.log("email send add", email_add);
    Mailer.mail(
      {
        subject: "Saya tertarik reservasi " + descs,
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
  }

  selectUnit() {
    const items = {
      entity_cd: this.state.entity,
      project_no: this.state.project_no,
      property_cd: this.state.property_cd,
      db_profile: this.state.db_profile,
      projectdesc: this.state.projectdesc,
      room_unit: this.state.room_unit,
      towerDescs: this.state.towerDescs,
      title: this.state.title,
      block_no: this.state.block_no,
      lot_type: this.state.lot_type,
      getpict_roomtype: this.state.getpict_roomtype[0].room_type_url,
    };
    console.log("items kirim ke select unit", items);
    Actions.SelectUnit({ items: items });
  }

  render() {
    // this.setState({subTotal:subTotal});
    // console.log("this.state.image.back", this.state.block);
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
          <ImageBackground
            style={
              {
                // paddingBottom: 5,
                // flex: 1,
                // width: Metrics.WIDTH,
                // height: Metrics.HEIGHT,
                // resizeMode: "contain",
              }
            }
            source={require("../Images/background-blue.png")}
          >
            <View style={{ width: Metrics.WIDTH, paddingBottom: 25 }}>
              <ImageBackground
                style={{
                  width: 410,
                  height: 520,
                  alignSelf: "center",
                  resizeMode: "contain",
                  flex: 1,
                }}
                // source={require("@Asset/images/deskripsi/3-1.jpg")}
                source={{ uri: this.state.picture_booking_url }}
              >
                <Button
                  style={[Style.signInBtnMedium, { top: "105%" }]}
                  // onPress={() => this.alertNUP()}
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
                    Booking Now
                  </Text>
                </Button>
              </ImageBackground>
            </View>

            <Image
              style={{
                width: 370,
                height: 370,
                alignSelf: "center",
                borderRadius: 5,
                marginBottom: 25,
              }}
              source={{ uri: this.state.picture_booking_descs_url }}
            ></Image>

            <Grid style={{ alignItems: "center" }}>
              <Row>
                <Col
                  style={{
                    height: 90,
                    width: 110,
                    textAlign: "center",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    Linking.openURL("tel:" + this.state.project[0].office_no)
                  }
                >
                  <Icon
                    raised
                    name="phone"
                    type="FontAwesome"
                    style={{ color: "#fff" }}
                  />
                  <Text
                    style={{
                      fontFamily: Fonts.type.proximaNovaReg,
                      color: Colors.white,
                      fontSize: 14,
                      paddingTop: 5,
                    }}
                  >
                    Call
                  </Text>
                </Col>

                <Col
                  style={{
                    height: 90,
                    width: 110,
                    textAlign: "center",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    Linking.openURL(this.state.project[0].direction_map)
                  }
                >
                  <Icon
                    reverse
                    name="map-marker"
                    type="FontAwesome"
                    style={{ color: "#fff" }}
                  />
                  <Text
                    style={{
                      fontFamily: Fonts.type.proximaNovaReg,
                      color: Colors.white,
                      fontSize: 14,
                      paddingTop: 5,
                    }}
                  >
                    Direction
                  </Text>
                </Col>

                <Col
                  style={{
                    height: 90,
                    width: 110,
                    textAlign: "center",
                    alignItems: "center",
                  }}
                  onPress={() => this.sendEmail()}
                >
                  <Icon
                    raised
                    name="envelope"
                    type="FontAwesome"
                    style={{ color: "#fff" }}
                  />
                  <Text
                    style={{
                      fontFamily: Fonts.type.proximaNovaReg,
                      color: Colors.white,
                      fontSize: 14,
                      paddingTop: 5,
                    }}
                  >
                    Email
                  </Text>
                </Col>
              </Row>
            </Grid>
          </ImageBackground>

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
                    onPress={this.selectComponent_Lot(key, {
                      dataLotType: data.lot_type,
                    })}
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

          <View>
            {/* <Image> */}
            {this.state.getpict ? (
              this.state.getpict == null ||
              this.state.getpict == "" ||
              this.state.getpict == 0 ? (
                <Text>null gambar </Text>
              ) : (
                <View>
                  <Image
                    style={{
                      width: "100%",
                      height: 250,
                      // alignSelf: "center",
                      resizeMode: "contain",
                      // flex: 1,
                      top: 0,
                      marginTop: 0,
                      marginBottom: 0,
                      bottom: 0,
                    }}
                    source={{ uri: this.state.getpict[0].picture_url }}
                  ></Image>

                  {/* <Text>{console.log(this.state.getpict[0].picture_url)}</Text> */}
                </View>
              )
            ) : (
              <Text>gak ada block</Text>
            )}

            {/* </Image> */}
          </View>
          <View style={{ alignItems: "center" }}>
            {/* <Text>get lot room</Text> */}
            <ScrollView horizontal>
              {this.state.getLot_room ? (
                this.state.getLot_room.length == 0 ||
                this.state.getLot_room.length == "" ||
                this.state.getLot_room.length == null ? (
                  <Text>
                    {" "}
                    No data{" "}
                    {/* {console.log("datta getlot", this.state.errorgetLot_room)} */}
                  </Text>
                ) : (
                  // <Text>ada data</Text>
                  this.state.getLot_room.map((data, key) => (
                    <Button
                      key={key}
                      style={{
                        width: 45,
                        height: 45,
                        backgroundColor:
                          this.state.activePage_LotRoom === key
                            ? Colors.blueUrban
                            : Colors.goldUrban,
                        justifyContent: "center",
                        margin: 5,
                      }}
                      onPress={() => {
                        this.selectRoomUnit(key, data);
                        this.getPictRoomUnit(data);
                      }}
                      active={this.state.activePage_LotRoom === key}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          justifyContent: "center",
                        }}
                      >
                        {data.room_unit}
                      </Text>
                    </Button>
                  ))
                )
              ) : (
                <ActivityIndicator />
              )}

              {/* {this.state.getLot_room.length == 0 ? (
                <Text>tidak ada data</Text>
              ) : (
                this.state.getLot_room.map((data, key) => (
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
                      {data.room_unit}
                    </Text>
                  </TouchableOpacity>
                ))
              )} */}
            </ScrollView>
          </View>
          <View>
            {this.state.getpict_roomtype ? (
              this.state.getpict_roomtype == null ||
              this.state.getpict_roomtype == "" ||
              this.state.getpict_roomtype == 0 ? (
                <Text>null gambar </Text>
              ) : (
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
                      uri: this.state.getpict_roomtype[0].room_type_url,
                    }}
                  ></Image>

                  {/* <Text>{console.log(this.state.getpict[0].picture_url)}</Text> */}
                </View>
              )
            ) : (
              <Text>No Image</Text>
            )}
          </View>

          <View
            style={{ width: Metrics.WIDTH, paddingBottom: 25, paddingTop: 10 }}
          >
            <Button style={[Style.signInBtn]} onPress={() => this.selectUnit()}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 16,
                  alignItems: "center",
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaBold,
                  letterSpacing: 1,
                  textTransform: "capitalize",
                }}
              >
                Select Unit
              </Text>
            </Button>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

//make this component available to the app
export default New_NupBooking;
