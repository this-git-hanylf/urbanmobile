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
} from "native-base";

import { Actions } from "react-native-router-flux";
import ParallaxScroll from "@monterosa/react-native-parallax-scroll";

import { Style, Colors } from "../Themes";
import Styles from "./Style";

import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import moment from "moment";
import Icon_ from "react-native-vector-icons/FontAwesome";

let isMount = false;
// create a component
class NewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: null,

      news: [],
      user: "",
      name: "",
      project: [],
      cntNotif: "",
    };

    console.log("props cf", props);
  }

  async componentDidMount() {
    isMount = true;
    const data = {
      hd: new Headers({
        Token: await _getData("@Token"),
      }),
      user: await _getData("@User"),
      name: await _getData("@UserId"),
      project: await _getData("@UserProject"),
    };

    this.setState(data, () => {
      this.getNews();
      this.getCountNotif();
    });
  }

  getNews = () => {
    {
      isMount
        ? fetch(urlApi + "c_newsandpromo/getDatanews2/IFCAMOBILE/", {
            method: "GET",
            headers: this.state.hd,
          })
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                resData.map((data) => {
                  this.setState((prevState) => ({
                    news: [...prevState.news, data],
                  }));
                });
                console.log("res", res);
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  alert(res.Pesan);
                });
              }
              console.log("getNews", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  clickChouseUnit(item) {
    Actions.chouseunit({
      unitItems: item,
      items: this.props.item,
      prevItems: this.props.prevItems,
    });
    // this.setState({ click : true})
  }
  clickUnitEnquiry() {
    Actions.unitenquiry();
    this.setState({ click: true });
  }

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
  render() {
    return (
      <Container style={Style.bgMain}>
        <Header style={[Style.navigation, { backgroundColor: "#12173f" }]}>
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
              {"Choose News".toUpperCase()}
            </Text>
          </View>
          <View style={Style.actionBarRight} />
        </Header>
        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          {/* <Image
              source={require("@Asset/images/tigabr.jpg")}
              style={{
                width: null,
                height: 168,
                resizeMode: "cover",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8
              }}
            />  */}
          <View>
            <ScrollView>
              {this.state.news.map((data, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => Actions.NewsAndPromoDetail({ items: data })}
                >
                  <Card
                    style={{
                      height: null,
                      backgroundColor: "white",
                      shadowOffset: { width: 1, height: 1 },
                      shadowColor: "#37BEB7",
                      shadowOpacity: 0.5,
                      elevation: 5,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <View>
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            textAlign: "left",
                            color: "#333",
                            fontWeight: "500",
                          }}
                        >
                          {data.descs}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            textAlign: "left",
                            color: "#333",
                          }}
                        >
                          {data.subject}
                        </Text>
                      </View>
                      <View>
                        <Image
                          source={{ uri: data.picture }}
                          style={Styles.itemImg}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "500",
                            textAlign: "left",
                            color: "#ff720d",
                          }}
                        >
                          {data.date_created}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Content>
        {/* footer navigasi */}
        <Footer>
          <FooterTab style={{ backgroundColor: "white" }}>
            <Button vertical onPress={() => Actions.home()}>
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
            <Button vertical>
              <Icon_
                name="newspaper-o"
                style={{ color: "#AB9E84", fontSize: 24 }}
              />
              <Text style={{ color: "#AB9E84", textTransform: "capitalize" }}>
                News
              </Text>
            </Button>

            {this.state.cntNotif != 0 ? (
              this.state.cntNotif[0].jumlahnotif > 0 ? (
                <Button badge vertical onPress={() => Actions.notif()}>
                  <Badge style={{ top: 5 }}>
                    <Text>{this.state.cntNotif[0].jumlahnotif}</Text>
                  </Badge>

                  <Icon_
                    name="bell"
                    style={{ color: "#b7b7b7", fontSize: 24, bottom: 5 }}
                  />
                  <Text
                    style={{
                      color: "#b7b7b7",
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
                <Button vertical onPress={() => Actions.notif()}>
                  <Icon_
                    name="bell"
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
                    Notification
                  </Text>
                </Button>
              )
            ) : (
              <Button vertical onPress={() => Actions.notif()}>
                <Icon_ name="bell" style={{ color: "#b7b7b7", fontSize: 24 }} />
                <Text
                  style={{
                    color: "#b7b7b7",
                    textTransform: "capitalize",
                    width: 110,

                    textAlign: "center",
                  }}
                >
                  Notification
                </Text>
              </Button>
            )}

            {/* dibawah ini adalah pushdata dari firebase */}
            {/* {this.state.badge_notif_db > 0 ? (
                  <Button badge vertical onPress={() => Actions.notif()}>
                    <Badge style={{ top: 8 }}>
                      <Text>{this.state.badge_notif_db[0].jumlahnotif}</Text>
                    </Badge>

                    <Icon_
                      name="bell"
                      style={{ color: "#b7b7b7", fontSize: 24 }}
                    />
                    <Text
                      style={{ color: "#b7b7b7", textTransform: "capitalize" }}
                    >
                      Notification
                    </Text>
                  </Button>
                ) : (
                  <Button badge vertical onPress={() => Actions.notif()}>
                    <Icon_
                      name="bell"
                      style={{ color: "#b7b7b7", fontSize: 24 }}
                    />
                    <Text
                      style={{ color: "#b7b7b7", textTransform: "capitalize" }}
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
});

//make this component available to the app
export default NewsPage;
