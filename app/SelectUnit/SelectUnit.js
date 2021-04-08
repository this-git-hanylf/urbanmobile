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
      activePage: 0,
      getLotNo: [],
      getPaymentCode: [],
      activePagePaymentCode: 0,
      getPaymentDetail: [],
      getKeterangan: [],
      getTrxAmt_Freq: [],
      klik: false,

      // dataBlock: "",
    };
    // console.log()
    isMount = true;
    console.log("props", this.props);
    this.selectComponent = this.selectComponent.bind(this);
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
          item.room_unit +
          "/" +
          item.lot_type,
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
              console.log(
                "this.state active page di getlevel",
                this.state.activePage
              );
              this.getLotNo();
              this.getKeterangan();
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

  getLotNo(level_no) {
    console.log("level no di getlotno", level_no);
    if (level_no == null || level_no == undefined) {
      console.log("level no default", this.state.getLevel[0].level_no);
      var level_no = this.state.getLevel[0].level_no;
    } else {
      console.log("level no di klik", level_no);
      var level_no = level_no;
    }
    const item = this.props.items;
    console.log("item get level no", item);
    {
      isMount
        ? fetch(
          urlApi +
          "c_product_info/getLotNo/" +
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
          item.room_unit +
          "/" +
          level_no,
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
              const dataLotNo = res.Data;
              this.setState({ getLotNo: resData });
              this.getPaymentCode(dataLotNo);
              console.log("buat ke getpaymentcode", dataLotNo);
              // this.getRoomUnit(this.state.getLot);
              // this.getLot_room_default({ dataLotType: resData });
            } else {
              this.setState({ isLoaded: !this.state.isLoaded }, () => {
                alert(res.Pesan);
              });
            }
            console.log("getLotNo", res);
          })
          .catch((error) => {
            console.log(error);
          })
        : null;
    }
  }

  getPaymentCode(dataLotNo) {
    console.log("dataLotNo di getpaymentcode", dataLotNo);

    const item = this.props.items;
    console.log("item get payment cd", item);
    {
      isMount
        ? fetch(
          urlApi +
          "c_product_info/getPaymentCode/" +
          item.db_profile +
          "/" +
          item.entity_cd +
          "/" +
          item.project_no +
          "/" +
          dataLotNo[0].lot_no,
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

              this.setState({ getPaymentCode: resData });
              // const params = res.Data

              this.getPaymentDetail_Amt(); //untuk manggil data default
              this.getTrxAmt_Freq(); //untuk manggil data default
              this.getShortDescs();

              // this.getRoomUnit(this.state.getLot);
              // this.getLot_room_default({ dataLotType: resData });
            } else {
              this.setState({ isLoaded: !this.state.isLoaded }, () => {
                alert(res.Pesan);
              });
            }
            console.log("getPaymentCode", res);
          })
          .catch((error) => {
            console.log(error);
          })
        : null;
    }
  }

  getKeterangan(level_no) {
    console.log("level no di getketerangan", level_no);
    if (level_no == null || level_no == undefined) {
      console.log(
        "level no default get keterangan",
        this.state.getLevel[0].level_no
      );
      var level_no = this.state.getLevel[0].level_no;
    } else {
      console.log("level no di klik get keterangan", level_no);
      var level_no = level_no;
    }

    const item = this.props.items;
    console.log("item get keterangan", item);

    {
      isMount
        ? fetch(
          urlApi +
          "c_product_info/getKeteranganLevel_No/" +
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
          item.room_unit +
          "/" + level_no,
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

              this.setState({ getKeterangan: resData });

              // this.getRoomUnit(this.state.getLot);
              // this.getLot_room_default({ dataLotType: resData });
            } else {
              this.setState({ isLoaded: !this.state.isLoaded }, () => {
                alert(res.Pesan);
              });
            }
            console.log("getKeterangan", res);
          })
          .catch((error) => {
            console.log(error);
          })
        : null;
    }
  }

  selectComponent = (activePagePaymentCode, data) => () => {

    console.log("data selectComponent", data);
    console.log("data payment_cd", data.data.payment_cd);
    console.log("data short descs", data.data.short_descs);
    console.log("activePagePaymentCode", activePagePaymentCode);

    this.setState({ activePagePaymentCode });
    var short_descs = data.data.short_descs;
    this.setState({ short_descs: data.data.short_descs });
    this.setState({ payment_cd: data.data.payment_cd });
    const item = this.props.items;
    const getLotNo = this.state.getLotNo;

    const params = {
      entity_cd: item.entity_cd,
      db_profile: item.db_profile,
      project_no: item.project_no,
      lot_no: getLotNo[0].lot_no,
      payment_cd: data.data.payment_cd,
    };
    // this.setState({ payment_cd_untuk_getKeterangan: data.data.payment_cd });
    // console.log("params select", params);

    this.setState({ klik: true });
    console.log('klik');
    this.setState({ isLoaded: !this.state.klik }, () => {
      // alert("true");
      this.getPaymentDetail_Amt(params);
      this.getTrxAmt_Freq(params);
      this.getShortDescs(short_descs);
    });
  };

  getShortDescs(short_descs) {
    console.log("short desc", short_descs)
    if (short_descs == undefined) {
      var get_short_descs = this.state.getPaymentCode[0].short_descs;
      console.log("get_short_descs if", get_short_descs)
    } else {
      var get_short_descs = short_descs;
      console.log("get_short_descs else", get_short_descs)
    }
    this.setState({ short_descs: get_short_descs });
  }

  getPaymentDetail_Amt(params) {
    console.log('params payment detail amt', params);
    if (params != undefined) {

      var entity = params.entity_cd;
      var project_no = params.project_no;
      var db_profile = params.db_profile;
      var lot_no = params.lot_no;
      var payment_cd = params.payment_cd;
    } else {
      const items = this.props.items;
      console.log("params default", items);
      var entity = items.entity_cd;
      var project_no = items.project_no;
      var db_profile = items.db_profile;
      if (this.state.getLotNo) {
        console.log('params payment detail default lotno', this.state.getLotNo[0].lot_no);
        var lot_no = this.state.getLotNo[0].lot_no;
      }
      if (this.state.getPaymentCode) {
        console.log('params payment detail default paymendcode', this.state.getPaymentCode[0].payment_cd);
        var payment_cd = this.state.getPaymentCode[0].payment_cd;
      }
    }

    const params_ = {
      entity: entity,
      project_no: project_no,
      db_profile: db_profile,
      lot_no: lot_no,
      payment_cd: payment_cd,
    };
    console.log("params", params_);

    {
      isMount
        ? fetch(
          urlApi +
          "c_product_info/getPaymentCodeDetail/" +
          db_profile +
          "/" +
          entity +
          "/" +
          project_no +
          "/" +
          lot_no +
          "/" +
          payment_cd,
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

              this.setState({ getPaymentDetail: resData });

              // this.getRoomUnit(this.state.getLot);
              // this.getLot_room_default({ dataLotType: resData });
            } else {
              this.setState({ isLoaded: !this.state.isLoaded }, () => {
                alert(res.Pesan);
              });
            }
            console.log("getPaymentDetail", res);
          })
          .catch((error) => {
            console.log(error);
          })
        : null;
    }
  }

  getTrxAmt_Freq(params) {
    if (params == undefined) {

      const items = this.props.items;
      console.log("params default", items);
      var entity = items.entity_cd;
      var project_no = items.project_no;
      var db_profile = items.db_profile;
      if (this.state.getLotNo) {
        var lot_no = this.state.getLotNo[0].lot_no;
        this.setState({ lot_no: lot_no });
      }
      if (this.state.getPaymentCode) {
        var payment_cd = this.state.getPaymentCode[0].payment_cd;
      }

      const params2 = {
        entity: entity,
        project_no: project_no,
        db_profile: db_profile,
        lot_no: lot_no,
        payment_cd: payment_cd,
      };
      console.log("params 2 if", params2);
      {
        isMount
          ? fetch(
            urlApi +
            "c_product_info/getTrxAmt_Freq/" +
            db_profile +
            "/" +
            entity +
            "/" +
            project_no +
            "/" +
            lot_no +
            "/" +
            payment_cd,
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

                this.setState({ getTrxAmt_Freq: resData });

                // this.getRoomUnit(this.state.getLot);
                // this.getLot_room_default({ dataLotType: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  console.log("ERROR NO DATA getTrxAmt_Freq else", res.Pesan);
                });
              }
              console.log("getTrxAmt_Freq else", res);
            })
            .catch((error) => {
              console.log(error);
            })
          : null;
      }

    } else {

      var params_entity = params.entity_cd;
      var params_project_no = params.project_no;
      var params_db_profile = params.db_profile;
      var params_lot_no = params.lot_no;
      var params_payment_cd = params.payment_cd;

      const params2 = {
        params_entity: params_entity,
        params_project_no: params_project_no,
        params_db_profile: params_db_profile,
        params_lot_no: params_lot_no,
        params_payment_cd: params_payment_cd,
      };
      console.log("params 2 else", params2);
      this.setState({ lot_no: params_lot_no });
      {
        isMount
          ? fetch(
            urlApi +
            "c_product_info/getTrxAmt_Freq/" +
            params_db_profile +
            "/" +
            params_entity +
            "/" +
            params_project_no +
            "/" +
            params_lot_no +
            "/" +
            params_payment_cd,
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

                this.setState({ getTrxAmt_Freq: resData });

                // this.getRoomUnit(this.state.getLot);
                // this.getLot_room_default({ dataLotType: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  console.log("ERROR NO DATA getTrxAmt_Freq if", res.Pesan);
                });
              }
              console.log("getTrxAmt_Freq if", res);
            })
            .catch((error) => {
              console.log(error);
            })
          : null;
      }


    }


  }

  // getPaymentDetail_Amt_backup(params) {
  //   if (params == null || params == undefined) {
  //     const items = this.props.items;
  //     console.log("params default", items);
  //     var entity = items.entity_cd;
  //     var project_no = items.project_no;
  //     var db_profile = items.db_profile;
  //     if (this.state.getLotNo) {
  //       console.log('params payment detail default lotno', this.state.getLotNo[0].lot_no);
  //       var lot_no = this.state.getLotNo[0].lot_no;
  //     }
  //     if (this.state.getPaymentCode) {
  //       console.log('params payment detail default paymendcode', this.state.getPaymentCode[0].payment_cd);
  //       var payment_cd = this.state.getPaymentCode[0].payment_cd;
  //     }

  //     const params2 = {
  //       entity: entity,
  //       project_no: project_no,
  //       db_profile: db_profile,
  //       lot_no: lot_no,
  //       payment_cd: payment_cd,
  //     };
  //     console.log("params 2 if", params2);
  //     {
  //       isMount
  //         ? fetch(
  //           urlApi +
  //           "c_product_info/getPaymentCodeDetail/" +
  //           db_profile +
  //           "/" +
  //           entity +
  //           "/" +
  //           project_no +
  //           "/" +
  //           lot_no +
  //           "/" +
  //           payment_cd,
  //           {
  //             method: "GET",
  //             headers: this.state.hd,
  //             //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
  //           }
  //         )
  //           .then((response) => response.json())
  //           .then((res) => {
  //             if (!res.Error) {
  //               const resData = res.Data;

  //               this.setState({ getPaymentDetail: resData });

  //               // this.getRoomUnit(this.state.getLot);
  //               // this.getLot_room_default({ dataLotType: resData });
  //             } else {
  //               this.setState({ isLoaded: !this.state.isLoaded }, () => {
  //                 alert(res.Pesan);
  //               });
  //             }
  //             console.log("getPaymentDetail", res);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           })
  //         : null;
  //     }
  //   } else {
  //     var entity = params.entity_cd;
  //     var project_no = params.project_no;
  //     var db_profile = params.db_profile;
  //     var lot_no = params.lot_no;
  //     var payment_cd = params.payment_cd;

  //     const params2 = {
  //       entity: entity,
  //       project_no: project_no,
  //       db_profile: db_profile,
  //       lot_no: lot_no,
  //       payment_cd: payment_cd,
  //     };
  //     console.log("params 2 else", params2);
  //     {
  //       isMount
  //         ? fetch(
  //           urlApi +
  //           "c_product_info/getPaymentCodeDetail/" +
  //           db_profile +
  //           "/" +
  //           entity +
  //           "/" +
  //           project_no +
  //           "/" +
  //           lot_no +
  //           "/" +
  //           payment_cd,
  //           {
  //             method: "GET",
  //             headers: this.state.hd,
  //             //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
  //           }
  //         )
  //           .then((response) => response.json())
  //           .then((res) => {
  //             if (!res.Error) {
  //               const resData = res.Data;

  //               this.setState({ getPaymentDetail: resData });

  //               // this.getRoomUnit(this.state.getLot);
  //               // this.getLot_room_default({ dataLotType: resData });
  //             } else {
  //               this.setState({ isLoaded: !this.state.isLoaded }, () => {
  //                 alert(res.Pesan);
  //               });
  //             }
  //             console.log("getPaymentDetail", res);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           })
  //         : null;
  //     }
  //   }


  // }

  _renderComponent = () => {
    // if (this.state.activePage === 0)
    //   return (
    //     // <Content>
    //     //   {/* {this.state.tower ?
    //     //   <Text>{this.state.tower[0].</Text>
    //     // } */}
    //     //   <Text> tab lot type 1</Text>
    //     // </Content>
    //     null
    //   );
    // //... Your Component 1 to display
    // if (this.state.activePage === 1)
    //   return (
    //     // <Content
    //     //   style={Style.layoutInner}
    //     //   contentContainerStyle={Style.layoutContent}
    //     // >
    //     //   <Text>
    //     //     {" "}
    //     //     tab lot type 2 {console.log("getlotroom", this.state.getLot_room)}
    //     //   </Text>
    //     // </Content>

    //     null
    //   );
    // else
    //   return (
    //     // <Content
    //     //   style={Style.layoutInner}
    //     //   contentContainerStyle={Style.layoutContent}
    //     // >
    //     //   <Text> tab 3</Text>
    //     // </Content>
    //     null
    //   );
  };

  clickProject(activePage, item) {

    console.log("key", activePage);
    console.log("item level", item.level_no);
    this.setState({ level_no: item.level_no });
    const level_no = item.level_no;
    const dataLotNo = this.state.getLotNo;
    console.log("datalotno di clickproject", dataLotNo)
    // alert(level_no);
    if (item.level_no) {
      this.getLotNo(level_no);
      this.getKeterangan(level_no);
      this.getShortDescs();
      this.getPaymentCode(dataLotNo);
    }
    this.setState({ activePage });
    this.setState({ activePagePaymentCode: 0 }); //buat ngerefresh segment biar balik ke array 0 atau button first. semoga sih ga ngaruh ke data, cuma ke tampilan aja
    // this.state.activePagePaymentCode
    console.log("this.state active page di clikc project", activePage);
  }

  selectUnit() {
    if (this.state.level_no == null || this.state.level_no == undefined) {
      alert("level no harus dipilih");
    } else {
      var get_payment_detail = this.state.getPaymentDetail;
      // if (get_payment_detail.trx_mode_type)
      console.log("get_payment_detail", get_payment_detail);
      // console.log(
      //   "get_payment_detail.trx_mode_type",
      //   get_payment_detail.trx_mode_type
      // );
      get_payment_detail.forEach((data) => {
        console.log("data foreach", data.trx_mode_type);
        var trx_mode_type = data.trx_mode_type;
        if (trx_mode_type == "B") {
          trx_amt = data.trx_amt;
          descs = data.descs;
        }
      });

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
        level_no: this.state.level_no,
        trx_amt: this.state.trx_amt,
        descs: this.state.descs,
        trx_amt: trx_amt,
        descs: descs,
        lot_no: this.state.lot_no,
        // getpict_roomtype: this.state.getpict_roomtype[0].room_type_url,
      };
      console.log("items kirim ke select unit", items);
      Actions.FormNewBooking({ items: items });
    }
  }

  render() {
    // this.setState({subTotal:subTotal});
    // console.log("this.state.image.back", this.state.block);
    return (
      <Container>
        <StatusBar
          backgroundColor={Colors.blueUrban}
          animated
          barStyle="light-content"
        />

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
          // source={this.state.imageback}
          style={{
            // flex: 1,
            marginBottom: 20,
            top: 20,
            width: Metrics.WIDTH,
            height: 80,
            backgroundColor: "#003457"
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
            <View style={{ paddingLeft: 10, paddingRight: 0 }}>
              <Button
                transparent
                style={{ alignSelf: "flex-start", marginLeft: -10, }}
                onPress={Actions.pop}
              >
                <Icon
                  active
                  name="arrow-left"
                  // style={[Style.textWhite,{fontSize: 28}]}
                  style={{ color: "#fff" }}
                  type="MaterialCommunityIcons"
                />
              </Button>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignContent: 'center',
                flex: 2,
                top: 17,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: 'bold' }}>{this.state.title}</Text>
              <Text style={{ color: "#fff", fontSize: 10, }}>LRT CIKUNIR, JATIBENING</Text>
              <Text style={{ color: Colors.goldUrban, fontSize: 12, fontWeight: 'bold' }}>{this.state.towerDescs}</Text>
            </View>

            <View style={{ paddingLeft: 0, paddingRight: 10 }}>
              <View style={{ flexDirection: 'row', }}>
                <View
                  // transparent
                  style={{ paddingRight: 5, }}
                // onPress={Actions.pop}
                >
                  <Icon
                    active
                    name="share-variant"
                    // style={[Style.textWhite,{fontSize: 28}]}
                    style={{ color: "#fff", fontSize: 20, top: 10 }}
                    type="MaterialCommunityIcons"
                  />
                </View>
                <View
                  // transparent
                  style={{ paddingLeft: 5 }}
                // onPress={Actions.pop}
                >
                  <Icon
                    active
                    name="menu"
                    // style={[Style.textWhite,{fontSize: 28}]}
                    style={{ color: "#fff", fontSize: 21, top: 10 }}
                    type="MaterialCommunityIcons"
                  />
                </View>
              </View>

            </View>
          </View>
        </ImageBackground>

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
                    <Button
                      key={key}
                      style={{
                        width: "48%",
                        height: 50,
                        marginBottom: 10,
                        // borderRadius: 3,
                      }}
                      active={this.state.activePage === key}
                      onPress={() => this.clickProject(key, item)}
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
                          // backgroundColor: Colors.goldUrban,

                          backgroundColor:
                            this.state.activePage === key
                              ? "#8c7f5f"
                              : Colors.goldUrban,
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
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          Rp. {numFormat(parseInt(item.land_net_price))}
                        </Text>
                      </View>
                    </Button>
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

            <View style={{ alignItems: "center" }}>
              <ScrollView horizontal>
                <Segment
                  style={{
                    backgroundColor: Colors.white,
                    alignItems: "center",
                  }}
                >
                  {this.state.getPaymentCode.map((data, key) => (
                    <Button
                      first
                      key={key}
                      active={this.state.activePagePaymentCode === key}
                      onPress={this.selectComponent(key, {
                        data,
                      })}
                      style={
                        this.state.activePagePaymentCode === key
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
                          this.state.activePagePaymentCode === key
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
                        {data.short_descs}
                      </Text>
                    </Button>
                  ))}
                </Segment>
              </ScrollView>
            </View>

            <View style={{ marginBottom: 15 }}>
              {this.state.getKeterangan ? (
                this.state.getKeterangan.map((data, key) => (
                  <View key={key}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 35,
                        paddingTop: 5,
                        width: "50%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: Fonts.type.proximaNovaReg,
                          marginRight: 5,
                          width: '55%'
                        }}
                      >
                        {/* {data.descs_block_no} */}
                        {this.state.towerDescs.replace(" ", "\n").trim()}
                      </Text>
                      <Text
                        style={{
                          fontSize: 32,
                          fontFamily: Fonts.type.proximaNovaCondBold,
                        }}
                      >
                        {data.room_unit}
                      </Text>
                    </View>

                    {this.state.getTrxAmt_Freq.length != 0 ? (
                      <Text
                        style={{
                          textAlign: "right",
                          right: 35,
                          bottom: 30,
                          fontSize: 14
                        }}
                      >
                        {this.state.short_descs}:{" "}
                        {/* {numFormat(this.state.getTrxAmt_Freq[0].trx_amount)} */}
                        {numFormat(this.state.getTrxAmt_Freq[0].trx_amt)}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          textAlign: "right",
                          right: 50,
                          bottom: 30,
                          fontSize: 14
                        }}
                      >
                        12x : null
                      </Text>
                    )}

                    <View
                      style={{
                        paddingLeft: 50,
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>
                        {/* Tipe{"    "}: {data.descs_lot_type} */}
                        Tipe{"    "}: {data.desctype}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingLeft: 50,
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>
                        SGA{"    "}: {data.land_area} m2
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingLeft: 50,
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>
                        View{"   "}: {data.desczone}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View>
                  <Text>No Data Available </Text>
                </View>
              )}
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

            <View
              style={{
                textAlign: "center",
                marginTop: 20,
              }}
            >
              <Grid>
                <Row style={{}}>
                  <Col
                  // style={{
                  //   alignItems: "center",
                  // }}
                  >
                    <Text style={{ textAlign: "left", marginLeft: 30 }}>
                      Payment Plan
                    </Text>
                  </Col>
                  <Col style={{ width: 30 }}></Col>
                  <Col>
                    <Text style={{ textAlign: "center", marginRight: 30 }}>
                      Cicilan
                    </Text>
                  </Col>
                </Row>
                <View
                  style={{
                    borderBottomWidth: 1,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                ></View>
              </Grid>
              {this.state.getPaymentDetail ? (
                this.state.getPaymentDetail.map((data, key) => (
                  <View key={key}>
                    <Grid>
                      <Row>
                        <Col style={{ width: 195 }}>
                          {/* <Text>{key + 1}</Text> */}

                          {data.freq == 1 && data.trx_mode_type == "I" ? (
                            <Text
                              style={{
                                textAlign: "left",
                                marginLeft: 30,
                                fontSize: 14
                              }}
                            >
                              Last {data.descs}
                            </Text>
                          ) : data.trx_mode_type == "B" ? (
                            <Text style={{ textAlign: "left", marginLeft: 30, fontSize: 14 }}>
                              {data.descs}
                            </Text>
                          ) : (
                            <Text style={{ textAlign: "left", marginLeft: 30, fontSize: 14 }}>
                              {data.descs} {data.freq}x
                            </Text>
                          )}
                        </Col>
                        <Col style={{ width: 30 }}>
                          {data.freq == 1 && data.trx_mode_type == "I" ? (
                            <Text style={{ textAlign: "right", fontSize: 14 }}>Rp.</Text>
                          ) : data.trx_mode_type == "B" ? (
                            <Text style={{ textAlign: "right", fontSize: 14 }}>Rp.</Text>
                          ) : (
                            <Text style={{ textAlign: "right", fontSize: 14 }}>Rp.</Text>
                          )}
                        </Col>
                        <Col>
                          <Text
                            style={{
                              textAlign: "right",
                              marginRight: 20,
                              fontSize: 14
                            }}
                          >
                            {" "}
                            {numFormat(data.trx_amt)}
                          </Text>
                          {/* <View
                            style={{ flexDirection: "row", textAlign: "right" }}
                          >
                           
                          </View> */}
                        </Col>
                      </Row>
                    </Grid>
                  </View>
                ))
              ) : (
                <Text>null</Text>
              )}
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ paddingLeft: 20, fontSize: 12 }}>
                Keterangan :
              </Text>
              {/* <View
                style={{
                  paddingLeft: 20,
                  width: "100%",
                }}
              >
                <Text style={{ fontSize: 9, textAlign: "justify" }}>
                  - Booking Fee Rp. 15,000,000
                </Text>
              </View> */}
              <View
                style={{
                  paddingLeft: 20,

                  paddingRight: 20,
                  flexDirection: 'row'
                }}
              >
                <Text style={{ fontSize: 9, }}>
                  - {" "}
                </Text>
                <Text style={{ fontSize: 9, textAlign: "justify", width: "100%", flexWrap: 'wrap' }}>
                  Booking Fee Rp. 15,000,000
                  </Text>

              </View>
              {/* <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  width: "100%",
                }}
              >
                <Text
                  style={{ fontSize: 9, textAlign: "justify", width: "100%" }}
                >
                  - Angsuran 1 paling lambat 7 hari dari tanggal
                  Booking Fee
                </Text>
              </View> */}
              <View
                style={{
                  paddingLeft: 20,

                  paddingRight: 20,
                  flexDirection: 'row'
                }}
              >
                <Text style={{ fontSize: 9, }}>
                  - {" "}
                </Text>
                <Text style={{ fontSize: 9, textAlign: "justify", width: "100%", flexWrap: 'wrap' }}>
                  Angsuran 1 paling lambat 7 hari dari tanggal Booking Fee
                  </Text>

              </View>

              <View
                style={{
                  paddingLeft: 20,

                  paddingRight: 20,
                  flexDirection: 'row'
                }}
              >
                <Text style={{ fontSize: 9, }}>
                  - {" "}
                </Text>
                <Text style={{ fontSize: 9, textAlign: "justify", width: "95%", flexWrap: 'wrap' }}>
                  Harga jual belum termasuk Biaya Pemecahan
                  Sertifikat, Akte Jual Beli, Biaya Balik Nama, BPHTB, atau Pajak Susulan dari Pemerintah
                  </Text>
                {/* <Text
                  style={{
                    fontSize: 9,
                    textAlign: "justify",
                    paddingLeft: 5,
                  }}
                >
                  Nama, BPHTB, atau Pajak Susulan dari Pemerintah
                </Text> */}
                {/* <Text
                  style={{
                    fontSize: 9,
                    textAlign: "justify",
                    paddingLeft: 10,
                  }}
                >
                  {"     "}Pemerintah
                </Text> */}
              </View>

              {/* <View
                style={{
                  paddingLeft: 30,
                  paddingRight: 20,
                }}
              >
                <Text style={{ fontSize: 9, textAlign: "justify" }}>
                  - Harga sewaktu - waktu dapat berubah tanpa
                  pemberitahuan terlebih dahulu
                </Text>
               
              </View> */}
              <View
                style={{
                  paddingLeft: 20,

                  paddingRight: 20,
                  flexDirection: 'row'
                }}
              >
                <Text style={{ fontSize: 9, }}>
                  - {" "}
                </Text>
                <Text style={{ fontSize: 9, textAlign: "justify", width: "100%", flexWrap: 'wrap' }}>
                  Harga sewaktu - waktu dapat berubah tanpa pemberitahuan terlebih dahulu
                  </Text>
                {/* <Text
                  style={{
                    fontSize: 9,
                    textAlign: "justify",
                    paddingLeft: 5,
                  }}
                >
                  Nama, BPHTB, atau Pajak Susulan dari Pemerintah
                </Text> */}
                {/* <Text
                  style={{
                    fontSize: 9,
                    textAlign: "justify",
                    paddingLeft: 10,
                  }}
                >
                  {"     "}Pemerintah
                </Text> */}
              </View>
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

            <View
              style={{
                width: Metrics.WIDTH,
                paddingBottom: 25,
                paddingTop: 10,
              }}
            >
              <Button
                style={[Style.signInBtn]}
                onPress={() => this.selectUnit()}
              >
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
        </Content>
      </Container>
    );
  }
}

//make this component available to the app
export default SelectUnit;
