import React, { Navigator } from "react";
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
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
  View,
  FooterTab,
  Badge,
  List,
  ListItem,
} from "native-base";

import NavigationService from "../Service/Navigation";

import MESSAGES from "./Messages";

import { Style } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { Actions } from "react-native-router-flux";
import { Fonts, Metrics, Colors } from "../Themes/";
import { urlApi } from "@Config/services";
import moment from "moment";
import { Router } from "../Router";
import { ENTRIES1 } from "../Home/static/entries";
// import Router from "../Router";
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class Notif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      group: "",
      dashmenu: [],
      isLogin: false,
      isLoaded: false,
      dataNotif: [],
      NotificationID: "",
      notiff: "",
      dataTower: [],
      getPro: [],
      cntNotif: "",
      // isRead: this.props.item.IsRead,
      // isRead: 1,
      // notifID: "",
    };
  }

  async componentDidMount() {
    const data = {
      email: await _getData("@User"),
      name: await _getData("@Name"),
      group: await _getData("@Group"),
      dashmenu: await _getData("@DashMenu"),
      isLogin: await _getData("@isLogin"),
      dataTower: await _getData("@UserProject"),
      token: await _getData("@Token"),
    };

    console.log("datra", data);

    this.setState(data, () => {
      this.getDataNotif();
      this.getCountNotif();
      // this.updateisRead();
    });

    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 2000);
  }

  signin() {
    Actions.Login();
  }

  // async componentDidAppear() {
  //   const datas = {
  //     email: await _getData("@User"),
  //     name: await _getData("@Name"),
  //     group: await _getData("@Group"),
  //     dashmenu: await _getData("@DashMenu"),
  //     isLogin: await _getData("@isLogin"),
  //     dataTower: await _getData("@UserProject"),
  //   };
  //   console.log("email did apear");

  //   this.setState(datas, () => {
  //     this.getDataNotif();
  //     // this.getCountNotif();
  //     // this.updateisRead();
  //   });
  //   // this.setState(
  //   //   {
  //   //     email: datas.email,
  //   //   },
  //   //   () => {
  //   //     this.getDataNotif();
  //   //   }
  //   // );
  //   // this.getBadge(datas)

  //   // this.setState({
  //   //     time: new Date(),
  //   //     timer:
  //   // })

  //   // // ? RealTime
  //   // setInterval(() => {
  //   //     this.getBadge(datas)
  //   // }, 1000)

  //   // ? Tidak RealTime
  //   // this.getBadge(datas);
  // }

  getDataNotif = () => {
    console.log(this.state.email);
    console.log(this.state.token);
    fetch(
      urlApi + "c_notification/getNotification/IFCAMOBILE/" + this.state.email,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Token: this.state.token,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("res notif get data di notif", res);
        const resData = res.Data;
        this.setState({
          dataNotif: resData,
          // isRead: resData.IsRead,
        });
        // console.log("is read datanotif", this.state.isRead);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getProject = ({ entity_cd, project_no }) => {
    // const entity_cd = entity_cd;
    // const project_no = project_no;

    fetch(
      urlApi +
        "c_notification/getProject/IFCAMOBILE/" +
        entity_cd +
        "/" +
        project_no,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("principle", res);
        if (!res.Error) {
          console.log("resdata", res.Data);
          const resData = res.Data[0];
          this.setState({ getPro: res.Data });
          const item = {
            entity_cd: resData.entity_cd,
            project_no: resData.project_no,
            db_profile: resData.db_profile,
          };
          // Actions.MyBooking({ items: item });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateisRead = ({ data }) => {
    // this.setState({ isRead: 0 });
    console.log("data update read", data.NotificationID);
    this.setState({ isRead: 0 }, () => {
      // const ubahRead = isRead;
      // data.IsRead = ubahRead;
      console.log("setelah update is read", this.state.isRead);
    });
    const formData = {
      notificationID: data.NotificationID,
    };

    console.log("update data", formData);

    fetch(urlApi + "c_notification/readNotification/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Token: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res", res);
        if (!res.Error) {
          this.setState({ isLogin: true }, () => {
            const isReadData = res.Data[0].IsRead;
            const email = res.Data[0].Email_addr;
            const entity_cd = res.Data[0].Entity_cd;
            const project_no = res.Data[0].Project_no;
            this.setState({ entity_cd: entity_cd, project_no: project_no });
            // this.setState({ isRead: isRead });
            console.log("is read", isReadData);
            console.log("emails", email);
            this.setState({ isRead: isReadData });
            this.getDataNotif();
            this.getCountNotif();
            this.getProject({ entity_cd: entity_cd, project_no: project_no });
          });
          this.setState({ isLoaded: !this.state.isLoaded });
        } else {
          console.log(res.Error);
          this.setState({ isLoaded: this.state.isLoaded }, () => {
            alert(res.Pesan);
          });
        }

        // console.log("save profile", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCountNotif = async () => {
    //  let result = res.Data;
    const email = this.state.email;

    // console.log("datatower", dataTower);
    console.log("email buat count", email);
    fetch(urlApi + "c_notification/getNotificationBadge/IFCAMOBILE/" + email, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res notif di notif", res);
        if (res.Error === false) {
          let resData = res.Data;
          let data = [];
          // console.log("resdata", resData);
          resData.map((item) => {
            let items = {
              // ...item,
              jumlahnotif: item.cnt,
            };
            data.push(items);
          });

          if (data) {
            this.setState({ cntNotif: data });

            console.log("data update", this.state.cntNotif);
          }

          _storeData("@CountNotif", this.state.cntNotif);
          // Actions.push("notif", _storeData("@CountNotif", this.state.cntNotif));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async back() {
    // this.getCountNotif();
    const cntno = this.state.cntNotif;
    console.log("cntno", cntno);
    // Actions.pop({ lemparDataCnt: cntno });
    // Actions.refresh("home", cntno);
    Actions.home({ lemparDataCnt: cntno });
    // Actions.pop();
    // setTimeout(() => {
    //   Actions.refresh("tabbar", { lemparDataCnt: cntno });
    //   Actions.push("tabbar", _storeData("@CountNotif", this.state.cntNotif));

    //   // _storeData("@CountNotif", cntno);
    // }, 0);
    Actions.tabbar();

    // try {
    //   _storeData("@CountNotif", cntno);
    // } catch (err) {
    //   console.log("error:", err);
    // } finally {
    //   this.setState({ isLoaded: true }, () => {
    //     Actions.pop();
    //     // Actions.refresh("home", cntno);
    //     Actions.Home({ lemparDataCnt: cntno });
    //   });
    // }
  }

  render() {
    if (this.state.isLogin) {
      return (
        // <Container style={Style.bgMain}>
        //   <StatusBar
        //     backgroundColor={"rgba(0, 0, 0, 0)"}
        //     animated
        //     barStyle="dark-content"
        //   />
        //   <Header style={Styles.header}>
        //     <Left style={Styles.left}>
        //       <Button
        //         transparent
        //         style={Styles.actionBarBtn}
        //         onPress={() => this.back()}
        //       >
        //         <Icon
        //           active
        //           name="arrow-left"
        //           style={Styles.textWhite}
        //           type="MaterialCommunityIcons"
        //         />
        //       </Button>
        //     </Left>
        //     <Body style={Styles.body}>
        //       <Text style={[Styles.textWhite, Styles.textMedium]}>
        //         {"Notification"}
        //       </Text>
        //     </Body>
        //     <Right style={Styles.right}></Right>
        //   </Header>
        //   <Content
        //     style={Style.layoutInner}
        //     contentContainerStyle={Style.layoutContent}
        //   >
        //     <ScrollView>
        //       <View style={Styles.section}>
        //         <View style={Styles.message}>
        //           {/* <Text>tesss</Text> */}

        //           {this.state.dataNotif.map((data, key) => (
        //             // <Text>{data.Complain_no}</Text>

        //             <List
        //               containerStyle={{
        //                 borderTopWidth: 0,
        //                 borderBottomWidth: 0,
        //               }}
        //               key={key}
        //               style={[
        //                 Styles.item,
        //                 {
        //                   backgroundColor:
        //                     data.IsRead == 1 ? "#fff" : "#97aecf",
        //                 },
        //               ]}
        //             >
        //               <ListItem
        //                 onPress={() => {
        //                   this.updateisRead({ data });
        //                   // this.setState({ isRead: 1 }, () => {
        //                   //   this.props.onPress(item.NotificationID);
        //                   // });
        //                   // Actions.refresh({ key: Math.random() });

        //                   // this.setState({ isRead: 0 });
        //                   // this.setState({ isRead: data.IsRead });
        //                   // console.log("id notif", this.state.notifID);
        //                 }}
        //                 style={{
        //                   backgroundColor:
        //                     data.IsRead == 1 ? "#fff" : "#97aecf",
        //                 }}
        //               >
        //                 {/* <Image
        //                 source={{ uri: item.image }}
        //                 style={Styles.itemImg}
        //               /> */}
        //                 <View>
        //                   <View style={{ flexDirection: "row" }}>
        //                     <Left>
        //                       {
        //                         data.NotificationCd == "PAYDUE" ? (
        //                           <Text style={Styles.itemDesc}>
        //                             Please complete your payment
        //                           </Text>
        //                         ) : null
        //                         // <Text style={Styles.itemDesc}>tes</Text>
        //                       }
        //                     </Left>
        //                     {/* <Right>
        //                     <Text style={Styles.itemDate}>

        //                       {moment(data.NotificationDate).format(
        //                         "D MMMM YYYY"
        //                       )}
        //                     </Text>
        //                   </Right> */}
        //                   </View>
        //                   <Text style={Styles.itemTitle}>
        //                     {data.Complain_no}
        //                   </Text>
        //                   <Text style={Styles.itemDesc}>
        //                     {data.Remarks}{" "}
        //                     <Text style={Styles.itemDesc_bold}>
        //                       #{data.NotificationID}
        //                     </Text>
        //                   </Text>
        //                   <Text
        //                     style={[
        //                       Styles.itemDate,
        //                       { color: data.IsRead == 1 ? "#999" : "#333" },
        //                     ]}
        //                   >
        //                     {/* {data.NotificationDate} */}
        //                     {moment(data.NotificationDate).format(
        //                       "D MMMM YYYY HH:mm"
        //                     )}
        //                   </Text>
        //                 </View>
        //               </ListItem>
        //             </List>
        //           ))}
        //         </View>
        //       </View>
        //     </ScrollView>
        //   </Content>
        // </Container>

        <Container>
          <ImageBackground
            style={Styles.backgroundImage_2}
            source={require("../Images/background-blue.png")}
          >
            <Header style={Styles.header}>
              <StatusBar
                backgroundColor={"rgba(0, 0, 0, 0)"}
                animated
                barStyle="dark-content"
              />
              <Left style={Styles.left}>
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
              </Left>
              <Body style={Styles.body}>
                <Text
                  style={[Style.textWhite, Style.textMedium, Style.fontProxima]}
                >
                  {/* {"Registration"} */}
                  {/* {this.Capitalize("Registration")} */}
                </Text>
              </Body>
              <Right style={Styles.right}></Right>
            </Header>
            {/* <ScrollView> */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.type.proximaNovaBoldWeb,
                  fontSize: 20,
                }}
              >
                Coming Soon
              </Text>
            </View>
            {/* </ScrollView> */}
          </ImageBackground>
        </Container>
      );
    } else {
      return (
        <ImageBackground
          style={Styles.backgroundImage}
          source={require("../Images/Alert02-min.png")}
        >
          <View
            style={{
              position: "absolute",
              bottom: 140,
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <Button style={Styles.btnSmall} onPress={() => this.signin()}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1,
                  textTransform: "capitalize",
                }}
              >
                Sign In
              </Text>
            </Button>
            <Button style={Styles.btnSmall} onPress={() => this.signin()}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaReg,
                  letterSpacing: 1,
                  textTransform: "capitalize",
                }}
              >
                Sign Up
              </Text>
            </Button>
          </View>
        </ImageBackground>
      );

      // <View style={LoginStyle.container}>
      //     {this.state.isLoaded ?
      //         <TouchableOpacity style={LoginStyle.btn} onPress={()=>Actions.Login()}>
      //             <Text>Login</Text>
      //         </TouchableOpacity>
      //     : <ActivityIndicator/> }
      // </View>
    }
  }
}

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: Colors.loginBlue,
    padding: 10,
  },
});
