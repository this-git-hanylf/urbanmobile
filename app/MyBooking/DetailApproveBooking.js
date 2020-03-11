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
import ImageViewer from "react-native-image-zoom-viewer";
let isMount = false;
// create a component
class DetailApproveBooking extends Component {
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
      //   pictUrlAttach: "",
      replaceFoto: "file:///urbanAPI/images/noimage-min.png",
      isView: false,
      nup_no: ""
    };

    // this.showAlert = this.showAlert.bind(this);
    console.log("props cf", props);
  }

  async componentDidMount() {
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
      //   nup_no: dataProps.nup_no
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
        "c_nup/getDetailApprove/" +
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

  tes() {
    alert("sdsd");
  }
  submit() {
    // alert("tes");
    Actions.pop();
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
              APPROVED
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
                  {this.state.nup_no}
                </Text>
              </Right>
            </View>

            {this.state.dataDetail == 0
              ? null
              : this.state.dataDetail.map((data, key) => (
                  <View key={key} style={{ paddingLeft: 20 }}>
                    <View
                      style={{
                        paddingBottom: 10,

                        borderTopWidth: 0.8,
                        borderColor: Colors.navyUrban
                      }}
                    >
                      <Right
                        style={{
                          position: "absolute",
                          right: 20,
                          paddingTop: 10
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Fonts.type.proximaNovaBold,
                            alignSelf: "flex-start",
                            color: Colors.goldUrban,
                            marginBottom: 5,
                            fontSize: 14
                          }}
                        >
                          {data.nup_no}
                        </Text>
                      </Right>
                    </View>

                    <View style={{ paddingBottom: 20 }}>
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
              Payment Attachment
            </Text>

            <Item
              regular
              style={[{ borderRadius: 5 }, Styles.inputAttachLarge]}
              //   onPress={() => this.showAlert("pictUrlAttach")}
              onPress={() => {
                this.setState({ isView: true });
              }}
              pointerEvents={this.state.isLoaded ? "auto" : "none"}
            >
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
          </View>

          <Modal
            visible={this.state.isView}
            transparent={false}
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
            <View
              style={{
                paddingVertical: 20,
                paddingHorizontal: 20
                // paddingBottom: 20
              }}
            >
              <Image
                style={{
                  width: "90%",
                  height: "90%",
                  alignContent: "center",
                  alignSelf: "center"
                }}
                enableImageZoom={true}
                // enableSwipeDown={true}
                source={{ uri: this.state.pictUrlAttach }}
              />
            </View>
          </Modal>
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
                Close
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
export default DetailApproveBooking;
