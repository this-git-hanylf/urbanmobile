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
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  View,
  FlatList,
  Modal,
  Alert,
  ListView
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
  Card
} from "native-base";

import { Actions } from "react-native-router-flux";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell
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
// create a component
class DetailBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: null,

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
      Alert_Visibility: false,
      pesan: ""
    };

    this.showAlert = this.showAlert.bind(this);
    console.log("props cf", props);
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    isMount = true;
    const dataProps = this.props.data;
    const pict = dataProps.payment_attachment;
    console.log("pic", pict);
    console.log("datapr", dataProps);
    const data = {
      hd: new Headers({
        Token: await _getData("@Token")
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
      total_amt: dataProps.total_amt
      //   pictUrlAttach: { uri: dataProps.payment_attachment }
    };

    console.log("data", data);
    this.setState(data, () => {
      this.getDetail();
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
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(res => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataDetail: resData });
          console.log("dataDetail", resData);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  showAlert = key => {
    Alert.alert(
      "Select a Photo",
      "Choose the place where you want to get a photo",
      [
        { text: "Gallery", onPress: () => this.fromGallery(key) },
        { text: "Camera", onPress: () => this.fromCamera(key) },
        {
          text: "Cancel",
          onPress: () => console.log("User Cancel"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  fromCamera(key) {
    ImagePicker.openCamera({
      cropping: true,
      width: 600,
      height: 500
    })
      .then(image => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path, status: true } });
      })
      .catch(e => console.log("tag", e));
  }

  fromGallery(key) {
    ImagePicker.openPicker({
      multiple: false,
      width: 600,
      height: 500
    })
      .then(image => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path }, status: true });
        console.log("status di gallert", this.state.status);
      })
      .catch(e => console.log("tag", e));
  }

  tes() {
    alert("sdsd");
  }
  submit() {
    // this.setState({ uploadfoto: !this.state.uploadfoto });
    const order_id = this.state.order_id;
    let fileattach = "";
    // console.log("pic nul", this.state.pictUrlAttach);
    if (this.state.pictUrlAttach == null) {
      console.log("replace", this.state.replaceFoto);
      fileattach = "./img/noimage.png";
      console.log("pic nul", this.state.pictUrlAttach);
    } else {
      fileattach = RNFetchBlob.wrap(
        this.state.pictUrlAttach.uri.replace("file://", "")
      );
      console.log("pic not nul", this.state.pictUrlAttach);
    }

    const frmData = {
      //---------foto attachment
      order_id: order_id,
      pictUrlAttach: fileattach
      //---------end foto attachment
    };

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

    if (frmData) {
      RNFetchBlob.fetch(
        "POST",
        // urlApi + "c_auth/SignUpAgent",
        urlApi + "c_nup/saveAttachment/IFCAPB/",
        {
          "Content-Type": "multipart/form-data"
        },
        [
          // { name: "photo", filename: fileName, data: fileImg },
          // { name: "photoktp", filename: fileNameKtp, data: filektp },
          { name: "photoattach", filename: fileNameAttach, data: fileattach },
          // { name: "photobukutabungan", filename: fileNameBukuTabungan, data: filebukutabungan },
          // { name: "photosuratanggota", filename: fileNameSuratAnggota, data: filesuratanggota},
          { name: "data", data: JSON.stringify(frmData) }
        ]
      ).then(resp => {
        console.log("res_if", resp);
        const res = JSON.parse(resp.data);
        console.log("res", res);
        // const res = JSON.stringify(resp.data);

        if (!res.Error) {
          // Actions.pop()
          this.setState({ isLogin: true }, () => {
            // alert(res.Pesan);
            const pesan = res.Pesan;
            this.alertFillBlank(true, pesan);
            // if (res.Data) {
            Actions.pop();

            console.log("uploadfoto", !this.state.uploadfoto);
            setTimeout(() => {
              Actions.refresh({ uploadfoto: !this.state.uploadfoto });
            }, 0);
          });
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            // alert(res.Pesan);
            const pesan = res.Pesan;
            this.alertFillBlank(true, pesan);
            // console.log('url',this.state.pickUrlKtp.uri)
          });
        }
        const pesan = res.Pesan;
        this.alertFillBlank(true, pesan);
        // alert(res.Pesan);
      });
    } else {
      this.setState({ isLoaded: !this.state.isLoaded }, () => {
        // alert("Please upload attachment");
        const pesan = "Please upload attachment";
        this.alertFillBlank(true, pesan);
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

  render() {
    // const tables = {
    //   tableHead: ["Date", "Description", "Amount", "Status"]
    // };
    const numbers = [0];
    const listItems = numbers.map(number => number + 1);
    console.log("nomor", listItems);

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
              justifyContent: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "70%",
                height: "20%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.type.proximaNovaReg,
                  fontSize: 17,
                  paddingBottom: 15,
                  color: Colors.black,
                  textAlign: "center"
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
                    justifyContent: "center"
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
                letterSpacing: 1
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
                letterSpacing: 1
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
                    fontSize: 16
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
                    fontSize: 13
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
                    fontSize: 16
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
                        fontSize: 16
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
                          fontSize: 16
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
                          position: "absolute"
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
                          position: "absolute"
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

                  paddingTop: 10
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

                  paddingTop: 10
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
          <View
            style={{ paddingTop: 50, paddingBottom: 10, paddingHorizontal: 20 }}
          >
            <Text
              style={{
                fontFamily: Fonts.type.proximaNovaReg,
                alignSelf: "flex-start",
                color: Colors.navyUrban,
                marginBottom: 5,
                fontSize: 14
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
                    right: 10
                  }}
                >
                  {/* <Text>klik</Text> */}
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      position: "absolute",
                      right: 10
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
                      alignContent: "center"
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
                    right: 10
                  }}
                >
                  {/* <Text>klik</Text> */}
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      position: "absolute",
                      right: 10
                    }}
                    source={require("@Asset/images/icon/image_blue.png")}
                  ></Image>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() => alert("tes")}
                  style={
                    {
                      // width: 35,
                      // height: 35,
                      // position: "absolute"
                      // right: 10
                    }
                  }
                >
                  <Text>tes</Text>
                </TouchableOpacity> */}
                <View style={[Styles.containImageTop_no]}>
                  <Image
                    // resizeMode="cover"
                    style={{
                      width: 200,
                      height: 130,
                      alignContent: "center"
                    }}
                    // source={this.state.pictUrlAttach}
                    source={{ uri: this.state.pictUrlAttach }}
                  />
                </View>
              </Item>
            )}
          </View>
          <View style={{ paddingTop: 50 }}>
            <Button style={Styles.btnMedium} onPress={() => this.submit()}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaBold,
                  letterSpacing: 1
                }}
              >
                Submit
              </Text>
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
    backgroundColor: "#2c3e50"
  },
  text: {
    textAlign: "center",
    fontWeight: "bold"
  }
});

//make this component available to the app
export default DetailBooking;
