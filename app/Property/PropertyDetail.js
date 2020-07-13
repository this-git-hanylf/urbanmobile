import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
  Modal,
  ActivityIndicator,
  Linking,
  Alert,
  YellowBox,
  // WebView
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
  Tab,
  Tabs,
  Fab,
  Form,
  Label,
} from "native-base";

import { Actions } from "react-native-router-flux";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import { urlApi } from "@Config/services";
import GALLERY from "./Gallery";
import AMENITIES from "./Amenities";
import SIMILAR from "./Similar";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";

import { Style, Colors, Fonts } from "../Themes/index";
import Styles from "./Style";

import ImageViewer from "react-native-image-zoom-viewer";
import HTML from "react-native-render-html";
import Mailer from "react-native-mail";
import { WebView } from "react-native-webview";
import styles, { colors } from "./componen/index";
import { Col, Row, Grid } from "react-native-easy-grid";
import NavigationService from "@Service/Navigation";
import FooterTabsIconText from "@Component/BottomBar";
// import Routes from './../Router';
// import BottomBarDua from '@Component/BottomBarDua';
// import { sliderWidth, itemWidth } from "./componen/SliderEntry";
// import SliderEntry from "../components/SlideEntry";
// const { height, width } = Dimensions.get('window')
// import alertCustom from "@Component/alert_Custom";
import AlertCustom from "@Component/alert_Custom";
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const { height, width } = Dimensions.get("window");

let isMount = false;

const API_KEY = "AIzaSyBY0EdmxQjo65OoFYIlQZ8jQ1FS8VOTFC8";
// const API_KEY = "AIzaSyBFhdZb-_5FCA5IhbLhB9-KimWC_QlOKLs";

const IS_IOS = Platform.OS === "ios";

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.45;
const slideWidth = wp(62);
const slideWidth_tower = wp(55);
const itemHorizontalMargin = wp(4);
const itemHorizontalMargin_tower = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export const itemWidth_tower =
  slideWidth_tower + itemHorizontalMargin_tower * 4;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Alert_Visibility: false,
      pesan: "",
      Alert_Visibility2: false,
      pesan2: "",
      title: "",
      picture_url: "",

      active: false,
      isVisible: false,
      isView: false,
      isUnitView: false,
      isLogin: false,

      hd: new Headers(),
      email: "",
      userId: "",
      descs: "",
      refEmail: "",

      amenities: null,
      feature: null,
      overview: null,
      project: null,
      gallery: null,
      plans: null,

      imagesPreview: [],
      unitPlanPreview: [],
      dataPromo: [],
      index: 0,
      wa_no: "",
      email_add: "",
      tower: [],
      amen: [],
      unit: [],
      tes: "",
      stat: "",
      stylehtml:
        "color: Colors.white, textAlign:'center', fontSize: 18, paddingVertical: 10, paddingHorizontal: 30, fontFamily: Fonts.type.proximaNovaReg,letterSpacing: 2,lineHeight: 25",
      pict_hardcode: require("@Asset/images/project_suite_urban.png"),
      statusdataaktif: "",
      location: [],
      // project_status: "",
    };

    console.log("props", props);
    this._renderItemTower = this._renderItemTower.bind(this);
    this._renderItemUnit = this._renderItemUnit.bind(this);
    this.nupBooking = this.nupBooking.bind(this);
    // this.alertNUP = this.alertNUP.bind(this); //add this line
    // this.selectAmen = this.selectAmen.bind(this); //add this line
    // this.renderItemNews = this.renderItemNews.bind(this);
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    Actions.refresh({ backTitle: () => this.props.title });

    const data = {
      hd: new Headers({
        Token: await _getData("@Token"),
      }),
      email: await _getData("@User"),
      userId: await _getData("@UserId"),
      name: await _getData("@Name"),
      handphone: await _getData("@Handphone"),
      isLogin: await _getData("@isLogin"),
      title: this.props.items.project_descs,
      status_active: this.props.status_aktif,
      group: await _getData("@Group"),
      // descs : this.props.items.project_descs,
      descs:
        "Saya tertarik reservasi " +
        this.props.items.project_descs +
        "\n\nHubungi saya untuk info detail.",
      picture_url: this.props.items.picture_url,
    };
    console.log("dataIm", data);

    isMount = true;

    this.setState(data, () => {
      this.getDataDetails(this.props.items);
      this.getDataGallery(this.props.items);
      this.getPromo();
      this.getDataUnitPlan(this.props.items);
      this.getTower();
      this.getDataAminities(this.props.items);
      this.getUnit();
      this.getLocation();
      // this.goTo()
    });
    this.setState({ statusdataaktif: this.props.status_aktif });
    console.log("data aktif", this.state.statusdataaktif);
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

  getPromo = () => {
    fetch(urlApi + "c_newsandpromo/getDatapromo2/IFCAMOBILE", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataPromo: resData });
          console.log("dataPRopmo", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getDataDetails = (item) => {
    {
      isMount
        ? fetch(
            urlApi +
              "c_reservation/getDataDetails/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no,
            {
              method: "GET",
              headers: this.state.hd,
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                const data = {
                  amenities: resData.amenities,
                  feature: resData.feature,
                  overview: resData.overview,
                  project: resData.project,
                };
                console.log("data", data);
                this.setState(data);
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("error", res.Pesan);
                });
              }
              console.log("getDAtaDetails", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  getDataGallery = (item) => {
    {
      isMount
        ? fetch(
            urlApi +
              "c_reservation/getGallery/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no,
            {
              method: "GET",
              headers: this.state.hd,
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                console.log(resData);
                const resData = res.Data;
                this.setState({ gallery: resData.gallery });
                resData.gallery.map((item) => {
                  this.setState((prevState) => ({
                    imagesPreview: [
                      ...prevState.imagesPreview,
                      { url: item.gallery_url },
                    ],
                  }));
                });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("error", res.Pesan);
                });
              }
              console.log("getData Galerry", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  getDataUnitPlan = (item) => {
    {
      isMount
        ? // fetch(urlApi+'c_reservation/getGallery/'+item.entity_cd+'/'+item.project_no,{
          fetch(
            urlApi +
              "c_reservation/getGallery/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no,
            {
              method: "GET",
              headers: this.state.hd,
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                console.log(resData);
                const resData = res.Data;
                this.setState({ plans: resData.plans });
                resData.plans.map((item) => {
                  this.setState((prevState) => ({
                    unitPlanPreview: [
                      ...prevState.unitPlanPreview,
                      { url: item.plan_url },
                    ],
                  }));
                });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  console.log("error", res.Pesan);
                });
              }
              console.log("getData Plans", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  sendWa() {
    const noHp = this.state.project[0].wa_no;
    const descs = this.state.descs;
    Linking.openURL("https://wa.me/+62" + noHp + "?text=" + descs);
    console.log("hp wa", noHp);
  }

  sendEmail() {
    // noHp = '';
    const email_add = this.state.project[0].email_add;
    const descs = this.props.items.project_descs;

    // alert(email_add);

    console.log("email send add", email_add);
    Mailer.mail(
      {
        subject: "Saya tertarik reservasi " + descs,
        recipients: [`${email_add}`],
        ccRecipients: [""],
        bccRecipients: [""],
        body: "",
        isHTML: true,
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: "Ok",
              onPress: () => console.log("OK: Email Error Response"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("CANCEL: Email Error Response"),
            },
          ],
          { cancelable: true }
        );
      }
    );
  }

  showModal() {
    this.setState({ isVisible: true });
  }

  clickToNavigate = (to, param) => {
    Actions[to](param);
    this.setState({ click: true });
  };

  showAlert = () => {
    Alert.alert(
      "",
      "Please Login First",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => Actions.Login() },
      ],
      { cancelable: false }
    );
  };

  // goTo(item){
  //   alert('t')
  // };
  goTo(item) {
    console.log("item", item);
    // alert('t')
    // const itemyangdibawa = item;
    // console.log('itemyangdibawa', itemyangdibawa)
    // const datapentingtower = this.props.items;
    // console.log('datapentingtower', datapentingtower);
    const data = this.props.items;
    data["tower"] = item.property_cd;
    data["towerDescs"] = item.descs;
    data["picture_url"] = item.picture_url;
    data["property_cd"] = item.property_cd;
    data["hidden_picture_url"] = item.hidden_picture_url;
    console.log("data", data);
    if (this.props.dyn) {
      _navigate("UnitEnquiryProjectPage", { prevItems: data });
    } else {
      // _navigate("chooseZone", { items: this.props.items });
      _navigate("ChooseZoneModif", {
        items: this.props.items,
        prevItems: data,
      });
    }
  }
  // tes(){
  //   alert('s')
  // }

  _renderItemTower({ item, index }, parallaxProps) {
    // console.log('item towersss', item)
    return (
      <TouchableOpacity
        style={styles.item}
        // onPress={() => this.goTo()}
        // onPress={()=>this.goTo()}
        onPress={() => this.goTo(item)}
        // onPress={this.goTo()}
        // onPress={() => this.goTo()}
        // onPress={()=>Actions.ProductProjectPage({items : item})}
      >
        <ParallaxImage
          // onPress={()=>this.goTo(item)}
          source={{ uri: item.picture_url }}
          containerStyle={styles.imageContainer_tower}
          style={styles.image}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
        {/* <View style={styles.newsTitle_tower} onPress={() => this.goTo()}>
          <Text style={styles.newsTitleText_small_tower}>{item.descs}</Text>
        </View> */}
      </TouchableOpacity>
    );
  }

  _renderItemUnit({ item, index }, parallaxProps) {
    // this.alertNUP = this.alertNUP.bind(this);
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.tes(item)}>
        <ParallaxImage
          source={{ uri: item.picture_url }}
          containerStyle={styles.imageContainer}
          style={styles.imageUnit}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
        <View style={styles.newsTitle}>
          <Text style={styles.newsTitleText_small}>{item.descs}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  tes(item) {
    console.log("item dari unit", item);
    // alert("tes");
    Actions.SkipLoginBlank2();
  }

  getTower = () => {
    const item = this.props.items;
    console.log("item tower", item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getTower/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no,
            {
              method: "GET",
              headers: this.state.hd,
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                this.setState({ tower: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("error", res.Pesan);
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

  getDataAminities = () => {
    const item = this.props.items;
    console.log("item tower", item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_reservation/getDataDetailsAmenities/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no,
            {
              method: "GET",
              headers: this.state.hd,
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                this.setState({ amen: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("error", res.Pesan);
                });
              }
              console.log("amenitis", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  getUnit = () => {
    const item = this.props.items;
    console.log("item tower", item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_product_info/getUnitProp/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no,
            {
              method: "GET",
              headers: this.state.hd,
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                this.setState({ unit: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("error", res.Pesan);
                });
              }
              console.log("unit", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  sendEmail() {
    // alert('email');
    const email_add = this.state.project[0].email_add;
    // const descs_ = this.state.descs_wa
    // noHp = '';
    // const email_add = this.state.projects[0].email_add
    // const descs = this.props.items.project_descs

    // alert(email_add);

    console.log("email send add", email_add);
    Mailer.mail(
      {
        // subject: "Saya tertarik reservasi " + descs_,
        subject: "",
        recipients: [`${email_add}`],
        ccRecipients: [""],
        bccRecipients: [""],
        body: "",
        isHTML: true,
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: "Ok",
              onPress: () => console.log("OK: Email Error Response"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("CANCEL: Email Error Response"),
            },
          ],
          { cancelable: true }
        );
      }
    );
  }

  getLocation = () => {
    const item = this.props.items;
    {
      isMount
        ? fetch(
            // urlApi + "c_location/getLocationAll/ifca3/",
            urlApi +
              "c_location/getLocationAll/IFCAMOBILE/" +
              item.entity_cd +
              "/" +
              item.project_no,
            {
              method: "GET",
              headers: this.state.hd,
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data[0];
                this.setState({ location: resData });
                this.setState({ project_status: resData.project_status });
                console.log("projec status", resData.project_status);
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan);
                  console.log("eror location", res.Pesan);
                });
              }
              // this.setState({ arrayholder: res.Data });
              console.log("getLocation", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  };

  // renderItemNews(item){
  //   return (
  //     <View
  //       style={Styles.itemBoxAmen_not_gold}
  //       underlayColor="transparent"
  //       // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
  //       >
  //       <View>
  //         <View>
  //           <Image
  //             source={{ uri: item.amenities_url }}
  //             style={Styles.itemAmen_not_gold}
  //           />
  //         </View>
  //         {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
  //         {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}

  //       </View>
  //     </View>

  //   )
  // }

  nupBooking = () => {
    // alert('tes')
    const data = this.props.items;
    console.log("lempar data", data);

    if (data) {
      Actions.NupBooking({ items: data });
      // alert('ada data');
      // console.log('da')
    }
    // else{
    //   alert('gada');
    // }
  };

  alertNUP() {
    const pesan2 = "Please contact your agent for booking";
    this.alertFillBlank2(true, pesan2);
    // Alert.alert(
    //   "Attention",
    //   "Please contact your agent for booking",
    //   [
    //     { text: "Close", onPress: () => console.log("Close"), style: "default" }
    //     // { text: "Camera", onPress: () => this.fromCamera() },
    //     // {
    //     //     text: "Cancel",
    //     //     onPress: () => console.log("User Cancel"),
    //     //     style: {backgroundColor: "#000"}
    //     // }
    //   ],
    //   { cancelable: false }
    // );
  }

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }
  alertFillBlank2(visible, pesan2) {
    this.setState({ Alert_Visibility2: visible, pesan2: pesan2 });
  }

  selectAmenDining() {
    // console.log('status',status)
    const items = this.props.items;
    console.log("items", items);
    Actions.DetailAmenitiesDining({ items: items });

    // if (status == "D") {
    //   const stat = "";
    //   this.setState({ stat: "D" });

    //   Actions.DetailAmenitiesDining({ stat: this.state.stat, items: items });
    //   console.log("stat");
    // }
  }

  selectAmenMall() {
    // console.log('status',status)
    const items = this.props.items;
    console.log("items", items);
    // const stat = "";
    Actions.DetailAmenitiesMall({ items: items });
    // if (status == "M") {
    //   this.setState({ stat: "M" });

    //   Actions.DetailAmenities({ stat: this.state.stat, items: items });
    //   console.log("stat");
    // }
  }

  selectAmenGym() {
    // console.log('status',status)
    const items = this.props.items;
    console.log("items", items);
    // const stat = "";
    Actions.DetailAmenitiesGym({ items: items });
    // if (status == "G") {
    //   this.setState({ stat: "G" });

    //   Actions.DetailAmenities({ stat: this.state.stat, items: items });
    //   console.log("stat");
    // }
  }

  selectAmenLrt() {
    // console.log('status',status)
    const items = this.props.items;
    console.log("items", items);
    // const stat = "";
    Actions.DetailAmenitiesLRT({ items: items });
    // if (status == "L") {
    //   this.setState({ stat: "L" });

    //   Actions.DetailAmenities({ stat: this.state.stat, items: items });
    //   console.log("stat");
    // }
  }

  selectAmenPool() {
    // console.log('status',status)
    const items = this.props.items;
    console.log("items", items);
    // const stat = "";
    Actions.DetailAmenitiesPool({ items: items });
    // if (status == "P") {
    //   this.setState({ stat: "P" });

    //   Actions.DetailAmenities({ stat: this.state.stat, items: items });
    //   console.log("stat");
    // }
  }

  selectAmenPlay() {
    // console.log('status',status)
    const items = this.props.items;
    console.log("items", items);
    Actions.DetailAmenitiesPlay({ items: items });
    // const stat = "";
    // if (status == "Y") {
    //   this.setState({ stat: "Y" });

    //   Actions.DetailAmenities({ stat: this.state.stat, items: items });
    //   console.log("stat");
    // }
  }
  Show_Custom_Alert(visible) {
    this.setState({ Alert_Visibility: visible });
  }

  downloadBrosur() {
    if (this.state.isLogin) {
      Actions.ProjectDownloadPage({ items: this.props.items });
    } else {
      const pesan = "Please Sign in to Access";
      this.alertFillBlank(true, pesan);
    }
  }

  // openMap(cordinat) {
  //   console.log("cordinat", cordinat);
  //   console.log("open directions");
  // const cor = "";
  // const cor = cordinat;

  // console.log(cor);
  // const tes = "https://goo.gl/maps/JvySCBA3VLqvMnfr8";
  // Linking.openURL(cordinat);
  // Platform.select({
  //   ios: () => {
  //     console.log("ios");
  //     Linking.openURL("http://maps.apple.com/maps?daddr=");
  //   },
  //   android: () => {
  //     console.log("andro");
  //     // Linking.openURL("http://maps.google.com/maps?daddr=");
  //     Linking.openURL(cordinat);
  //   }
  // });
  // }
  // openMap() { console.log('open directions') if (Platform.OS === "ios") { Linking.openURL('http://maps.apple.com/maps?daddr=') } else { Linking.openURL('http://maps.google.com/maps?daddr='); } };

  render() {
    // let feature = ''
    // if(this.state.feature){
    //   feature = this.state.feature[0].feature_info.replace(/<div class="col-md-6">|<\/div>|<\/b>|<b>|<ul class="list-unstyled">|<\/ul>/gi, '')
    //   feature = feature.replace(/<\/li>/gi,'\n')
    //   feature = feature.replace(/<li>/gi,'• ')
    //   feature = feature.replace(/<br>/gi,' ')
    // }

    return (
      <Container style={Style.bgMain}>
        <ImageBackground
          style={Styles.backgroundImage}
          source={require("../Images/background-blue.png")}
        >
          <StatusBar
            // backgroundColor={Colors.statusBarNavy}
            backgroundColor="transparent"
            animated
            barStyle="light-content"
            translucent={true}
          />

          {/* <Header style={Style.navigation}>
          
          <StatusBar backgroundColor={Colors.statusBarNavy} animated barStyle="light-content" />          
         
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
          <View style={[Style.actionBarMiddle,{backgroundColor: 'transparent'}]}>
            <Text style={Style.actionBarText}>
              {this.state.title.toUpperCase()}
            </Text>
          </View>
            
        </Header> */}

          {this.state.project_status != null ? (
            this.state.project_status == 1 ? (
              <ScrollView style={Styles.scroll}>
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

                      <View
                        style={{
                          flexDirection: "row",
                          alignContent: "space-around",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: Colors.goldUrban,
                            height: 40,
                            width: 100,
                            alignContent: "space-around",
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                          }}
                          onPress={() => {
                            this.alertFillBlank(!this.state.Alert_Visibility);
                          }}
                          // activeOpacity={0.7}
                        >
                          <Text style={{ color: Colors.white }}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: Colors.goldUrban,
                            height: 40,
                            width: 100,
                            alignItems: "center",
                            justifyContent: "center",
                            alignContent: "space-around",
                            marginHorizontal: 10,
                          }}
                          onPress={() => {
                            // Actions.Login();
                            this.alertFillBlank(!this.state.Alert_Visibility);
                            Actions.Login();
                          }}
                          // activeOpacity={0.7}
                        >
                          <Text style={{ color: Colors.white }}>Yes</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>

                <Modal
                  visible={this.state.Alert_Visibility2}
                  transparent={true}
                  animationType={"slide"}
                  onRequestClose={() => {
                    this.alertFillBlank2(!this.state.Alert_Visibility2, pesan2);
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
                        {this.state.pesan2}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignContent: "space-around",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: Colors.goldUrban,
                            height: 40,
                            width: 100,
                            alignContent: "space-around",
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                          }}
                          onPress={() => {
                            this.alertFillBlank2(!this.state.Alert_Visibility2);
                          }}
                          // activeOpacity={0.7}
                        >
                          <Text style={{ color: Colors.white }}>OK</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>

                <View style={{ top: 25 }}>
                  {this.state.project ? (
                    <ImageBackground
                      // source={this.state.picture_url}
                      // source={this.state.pict_hardcode}
                      source={{ uri: this.state.project[0].hidden_picture_url }}
                      imageStyle={"cover"}
                      // source={require("@Asset/images/project_suite_urban.png")}
                      // style={[Style.coverImg,{flex:1}]}
                      // style={Styles.coverImg}
                      style={{ flex: 1, height: 700 }}
                    >
                      <View style={{ paddingLeft: 15, paddingTop: 15 }}>
                        <Button
                          transparent
                          style={Style.actionBarBtn}
                          onPress={Actions.pop}
                        >
                          <Icon
                            active
                            name="arrow-left"
                            style={[Style.textWhite, { fontSize: 28 }]}
                            type="MaterialCommunityIcons"
                          />
                        </Button>
                      </View>

                      <View>
                        <Text
                          style={{
                            // fontWeight: "900",
                            color: "#FFFFFF",
                            fontSize: 15,
                            textAlign: "center",
                            fontFamily: Fonts.type.sfuiDisplayBold,
                          }}
                          // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
                        >
                          {this.state.title.toUpperCase()}
                        </Text>
                        {/* <Text style={Style.actionBarText}>
                  
                      {this.state.towerDescs}
                      
                  </Text> */}
                      </View>
                      <AlertCustom />
                      {this.state.group !== "AGENT" ? (
                        <View style={{ paddingTop: "130%" }}>
                          <Button
                            style={Style.signInBtnMedium}
                            onPress={() => this.alertNUP()}
                            // onPress={() => this.nupBooking()}
                          >
                            <Text
                              style={{
                                width: "100%",
                                fontSize: 16,
                                alignItems: "center",
                                textAlign: "center",
                                fontFamily: Fonts.type.proximaNovaBold,
                                letterSpacing: 1,
                              }}
                            >
                              Booking Priority Pass
                            </Text>
                          </Button>
                        </View>
                      ) : (
                        <View style={{ paddingTop: "130%" }}>
                          <Button
                            style={Style.signInBtnMedium}
                            onPress={() => this.nupBooking()}
                          >
                            <Text
                              style={{
                                width: "100%",
                                fontSize: 16,
                                alignItems: "center",
                                textAlign: "center",
                                fontFamily: Fonts.type.proximaNovaBold,
                                letterSpacing: 1,
                              }}
                            >
                              Booking Priority Pass
                            </Text>
                          </Button>
                        </View>
                      )}
                    </ImageBackground>
                  ) : null}
                </View>
                {/* <Button
              style={{
                width: "100%",
                fontSize: 16,
                alignItems: "center",
                textAlign: "center",
                fontFamily: Fonts.type.proximaNovaBold,
                letterSpacing: 1
              }}
              onPress={() => {
                this.Show_Custom_Alert(true);
              }}
              // title="Click Here To Show Custom Alert Dialog"
            >
              <Text>Click Here To Show Custom Alert Dialog</Text>
            </Button> */}
                <View style={{ paddingTop: 30 }}>
                  {this.state.overview ? (
                    <Text
                      style={{
                        color: Colors.white,
                        textAlign: "center",
                        // alignContent:'center',
                        fontSize: 18,
                        paddingVertical: 10,

                        paddingHorizontal: 25,
                        fontFamily: Fonts.type.proximaNovaReg,
                        letterSpacing: 2,
                        lineHeight: 25,
                      }}
                    >
                      {this.state.overview[0].overview_info.replace(
                        /<\/?[^>]+(>|$)/g,
                        ""
                      )}
                    </Text>
                  ) : (
                    <ActivityIndicator />
                  )}

                  {/* {this.state.overview ? 
                
                // tagsStyles: { i: { textAlign: 'center', fontStyle: 'italic', color: 'grey' } }
                // <Text style={{color: Colors.white}}>
                  // <HTML html={'' this.state.overview[0].overview_info} imagesMaxWidth={Dimensions.get('window').width}  />
                  <HTML html={`<span style="textAlign: 'center', fontStyle: 'italic', color: 'white' ">` + this.state.overview[0].overview_info + `</span>`} imagesMaxWidth={Dimensions.get('window').width}  />
              // <WebView
              //   scalesPageToFit={false}
              //   bounces={false}
              //   javaScriptEnabled
              //   style={{ height: 240, width: null, marginHorizontal: 20}}
              //   source={{
              //     html: `
              //           <!DOCTYPE html>
              //           <html>
              //             <head></head>
              //             <body>
              //               <div style="color: 'red'; ">'${this.state.overview[0].overview_info}'</div>
              //               <div>tes</div>
              //             </body>
              //           </html>
              //     `,
              //   }}
              //   automaticallyAdjustContentInsets={false}
              
              // />
                // </Text>
                 :<ActivityIndicator /> } */}
                </View>

                <View style={{ paddingBottom: 20 }}>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={[Styles.titleGold, { fontSize: 18 }]}>
                      TOWERS
                    </Text>
                  </View>
                  {/* <View style={styles.corContainerStyle}> */}
                  <Carousel
                    autoplay={false}
                    autoplayDelay={1000}
                    autoplayInterval={3000}
                    // sliderWidth={width}
                    // sliderHeight={width}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth_tower}
                    // itemWidth={width - 60}
                    data={this.state.tower}
                    renderItem={this._renderItemTower}
                    hasParallaxImages={true}
                    containerCustomStyle={styles.slider}

                    // contentContainerCustomStyle={styles.sliderContentContainer}
                    // resizeMode={ImageResizeMode.contain}
                  />

                  {/* </View> */}

                  {/* <View style={{ paddingVertical: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    _navigate("ProductProjectPage", {
                      items: this.props.items
                    });
                  }}
                >
                  <Text style={Styles.titleWhiteSmall}>See all tower</Text>
                </TouchableOpacity>
              </View> */}
                </View>

                {/* <View style={styles.sectionTransparent}>
                  <View style={{paddingVertical: 10}}>
                    <Text style={[Styles.titleGold,{fontSize: 18}]}>AMENITIES</Text>
                  </View> 

                  <FlatList
                    data={this.state.amen}
                    contentContainerStyle={Styles.flatList}
                    keyExtractor={item => item.rowID}
                    numColumns={2}
                    renderItem={({ item }) => this.renderItemNews(item)}
                  />
            </View> */}

                <View style={styles.sectionTransparent}>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={[Styles.titleGold, { fontSize: 18 }]}>
                      AMENITIES
                    </Text>
                  </View>

                  <Grid>
                    <Row>
                      <Col
                        style={{ textAlign: "center", alignItems: "center" }}
                        onPress={() => this.selectAmenDining()}
                      >
                        <View
                          style={Styles.itemBoxAmen_not_gold}
                          underlayColor="transparent"
                          // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                        >
                          <View>
                            <View>
                              <Image
                                source={require("@Asset/images/amenitis/dining.png")}
                                style={Styles.itemAmen_not_gold}
                              />
                            </View>
                            {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                            {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                          </View>
                        </View>
                      </Col>
                      <Col
                        style={{ textAlign: "center", alignItems: "center" }}
                        onPress={() => this.selectAmenGym()}
                      >
                        <View
                          style={Styles.itemBoxAmen_not_gold}
                          underlayColor="transparent"
                          // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                        >
                          <View>
                            <View>
                              <Image
                                source={require("@Asset/images/amenitis/gym.png")}
                                style={Styles.itemAmen_not_gold}
                              />
                            </View>
                            {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                            {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                          </View>
                        </View>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        style={{ textAlign: "center", alignItems: "center" }}
                        onPress={() => this.selectAmenLrt()}
                      >
                        <View
                          style={Styles.itemBoxAmen_not_gold}
                          underlayColor="transparent"
                          // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                        >
                          <View>
                            <View>
                              <Image
                                source={require("@Asset/images/amenitis/LRT.png")}
                                style={Styles.itemAmen_not_gold}
                              />
                            </View>
                            {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                            {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                          </View>
                        </View>
                      </Col>
                      <Col
                        style={{ textAlign: "center", alignItems: "center" }}
                        onPress={() => this.selectAmenMall()}
                      >
                        <View
                          style={Styles.itemBoxAmen_not_gold}
                          underlayColor="transparent"
                          // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                        >
                          <View>
                            <View>
                              <Image
                                source={require("@Asset/images/amenitis/mall.png")}
                                style={Styles.itemAmen_not_gold}
                              />
                            </View>
                            {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                            {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                          </View>
                        </View>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        style={{ textAlign: "center", alignItems: "center" }}
                        onPress={() => this.selectAmenPool()}
                      >
                        <View
                          style={Styles.itemBoxAmen_not_gold}
                          underlayColor="transparent"
                          // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                        >
                          <View>
                            <View>
                              <Image
                                source={require("@Asset/images/amenitis/pool.png")}
                                style={Styles.itemAmen_not_gold}
                              />
                            </View>
                            {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                            {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                          </View>
                        </View>
                      </Col>
                      <Col
                        style={{ textAlign: "center", alignItems: "center" }}
                        onPress={() => this.selectAmenPlay()}
                      >
                        <View
                          style={Styles.itemBoxAmen_not_gold}
                          underlayColor="transparent"
                          // onPress={()=>Actions.NewsAndPromoDetail({items : item})}
                        >
                          <View>
                            <View>
                              <Image
                                source={require("@Asset/images/amenitis/playground.png")}
                                style={Styles.itemAmen_not_gold}
                              />
                            </View>
                            {/* <Text style={Styles.itemTextAmenities}>{item.amenities_title}</Text> */}
                            {/* <Text style={Styles.itemLocation}>{item.subject}</Text> */}
                          </View>
                        </View>
                      </Col>
                    </Row>
                  </Grid>
                </View>

                {/* <View style={styles.sectionTransparent}>
                  <View style={{paddingVertical: 10}}>
                    <Text style={[Styles.titleGold,{fontSize: 18}]}>AMENITIES</Text>
                  </View> 

                  <FlatList
                    data={this.state.amen}
                    contentContainerStyle={Styles.flatList}
                    keyExtractor={item => item.rowID}
                    numColumns={2}
                    renderItem={({ item }) => this.renderItemNews(item)}
                  />
            </View> */}

                <View style={{ paddingBottom: 20 }}>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={[Styles.titleGold, { fontSize: 18 }]}>
                      UNIT
                    </Text>
                  </View>
                  {/* <View style={styles.corContainerStyle}> */}
                  <Carousel
                    autoplay={false}
                    autoplayDelay={1000}
                    autoplayInterval={3000}
                    // sliderWidth={width}
                    // sliderHeight={width}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    // itemWidth={width - 60}
                    data={this.state.unit}
                    renderItem={this._renderItemUnit}
                    hasParallaxImages={true}
                    containerCustomStyle={styles.slider}
                    // contentContainerCustomStyle={styles.sliderContentContainer}
                    // resizeMode={ImageResizeMode.contain}
                  />

                  {/* </View> */}

                  {/* <View style={{paddingVertical: 10}}>
                    <Text style={Styles.titleWhiteSmall}>See all unit</Text>
                  </View> */}
                </View>

                <View style={Styles.overview}>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={[Styles.titleGold, { fontSize: 18 }]}>
                      GALLERY
                    </Text>
                  </View>
                  {this.state.gallery ? (
                    <FlatList
                      data={this.state.gallery}
                      horizontal
                      style={[Styles.slider, { paddingTop: 10 }]}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item.line_no}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          underlayColor="transparent"
                          onPress={() => {
                            this.setState({ isView: true, index: index });
                          }}
                        >
                          <View>
                            <Image
                              source={{ uri: item.gallery_url }}
                              style={Styles.sliderImg}
                            />
                            {/* <Text>{item.gallery_title}</Text> */}
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    <ActivityIndicator />
                  )}
                </View>
                <Modal
                  visible={this.state.isView}
                  transparent={true}
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
                  {this.state.imagesPreview ? (
                    <ImageViewer
                      enableImageZoom={true}
                      enableSwipeDown={true}
                      onSwipeDown={() =>
                        this.setState({ isView: !this.state.isView })
                      }
                      index={this.state.index}
                      imageUrls={this.state.imagesPreview}
                      // style={{ width: 200 }}
                    />
                  ) : null}
                </Modal>

                <View>
                  <View style={{ paddingVertical: 10 }}>
                    <Text
                      style={[
                        Styles.titleGold,
                        { fontSize: 18, paddingBottom: 10 },
                      ]}
                    >
                      LOCATION
                    </Text>
                  </View>

                  {this.state.project ? (
                    //  <HTML html={`<iframe name="gMap" src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.980392567379!2d98.67400131448191!3d3.591970997386129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131c5bb04a5b5:0xc9bead74e038893e!2sThe+Reiz+Condo+Medan!5e0!3m2!1sen!2sid!4v1534232821301&key=${API_KEY}'></iframe>`} imagesMaxWidth={Dimensions.get('window').width} />

                    //  <HTML html={`<iframe src='${this.state.project[0].coordinat_project}' width="300" height="300" frameborder="0" style="border:0;"></iframe>`} imagesMaxWidth={Dimensions.get('window').width} />
                    //  <HTML html={this.state.project[0].coordinat_project} />
                    // <HTML html={`<iframe src="https://goo.gl/maps/idUCFGKtvhrhYGhd6" height="500px" ></iframe>`}></HTML>
                    // <HTML html={`<iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBY0EdmxQjo65OoFYIlQZ8jQ1FS8VOTFC8&q=Space+Needle,Seattle+WA"></iframe>`}></HTML>
                    // <HTML html = {`<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/view?zoom=17&center=3.1164,101.5950&key=AIzaSyBY0EdmxQjo65OoFYIlQZ8jQ1FS8VOTFC8"></iframe>`}></HTML>
                    // <HTML html = {`<iframe\s*src="https:\/\/www\.google\.com\/maps\/embed\?[^"]+"*\s*[^>]+>*<\/iframe>`}></HTML>
                    <View style={{ marginTop: 10 }}>
                      <WebView
                        scalesPageToFit={false}
                        bounces={false}
                        javaScriptEnabled
                        style={{
                          height: 240,
                          width: null,
                          marginHorizontal: 20,
                        }}
                        source={{
                          html: `
                        <!DOCTYPE html>
                        <html>
                          <head></head>
                          <body>
                            <div id="baseDiv"><iframe width="350" height="300" frameborder="0" style="border:0, margin: 0"  src='${this.state.project[0].coordinat_project}'></iframe></div>
                          </body>
                        </html>
                  `,
                        }}
                        automaticallyAdjustContentInsets={false}
                      />
                      <Button
                        style={{
                          backgroundColor: Colors.goldUrban,

                          height: 30,
                          width: 120,

                          alignItems: "center",
                          justifyContent: "center",

                          marginTop: 10,

                          alignSelf: "center",

                          borderRadius: 5,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            // console.log(
                            //   "cordinat",
                            //   this.state.project[0].direction_map
                            // )
                            // this.openMap(
                            //   this.state.project[0].direction_map
                            // )
                            Linking.openURL(this.state.project[0].direction_map)
                          }
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              paddingLeft: 10,
                              paddingRight: 10,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: Colors.white,
                              }}
                            >
                              Go to Direction
                            </Text>
                            <Icon
                              name="md-navigate"
                              style={{
                                fontSize: 13,
                                marginLeft: 10,
                                color: Colors.white,
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </Button>
                    </View>
                  ) : (
                    <ActivityIndicator />
                  )}
                </View>
                <View>
                  {this.state.project ? (
                    <View style={Styles.overview}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          fontFamily: Fonts.type.proximaNovaReg,
                        }}
                      >
                        {this.state.project[0].project_descs}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          fontFamily: Fonts.type.proximaNovaReg,
                        }}
                      >
                        {this.state.project[0].coordinat_name}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          fontFamily: Fonts.type.proximaNovaReg,
                        }}
                      >
                        {this.state.project[0].coordinat_address}
                      </Text>
                    </View>
                  ) : (
                    <ActivityIndicator />
                  )}
                </View>
                <View style={{ paddingBottom: 20, paddingTop: 20 }}>
                  <Button
                    style={Style.signInBtnMedium}
                    onPress={() => this.downloadBrosur()}
                    // onPress={() =>
                    //   Actions.ProjectDownloadPage({ items: this.props.items })
                    // }
                  >
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
                      Download File/Brochure
                    </Text>
                  </Button>
                </View>
                <View>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={[Styles.titleGold, { fontSize: 18 }]}>
                      CONTACT
                    </Text>
                  </View>
                  {this.state.project ? (
                    <Grid>
                      <Row>
                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            Linking.openURL(
                              "tel:" + this.state.project[0].office_no
                            )
                          }
                        >
                          <Icon
                            raised
                            name="phone"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Call
                          </Text>
                        </Col>

                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            Linking.openURL(this.state.project[0].web_url)
                          }
                        >
                          <Icon
                            reverse
                            name="ios-globe"
                            type="Ionicons"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Website
                          </Text>
                        </Col>

                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                          onPress={() => this.sendEmail()}
                        >
                          <Icon
                            raised
                            name="envelope"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Email
                          </Text>
                        </Col>
                      </Row>

                      <Row>
                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            Linking.openURL(this.state.project[0].facebook_url)
                          }
                        >
                          <Icon
                            raised
                            name="facebook-square"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Facebook
                          </Text>
                        </Col>

                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            Linking.openURL(this.state.project[0].instagram_url)
                          }
                        >
                          <Icon
                            raised
                            name="instagram"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          {/* <Text>{this.state.project[0].instagram_url}</Text> */}
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Instagram
                          </Text>
                        </Col>

                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            Linking.openURL(this.state.project[0].youtube_url)
                          }
                        >
                          <Icon
                            raised
                            name="youtube"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Youtube
                          </Text>
                        </Col>
                      </Row>
                    </Grid>
                  ) : (
                    <Grid>
                      <Row>
                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            raised
                            name="phone"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Call
                          </Text>
                        </Col>

                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            reverse
                            name="ios-globe"
                            type="Ionicons"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Website
                          </Text>
                        </Col>

                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            raised
                            name="envelope"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Email
                          </Text>
                        </Col>
                      </Row>

                      <Row>
                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            raised
                            name="facebook-square"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Facebook
                          </Text>
                        </Col>
                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                          onPress={() => Linking.openURL("http://google.com")}
                        >
                          <Icon
                            raised
                            name="instagram"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          {/* <Text>{this.state.project[0].instagram_url}</Text> */}
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Instagram
                          </Text>
                        </Col>

                        <Col
                          style={{
                            height: 90,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            raised
                            name="youtube"
                            type="FontAwesome"
                            style={{ color: "#fff" }}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaReg,
                              color: Colors.white,
                              fontSize: 14,
                              paddingTop: 5,
                            }}
                          >
                            Youtube
                          </Text>
                        </Col>
                      </Row>
                    </Grid>
                  )}
                </View>
              </ScrollView>
            ) : (
              <View style={{ height: "100%", top: 25 }}>
                <View style={{ paddingLeft: 15, paddingTop: 15 }}>
                  <Button
                    transparent
                    style={Style.actionBarBtn}
                    onPress={Actions.pop}
                  >
                    <Icon
                      active
                      name="arrow-left"
                      style={[Style.textWhite, { fontSize: 28 }]}
                      type="MaterialCommunityIcons"
                    />
                  </Button>
                </View>
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
              </View>
            )
          ) : (
            <ActivityIndicator
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
              color="#fff"
            />
          )}

          {/* <BottomBarDua /> */}
          {/* <Button full style={{ backgroundColor: "#12173F" }}  onPress={() =>{
          this.state.isLogin ? this.showModal()
          : this.showAlert()
          
        }}>
          <Text>I'm Interested</Text>
        </Button> */}
        </ImageBackground>
        {/* <FooterTabsIconText /> */}
      </Container>
    );
  }
}
