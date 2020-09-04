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
  Alert,
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
import { ActionConst } from "react-native-router-flux";
import { Style } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { Actions } from "react-native-router-flux";
import { Fonts, Metrics, Colors } from "../Themes/";
import { urlApi } from "@Config/services";
import moment from "moment";
import { Router } from "../Router";
import { ENTRIES1 } from "../Home/static/entries";

import Icon_ from "react-native-vector-icons/FontAwesome";
import PushNotification from "react-native-push-notification";
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
      pushData: [],
      pushData2: [],
      num: 0,
      passing_pushData_dariHome: [],
      item_storage: [],
      berkurang_pushData: [],

      // hasil_pars_length: 0,
      // isRead: this.props.item.IsRead,
      // isRead: 1,
      // notifID: "",
    };

    // console.log("pushData", this.state.pushData);
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
      // this.getProject();
      // this.updateisRead();
    });
    // this.kurangin_length = this.kurangin_length.bind(this);

    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 2000);

    // let self = this;
    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //   },

    //   // (required) Called when a remote or local notification is opened or received
    //   onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);

    //     // process the notification here

    //     // required on iOS only
    //     // notification.finish(PushNotificationIOS.FetchResult.NoData);

    //     // process the notification
    //     self._addDataToList(notification);
    //     // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
    //     // notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
    //   // Android only
    //   senderID: "945884059945",
    //   // iOS only
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });

    let passing_pushData_dariHome = this.props.pass_pushData;
    // // console.log("passing_pushData_dariHome", passing_pushData_dariHome);
    if (passing_pushData_dariHome != null) {
      console.log("passing tidak nul");
      this.setState({ pushData: passing_pushData_dariHome });
    }
    _storeData("@ArrayPushDataLengthFirebase", this.state.pushData);
  }

  async _addDataToList(data) {
    let array = this.state.pushData;
    array.push(data);
    console.log("array length", array.length);
    let passing_pushData_dariHome = this.props.pass_pushData;
    // console.log(
    //   "passing_pushData_dariHome length",
    //   passing_pushData_dariHome.length
    // );
    if (passing_pushData_dariHome != null) {
      console.log("passing tidak nul");
      this.setState({
        pushData: passing_pushData_dariHome,
        // hasil_pars_length: passing_pushData_dariHome.length,
      });
    } else {
      console.log("passing nul");
      this.setState({
        pushData: array,
        // hasil_pars_length: array.length,
      });
    }
    _storeData("@ArrayPushDataLengthFirebase", this.state.pushData);
    console.log("adddatatolist", this.state.pushData);
  }

  //dari bang good
  // kurangin_length = (item) => {
  //   const foundItem = this.state.pushData.find(
  //     (arrayItem) => arrayItem.id === item.id
  //   );
  //   if (foundItem) {
  //     const copiedArray1 = this.state.pushData.filter(
  //       (fItem) => fItem.id === item.id
  //     );
  //     const copiedArray2 = [foundItem, ...this.state.pushData2];
  //     this.setState(
  //       {
  //         pushData: copiedArray1,
  //         pushData2: copiedArray2,
  //       },
  //       () => console.log("state", this.state)
  //     );
  //   }
  // };
  //tutup dari bang good

  async kurangin_length({ id_length }) {
    console.log("item.id", id_length);
    // console.log("inndex", index);

    var array_ = this.state.pushData;

    console.log("araay", array_.id);

    for (var i = 0; i < array_.length; i++) {
      console.log("array i", array_[i]);
      console.log("array id", array_[i].id);
      if (id_length === array_[i].id) {
        array_.splice(i, 1);
      }
    }

    alert("have been read");

    this.setState({ pushData: array_ });
    // if (id_length) {
    //   var kurang_array = array_.length--;
    //   console.log("kurang array", kurang_array);
    //   this.setState({ pushData: array_ });
    //   console.log("data yg dikurangin", this.state.pushData);
    // }
  }

  async kurangin_length2({ id_length }) {
    var array1 = this.state.pushData;
    var array2 = this.state.pushData2;

    for (var i = 0; i < array1.length; i++) {
      array2.push(array1[i]);
      array1.splice(i, 1);
      // i--; //decrement i IF we remove an item
    }

    this.setState({ pushData: array1, pushData2: array2 });
    console.log(array1); //[]
    console.log(array2); //[1, 2, 3, 4, 5]
  }

  _renderItem(item) {
    console.log("item render home", item);
    console.log("item title", item.title);

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => this.kurangin_length({ id_length: item.id, item: item })}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            paddingTop: 10,
            color: "#000",
            // flex: 1,
          }}
        >
          {/* tes */}
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            paddingBottom: 15,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            color: "#000",
          }}
        >
          {item.message}
        </Text>
      </TouchableOpacity>
    );
  }

  _renderItem2(item) {
    console.log("item render home", item);
    console.log("item title", item.title);

    return (
      <TouchableOpacity
        key={item.id}
        // onPress={() => this.kurangin_length({ id_length: item.id, item: item })}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            paddingTop: 10,
            color: "#000",
            // flex: 1,
          }}
        >
          {/* tes */}
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            paddingBottom: 15,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            color: "#000",
          }}
        >
          {item.message}
        </Text>
      </TouchableOpacity>
    );
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

          setTimeout(() => {
            Actions.MyBooking({
              items: item,
            });
          }, 0);
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
            // alert(res.Pesan);
            alert("you have been read");
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
          console.log("resdata", resData);
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
    // Actions.replace("tabbar", { lemparDataCnt: cntno });
    Actions.home({ lemparDataCnt: cntno });
    // Actions.pop();
    // setTimeout(() => {
    //   Actions.refresh("tabbar", { lemparDataCnt: cntno });
    //   Actions.push("tabbar", _storeData("@CountNotif", this.state.cntNotif));

    //   // _storeData("@CountNotif", cntno);
    // }, 0);
    // Actions.reset("tabbar");

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
        // <Container>
        //   <Content>
        //     <ScrollView
        //       contentInsetAdjustmentBehavior="automatic"
        //       style={{ backgroundColor: Colors.lighter }}
        //     >
        //       <Header />
        //       <View
        //         style={{
        //           backgroundColor: "#eee",
        //           color: "#000",
        //           height: 100,
        //           padding: 12,
        //         }}
        //       >
        //         <Text>Push Notifications</Text>
        //       </View>
        //       {/* <View
        //     style={{
        //       backgroundColor: Colors.white,
        //       paddingHorizontal: 20,
        //       paddingVertical: 10,
        //       height: 400,
        //     }}
        //   >
        //     {this.state.pushData != 0
        //       ? this.state.pushData.length != 0 && (
        //           <FlatList
        //             data={this.state.pushData}
        //             renderItem={({ item }) => this._renderItem(item)}
        //             keyExtractor={(item) => item.title}
        //             extraData={this.state}
        //           />
        //         )
        //       : this.state.pushData.length == 0 && (
        //           <View style={{ paddingVertical: 50 }}>
        //             <Text
        //               style={{
        //                 fontSize: 14,
        //                 textAlign: "center",
        //               }}
        //             >
        //               You don't have any push notification yet. Send some push
        //               to show it in the list push data
        //             </Text>
        //           </View>
        //         )}
        //   </View> */}

        //       {/* ambiil dari database */}
        //       {this.state.dataNotif != null ? (
        //         this.state.dataNotif.map((data, key) => (
        //           // <Text>{data.Complain_no}</Text>

        //           <List
        //             containerStyle={{
        //               borderTopWidth: 0,
        //               borderBottomWidth: 0,
        //             }}
        //             key={key}
        //             style={[
        //               Styles.item,
        //               {
        //                 backgroundColor: data.IsRead == 1 ? "#fff" : "#97aecf",
        //               },
        //             ]}
        //           >
        //             <ListItem
        //               onPress={() => {
        //                 data.IsRead == 1
        //                   ? this.updateisRead({ data })
        //                   : alert("0");
        //                 // this.updateisRead({ data });
        //                 // this.setState({ isRead: 1 }, () => {
        //                 //   this.props.onPress(item.NotificationID);
        //                 // });
        //                 // Actions.refresh({ key: Math.random() });

        //                 // this.setState({ isRead: 0 });
        //                 // this.setState({ isRead: data.IsRead });
        //                 // console.log("id notif", this.state.notifID);
        //               }}
        //               style={{
        //                 backgroundColor: data.IsRead == 1 ? "#fff" : "#97aecf",
        //               }}
        //             >
        //               {/* <Image
        //                 source={{ uri: item.image }}
        //                 style={Styles.itemImg}
        //               /> */}
        //               <View>
        //                 <View style={{ flexDirection: "row" }}>
        //                   <Left>
        //                     {
        //                       data.NotificationCd == "PAYDUE" ? (
        //                         <Text style={Styles.itemDesc}>
        //                           Please complete your payment
        //                         </Text>
        //                       ) : null
        //                       // <Text style={Styles.itemDesc}>tes</Text>
        //                     }
        //                   </Left>
        //                   {/* <Right>
        //                     <Text style={Styles.itemDate}>

        //                       {moment(data.NotificationDate).format(
        //                         "D MMMM YYYY"
        //                       )}
        //                     </Text>
        //                   </Right> */}
        //                 </View>
        //                 <Text style={Styles.itemTitle}>{data.Complain_no}</Text>
        //                 <Text style={Styles.itemDesc}>
        //                   {data.Remarks}{" "}
        //                   <Text style={Styles.itemDesc_bold}>
        //                     #{data.NotificationID}
        //                   </Text>
        //                 </Text>
        //                 <Text
        //                   style={[
        //                     Styles.itemDate,
        //                     { color: data.IsRead == 1 ? "#999" : "#333" },
        //                   ]}
        //                 >
        //                   {/* {data.NotificationDate} */}
        //                   {moment(data.NotificationDate).format(
        //                     "D MMMM YYYY HH:mm"
        //                   )}
        //                 </Text>
        //               </View>
        //             </ListItem>
        //           </List>
        //         ))
        //       ) : (
        //         <Text>No notif</Text>
        //       )}

        //       {/* tutup ambil dari database */}
        //     </ScrollView>
        //   </Content>

        // </Container>

        //diatas ini notif yg bisa ---------//

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

        //   {/* footer navigasi */}
        //   <Footer>
        //     <FooterTab style={{ backgroundColor: "white" }}>
        //       <Button vertical onPress={() => Actions.home()}>
        //         <Icon_
        //           name="home"
        //           color="#b7b7b7"
        //           style={{ color: "#b7b7b7", fontSize: 24 }}
        //         />
        //         <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
        //           Home
        //         </Text>
        //       </Button>
        //       <Button vertical onPress={() => Actions.Menu()}>
        //         <Icon_
        //           name="newspaper-o"
        //           style={{ color: "#b7b7b7", fontSize: 24 }}
        //         />
        //         <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
        //           News
        //         </Text>
        //       </Button>
        //       {this.state.badge_notif_db > 0 ? (
        //         <Button badge vertical>
        //           <Badge style={{ top: 8 }}>
        //             <Text>{this.state.badge_notif_db[0].jumlahnotif}</Text>
        //           </Badge>

        //           <Icon_
        //             name="bell"
        //             style={{ color: "#AB9E84", fontSize: 24 }}
        //           />
        //           <Text
        //             style={{ color: "#AB9E84", textTransform: "capitalize" }}
        //           >
        //             Notification
        //           </Text>
        //         </Button>
        //       ) : (
        //         <Button badge vertical>
        //           <Icon_
        //             name="bell"
        //             style={{ color: "#AB9E84", fontSize: 24 }}
        //           />
        //           <Text
        //             style={{ color: "#AB9E84", textTransform: "capitalize" }}
        //           >
        //             Notification
        //           </Text>
        //         </Button>
        //       )}
        //       <Button vertical onPress={() => Actions.akun()}>
        //         <Icon_ name="user" style={{ color: "#b7b7b7", fontSize: 24 }} />
        //         <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
        //           Profile
        //         </Text>
        //       </Button>
        //     </FooterTab>
        //   </Footer>
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
          {/* footer tab tambahan */}
          <Footer>
            <FooterTab style={{ backgroundColor: "white" }}>
              <Button
                vertical
                onPress={() =>
                  Actions.home({
                    pushData: this.state.pushData.length,
                    cntNotif: this.state.cntNotif,
                  })
                }
              >
                <Icon_
                  name="home"
                  color="#b7b7b7"
                  style={{ color: "#b7b7b7", fontSize: 24 }}
                />
                <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
                  Home
                </Text>
              </Button>
              <Button vertical onPress={() => Actions.Menu()}>
                <Icon_
                  name="building"
                  color="#b7b7b7"
                  style={{ color: "#b7b7b7", fontSize: 24 }}
                />
                <Text
                  style={{
                    color: "#b7b7b7",
                    textTransform: "capitalize",
                    width: 110,

                    textAlign: "center",
                  }}
                >
                  Progress
                </Text>
              </Button>
              <Button vertical onPress={() => Actions.NewsPage()}>
                <Icon_
                  name="newspaper-o"
                  style={{ color: "#b7b7b7", fontSize: 24 }}
                />
                <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
                  News
                </Text>
              </Button>
              {this.state.cntNotif != 0 ? (
                this.state.cntNotif[0].jumlahnotif > 0 ? (
                  <Button badge vertical>
                    <Badge style={{ top: 5 }}>
                      <Text>{this.state.cntNotif[0].jumlahnotif}</Text>
                    </Badge>

                    <Icon_
                      name="bell"
                      style={{ color: "#AB9E84", fontSize: 24, bottom: 5 }}
                    />
                    <Text
                      style={{
                        color: "#AB9E84",
                        textTransform: "capitalize",
                        bottom: 5,
                        width: 110,

                        textAlign: "center",
                      }}
                    >
                      Notification
                    </Text>
                  </Button>
                ) : (
                  <Button vertical>
                    <Icon_
                      name="bell"
                      style={{ color: "#AB9E84", fontSize: 24 }}
                    />
                    <Text
                      style={{
                        color: "#AB9E84",
                        textTransform: "capitalize",
                        width: 110,

                        textAlign: "center",
                      }}
                    >
                      Notification
                    </Text>
                  </Button>
                )
              ) : (
                <Button vertical>
                  <Icon_
                    name="bell"
                    style={{ color: "#AB9E84", fontSize: 24 }}
                  />
                  <Text
                    style={{
                      color: "#AB9E84",
                      textTransform: "capitalize",
                      width: 110,

                      textAlign: "center",
                    }}
                  >
                    Notification
                  </Text>
                </Button>
              )}

              {/* dibawah ini pushdata badge dari firebase */}
              {/* {this.state.pushData != 0 ? (
                <Button badge vertical>
                  <Badge style={{ top: 8 }}>
                    <Text>{this.state.pushData.length}</Text>
                  </Badge>

                  <Icon_
                    name="bell"
                    style={{ color: "#AB9E84", fontSize: 24 }}
                  />
                  <Text
                    style={{ color: "#AB9E84", textTransform: "capitalize" }}
                  >
                    Notification
                  </Text>
                </Button>
              ) : (
                <Button badge vertical>
                  <Icon_
                    name="bell"
                    style={{ color: "#AB9E84", fontSize: 24 }}
                  />
                  <Text
                    style={{ color: "#AB9E84", textTransform: "capitalize" }}
                  >
                    Notification
                  </Text>
                </Button>
              )} */}
              <Button vertical onPress={() => Actions.akun()}>
                <Icon_ name="user" style={{ color: "#b7b7b7", fontSize: 24 }} />
                <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
                  Profile
                </Text>
              </Button>
            </FooterTab>
          </Footer>
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
