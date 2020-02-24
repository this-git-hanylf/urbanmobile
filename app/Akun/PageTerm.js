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
  NativeModules,
  PermissionsAndroid
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
  Textarea,
  Picker,
  Col
} from "native-base";
import RNFetchBlob from "rn-fetch-blob";
import { Actions } from "react-native-router-flux";
import ParallaxScroll from "@monterosa/react-native-parallax-scroll";

import { Style, Colors, Fonts } from "../Themes";
import Styles from "./Style2";

import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import moment from "moment";
import Pdf from "react-native-pdf";

const DocumentInteractionController =
  NativeModules.RNDocumentInteractionController;

let isMount = false;
// create a component
class PageTerm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: null,
      page: 1,
      files: [],
      user: "",
      name: "",
      project: [],
      selected: "",
      file_url: ""
      // uri: '',
      // uri: require('@Asset/images/pdf/T&C.pdf')
    };

    console.log("props pdf", props);
  }

  async componentDidMount() {
    const data = {
      // uri : this.props.datas.file_url
    };
    // const uri = this.props.item.file_url;
    console.log("uri", data);
  }

  // downloadFile = () =>{
  //     const item  = this.props.item
  //     const android = RNFetchBlob.android
  //     RNFetchBlob
  //     .config({
  //         fileCache : true,
  //         addAndroidDownloads: {
  //             path: RNFetchBlob.fs.dirs.SDCardDir +'/downloads/'+item.descs+'.pdf',
  //             useDownloadManager: true,
  //             notification: true,
  //             overwrite: true,
  //             description: 'downloading content...',
  //             mime: 'application/pdf',
  //             mediaScannable: true
  //         }
  //     })
  //     .fetch('GET', item.url)
  //     .then((res) => {
  //         console.log('The file saved to ', res.path())
  //         alert('Saved at : '+res.path())
  //         // android.actionViewIntent(res.path(), 'application/pdf')
  //         // android.actionViewIntent(RNFetchBlob.fs.dirs.SDCardDir +'/Download/laporan.pdf','application/pdf')
  //     })
  // }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    // const source = {uri:require('@Asset/images/pdf/T&C.pdf'),cache:true};
    // console.log('uri', this.state.uri);
    return (
      <Container style={Style.bgMain}>
        <Header style={[Style.navigation, { backgroundColor: "#fff" }]}>
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
                style={{ color: Colors.blueUrban }}
                type="MaterialCommunityIcons"
              />
            </Button>
          </View>
          <View style={Style.actionBarMiddle}>
            <Text style={Style.actionBarText}>tes</Text>
          </View>
          <View style={Style.actionBarRight} />
        </Header>

        {/* <Pdf
                        
                        // source={source}
                        source={require('@Asset/images/pdf/T&C.pdf')}
                        onLoadComplete={(numberOfPages,filePath)=>{
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page,pageCount)=>{
                            console.log('ok');
                        }}
                        onError={(error)=>{
                            console.log(error);
                        }}
                        style={Styles.pdf}/> */}
      </Container>
    );
  }
}

// define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     },
//     buttonUpload: {
//         alignItems: 'center',
//         backgroundColor: 'white',
//         padding: 10,
//         borderRadius: 10,
//         height: 80,
//     },
//     pdf: {
//         flex:1,
//         width:Dimensions.get('window').width,
//         backgroundColor : '#333'
//     }

// });

//make this component available to the app
export default PageTerm;
