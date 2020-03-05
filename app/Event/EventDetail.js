import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Header,
  Button,
  Icon,
  Text,
  ListItem,
  List,
  Right,
  Card,
  Item,
  Label,
  Input
} from "native-base";
// import {Icon} from "react-native-elements";
import { Style, Colors, Fonts } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from "@Component/TabBar";
import Styles from "./Style";
import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import Shimmer from "@Component/Shimmer";
// import styles, { colors } from "./styles/index";
import FooterTabsIconText from "@Component/BottomBar";
import moment from "moment";

class ListProspect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   status_cd: "",
      //   email: "",
      detail: [],
      entity_cd: "",
      project_no: "",
      db_profile: "",
      event_cd: "",
      agent_name: "",
      agent_phone: "",
      number_cust: "",
      agent_cd: ""
      //   handphone: "",
      //   descs: ""
    };

    console.log("props status prospesct", props);
  }
  async componentDidMount() {
    // const dataItems = await _getData("@dataItems");
    // console.log("dataitem", dataItems);
    // const event_cd = this.props.event_cd;
    // console.log("eve", event_cd);
    // Actions.refresh({ backTitle: () => this.props.status_cd });
    const data = {
      agent_name: await _getData("@Name"),
      agent_phone: await _getData("@Handphone"),
      event_cd: this.props.event_cd,
      agent_cd: await _getData("@AgentCd"),
      //   entity_cd: dataItems.entity_cd,
      //   project_no: dataItems.project_no,
      //   db_profile: dataItems.db_profile,
      //   status_cd: this.props.datas.status_cd,
      //   descs: this.props.datas.descs,
      email: await _getData("@User")
    };
    console.log("data di list", data);
    isMount = true;
    this.setState(data, () => {
      this.getData();
      // this.getDataFollowUp(this.props.datas)
      // this.getStatus()
    });
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

  getData = () => {
    const entity_cd = this.props.entity_cd;
    console.log("en", entity_cd);
    const project_no = this.props.project_no;
    console.log("en", project_no);
    const db_profile = this.props.db_profile;
    const event_cd = this.props.event_cd;
    console.log("eve", event_cd);
    // const event_cd = this.props.event_cd.event_cd;
    // console.log("even", event_cd);
    //  const dataItems=  await _getData("@dataItems")
    // const project_no = this.props.items.project_no;
    fetch(
      urlApi +
        "c_event/getEvent/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        project_no +
        "/" +
        event_cd,

      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(res => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({
            detail: resData
          });
          console.log("datapending", resData);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  validating = validationData => {
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

    const {
      event_cd,
      agent_cd,
      agent_name,
      agent_phone,
      number_cust
    } = this.state;

    const frmData = {
      event_id: event_cd,
      full_name: agent_name,
      agent_cd: agent_cd,
      mobile_phone: agent_phone,
      number_customer: number_cust
    };

    const isValid = this.validating({
      // email: { require: true },
      agent_name: { require: true },
      agent_phone: { require: true },
      number_cust: { require: true }
      // // nik: { require: true },
      // nohp: { require: true },
      // selectedType: { require: true },
      // selectedProject: { require: true }
    });
    console.log("save", frmData);
    // alert("tes");
    if (isValid) {
      fetch(urlApi + "c_event/save/IFCAPB/", {
        method: "POST",
        body: JSON.stringify(frmData)
        // headers :{
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     'Token' : this.state.token
        // }
      })
        .then(response => response.json())
        .then(res => {
          if (!res.Error) {
            alert(res.Pesan);
            Actions.akun();
            // _storeData('@Name',name)
            // _storeData('@Handphone',hp)
            // _storeData('@ProfileUpdate',true)
          }
          alert(res.Pesan);
          console.log("success", res);
        })
        .catch(error => {
          alert(res.Pesan);
          console.log(error);
        });
    }
  }

  render() {
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
        {this.state.detail == 0 ? (
          <ActivityIndicator />
        ) : (
          <View style={{ paddingBottom: 45, paddingTop: 20 }}>
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
                WELCOME TO
                {/* {this.state.projectdesc} */}
              </Text>
              <Text
                style={{
                  color: Colors.goldUrban,
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1
                }}
                // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
              >
                {this.state.detail[0].event_name}
                {/* {this.state.projectdesc} */}
              </Text>
              <Text
                style={{
                  color: Colors.goldUrban,
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1
                }}
                // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
              >
                {this.state.detail[0].project_descs}
                {/* {this.state.projectdesc} */}
              </Text>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text
                style={{
                  fontWeight: "900",
                  color: Colors.goldUrban,
                  fontSize: 11,
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaBold,
                  letterSpacing: 1
                }}
                // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
              >
                {this.state.detail[0].event_location}
                {/* {this.state.projectdesc} */}
              </Text>
              <Text
                style={{
                  color: Colors.goldUrban,
                  fontSize: 10,
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1
                }}
                // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
              >
                {this.state.detail[0].address1}
                {/* {this.state.projectdesc} */}
              </Text>
              <Text
                style={{
                  color: Colors.goldUrban,
                  fontSize: 10,
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1
                }}
                // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
              >
                {this.state.detail[0].address2}
                {/* {this.state.projectdesc} */}
              </Text>
              <Text
                style={{
                  color: Colors.goldUrban,
                  fontSize: 10,
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1
                }}
                // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
              >
                {this.state.detail[0].address3}
                {/* {this.state.projectdesc} */}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  color: Colors.goldUrban,
                  fontSize: 10,
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1
                }}
                // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
              >
                {this.state.detail[0].event_place},{" "}
                {/* {this.state.detail[0].event_date} */}
                {moment(this.state.detail[0].event_date).format("DD MMMM YYYY")}
                {/* {this.state.projectdesc} */}
              </Text>
            </View>
            <View style={{ paddingBottom: 15, marginTop: 8 }}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Full Name</Text>
                                </View> */}
              <Item floatingLabel style={Styles.marginround}>
                <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                  Full Name
                </Label>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
                <Input
                  // placeholder='Full Name'
                  // editable={true}
                  autoCapitalize="words"
                  placeholderTextColor={Colors.greyUrban}
                  value={this.state.agent_name}
                  onChangeText={val => this.setState({ agent_name: val })}
                  style={Styles.positionTextInput}
                  ref="agent_name"
                />
                {this.state.erroragent_name ? (
                  <Icon
                    style={{
                      color: "red",
                      bottom: 3,
                      position: "absolute",
                      right: 0
                    }}
                    name="close-circle"
                  />
                ) : null}
                {/* <Icon name='close-circle' /> */}
              </Item>
              {this.state.erroragent_name ? (
                <Text
                  style={{
                    position: "absolute",
                    bottom: 3,
                    left: 15,
                    color: "red",
                    fontSize: 12
                  }}
                >
                  Full Name Required
                </Text>
              ) : null}
            </View>
            <View style={{ paddingBottom: 15, marginTop: 4 }}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Full Name</Text>
                                </View> */}
              <Item floatingLabel style={Styles.marginround}>
                <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                  Mobile Phone
                </Label>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
                <Input
                  // placeholder='Full Name'
                  // autoCapitalize="numeric"
                  keyboardType="numeric"
                  placeholderTextColor={Colors.greyUrban}
                  value={this.state.agent_phone}
                  onChangeText={val => this.setState({ agent_phone: val })}
                  style={Styles.positionTextInput}
                  ref="agent_phone"
                />
                {this.state.erroragent_phone ? (
                  <Icon
                    style={{
                      color: "red",
                      bottom: 3,
                      position: "absolute",
                      right: 0
                    }}
                    name="close-circle"
                  />
                ) : null}
                {/* <Icon name='close-circle' /> */}
              </Item>
              {this.state.erroragent_phone ? (
                <Text
                  style={{
                    position: "absolute",
                    bottom: 3,
                    left: 15,
                    color: "red",
                    fontSize: 12
                  }}
                >
                  Mobile Phone Required
                </Text>
              ) : null}
            </View>
            <View style={{ paddingBottom: 15, marginTop: 8 }}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Full Name</Text>
                                </View> */}
              <Item floatingLabel style={Styles.marginround}>
                <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                  Number of Customer
                </Label>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
                <Input
                  // placeholder='Full Name'
                  // editable={true}
                  keyboardType="numeric"
                  placeholderTextColor={Colors.greyUrban}
                  value={this.state.number_cust}
                  onChangeText={val => this.setState({ number_cust: val })}
                  style={Styles.positionTextInput}
                  ref="number_cust"
                />
                {this.state.errornumber_cust ? (
                  <Icon
                    style={{
                      color: "red",
                      bottom: 3,
                      position: "absolute",
                      right: 0
                    }}
                    name="close-circle"
                  />
                ) : null}
                {/* <Icon name='close-circle' /> */}
              </Item>
              {this.state.errornumber_cust ? (
                <Text
                  style={{
                    position: "absolute",
                    bottom: 3,
                    left: 15,
                    color: "red",
                    fontSize: 12
                  }}
                >
                  Number of Customer Required
                </Text>
              ) : null}
            </View>
            <View>
              <View style={{ paddingTop: 50 }}>
                <Button style={Styles.btnMedium} onPress={() => this.submit()}>
                  <Text
                    style={{
                      width: "100%",
                      fontSize: 14,
                      alignItems: "center",
                      textAlign: "center",
                      fontFamily: Fonts.type.proximaNovaReg,
                      letterSpacing: 1,
                      textTransform: "capitalize"
                    }}
                  >
                    Submit
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        )}

        {/* <FooterTabsIconText /> */}
      </Container>
    );
  }
}
export default ListProspect;

const navStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 20
  },
  tabItem: {
    // flex: 1,
    alignItems: "center",
    padding: 16
  }
});
