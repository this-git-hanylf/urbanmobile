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
  Badge,
  Card,
  List,
  ListItem
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
import numFormat from "@Component/numFormat";

let isMount = false;
// create a component
class RejectBooking extends Component {
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
      entity_cd: "",
      project_no: "",
      db_profile: "",
      dataReject: []
    };

    console.log("props cf", props);
  }

  async componentDidMount() {
    isMount = true;
    const dataItems = await _getData("@dataItems");
    const data = {
      hd: new Headers({
        Token: await _getData("@Token")
      }),
      user: await _getData("@User"),
      name: await _getData("@UserId"),
      project: await _getData("@UserProject"),
      debtor: await _getData("@Debtor"),
      group: await _getData("@Group"),
      entity_cd: dataItems.entity_cd,
      project_no: dataItems.project_no,
      db_profile: dataItems.db_profile
      // dataItems: await _getData("@dataItems")
    };
    console.log("data", data);

    this.setState(data, () => {
      this.getBookingReject();
      //   this.getBilling("", "", data.debtor, "");
    });
  }

  getBookingReject = () => {
    const entity_cd = this.state.entity_cd;
    console.log("en", entity_cd);
    const project_no = this.state.project_no;
    console.log("en", project_no);
    const db_profile = this.state.db_profile;
    //  const dataItems=  await _getData("@dataItems")
    // const project_no = this.props.items.project_no;
    fetch(
      urlApi +
        "c_nup/getBookingReject/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        project_no,

      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(res => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataReject: resData });
          console.log("dataReject", resData);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  DetailRejectBooking(data) {
    const db_profile = this.state.db_profile;
    console.log("db", db_profile);
    console.log("data", data);
    console.log("order_id", data.order_id);
    const entity_cd = this.state.entity_cd;
    console.log("en", entity_cd);
    const project_no = this.state.project_no;
    console.log("en", project_no);
    Actions.DetailRejectBooking({
      order_id: data.order_id,
      data: data,
      db_profile: db_profile,
      entity_cd: entity_cd,
      project_no: project_no
    });
  }
  render() {
    // const tables = {
    //   tableHead: ["Date", "Description", "Amount", "Status"]
    // };

    return (
      <Container style={Style.bgMain}>
        <StatusBar
          backgroundColor={Colors.statusBarNavy}
          animated
          barStyle="light-content"
        />
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

        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          {this.state.dataReject == 0 ? (
            <View
              style={{
                flex: 1,
                // flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
                top: 200
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: Fonts.type.proximaNovaBoldWeb,
                  color: Colors.navyUrban,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                No Data Available
              </Text>
            </View>
          ) : (
            <View>
              {this.state.dataReject.map((data, key) => (
                <ListItem
                  onPress={() => this.DetailRejectBooking(data)}
                  key={key}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      height: 70,
                      width: "100%"
                    }}
                  >
                    <View style={{ width: "100%", paddingBottom: 20 }}>
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
                          #{data.order_id}
                        </Text>
                      </Left>
                    </View>
                    <View style={{ width: "100%", paddingBottom: 20 }}>
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
                          {data.full_name}
                        </Text>
                      </Left>
                    </View>
                    <View style={{ width: "100%", paddingBottom: 20 }}>
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
                          Rp. {numFormat(parseInt(data.total_amt))},-
                        </Text>
                      </Left>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Left style={{ position: "absolute", left: 20 }}>
                        <Text
                          style={{
                            fontFamily: Fonts.type.proximaNovaBold,
                            alignSelf: "flex-start",
                            color: Colors.goldUrban,
                            marginBottom: 5,
                            fontSize: 13
                          }}
                        >
                          {moment(data.order_date).format("DD MMM YYYY")}
                        </Text>
                      </Left>
                    </View>
                  </View>
                </ListItem>
              ))}
            </View>
          )}
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
export default RejectBooking;
