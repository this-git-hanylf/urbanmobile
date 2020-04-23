import React from "react";
import {
  StatusBar,
  Alert,
  ActionSheetIOS,
  WebView,
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
  ActivityIndicator,
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
  Accordion,
  View,
  FooterTab,
  Badge,
  List,
  ListItem,
  Tab,
  Tabs,
  Picker,
} from "native-base";

import NavigationService from "@Service/Navigation";

import Styles from "./Style";
import Icons from "react-native-vector-icons/FontAwesome";
import { urlApi } from "@Config/services";
import { Actions } from "react-native-router-flux";
import {
  _storeData,
  _getData,
  _getAllData,
  _removeData,
} from "@Component/StoreAsync";
import { Style, Colors, Fonts } from "../Themes/";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import DeviceInfo from "react-native-device-info";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Alert_Visibility: true,
      pesan: "",
      isLoaded: true,
      gender: null,
      email: "",
      name: "",
      group: "",
      userId: "",
      token: "",
      gender: "",
      hp: "",

      newPass: "",
      curPass: "",
      conPass: "",

      dataProfile: [],
      fotoProfil: require("@Asset/images/1.png"),
      fotoHeader: require("@Asset/images/header.png"),
      password: "",
    };

    this.renderAccordionHeader = this.renderAccordionHeader.bind(this);
    this.renderAccordionContent = this.renderAccordionContent.bind(this);
    this.renderAccordionContentBasic = this.renderAccordionContentBasic.bind(
      this
    );
    this.renderAccordionContentSocial = this.renderAccordionContentSocial.bind(
      this
    );
  }

  async componentDidMount() {
    const data = {
      email: await _getData("@User"),
      userId: await _getData("@UserId"),
      name: await _getData("@Name"),
      group: await _getData("@Group"),
      token: await _getData("@Token"),
      hp: await _getData("@Handphone"),
    };

    this.setState(data, () => {
      this.getProfile();
    });
  }

  componentWillUnmount() {
    this.props.onBack();
  }

  getProfile = () => {
    fetch(
      urlApi +
        "c_profil/getData/IFCAMOBILE/" +
        this.state.email +
        "/" +
        this.state.userId,
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
        const resData = res.Data[0];

        // ? Agar Gambar Tidak ter cache
        let url = resData.pict + "?random_number=" + new Date().getTime();
        let urlHeader =
          resData.pict_header + "?random_number=" + new Date().getTime();
        this.setState({
          dataProfile: resData,
          fotoProfil: { uri: url },
          // pass_nih: resData.password,
          // fotoHeader:{uri:urlHeader},
          gender: resData.gender,
        });
        console.log("res Profil", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  save = () => {
    this.setState({ isLoaded: !this.state.isLoaded });
    const { email, name, hp, gender } = this.state;

    const formData = {
      UserName: email,
      Name: name,
      Handphone: hp,
      Gender: gender,
      wherename: name,
      // cpassword: curPass
    };

    console.log("save data", formData);

    fetch(urlApi + "c_profil/save/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          this.setState({ isLogin: true }, () => {
            this.changePass();
            alert(res.Pesan);
            _storeData("@Name", name);
            _storeData("@Handphone", hp);
            _storeData("@ProfileUpdate", true);
            // this.changePass();
          });
        } else {
          // this.setState({ isLoaded: this.state.isLoaded }, () => {
          alert(res.Pesan);
          // console.log('url',this.state.pickUrlKtp.uri)
          // });
        }

        console.log("save profile", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changePassPress = () => {
    const { newPass, curPass, conPass } = this.state;

    if (newPass != "" && curPass != "" && conPass != "") {
      if (newPass == conPass) {
        this.changePass();
      } else {
        alert("Password does not match");
      }
    } else {
      alert("Password can not be null");
    }
  };

  changePass = () => {
    this.setState({ isLoaded: !this.state.isLoaded });
    const { email, newPass, curPass } = this.state;

    const formData = {
      email: email,
      password: newPass,
      cpassword: curPass,
    };
    console.log("form ganti pas", formData);

    fetch(urlApi + "c_profil/changePassReact/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        alert(res.Pesan);
        console.log("save profile", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderAccordionHeader(item, expanded) {
    return (
      <View style={Styles.accordionTab}>
        <Text style={Styles.accordionTabText}> {item.title}</Text>
        {expanded ? (
          <Icon
            style={Styles.accordionTabIcon}
            name="minus"
            type="Foundation"
          />
        ) : (
          <Icon style={Styles.accordionTabIcon} name="plus" type="Foundation" />
        )}
      </View>
    );
  }
  renderAccordionContent(item) {
    var fn =
      "renderAccordionContent" +
      (item.type.charAt(0).toUpperCase() + item.type.substr(1));
    return <View style={Styles.accordionContent}>{this[fn]()}</View>;
  }
  renderAccordionContentBasic() {
    let { gender, name, email, hp, group } = this.state;

    return (
      <View>
        <TextInput
          style={Styles.textInput}
          placeholder={"Email"}
          value={email}
        />
        <TextInput
          style={Styles.textInput}
          placeholder={"Group"}
          value={group}
        />
        <TextInput
          style={Styles.textInput}
          placeholder={"First Name"}
          value={name}
          onChangeText={(val) => {
            this.setState({ name: val });
          }}
        />
        {Platform.OS == "ios" ? (
          <TouchableOpacity onPress={() => this.showActionSheet()}>
            <View pointerEvents="none">
              <TextInput
                style={Styles.textInput}
                placeholder={"Gender"}
                value={gender}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{ paddingHorizontal: 12 }}>
            <Picker
              placeholder="Gender"
              selectedValue={this.state.gender}
              onValueChange={(val) => this.setState({ gender: val })}
              textStyle={{ fontSize: 12 }}
            >
              <Item label="Male" value="Male" />
              <Item label="Female" value="Female" />
            </Picker>
          </View>
        )}

        <TextInput
          style={Styles.textInput}
          placeholder={"Handphone"}
          value={hp}
          onChangeText={(val) => {
            this.setState({ hp: val });
          }}
        />
        {/* <TextInput style={Styles.textInputMulti} multiline={true} numberOfLines={8} placeholder={'About You'} /> */}
        <Button
          style={Styles.btn}
          onPress={() => {
            this.save();
          }}
        >
          <Text style={Styles.formBtnText}>{"Save".toUpperCase()}</Text>
          <Icon
            active
            name="arrow-right"
            type="FontAwesome5"
            style={Styles.formBtnIcon}
          />
        </Button>
      </View>
    );
  }
  renderAccordionContentSocial() {
    return (
      <View>
        <TextInput
          style={Styles.textInput}
          placeholder={"Current Password"}
          onChangeText={(val) => this.setState({ curPass: val })}
          value={this.state.curPass}
        />
        <TextInput
          style={Styles.textInput}
          placeholder={"New Password"}
          onChangeText={(val) => this.setState({ newPass: val })}
          value={this.state.newPass}
        />
        <TextInput
          style={Styles.textInput}
          placeholder={"Confirm Password"}
          onChangeText={(val) => this.setState({ conPass: val })}
          value={this.state.conPass}
        />
        <Button
          style={Styles.btn}
          onPress={() => {
            this.changePassPress();
          }}
        >
          <Text style={Styles.formBtnText}>{"Save".toUpperCase()}</Text>
          <Icon
            active
            name="arrow-right"
            type="FontAwesome5"
            style={Styles.formBtnIcon}
          />
        </Button>
      </View>
    );
  }

  signOut = async () => {
    const formData = {
      email: this.state.email,
      ipAddress: await DeviceInfo.getIPAddress().then((mac) => mac),
      device: Platform.OS,
    };

    fetch(urlApi + "c_auth/Logout/" + this.state.email, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        // alert(res.Pesan);
        // const pesan = res.Pesan;
        // this.alertFillBlank(true, pesan);
        console.log("save profile", res);
      })
      .catch((error) => {
        console.log(error);
      });

    const data = await _getAllData();
    data.map((val) => {
      if (val != "@isIntro") {
        _removeData(val);
      }
    });
    Actions.reset("Login");
  };

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  showAlert = () => {
    Alert.alert(
      "Select a Photo",
      "Choose the place where you want to get a photo",
      [
        { text: "Gallery", onPress: () => this.fromGallery() },
        { text: "Camera", onPress: () => this.fromCamera() },
        {
          text: "Cancel",
          onPress: () => console.log("User Cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  fromCamera() {
    ImagePicker.openCamera({
      cropping: true,
      width: 200,
      height: 200,
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ fotoProfil: { uri: image.path } }, () =>
          this.uploadPhoto()
        );
      })
      .catch((e) => console.log("tag", e));
  }

  fromGallery(cropping, mediaType = "photo") {
    ImagePicker.openPicker({
      multiple: false,
      width: 200,
      height: 200,
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ fotoProfil: { uri: image.path } }, () =>
          this.uploadPhoto()
        );
      })
      .catch((e) => console.log("tag", e));
  }

  uploadPhoto = async () => {
    let fileName = "profile.png";
    let fileImg = RNFetchBlob.wrap(
      this.state.fotoProfil.uri.replace("file://", "")
    );

    RNFetchBlob.fetch(
      "POST",
      urlApi + "/c_profil/upload/" + this.state.email,
      {
        "Content-Type": "multipart/form-data",
        Token: this.state.token,
      },
      [{ name: "photo", filename: fileName, data: fileImg }]
    ).then((resp) => {
      let res = JSON.stringify(resp.data);
      console.log("res", resp);
      _storeData("@ProfileUpdate", true);
    });
  };

  logout = () => {
    // Alert.alert(
    //   "",
    //   "Are you want to Logout",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     { text: "OK", onPress: () => this.signOut() }
    //   ],
    //   { cancelable: false }
    // );
    const pesan = "Are you want to Logout?";
    this.alertFillBlank(true, pesan);
  };

  showActionSheet() {
    const data = ["Cancel", "Male", "Female"];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: data,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
          this.setState({ gender: data[buttonIndex] });
        }
      }
    );
  }

  render() {
    let { fotoProfil, fotoHeader } = this.state;

    return (
      <Container style={Style.bgMain}>
        <ImageBackground
          style={Styles.backgroundImage}
          source={require("../Images/background-blue.png")}
        >
          <StatusBar
            backgroundColor="transparent"
            animated
            barStyle="light-content"
          />

          <View style={{ top: 25, paddingBottom: 60 }}>
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
                  style={{ color: "#fff" }}
                  type="MaterialCommunityIcons"
                />
              </Button>
            </View>

            <View>
              <Text
                style={{
                  fontWeight: "900",
                  color: Colors.goldUrban,
                  fontSize: 14,
                  textAlign: "center",
                  fontFamily: Fonts.type.proximaNovaBold,
                  letterSpacing: 1,
                }}
                // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
              >
                PROFILE SETTING
                {/* {this.state.projectdesc} */}
              </Text>
            </View>
          </View>

          <Content
            style={Style.layoutInner}
            contentContainerStyle={Style.layoutContent}
          >
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

            {/* <View style={[Styles.back, Style.actionBarIn]}>
              <Button
                transparent
                style={Style.actionBarBtn}
                onPress={() => {
                  Actions.pop();
                }}
              >
                <Icon
                  active
                  name="arrow-left"
                  style={Style.textWhite}
                  type="MaterialCommunityIcons"
                />
              </Button>
            </View> */}

            <View style={Styles.profile}>
              <View style={Styles.bgBlue}></View>
              <View style={[Styles.owner, Style.actionBarIn]}>
                <View style={Styles.ownerBg}>
                  <Image source={fotoProfil} style={Styles.ownerAvatarImg} />
                  {/* <Icons
                    name="camera"
                    onPress={() => this.showAlert()}
                    style={Styles.iconEdit}
                  /> */}
                </View>

                {/* <View style={Styles.ownerInfo}>
                  <Text style={Styles.ownerName}>{this.state.name}</Text>
                  <Text style={Styles.ownerLocation}>{this.state.group}</Text>
                </View> */}
                <View style={{ top: 25 }}>
                  <TouchableOpacity onPress={() => this.showAlert()}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 12,
                        fontFamily: "Montserrat-Regular",
                        borderBottomColor: "#fff",
                        borderWidth: 1,
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderLeftWidth: 0,
                      }}
                    >
                      Change Profile Picture
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 40,
                alignItems: "flex-end",
                marginBottom: 10,
                // width: "100%"
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  width: "30%",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "Montserrat-Regular",
                    fontSize: 12,
                  }}
                >
                  Name
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", width: "70%" }}>
                <TextInput
                  editable={false}
                  style={Styles.textInput}
                  placeholder={"First Name"}
                  placeholderTextColor={Colors.greyUrban}
                  value={this.state.name}
                  onChangeText={(val) => {
                    this.setState({ name: val });
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 40,
                alignItems: "flex-end",
                marginBottom: 10,
                // width: "100%"
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  width: "30%",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "Montserrat-Regular",
                    fontSize: 12,
                  }}
                >
                  Position
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", width: "70%" }}>
                <TextInput
                  editable={false}
                  style={Styles.textInput}
                  placeholder={"Position"}
                  placeholderTextColor={Colors.greyUrban}
                  value={this.state.group}
                  onChangeText={(val) => {
                    this.setState({ group: val });
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 40,
                alignItems: "flex-end",
                marginBottom: 10,
                // width: "100%"
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  width: "30%",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "Montserrat-Regular",
                    fontSize: 12,
                  }}
                >
                  Email
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", width: "70%" }}>
                <TextInput
                  editable={false}
                  style={Styles.textInput}
                  placeholder={"Email"}
                  value={this.state.email}
                  onChangeText={(val) => {
                    this.setState({ email: val });
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 40,
                alignItems: "flex-end",
                marginBottom: 10,
                // width: "100%"
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  width: "30%",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "Montserrat-Regular",
                    fontSize: 12,
                  }}
                >
                  Phone
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", width: "70%" }}>
                <TextInput
                  // editable={false}
                  style={Styles.textInput}
                  keyboardType="numeric"
                  placeholder={"Number Phone"}
                  placeholderTextColor={Colors.greyUrban}
                  value={this.state.hp}
                  onChangeText={(val) => {
                    this.setState({ hp: val });
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 40,
                alignItems: "flex-end",
                marginBottom: 10,
                // width: "100%"
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  width: "30%",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "Montserrat-Regular",
                    fontSize: 12,
                  }}
                >
                  Password
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", width: "70%" }}>
                <TextInput
                  style={Styles.textInput}
                  secureTextEntry={true}
                  placeholder={"New Password"}
                  placeholderTextColor={Colors.greyUrban}
                  onChangeText={(val) => this.setState({ curPass: val })}
                  value={this.state.curPass}
                />
              </View>
            </View>

            <View>
              <View
                style={{ paddingTop: 50 }}
                pointerEvents={this.state.isLoaded ? "auto" : "none"}
              >
                <Button style={Styles.btnMedium} onPress={() => this.save()}>
                  {!this.state.isLoaded ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text
                      style={{
                        width: "100%",
                        fontSize: 12,
                        alignItems: "center",
                        textAlign: "center",
                        fontFamily: Fonts.type.proximaNovaBold,
                        letterSpacing: 1,
                      }}
                    >
                      Save
                    </Text>
                  )}
                </Button>
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
