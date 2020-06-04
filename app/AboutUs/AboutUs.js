//import liraries
import React from "react";
import {
  StatusBar,
  ActivityIndicator,
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
  ListView,
  Alert,
  Clipboard,
  // Picker
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
  Picker,
  Col,
  ListItem,
  Label,
} from "native-base";

// import NavigationService from "@Service/Navigation";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts } from "../Themes";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from "@Component/numFormat";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import moment from "moment";
// import ImageViewer from 'react-native-image-zoom-viewer';

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get("window");
let isMount = false;

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // console.log()
    isMount = true;

    // this.showAlert = this.showAlert.bind(this);
  }

  async componentDidMount() {
    isMount = true;

    const data = {};
    console.log("data", data);

    this.setState(data, () => {});
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
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
        <View style={{ top: 25, paddingBottom: 35 }}>
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
                style={{ color: Colors.navyUrban }}
                type="MaterialCommunityIcons"
              />
            </Button>
          </View>
        </View>

        <View style={{ flex: 1, textAlign: "justify" }}>
          <ScrollView style={{ height: "100%", textAlign: "justify" }}>
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
                ABOUT US
                {/* {this.state.projectdesc} */}
              </Text>

              {/* <Text>{jam}:{menit}</Text> */}
            </View>
            <View>
              <Image
                source={require("../Images/logo4.png")}
                style={Styles.styleLogo}
              >
                {/* <Image source={require("../Images/logo.png")} style={Styles.styleLogo} > */}
              </Image>
              {/* <Text>tes</Text> */}
            </View>

            <View
              style={{
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 20,
                height: "100%",
                textAlign: "justify",
                width: "100%",
              }}
            >
              <Text style={Styles.textContact}>
                The Company was originally established under the name of PT
                Samsung Development on May 9, 1995 as stated in the Deed of
                Establishment made in the presence of Notary Sinta Susikto, S.H.
                based on Deed No. 62 dated May 9th, 1995 and Decree of the
                Minister of Justice with Decree No. C2-15301.HT.01.01.TH.95
                dated November 24th, 1995. On December 23rd, 2016, PT Samsung
                Development changed its name to PT Urban Jakarta Propertindo
                based on Deed No. 32 dated December 23rd, 2016 made in the
                presence of Notary Silvy Solivan, S.H, M.Kn. and Decree of the
                Ministry of Law and Human Rights with Decree No.
                AHU-0025502.AH.01.02 in 2016. The main business activities of
                the Company are both owned and leased real estate assets which
                focus on developing residential areas under TOD Concept.
              </Text>
              <Text style={Styles.textContact}>
                In its business activities, the Company develops and/or manages
                office areas, shopping centers and apartments that are
                integrated directly with mass transportation. In addition to the
                TOD concept, the Company will also develop one-stop-living
                concept on each of its project. This concept makes it easier for
                residents to meet their residential needs and no longer need to
                commute long distance to fulfill their household needs or to use
                sports and entertainment facilities. These two main concepts
                will be carried out by the Company to distinguish itself from
                other property developer and provide highly attractive value
                added to the community.
              </Text>
              {/* <Text style={Styles.textContact}>Jakarta Selatan, 12190</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                alignSelf: "center"
              }}
            >
              <Text style={[Styles.textContactBold, { paddingRight: 5 }]}>
                P.
              </Text>
              <Text style={Styles.textContact}>021 - 4011 1717</Text>
            </View>

            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text style={[Styles.textContactBold, { paddingRight: 5 }]}>
                E.
              </Text>
              <Text style={Styles.textContact}>sales@ujp.co.id</Text>
            </View> */}
            </View>
          </ScrollView>
        </View>
      </Container>
    );
  }
}

//make this component available to the app
export default AboutUs;
