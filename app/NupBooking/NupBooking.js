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
  Col,
  ListItem,
} from "native-base";

// import NavigationService from "@Service/Navigation";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from "@Component/numFormat";
// import ImageViewer from 'react-native-image-zoom-viewer';

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get("window");
let isMount = false;

class NupBooking extends React.Component {
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

      inputValue: "",
      type: false,
      Alert_Visibility: false,
      pesan: "",

      arrayTower: [
        {
          // property_cd: props.items.property_cd,//munculin nama tower
          property_cd: "",
          lot_type: "",
          harga: [],
          qty: 0,
          towerDes: "",
          unitDes: "",
          type: false,
          // type: "false"
        },
      ],
      // subTotal:0
      //   dataSource: ds.cloneWithRows([]),
    };
    // console.log()
    isMount = true;
    console.log("props", this.props);
    this.handleBuyNow = this.handleBuyNow.bind(this);
    // this.onAdd = this.onAdd.bind(this);
    this.checkout = this.checkout.bind(this);

    // this.addItem = this.addItem.bind(this);
    // this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
  }

  async componentDidMount() {
    isMount = true;

    const items = this.props.items;
    console.log("items", items);

    const data = {
      //   towerDescs : this.props.items.towerDescs,
      title: this.props.items.project_descs,
      projectdesc: this.props.items.project_descs,
      project_no: this.props.items.project_no,
      entity: this.props.items.entity_cd,
      db_profile: this.props.items.db_profile,
      audit_user: await _getData("@UserId"),
      property_cd: this.props.items.property_cd,
      towerDescs: this.props.items.towerDescs,

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
      // this.getUnit();
      this.getHarga();
      this.getTowerDescs();
      this.getUnitDescs();
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

  getUnit = (prop_cd) => {
    const item = this.props.items;
    // console.log('item tower', item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getUnitMap/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no +
              "/" +
              prop_cd,
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
                // this.setState({ unit: resData });

                this.setState({
                  unit: { ...this.state.unit, [prop_cd]: resData },
                });

                console.log("unit ==>", resData);
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("get unit", res.Pesan);
                });
              }
              console.log("getUnit", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  getTowerDescs = (index) => {
    const item = this.props.items;
    const datas = this.state.arrayTower;
    const prop = datas[0].property_cd;
    console.log("propert", prop);
    // console.log('item tower', item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getTowerDescs/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no +
              "/" +
              prop,
            // prop,
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
                // this.setState({ towerDes: resData });
                const arrayTower = this.state.arrayTower;
                arrayTower[index].towerDes = resData;

                this.setState({ arrayTower });

                console.log("towerDes", resData);
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("towerDes", res.Pesan);
                });
              }
              console.log("towerDes", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  getUnitDescs = (choose_UN) => {
    const item = this.props.items;
    const prop_cd = this.state.property_cd;

    const datas = this.state.arrayTower;
    const prop = datas[0].property_cd;
    const lot = datas[0].lot_type;
    console.log("propert", prop);
    console.log("pr", lot);
    // console.log('item tower', item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getUnitDesc/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no +
              "/" +
              prop +
              "/" +
              lot,
            // prop_cd +
            // "/" +
            // choose_UN,
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
                this.setState({ unitDes: resData });
                console.log("unitDes", resData);
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("unitDes", res.Pesan);
                });
              }
              console.log("unitDes", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  chooseTower = (chooseTo) => {
    console.log("tower change", chooseTo);
    console.log("TEST111");

    const prop_cd = chooseTo.property_cd;
    console.log("propto", prop_cd);

    if (chooseTo) {
      // this.setState({property_cd : prop_cd},()=>{

      //     this.getTowerDescs(prop_cd);
      //     this.getUnit(prop_cd);

      // })
      console.log("TEST==>", chooseTo.descNamaTower[0]);
      if (chooseTo.descNamaTower[0]) {
        const data = {
          property_cd: prop_cd,
          towerDes: chooseTo.descNamaTower[0].descs,
          lot_type: "",
          harga: [],
          qty: 0,
          unitDes: "", //ini unitDes buat nama unit type
        };

        const arrayTower = this.state.arrayTower;

        arrayTower[chooseTo.index] = data;

        this.setState({ arrayTower }, () => {
          // this.getTowerDescs(chooseTo.index,prop_cd);
          this.getUnit(prop_cd);

          console.log("Tower sadasda", this.state.arrayTower);
        });
      }
    }
  };

  chooseUnit = (chooseUn) => {
    console.log("unit change", chooseUn);
    // console.log('nama unnit',descNama);

    const choose_UN = chooseUn.lot_type;
    console.log("cho", choose_UN);

    if (choose_UN) {
      const arrayTower = this.state.arrayTower;

      arrayTower[chooseUn.index].lot_type = choose_UN;
      arrayTower[chooseUn.index].harga = [];
      arrayTower[chooseUn.index].qty = 0;
      arrayTower[chooseUn.index].type = false;
      if (chooseUn.descNama[0]) {
        arrayTower[chooseUn.index].unitDes = chooseUn.descNama[0].label;
      }

      this.setState({ arrayTower }, () => {
        // alert(selProv);
        // this.getUnitDescs(choose_UN);
        this.getHarga(chooseUn.index, choose_UN);
        console.log("parmunnit", choose_UN);
        console.log("unit sadasda", this.state.arrayTower);
        // console.log('con');
        // this.setState({UnitName: nama})

        // this.getComission(val,'')
      });
    }
  };

  getHarga = (index, choose_UN) => {
    console.log("choose", choose_UN);

    // console.log("chooseUnits",chooseUnits);
    // const chooseunittt = chooseUn.replace(/\s+/g, '_');

    const item = this.props.items;
    // console.log('item tower', item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getHarga/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no +
              "/" +
              choose_UN,

            {
              method: "GET",
              headers: this.state.hd,
              // method:'POST',
              // body: JSON.stringify({entity_cd:item.entity_cd,project_no:item.project_no,paramsUnit:chooseUn})
              //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                const arrayTower = this.state.arrayTower;
                arrayTower[index].harga = resData;

                this.setState({ arrayTower });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  // console.log(res.Pesan)
                  console.log("get harga", res.Pesan);
                });
              }
              console.log("getHarga", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  handleQty(index, type) {
    // console.log(type);
    // let {qty} = this.state;
    // console.log('qtyyy',qty);

    const arrayTower = this.state.arrayTower;
    const qty = arrayTower[index].qty;
    console.log("qtyyy", qty);

    if (type == "minus") {
      console.log("minus");
      if (qty > 0) {
        console.log(">1");
        arrayTower[index].qty = qty - 1;
        console.log("berkurng qty", arrayTower[index].qty);
        if (arrayTower[index].qty == 0) {
          arrayTower[index].type = false;
          // console.log("hasil nol");
        }
        // if ((qty = 0)) {
        //   arrayTower[index].type = false;
        // }
        this.setState({ arrayTower });
        console.log("qty minus", arrayTower);
      } else {
        null;
      }
    } else {
      console.log("plus");
      arrayTower[index].qty = qty + 1;
      this.setState({ arrayTower });
      // this.setState({ type: true });
      console.log("qty plus", arrayTower);
    }
  }
  typetrue(index) {
    const arrayTower = this.state.arrayTower;
    arrayTower[index].type = true;
    this.setState({ arrayTower });
    // this.setState({ type: true });
    this.handleQty(index, "plus");
  }

  handleBuyNow() {
    Actions.NUPTerm({ nup: { ...this.props.nup, ...this.state } });
  }

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ disabled: false });
  };

  checkout = () => {
    let subTotal = 0;
    let total_qty = 0;

    this.state.arrayTower.map((data) => {
      if (data.harga.length != 0) {
        let price = parseFloat(data.harga[0].nup_amount);
        console.log("price", price);
        let qty_tot = data.qty;

        if (qty_tot != 0) {
          subTotal = subTotal + price * qty_tot;
          total_qty = total_qty + qty_tot;
          // this.setState({subTotal: subTotal});
          // price = price;
          console.log("subtit", subTotal);
          console.log("total_qty", total_qty);
        }
      }
    });

    // const total = this.state.harga[0].nup_amount * this.state.qty;
    // console.log('tot',total);
    // const price =
    const arr = this.state.arrayTower;
    const valid_qty = this.state.arrayTower[0].qty;
    console.log("valid qty", valid_qty);
    const harga = this.state.arrayTower.harga;
    console.log("arr", harga);
    console.log("arr", arr);
    const items = this.props.items;
    const subtot = this.state.subTotal;
    // const total_qty = this.state.total_qty;
    console.log("subtot", subtot);
    const {} = this.state;

    const frmData = {
      // project_descs: projectdesc,
      array_tower: arr,
    };
    console.log("formdata", frmData);
    if (frmData && valid_qty != 0) {
      _navigate("FormBooking", {
        prevItems: frmData,
        items: items,
        subtot: subTotal,
        totalqty: total_qty,
      });
    } else {
      const pesan = "Please input field";
      this.alertFillBlank(true, pesan);
      // alert("please input");
    }
    // else {
    //   // _navigate("chooseZone", { items: this.props.items });
    //   _navigate("ChooseZoneModif", { items: this.props.items, prevItems: data});
    // }

    console.log("save", frmData);
  };

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  addItem = () => {
    const data = {
      // property_cd: this.state.property_cd, //munculin nama tower
      property_cd: "",
      lot_type: "",
      harga: [],
      qty: 0,
      type: false,
      // type: "false"
    };
    this.setState({ arrayTower: [...this.state.arrayTower, data] });
  };

  add() {
    this.setState({ add: true });
  }

  render() {
    let subTotal = 0;

    this.state.arrayTower.map((data) => {
      if (data.harga.length != 0) {
        let price = parseFloat(data.harga[0].nup_amount);
        console.log("price", price);
        let qty_tot = data.qty;
        console.log(qty_tot);

        if (qty_tot != 0) {
          subTotal = subTotal + price * qty_tot;
          console.log("subtit", subTotal);
        }
      }
    });
    // this.setState({subTotal:subTotal});

    return (
      <Container style={Style.bgMain}>
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

        <View style={{ top: 25, paddingBottom: 60 }}>
          <View style={{ paddingLeft: 15, paddingTop: 15 }}>
            <Button
              transparent
              style={Style.actionBarBtn}
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

          <View>
            <Text
              style={{
                fontWeight: "900",
                color: Colors.goldUrban,
                fontSize: 16,
                textAlign: "center",
                fontFamily: Fonts.type.proximaNovaBold,
                letterSpacing: 1,
              }}
              // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
            >
              PRIORITY PASS
              {/* {this.state.projectdesc} */}
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 50 }}>
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

          <View>
            <View style={Styles.viewRow}>
              <Text style={Styles.textLeft}>PROJECT</Text>
              <Text style={Styles.textRight}>{this.state.projectdesc}</Text>
            </View>

            {/* <Text>{this.state.towerDescs}</Text> */}
            {/* nih tulisan tower shelton gue munculin disini supaya tau, bisa dapet nama tower. tapi seharusnya nama tower sheltonnya ada di dropdown, terdefault muncul */}

            {this.state.arrayTower.map((item, index) => (
              <View key={index}>
                <View style={Styles.viewRow}>
                  <Text style={[Styles.textLeft, { paddingTop: 10 }]}>
                    TOWER
                  </Text>
                  {/* <Text style={Styles.textRight}>{this.state.projectdesc}</Text> */}
                  <Item
                    style={{
                      height: 35,
                      width: 190,
                      marginBottom: 10,
                      borderBottomColor: "#fff",
                    }}
                  >
                    <Picker
                      placeholder="tes"
                      selectedValue={item.property_cd}
                      style={{
                        width: "100%",
                        // color: "red",
                        // paddingRight: 10,
                        alignContent: "flex-end",
                      }}
                      textStyle={{
                        fontFamily: "Montserrat-Regular",
                        fontSize: 12,
                        color: "#666",
                        textAlign: "right",
                      }}
                      onValueChange={(chooseTo) => {
                        const namaTower = this.state.tower.filter(
                          (item) => item.value == chooseTo
                        );
                        // const tes = namaTower.descs;
                        // console.log('ngambil nama',tes);
                        console.log(
                          this.state.tower.filter(
                            (item) => item.value == chooseTo
                          )
                        );
                        this.chooseTower({
                          index,
                          property_cd: chooseTo,
                          descNamaTower: namaTower,
                        });
                      }}
                      // onValueChange={(val)=>alert(val)}
                    >
                      <Picker.Item
                        label="-Choose here-"
                        value=""
                        // style={{ textAlign: "right" }}
                      />

                      {this.state.tower.map(
                        (data, key) => (
                          <Picker.Item
                            key={key}
                            label={data.label}
                            value={data.value}
                            style={{ textAlign: "right" }}
                          />
                        )
                        // <Picker.Item key={key} label={data.label} value={data.value} onChange={(e)=>this.handleChange(e, key)} />
                      )}
                    </Picker>
                  </Item>
                </View>

                {this.state.unit[item.property_cd] ? (
                  <View style={Styles.viewRowUnit}>
                    <Text style={[Styles.textLeft, { paddingTop: 10 }]}>
                      UNIT TYPE
                    </Text>
                    {/* <Text style={Styles.textRight}>{this.state.projectdesc}</Text>
                     */}
                    <Item
                      style={{
                        height: 35,
                        marginBottom: 10,
                        borderBottomColor: "#fff",
                        alignItems: "center",
                      }}
                    >
                      <Picker
                        placeholder="-"
                        selectedValue={item.lot_type}
                        style={{ textAlign: "right", width: 170, right: 0 }}
                        textStyle={{
                          fontFamily: "Montserrat-Regular",
                          fontSize: 12,
                          // color: "red",
                          textAlign: "right",
                        }}
                        onValueChange={(chooseUn) => {
                          const namaUnit = this.state.unit[
                            item.property_cd
                          ].filter((item) => item.value == chooseUn);
                          this.chooseUnit({
                            index,
                            lot_type: chooseUn,
                            descNama: namaUnit,
                          });
                        }}
                      >
                        <Picker.Item label="-Choose here-" value="" />
                        {this.state.unit[item.property_cd].map((data, key) => (
                          <Picker.Item
                            key={key}
                            label={data.label}
                            value={data.value}
                            right="10"
                          />
                        ))}
                      </Picker>
                    </Item>
                  </View>
                ) : (
                  <View style={Styles.viewRowUnit}>
                    <Text style={[Styles.textLeft, { paddingTop: 10 }]}>
                      UNIT TYPE
                    </Text>
                    {/* <Text style={Styles.textRight}>{this.state.projectdesc}</Text>
                     */}
                    <Item
                      style={{
                        height: 35,
                        marginBottom: 10,
                        borderBottomColor: "#fff",
                        alignItems: "center",
                      }}
                    >
                      <Picker
                        placeholder="-"
                        // selectedValue={item.lot_type}
                        style={{ textAlign: "right", width: 170, right: 0 }}
                        textStyle={{
                          fontFamily: "Montserrat-Regular",
                          fontSize: 12,
                          // color: "red",
                          textAlign: "right",
                        }}
                        // onValueChange={(chooseUn) => {
                        //   const namaUnit = this.state.unit[
                        //     item.property_cd
                        //   ].filter((item) => item.value == chooseUn);
                        //   this.chooseUnit({
                        //     index,
                        //     lot_type: chooseUn,
                        //     descNama: namaUnit,
                        //   });
                        // }}
                      >
                        <Picker.Item label="-Choose here-" value="" />
                        {/* {this.state.unit[item.property_cd].map((data, key) => (
                          <Picker.Item
                            key={key}
                            label={data.label}
                            value={data.value}
                            right="10"
                          />
                        ))} */}
                      </Picker>
                    </Item>
                  </View>
                )}

                {item.harga.length == 0
                  ? null
                  : item.harga.map((itemnup, key) => (
                      <View style={Styles.viewRowHarga} key={key}>
                        <Text style={Styles.textLeftAmt}>
                          {"  " + numFormat(itemnup.nup_amount)}
                        </Text>
                        <View
                          style={{
                            width: 100,
                            borderRadius: 5,
                            marginBottom: 5,
                            top: -5,
                          }}
                        >
                          {item.type == false ? (
                            <Button
                              style={{
                                backgroundColor: Colors.goldUrban,
                                width: 90,
                                height: 25,
                                borderRadius: 5,
                                textAlign: "center",
                              }}
                              // onPress={type => this.handleQty(index, "plus")}
                              onPress={() => this.typetrue(index)}
                            >
                              <Text
                                style={{
                                  // textTransform: "capitalize",
                                  fontSize: 11,
                                  textAlign: "center",
                                  width: "100%",
                                }}
                              >
                                Add +
                              </Text>
                            </Button>
                          ) : (
                            <View
                              style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: Colors.greyUrban,
                                borderRadius: 5,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => this.handleQty(index, "minus")}
                              >
                                <View>
                                  <Text
                                    style={{
                                      marginLeft: 10,
                                      color: Colors.greyUrban,
                                    }}
                                  >
                                    -
                                  </Text>
                                </View>
                              </TouchableOpacity>

                              <Text
                                style={{
                                  fontFamily: Fonts.type.proximaNovaBold,
                                  alignItems: "center",
                                  alignSelf: "center",
                                }}
                              >
                                {item.qty}
                              </Text>

                              <TouchableOpacity
                                onPress={(type) =>
                                  this.handleQty(index, "plus")
                                }
                              >
                                <View>
                                  <Text
                                    style={{
                                      marginRight: 10,
                                      color: Colors.greyUrban,
                                    }}
                                  >
                                    +
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      </View>
                    ))}
              </View>
            ))}

            <View style={Styles.viewAddmore}>
              <TouchableOpacity onPress={(prop_cd) => this.addItem(prop_cd)}>
                <Text
                  style={{
                    textAlign: "center",
                    width: 75,
                    alignItems: "center",
                    fontSize: 14,
                    fontFamily: Fonts.type.proximaNovaBold,
                    color: Colors.loginBlue,
                    borderBottomWidth: 1,
                    borderColor: Colors.loginBlue,
                  }}
                >
                  add more +
                </Text>
              </TouchableOpacity>
              {/* <Text style={{color: Colors.twitter}} onnP>add more +</Text> */}
            </View>

            {/* space buat harga */}

            <View style={Styles.viewRowQty}>
              <Text style={Styles.textLeftQty}>QUANTITY</Text>
              {/* {this.state.} */}
              <View style={{ flexDirection: "column", marginBottom: 10 }}>
                {this.state.arrayTower.length == 0 ? (
                  <Text> - </Text>
                ) : (
                  this.state.arrayTower.map((item, key) => (
                    <View key={key}>
                      <Text
                        style={{
                          color: "#000",
                          textAlign: "right",
                          fontFamily: Fonts.type.proximaNovaBold,
                        }}
                      >
                        {item.towerDes}
                      </Text>
                      <Text
                        style={{
                          color: "#000",
                          textAlign: "right",
                          fontFamily: Fonts.type.proximaNovaReg,
                        }}
                      >
                        - {item.unitDes} ({item.qty.toString()} ITEM)
                      </Text>
                    </View>
                  ))
                )}
                {/* {this.state.towerDes.length == 0 ?
                                        null :
                                    <Text style={{color:'#000',textAlign:'right',fontFamily:Fonts.type.proximaNovaBold}}>{this.state.towerDes[0].descs}</Text>}
                                    {this.state.unitDes.length == 0 ?
                                        null :
                                    <Text style={{color:'#000',textAlign:'right',fontFamily:Fonts.type.proximaNovaReg,}}>- {this.state.unitDes[0].descs} ({this.state.qty.toString()} ITEM)</Text>}
                                     */}
              </View>
            </View>

            <View style={Styles.viewRow}>
              <Text style={Styles.textLeft}>TOTAL</Text>
              <Text style={Styles.textRight}>{numFormat(subTotal)}</Text>

              {/* {this.state.arrayTower.length!==0 ?
                                <Text>{this.state.arrayTower[0].qty}</Text>
                                    // <Text style={Styles.textRight}>{numFormat(this.state.harga[0].nup_amount * item.qty)}</Text>
                                :
                                    null
                                }
                               
                                {this.state.harga.length !==0 ? 
                                <Text style={Styles.textRight}>{numFormat(subTotal)}</Text>
                                :
                                null
                                } */}

              {/* <Text>res{this.state.harga[0].nup_amount}</Text> */}
            </View>

            <View style={{ paddingTop: 50, paddingBottom: 50 }}>
              <Button style={Styles.btnMedium} onPress={() => this.checkout()}>
                <Text
                  style={{
                    width: "100%",
                    fontSize: 14,
                    alignItems: "center",
                    textAlign: "center",
                    fontFamily: Fonts.type.proximaNovaBold,
                    letterSpacing: 1,
                  }}
                >
                  Checkout
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
        {/* <ScrollView style={{height: '100%'}}>
                    
                </ScrollView> */}
      </Container>
    );
  }
}

//make this component available to the app
export default NupBooking;
