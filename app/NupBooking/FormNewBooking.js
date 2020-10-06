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

import { Style, Colors, Fonts } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from "@Component/numFormat";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
// import ImageViewer from 'react-native-image-zoom-viewer';
import ImageResizer from "react-native-image-resizer";

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get("window");
let isMount = false;

class FormNewBooking extends React.Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      Alert_Visibility: false,
      pesan: "",
      isLoaded: true,
      nik: "",
      fullname: "",
      mobilephone: "",
      email: "",
    };
    // console.log()
    isMount = true;
  }

  async componentDidMount() {
    isMount = true;

    const data = {
      projectdesc: this.props.items.projectdesc,
    };
    console.log("data", data);

    this.setState(data, () => {
      //   this.getDataFromNik();
    });
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  validating = (validationData) => {
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
                letterSpacing: 1,
              }}
              // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
            >
              FORM BOOKING UNIT
            </Text>
            <Text
              style={{
                // fontWeight: "900",
                color: Colors.goldUrban,
                fontSize: 13,
                textAlign: "center",
                fontFamily: Fonts.type.proximaNovaBold,
                letterSpacing: 1,
              }}
            >
              {this.state.projectdesc}
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 40 }}>
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
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.goldUrban,
                      height: 40,
                      width: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      this.alertFillBlank(!this.state.Alert_Visibility);
                      this.setState({ isLoaded: this.state.isLoaded });
                      console.log("isloading ok", this.state.isLoaded);
                    }}
                    // activeOpacity={0.7}
                  >
                    <Text style={{ color: Colors.white }}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View style={{ paddingBottom: 10, marginTop: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                NIK
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                NIK
              </Label> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
              <Input
                placeholder="NIK"
                // autoCapitalize="numeric"
                keyboardType="numeric"
                placeholderTextColor={"#c2c2c2"}
                // placeholderFontSize={10}
                // value={this.state.nik}
                // onChangeText={(val) => this.setState({ nik: val })}
                // onChangeText={val => this.getNik({ val })}
                style={Styles.positionTextInput}
                ref="nik"
              />

              {this.state.errornik ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}
              {/* <Icon name='close-circle' /> */}
            </Item>
            {this.state.loadingnik == true ? (
              <ActivityIndicator
                style={{
                  bottom: 20,
                  fontSize: 25,
                  position: "absolute",
                  right: 20,
                }}
              />
            ) : (
              <Icon
                style={{
                  color: Colors.greyUrban,
                  bottom: 20,
                  fontSize: 25,
                  position: "absolute",
                  right: 20,
                }}
                name="search"
                // onPress={() => this.cariNIK({ carinik: this.state.nik })}
              />
            )}

            {/* <Text
              style={{
                position: "absolute",
                bottom: 3,
                left: 15,
                color: "red",
                fontSize: 12
              }}
            >
              NIK Required
            </Text> */}
            {this.state.errornik ? (
              <Text style={Styles.text_error}>NIK Required</Text>
            ) : null}
          </View>

          <View style={{ paddingBottom: 10, marginTop: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                Full Name
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Full Name
              </Label> */}
              {/* <Label>customer</Label> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
              <Input
                placeholder="Full Name"
                // editable={true}
                autoCapitalize="words"
                placeholderTextColor={"#c2c2c2"}
                // placeholderStyle={{ paddingLeft: 20 }}
                value={this.state.fullname}
                onChangeText={(val) => this.setState({ fullname: val })}
                style={Styles.positionTextInput}
                ref="fullname"
                // textAlign={"right"}
              />

              {this.state.errorfullname ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}

              {/* <Icon name='close-circle' /> */}
            </Item>
            {this.state.fullname ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}

            {/* <Text>(customer)</Text> */}
            {this.state.errorfullname ? (
              <Text style={Styles.text_error}>Full Name Required</Text>
            ) : null}
          </View>

          <View style={{ paddingBottom: 10, marginTop: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                Mobile Phone
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Mobile Phone
              </Label> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
              <Input
                placeholder="Mobile Phone"
                // autoCapitalize="numeric"
                keyboardType="numeric"
                placeholderTextColor={"#c2c2c2"}
                value={this.state.mobilephone}
                onChangeText={(val) => this.setState({ mobilephone: val })}
                style={Styles.positionTextInput}
                ref="mobilephone"
              />
              {this.state.errormobilephone ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}
              {/* <Icon name='close-circle' /> */}
            </Item>
            {this.state.mobilephone ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}
            {this.state.errormobilephone ? (
              <Text style={Styles.text_error}>Mobile Phone Required</Text>
            ) : null}
          </View>

          <View style={{ paddingBottom: 10, marginTop: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                Email
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Email
              </Label> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
              <Input
                placeholder="Email"
                autoCapitalize="words"
                placeholderTextColor={"#c2c2c2"}
                value={this.state.email}
                onChangeText={(val) => this.setState({ email: val })}
                style={Styles.positionTextInput}
                ref="email"
              />
              {this.state.erroremail ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}
              {/* <Icon name='close-circle' /> */}
            </Item>
            {this.state.email ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}
            {this.state.erroremail ? (
              <Text style={Styles.text_error}>Email Required</Text>
            ) : null}
          </View>

          <View>
            <View
              style={{ paddingTop: 50 }}
              pointerEvents={this.state.isLoaded ? "auto" : "none"}
            >
              <Button
                style={Styles.btnMedium}
                onPress={() => this.submit()}
                // disabled={!this.state.capt}
              >
                {/* {!this.state.isLoaded ? (
                  <ActivityIndicator color="#fff" />
                ) : (
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
                    Next
                  </Text>
                )} */}
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
                  Next
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

//make this component available to the app
export default FormNewBooking;
