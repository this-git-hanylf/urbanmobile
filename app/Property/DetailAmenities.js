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
  YellowBox
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
  Label
} from "native-base";

import { Actions } from "react-native-router-flux";
import Carousel, {
  Pagination,
  ParallaxImage
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
const itemHorizontalMargin = wp(4);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

class DetailAmenities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amenitis_title: "",
      amenitis_info: "",
      amenitis_url: ""
      // gallery_1: require("@Asset/images/amenitis/dining/gallery1.jpg")
      // require("@Asset/images/project_suite_urban.jpg")
    };

    console.log("props", props);

    // this.renderItemNews = this.renderItemNews.bind(this);
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    Actions.refresh({ backTitle: () => this.props.title });

    const data = {
      group: await _getData("@Group"),
      hd: new Headers({
        Token: await _getData("@Token")
      })
    };
    console.log("dataIm", data);

    isMount = true;

    this.setState(data, () => {
      this.getDataAminities();

      // this.goTo()
    });
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

  getDataAminities = () => {
    const stat = this.props.stat;
    console.log("stat", stat);
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
              item.project_no +
              "/" +
              stat,
            {
              method: "GET",
              headers: this.state.hd
            }
          )
            .then(response => response.json())
            .then(res => {
              if (!res.Error) {
                const resData = res.Data;
                console.log(resData);
                this.setState({ amen: resData });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  alert(res.Pesan);
                });
              }
              console.log("amenitis", res);
            })
            .catch(error => {
              console.log(error);
            })
        : null;
    }
  };

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
            backgroundColor={Colors.statusBarNavy}
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

          <ScrollView>
            {/* <View>
              <Image source={this.state.gallery_1}></Image>
            </View> */}
            <View>
              <Text>t</Text>
            </View>
          </ScrollView>
        </ImageBackground>
        {/* <FooterTabsIconText /> */}
      </Container>
    );
  }
}

export default DetailAmenities;
