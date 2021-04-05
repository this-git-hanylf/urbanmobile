//import liraries
import React, { Component } from "react";
import {
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  View,
  FlatList,
  Modal,
  Alert,
  ListView,
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
  Card,
  Label,
} from "native-base";

import { Actions } from "react-native-router-flux";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import { Style, Colors, Fonts } from "../Themes";
import Styles from "./Style";

import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import numFormat from "@Component/numFormat";
let isMount = false;
// window.location.reload(false);
// create a component
class DetailBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: null,
      isLoaded: true,
      units: [],
      user: "",
      name: "",
      project: [],
      dataRow: [],
      entity: [],
      order_id: "",
      db_profile: "",
      dataDetail: [],
      dataProps: [],
      full_name: "",
      dateBook: "",
      attach: "",
      total_amt: "",
      pictUrlAttach: "",
      replaceFoto: "file:///urbanAPI/images/noimage-min.png",
      uploadfoto: false,
      status: false,
      Alert_Visibility_input: false,
      pesan_input: "",
      Alert_Visibility: false,
      pesan: "",
      dataAttach: [],
      account_name: "",
      nama_agent: "",
      dataProjectName: [],
      qty_total: "",
      total_amt: "",
      status: "",
      status_gambar: false
      // current_date: new Date(),
      // uri: "",
    };

    this.showAlert = this.showAlert.bind(this);
    console.log("props cf", props);
    // console.log("data ataact", this.state.dataAttach[0].payment_attachment);
  }

  async componentDidMount() {
    // this.forceUpdate();
    console.disableYellowBox = true;
    isMount = true;
    const dataProps = this.props.data;
    const pict = dataProps.payment_attachment;
    console.log("pic", pict);
    console.log("datapr", dataProps);
    const data = {
      hd: new Headers({
        Token: await _getData("@Token"),
      }),
      user: await _getData("@User"),
      name: await _getData("@UserId"),
      // project: await _getData("@UserProject"),
      debtor: await _getData("@Debtor"),
      group: await _getData("@Group"),
      full_name: dataProps.full_name,
      dateBook: dataProps.order_date,
      pictUrlAttach: dataProps.payment_attachment,
      order_id: dataProps.order_id,
      total_amt: dataProps.total_amt,
      nama_agent: await _getData("@Name"),
      email_add: this.props.email_add_project,
      qty_total: dataProps.qty,
      total_amt: dataProps.total_amt,
      status: dataProps.status,
      // uri: dataProps.payment_attachment,
      //   pictUrlAttach: { uri: dataProps.payment_attachment }
    };
    // console.log("picturl", dataProps.payment_attachment);
    console.log("data", data);
    this.setState(data, () => {
      this.getDetail();
      this.getAttach();
      // this.getProjectName();
    });
  }

  getDetail = () => {
    const order_id = this.props.order_id;
    const db_profile = this.props.db_profile;
    const entity_cd = this.props.entity_cd;
    const project_no = this.props.project_no;
    console.log("order", order_id);
    console.log("db", db_profile);

    fetch(
      urlApi +
        "c_nup/getDetailPending/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        project_no +
        "/" +
        order_id,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataDetail: resData });
          console.log("dataDetail", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getAttach = () => {
    const order_id = this.props.order_id;
    const db_profile = this.props.db_profile;
    // const entity_cd = this.props.entity_cd;
    // const project_no = this.props.project_no;
    console.log("order", order_id);
    // console.log("db", db_profile);

    fetch(
      urlApi +
        "c_nup/getDataFotoAttach/" +
        db_profile +
        "/" +
        // entity_cd +
        // "/" +
        // project_no +
        // "/" +
        order_id,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          // const resData = res.Data;

          const resData = res.Data[0];

          // ? Agar Gambar Tidak ter cache
          let url =
            resData.payment_attachment +
            "?random_number=" +
            new Date().getTime();
          let account_name = resData.account_name;
          // let urlHeader =
          //   resData.pict_header + "?random_number=" + new Date().getTime();
          console.log("url pict", url);
          this.setState({
            dataAttach: resData,
            pictUrlAttach: { uri: url },
            account_name: account_name,
            // pass_nih: resData.password,
            // fotoHeader:{uri:urlHeader},
            // gender: resData.gender,
          });
          // console.log("res Profil", res);

          // this.setState({ dataAttach: resData });
          // console.log("dataAttach", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showAlert = (key) => {
    Alert.alert(
      "Select a Photo",
      "Choose the place where you want to get a photo",
      [
        { text: "Gallery", onPress: () => this.fromGallery(key) },
        { text: "Camera", onPress: () => this.fromCamera(key) },
        {
          text: "Cancel",
          onPress: () => console.log("User Cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  fromCamera(key) {
    ImagePicker.openCamera({
      cropping: true,
      width: 600,
      height: 500,
      compressImageQuality: 0.7,
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 500,
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path }, status: true ,status_gambar : true});
        // this.setState({ status_gambar : true });
      })
      .catch((e) => console.log("tag", e));
  }

  fromGallery(key) {
    ImagePicker.openPicker({
      multiple: false,
      width: 600,
      height: 500,
      compressImageQuality: 0.7,
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 500,
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path }, status: true, status_gambar : true });
        console.log("status di gallert", this.state.status);
        // this.setState({ status_gambar : true });
      })
      .catch((e) => console.log("tag", e));
  }

  tes() {
    alert("sdsd");
  }
  validating = (validationData) => {
    const keys = Object.keys(validationData);
    const errorKey = [];
    let isValid = false;

    keys.map((data, key) => {
      if (validationData[data].require) {
        let isError =
          !this.state[data] || this.state[data].length == 0 ? true : false;
        let error = "error" + data;
        errorKey.push(isError);
        this.setState({ [error]: isError });
      }
    });

    for (var i = 0; i < errorKey.length; i++) {
      if (errorKey[i]) {
        isValid = false;
        break;
      }
      isValid = true;
    }

    return isValid;
  };
  submit() {
    this.setState({ isLoaded: !this.state.isLoaded });
    // const order_id = this.props.order_id;

    // this.setState({ uploadfoto: !this.state.uploadfoto });
    // const order_id = this.state.order_id;
    let fileattach = "";

    // console.log("pic uriii", this.state.pictUrlAttach.uri);
    if (this.state.pictUrlAttach == null) {
      console.log("replace", this.state.replaceFoto);
      fileattach = "./img/noimage.png";
      console.log("pic nul", this.state.pictUrlAttach);
    } else {
      fileattach = RNFetchBlob.wrap(
        this.state.pictUrlAttach.uri.replace("file://", "")
      );
      this.setState({ isLoaded: !this.state.isLoaded });
      console.log("pic not nul", this.state.pictUrlAttach);
    }

    const {
      account_name,
      order_id,
      nama_agent,
      current_date,
      qty_total,
      total_amt,
    } = this.state;
    const db_profile = this.props.db_profile;
    const entity_cd = this.props.entity_cd;
    const project_no = this.props.project_no;
    const email_add = this.props.email_add_project;
    const principal_name = this.props.principal_name;
    const dataDetail = this.state.dataDetail;
    const lead_name = this.props.lead_name;
    // const qty_total = this.state
    console.log("data detail nih", dataDetail);
    // console.log("order id", order_id);
    console.log("db_profile", db_profile);
    console.log("entity_cd", entity_cd);
    console.log("project_no", project_no);
    console.log("email_add", email_add);

    const frmData = {
      //---------foto attachment
      name_agent: nama_agent,
      order_id: order_id,
      pictUrlAttach: fileattach,
      account_name: account_name,
      email_add: email_add,
      principal_name: principal_name,
      entity_cd: entity_cd,
      project_no: project_no,
      qty_total: qty_total,
      total_amt: total_amt,
      lead_name: lead_name,
      // dataDetail,

      // submit_payment_date: current_date,
      //---------end foto attachment
    };

    const isValid = this.validating({
      account_name: { require: true },
      pictUrlAttach: { require: true },
    });

    let fileNameAttach = "";
    if (this.state.pictUrlAttach == null) {
      console.log(this.state.pictUrlAttach);
      fileNameAttach = "./img/noimage.png";
      console.log("fileNameAttach", fileNameAttach);
    } else {
      fileNameAttach = "Attachment_Payment_" + order_id + ".png";
      console.log("fileNameAttach", fileNameAttach);
    }

    // //   console.log("attach", fileNameAttach);
    console.log("formsubmmit", frmData);
    // // console.log("leng foto ktp", this.state.pictUrlAttach.length);
    // if (frmData) {
    //   this.setState({ isLoaded: this.state.isLoaded });
    // }
    if (isValid && this.state.status_gambar == true) {
      console.log("tes is valid");
      this.setState({ isLoaded: this.state.isLoaded });
      RNFetchBlob.fetch(
        "POST",
        // urlApi + "c_auth/SignUpAgent",
        urlApi + "c_nup/saveAttachment/IFCAPB/",
        {
          "Content-Type": "multipart/form-data",
        },
        [
          // { name: "photo", filename: fileName, data: fileImg },
          // { name: "photoktp", filename: fileNameKtp, data: filektp },
          { name: "photoattach", filename: fileNameAttach, data: fileattach },
          // { name: "photobukutabungan", filename: fileNameBukuTabungan, data: filebukutabungan },
          // { name: "photosuratanggota", filename: fileNameSuratAnggota, data: filesuratanggota},
          { name: "data", data: JSON.stringify(frmData) },
        ]
      ).then((resp) => {
        console.log("res_if", resp);
        const res = JSON.parse(resp.data);
        console.log("res", res);
        // const res = JSON.stringify(resp.data);

        if (!res.Error) {
          // Actions.pop()
          this.setState(
            { isLogin: true, isLoaded: this.state.isLoaded },
            () => {
              // alert(res.Pesan);
              const pesan = res.Pesan;
              this.alertFillBlank(true, pesan);
              // if (res.Data) {
              // Actions.pop();
              console.log("res data foto", res.Data);
              console.log("uploadfoto", !this.state.uploadfoto);
              setTimeout(() => {
                Actions.refresh({ uploadfoto: !this.state.uploadfoto });
              }, 0);
            }
          );
          // this.setState({ isLoaded: this.state.isLoaded });
        } else {
          this.setState({ isLoaded: this.state.isLoaded });
          const pesan = res.Pesan;
          this.alertFillBlank(true, pesan);
          console.log("rror false");
          // this.setState({ isLoaded: false }, () => {
          //   // alert(res.Pesan);
          //   const pesan = res.Pesan;
          //   this.alertFillBlank(true, pesan);
          //   // console.log('url',this.state.pickUrlKtp.uri)
          // });
        }
        const pesan = res.Pesan;
        this.alertFillBlank(true, pesan);
        console.log("error gabisa sumit", res.Pesan);
      });
    } else {
      this.setState({ isLoaded: false }, () => {
        // alert("Please upload attachment");
        const pesan_input = "Please upload attachment and input sending name";
        this.alertFillBlank_input(true, pesan_input);
        // alert(res.Pesan);
        // console.log('url',this.state.pickUrlKtp.uri)
      });
      // alert("Please assign your ID Picture");
      // console.log('url else',this.state.pickUrlKtp.uri)
    }
  }

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }
  alertFillBlank_input(visible, pesan_input) {
    this.setState({
      Alert_Visibility_input: visible,
      pesan_input: pesan_input,
    });
  }

  render() {
    // const tables = {
    //   tableHead: ["Date", "Description", "Amount", "Status"]
    // };
    const numbers = [0];
    const listItems = numbers.map((number) => number + 1);
    console.log("nomor", listItems);
    // const dataat = this.state.dataAttach;
    // console.log("dataat", dataat);
    // const det = dataat.payment_attachment;
    // console.log("det", det);
    // const ur = this.state.dataAttach[0].payment_attachment;
    // console.log("ur", ur);
    return (
      <Container style={Style.bgMain}>
        {/* <Header style={Style.navigation}>
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
              {"My Booking".toUpperCase()}
            </Text>
          </View>
          <View style={Style.actionBarRight}></View>
        </Header> */}
        {/* <AlertCustom /> */}
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
                    Actions.pop();
                    setTimeout(() => {
                      Actions.refresh({ uploadfoto: !this.state.uploadfoto });
                    }, 0);
                    console.log("uploadfoto status", !this.state.uploadfoto);
                  }}
                  // activeOpacity={0.7}
                >
                  <Text style={{ color: Colors.white }}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* alert custom  input kosong */}
        <Modal
          visible={this.state.Alert_Visibility_input}
          transparent={true}
          animationType={"slide"}
          onRequestClose={() => {
            this.alertFillBlank_input(
              !this.state.Alert_Visibility_input,
              pesan_input
            );
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
                {this.state.pesan_input}
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
                    this.alertFillBlank_input(
                      !this.state.Alert_Visibility_input
                    );
                    this.setState({ isLoaded: !this.state.isLoaded });
                    // Actions.pop();
                    // setTimeout(() => {
                    //   Actions.refresh({ uploadfoto: !this.state.uploadfoto });
                    // }, 0);
                    // console.log("uploadfoto status", !this.state.uploadfoto);
                  }}
                  // activeOpacity={0.7}
                >
                  <Text style={{ color: Colors.white }}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{ top: 25, paddingBottom: 45 }}>
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
              {this.state.name}
              {/* {this.state.projectdesc} */}
            </Text>
            <Text
              style={{
                fontWeight: "900",
                color: Colors.goldUrban,
                fontSize: 14,
                textAlign: "center",
                fontFamily: Fonts.type.proximaNovaBold,
                letterSpacing: 1,
              }}
              // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
            >
              PENDING
              {/* {this.state.projectdesc} */}
            </Text>
          </View>
        </View>
        <Content>
          <View>
            <View style={{ width: "100%", paddingBottom: 30 }}>
              <Left style={{ position: "absolute", left: 20 }}>
                <Text
                  style={{
                    fontFamily: Fonts.type.proximaNovaBold,
                    alignSelf: "flex-start",
                    color: Colors.navyUrban,
                    marginBottom: 5,
                    fontSize: 16,
                  }}
                >
                  Order Id : {this.state.order_id}
                </Text>
              </Left>

              <Right style={{ position: "absolute", right: 20 }}>
                <Text
                  style={{
                    fontFamily: Fonts.type.proximaNovaBold,
                    alignSelf: "flex-start",
                    color: Colors.goldUrban,
                    marginBottom: 5,
                    fontSize: 13,
                  }}
                >
                  {moment(this.state.order_date).format("DD MMM YYYY")}
                </Text>
              </Right>
            </View>

            <View style={{ width: "100%", paddingBottom: 30 }}>
              <Left style={{ position: "absolute", left: 20 }}>
                <Text
                  style={{
                    fontFamily: Fonts.type.proximaNovaBold,
                    alignSelf: "flex-start",
                    color: Colors.navyUrban,
                    marginBottom: 5,
                    fontSize: 16,
                  }}
                >
                  Name : {this.state.full_name}
                </Text>
              </Left>
            </View>

            {this.state.dataDetail == 0
              ? null
              : this.state.dataDetail.map((data, key) => (
                  <View key={key} style={{ paddingLeft: 20 }}>
                    <Text
                      style={{
                        fontFamily: Fonts.type.proximaNovaBold,
                        alignSelf: "flex-start",
                        color: Colors.navyUrban,
                        marginBottom: 5,
                        fontSize: 16,
                      }}
                    >
                      {data.property_descs}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: Fonts.type.proximaNovaBold,
                          alignSelf: "flex-start",
                          color: Colors.navyUrban,
                          marginBottom: 5,
                          fontSize: 16,
                        }}
                      >
                        {data.lot_descs} - ({data.qty} Items)
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts.type.proximaNovaBold,
                          alignSelf: "flex-start",
                          color: Colors.navyUrban,
                          marginBottom: 5,
                          fontSize: 16,
                          right: 130,
                          position: "absolute",
                        }}
                      >
                        Rp.
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts.type.proximaNovaBold,
                          alignSelf: "flex-start",
                          color: Colors.navyUrban,
                          marginBottom: 5,
                          fontSize: 16,
                          right: 20,
                          position: "absolute",
                        }}
                      >
                        {/* {data.total_amt} */}
                        {numFormat(parseInt(data.total_amt))},-
                      </Text>
                    </View>
                  </View>
                ))}
            <View>
              <Text
                style={{
                  fontFamily: Fonts.type.proximaNovaBold,
                  alignSelf: "flex-start",
                  color: Colors.goldUrban,
                  marginBottom: 5,
                  fontSize: 16,
                  right: 130,
                  position: "absolute",

                  paddingTop: 10,
                }}
              >
                Rp.
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.type.proximaNovaBold,
                  alignSelf: "flex-start",
                  color: Colors.goldUrban,
                  marginBottom: 5,
                  fontSize: 16,
                  right: 20,
                  position: "absolute",
                  borderTopWidth: 2,
                  borderTopColor: Colors.navyUrban,

                  paddingTop: 10,
                }}
              >
                {/* {this.state.total_amt} */}
                {numFormat(parseInt(this.state.total_amt))},-
              </Text>
            </View>
          </View>
          {/* <Image
            // resizeMode="cover"
            style={{
              width: 200,
              height: 130,
              alignContent: "center"
            }}
            // source={this.state.pictUrlAttach}
            source={{ uri: this.state.pictUrlAttach }}
          /> */}

          {/* UPLOAD */}
          {/* {this.state.dataAttach == 0 ? (
            <Text>nul</Text>
          ) : (
            <View style={[Styles.containImageTop_no]}>
              <Image
                // resizeMode="cover"
                style={{
                  width: 200,
                  height: 130,
                  alignContent: "center",
                }}
                source={{
                  uri:
                    this.state.dataAttach[0].payment_attachment +
                    "?time=" +
                    new Date(),
                }}
                // source={{ uri: this.state.pictUrlAttach }}
              />
              <Text>
                {this.state.dataAttach[0].payment_attachment +
                  "?time=" +
                  new Date()}
              </Text>
            </View>
         
          )} */}
          <View
            style={{ paddingTop: 50, paddingBottom: 10, paddingHorizontal: 20 }}
          >
            <Text
              style={{
                fontFamily: Fonts.type.proximaNovaReg,
                alignSelf: "flex-start",
                color: Colors.navyUrban,
                marginBottom: 5,
                fontSize: 14,
              }}
            >
              Upload Payment Attachment
            </Text>

            {this.state.status == true ? (
              <Item
                regular
                // style={[{ borderRadius: 5 }, Styles.inputAttach]}
                style={[{ borderRadius: 5 }, Styles.inputAttachLarge]}
                onPress={() => this.showAlert("pictUrlAttach")}
                // pointerEvents={this.state.isLoaded ? "auto" : "none"}
              >
                <Text style={Styles.textAttach}>Payment Attachment</Text>
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 35,
                    position: "absolute",
                    right: 0,
                  }}
                >
                  {/* <Text>klik</Text> */}
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      position: "absolute",
                      right: 10,
                    }}
                    source={require("@Asset/images/icon/image_blue.png")}
                  ></Image>
                </TouchableOpacity>
                <View style={[Styles.containImageTop_no]}>
                  <Image
                    // resizeMode="cover"
                    style={{
                      width: 200,
                      height: 130,
                      alignContent: "center",
                    }}
                    source={this.state.pictUrlAttach}
                    // source={{ uri: this.state.pictUrlAttach }}
                  />
                </View>
              </Item>
            ) : (
              <Item
                regular
                // style={[{ borderRadius: 5 }, Styles.inputAttach]}
                onPress={() => this.showAlert("pictUrlAttach")}
                style={[{ borderRadius: 5 }, Styles.inputAttachLarge]}
                // pointerEvents={this.state.isLoaded ? "auto" : "none"}
              >
                <Text style={Styles.textAttach}>Payment Attachment</Text>
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 35,
                    position: "absolute",
                    right: 0,
                  }}
                >
                  {/* <Text>klik</Text> */}
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      position: "absolute",
                      right: 10,
                    }}
                    source={require("@Asset/images/icon/image_blue.png")}
                  ></Image>
                </TouchableOpacity>
                <View style={[Styles.containImageTop_no]}>
                  <Image
                    // resizeMode="cover"
                    style={{
                      width: 200,
                      height: 130,
                      alignContent: "center",
                    }}
                    source={this.state.pictUrlAttach}
                    // source={{
                    //   uri: this.state.pictUrlAttach + "?time=" + new Date(),
                    // }}
                  />
                </View>
              </Item>
            )}
          </View>
          {/* <View style={[Styles.containImageTop_no]}>
            <Image
              // resizeMode="cover"
              style={{
                width: 200,
                height: 130,
                alignContent: "center",
              }}
              // source={this.state.pictUrlAttach}
              source={{ uri: this.state.pictUrlAttach }}
            />
          </View> */}
          <View style={{ paddingBottom: 15, marginTop: 4 }}>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Bank Account Name
              </Label> */}

              <Input
                autoCapitalize="words"
                placeholderTextColor={Colors.greyUrban}
                value={this.state.account_name}
                onChangeText={(val) => this.setState({ account_name: val })}
                style={Styles.positionTextInput}
                ref="account_name"
                placeholder="Nama Pengirim Uang"
              />
              {this.state.erroraccount_name ? (
                <Icon
                  style={{
                    color: "red",
                    bottom: 3,
                    position: "absolute",
                    right: 0,
                  }}
                  name="close-circle"
                  name="close-circle"
                />
              ) : null}
            </Item>
            {/* {this.state.account_name ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )} */}
            {this.state.erroraccount_name ? (
              <Text
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 15,
                  color: "red",
                  fontSize: 12,
                }}
              >
                Nama Pengirim Uang Required
              </Text>
            ) : null}
          </View>

          {/* <View style={{ paddingTop: 50 }}>
            <Button style={Styles.btnMedium} onPress={() => this.submit()}>
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
                Submit
              </Text>
            </Button>
          </View> */}

          <View
            style={[styles.signbtnSec, { paddingTop: 15 }]}
            pointerEvents={
              this.state.isLoaded || this.state.status == "P" ? "auto" : "none"
            }
          >
            <Button
              style={Styles.btnMedium}
              onPress={() => this.submit()}
              disabled={this.state.status == "P" ? true : false}
            >
              {!this.state.isLoaded ? (
                <ActivityIndicator color="#fff" />
              ) : (
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
                  Submit
                </Text>
              )}
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

//make this component available to the app
export default DetailBooking;
