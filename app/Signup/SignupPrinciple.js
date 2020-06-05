//import react in project
import React from "react";
import {
  PermissionsAndroid,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  StyleSheet,
  Alert,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title,
  ListItem,
  Textarea,
  Picker,
  Label,
  // CheckBox
} from "native-base";
import { SearchBar } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import { Style, Colors, Metrics, Fonts } from "../Themes";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";

let isMount = false;
const userType = [
  {
    key: 1,
    label: "Inhouse",
    value: "I",
  },
  {
    key: 2,
    label: "Member",
    value: "M",
  },
];

class SignupPrinciple extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    // this.validateCaptchaCode = this.validateCaptchaCode(this);
    // this.handleBuy = this.handleBuy.bind(this);

    this.state = {
      Alert_Visibility: false,
      pesan: "",
      Alert_Visibility_captcha: false,
      pesan_captcha: "",
      checked: false,
      checked_imnot: false,
      dataProject: [],
      isLoaded: true,

      email: "",
      agencyname: "",
      companyname: "",
      address: "",
      npwp: "",
      bank_name: "",
      acc_name: "",
      acc_no: "",
      getLeadCode: [],

      contactperson: "",
      contactno: "",

      pictUrlKtp: "",
      pictUrlNPWP: "",
      pictUrlSIUP: "",
      pictUrlTDP: "",
      pictUrlDomisili: "",
      pictUrlAktePendirian: "",

      selectedProject: [],

      search: "",
      modalVisible: false,
      _agencyname: "",
      lead_cd: "",
      lead_name: "",
      title: "I have read and accept the terms & conditions",
      files: [],

      textInputHolder: 0,
      captchaHolder: 0,
      randomNumberOne: 0,
      capt: false,
      officephone: "",
    };
    // console.log('statte', this.state.title);
  }

  componentDidMount() {
    console.disableYellowBox = true;
    const data = {
      contactperson: this.props.datas_dari_regist.fullname,
      email: this.props.datas_dari_regist.email,
      contactno: this.props.datas_dari_regist.hp,
      lead_cd: this.props.datas_dari_regist.code,
      lead_name: this.props.resData[0].group_name,
    };
    console.log("email", data.email);
    console.log("data dari regis", data);
    console.log("value lead", data.lead_cd);
    console.log("lead_name", data.lead_name);
    this.setState(data, () => {
      // this.getDataListProspect(this.props.datas)
      this.getLeadCd();
      // this.getProject2();
      this.getFile();
      this.generateCaptcha();
      // this.getDataFollowUp(this.props.datas)
      // this.getStatus()
    });

    isMount = true;
    // this.getPDF()

    // const { email } = this.state.email;
    // console.log("email",email);
    console.log("statte", this.state.title);
  }

  handleCheck() {
    this.setState({ checked: !this.state.checked });
    // Actions.pagePDF();
    // Actions.pagePDF({item : item})
  }

  getFile = () => {
    fetch(urlApi + "c_termcondition/getTermCondition/IFCAMOBILE", {
      method: "GET",
      // headers : this.state.hd,
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;
          this.setState({ files: resData });
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            alert(res.Pesan);
          });
        }
        console.log("getFiles", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  downloadFile(val) {
    // const android = RNFetchBlob.android
    console.log("donload item", val);
    Actions.pagePDF({ item: val });
    this.setState({ click: true });
  }

  // handleBuy(){
  //     Actions.NUPPay({nup : this.props.nup});
  // }

  showAlert = (key) => {
    Alert.alert(
      "Select a Photo",
      "Choose the place where you want to get a photo",
      [
        { text: "Gallery", onPress: () => this.fromGallery(key) },
        { text: "Camera", onPress: () => this.fromCamera(key) },
        {
          text: "Cancel",
          onPress: () => console.log("User Cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  fromCamera(key) {
    ImagePicker.openCamera({
      cropping: true,
      width: 600,
      height: 500,
      compressImageQuality: 0.7,
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 500,
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path } });
      })
      .catch((e) => console.log("tag", e));
  }

  fromGallery(key) {
    ImagePicker.openPicker({
      multiple: false,
      width: 600,
      height: 500,
      compressImageQuality: 0.7,
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 500,
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path } });
      })
      .catch((e) => console.log("tag", e));
  }

  getLeadCd = () => {
    // const item = this.props.items
    fetch(urlApi + "c_principal/zoomLeadCode/IFCAPB/", {
      method: "GET",
      // headers : this.state.hd,
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;
          resData.map((data) => {
            this.setState((prevState) => ({
              getLeadCode: [
                ...prevState.getLeadCode,
                { label: data.lead_name, value: data.lead_cd },
              ],
            }));
          });
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            alert(res.Pesan);
          });
        }
        console.log("leadcd", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  modalBankMaster() {
    Actions.modalBankMaster();
  }
  componentWillReceiveProps(props) {
    // props dari B
    const itemBank = props.itemBank; // props dari B
    console.log("props getback", itemBank);
    if (itemBank) {
      this.setState({ bank_name: itemBank.value });
      // console.log('principle_cd', principle_cd);

      // this.CallFunction();
      // console.log("TEST 111");
    }

    // props dari C
    // const itemCode = props.itemCode; // props dari C
    // console.log('props getback',itemCode);
    // if(itemCode){
    //     this.setState({code: itemCode.value});
    //     // console.log('principle_cd', principle_cd);

    //     // this.CallFunction();
    //     // console.log("TEST 111");
    // }
  }

  submit = () => {
    this.setState({ isLoaded: !this.state.isLoaded });
    // const { email } = this.state.email;
    // console.log("email",email);

    //-----KETIKA PAKE REQUIRED ------//
    // let filektp = RNFetchBlob.wrap(
    //     this.state.pictUrlKtp.uri.replace("file://", "")
    // );
    // let filenpwp = RNFetchBlob.wrap(
    //     this.state.pictUrlNPWP.uri.replace("file://", "")
    // );
    // let filesiup = RNFetchBlob.wrap(
    //     this.state.pictUrlSIUP.uri.replace("file://", "")
    // );
    // let filetdp = RNFetchBlob.wrap(
    //     this.state.pictUrlTDP.uri.replace("file://", "")
    // );
    // let filedomisili = RNFetchBlob.wrap(
    //     this.state.pictUrlDomisili.uri.replace("file://", "")
    // );
    // let fileakte = RNFetchBlob.wrap(
    //     this.state.pictUrlAktePendirian.uri.replace("file://", "")
    // );
    //----- TUTUP KETIKA PAKE REQUIRED ------//

    //-----KETIKA GAK PAKE REQUIRED ------//
    let filektp = "";
    if (this.state.pictUrlKtp.length == 0) {
      // console.log('replace',this.state.replaceFoto)
      filektp = "./img/noimage.png";
      console.log("pic nul", this.state.pictUrlKtp);
    } else {
      filektp = RNFetchBlob.wrap(
        this.state.pictUrlKtp.uri.replace("file://", "")
      );
      console.log("pic not nul", this.state.pictUrlKtp);
    }

    let filenpwp = "";
    if (this.state.pictUrlNPWP.length == 0) {
      // console.log('replace',this.state.replaceFoto)
      filenpwp = "./img/noimage.png";
      console.log("pic nul", this.state.pictUrlNPWP);
    } else {
      filenpwp = RNFetchBlob.wrap(
        this.state.pictUrlNPWP.uri.replace("file://", "")
      );
      console.log("pic not nul", this.state.pictUrlNPWP);
    }

    let filesiup = "";
    if (this.state.pictUrlSIUP.length == 0) {
      filesiup = "./img/noimage.png";
      console.log("pic nul", this.state.pictUrlSIUP);
    } else {
      filesiup = RNFetchBlob.wrap(
        this.state.pictUrlSIUP.uri.replace("file://", "")
      );
      console.log("pic nul", this.state.pictUrlSIUP);
    }

    let filetdp = "";
    if (this.state.pictUrlTDP.length == 0) {
      filetdp = "./img/noimage.png";
      console.log("pic nul", this.state.pictUrlTDP);
    } else {
      filetdp = RNFetchBlob.wrap(
        this.state.pictUrlTDP.uri.replace("file://", "")
      );
      console.log("pic nul", this.state.pictUrlTDP);
    }

    let fileakte = "";
    if (this.state.pictUrlAktePendirian.length == 0) {
      fileakte = "./img/noimage.png";
      console.log("pic nul", this.state.pictUrlAktePendirian);
    } else {
      fileakte = RNFetchBlob.wrap(
        this.state.pictUrlAktePendirian.uri.replace("file://", "")
      );
      console.log("pic nul", this.state.pictUrlAktePendirian);
    }

    //----- TUTUP KETIKA GAK PAKE REQUIRED ------//

    // const valid_domisili = this.state.pictUrlDomisili.uri;
    // console.log('url domisili',this.state.pictUrlDomisili);

    // if (valid_domisili == 0 && valid_domisili == ''){

    // }

    const {
      email,
      agencyname,
      companyname,
      address,
      npwp,
      bank_name,
      acc_name,
      acc_no,
      contactperson,
      contactno,
      lead_cd,
      lead_name,
      officephone,
      // code,
      // lead_name,
      // getLeadCode,
      // pictUrlDomisili
    } = this.state;

    const frmData = {
      // group_type: selectedType,

      email: email,
      agencyname: agencyname,
      companyname: companyname,
      address: address,
      npwp: npwp,
      bank_name: bank_name,
      acc_name: acc_name,
      acc_no: acc_no,

      contactperson: contactperson,
      contactno: contactno,

      pictUrlKtp: filektp,
      pictUrlNPWP: filenpwp,
      pictUrlSIUP: filesiup,
      pictUrlTDP: filetdp,
      // pictUrlDomisili: filedomisili,
      pictUrlAktePendirian: fileakte,
      // lead_cd: code
      lead_cd: lead_cd,
      lead_name: lead_name,
      officephone: officephone,
      // lead_name: lead_name[0].label
      // lead_name: getLeadCode[0].lead_name,
    };

    const isValid = this.validating({
      email: { require: true },
      agencyname: { require: true },
      companyname: { require: true },
      address: { require: true },
      // npwp: { require: true },
      bank_name: { require: true },
      acc_name: { require: true },
      acc_no: { require: true },
      contactperson: { require: true },
      contactno: { require: true },
      // lead_cd: { require: true }
      // filedomisili: { require: true}
      // address: { require: true },
      // selectedType: { require: true },
      // selectedProject: { require: true }
    });
    const _agencyname = agencyname.replace(/\s+/g, "_");

    // KALO REQUIRED FOTO
    // let fileNameKtp = "KTP_RegisPrincipal_"+_agencyname+".png";
    // let fileNameNpwp = "NWPW_RegisPrincipal_"+_agencyname+".png";
    // let fileNameSIUP = "SIUP_RegisPrincipal_"+_agencyname+".png";
    // let fileNameTDP = "TDP_RegisPrincipal_"+_agencyname+".png";
    // // let fileNameDomisili = "Domisili_RegisPrincipal_"+_agencyname+".png";
    // let fileNameAktePendirian = "APPP_RegisPrincipal_"+_agencyname+".png";

    // KALO GAK REQUIRED FOTO
    let fileNameKtp = "";
    if (this.state.pictUrlKtp.length == 0) {
      console.log(this.state.pictUrlKtp.length);
      fileNameKtp = "./img/noimage.png";
    } else {
      fileNameKtp = "KTP_RegisPrincipal_" + _agencyname + ".png";
    }

    let fileNameNpwp = "";
    if (this.state.pictUrlNPWP.length == 0) {
      console.log(this.state.pictUrlNPWP.length);
      fileNameNpwp = "./img/noimage.png";
    } else {
      fileNameNpwp = "NWPW_RegisPrincipal_" + _agencyname + ".png";
    }

    let fileNameSIUP = "";
    if (this.state.pictUrlSIUP.length == 0) {
      console.log(this.state.pictUrlSIUP.length);
      fileNameSIUP = "./img/noimage.png";
    } else {
      fileNameSIUP = "SIUP_RegisPrincipal_" + _agencyname + ".png";
    }

    let fileNameTDP = "";
    if (this.state.pictUrlTDP.length == 0) {
      console.log(this.state.pictUrlTDP.length);
      fileNameTDP = "./img/noimage.png";
    } else {
      fileNameTDP = "TDP_RegisPrincipal_" + _agencyname + ".png";
    }

    let fileNameAktePendirian = "";
    if (this.state.pictUrlAktePendirian.length == 0) {
      console.log(this.state.pictUrlAktePendirian.length);
      fileNameAktePendirian = "./img/noimage.png";
    } else {
      fileNameAktePendirian = "APPP_RegisPrincipal_" + _agencyname + ".png";
    }

    console.log("saveFormNUP", frmData);

    // let fileName = "KTP_RegisAgent.png";
    // let fileImg = "";

    // console.log('url', fileNameDomisili);

    if (isValid) {
      // console.log('valid domisili', valid_domisili);
      // fileImg = RNFetchBlob.wrap(
      //     this.state.pictUrl.uri.replace("file://", "")
      // );

      RNFetchBlob.fetch(
        "POST",
        urlApi + "c_auth/SignUpPrinciple",
        {
          "Content-Type": "multipart/form-data",
        },
        [
          // { name: "photo", filename: fileName, data: fileImg },
          { name: "photoktp", filename: fileNameKtp, data: filektp },
          { name: "photonpwp", filename: fileNameNpwp, data: filenpwp },
          { name: "photosiup", filename: fileNameSIUP, data: filesiup },
          { name: "phototdp", filename: fileNameTDP, data: filetdp },
          // { name: "photodomisili", filename: fileNameDomisili, data: filedomisili},
          {
            name: "photoakte",
            filename: fileNameAktePendirian,
            data: fileakte,
          },
          { name: "data", data: JSON.stringify(frmData) },
        ]
      ).then((resp) => {
        // console.log("res_if", resp);
        const res = JSON.parse(resp.data);
        // let res = JSON.stringify(resp.data);
        console.log("res", resp);
        console.log("res", res);
        if (!res.Error) {
          // Actions.pop()
          this.setState({ isLogin: true }, () => {
            // alert(res.Pesan);

            const pesan = res.Pesan;
            this.alertFillBlank(true, pesan); // Actions.pop()
            Actions.Login();
          });
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            // alert(res.Pesan);
            const pesan = res.Pesan;
            this.alertFillBlank(true, pesan);
          });
        }
        // alert(res.Pesan);
      });
      // .then((response) => response.json())
    } else {
      const pesan = "Please fill the blank";
      this.alertFillBlank(true, pesan);
      // alert("Please assign your ID Picture");
    }
  };

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  alertFillBlank_captcha(visible, pesan_captcha) {
    this.setState({
      Alert_Visibility_captcha: visible,
      pesan_captcha: pesan_captcha,
    });
  }

  generateCaptcha = () => {
    // this.setState({ isLoaded: !this.state.isLoaded });
    // var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var numberOne = Math.floor(Math.random() * 1000000) + 1;
    // var numberOne = Math.floor(Math.random() * charsArray.length == 6) + 6;
    var captchaCode = numberOne;
    console.log("captcha", captchaCode);
    this.setState({ randomNumberOne: numberOne });
    this.setState({ captchaHolder: captchaCode });
  };

  validateCaptchaCode = () => {
    // this.setState({ isLoaded: !this.state.isLoaded });
    var temp = this.state.randomNumberOne;
    if (this.state.textInputHolder == temp) {
      //Captcha match
      this.setState({
        capt: this.state.textInputHolder,
        checked_imnot: !this.state.checked_imnot,
      });
      // this.setState({ checked: !this.state.checked_imnot });
      //   Alert.alert("Captcha Matched");
    } else {
      //Captcha not match
      // Alert.alert("Captcha not matched");
      const pesan_captcha = "Captcha not matched";
      this.alertFillBlank_captcha(true, pesan_captcha);
      // this.generateCaptcha();
    }
    // Calling captcha function, to generate captcha code
    // this.generateCaptcha();
  };

  titleCheckbox() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Text>I have read and accept </Text>
          <Text
            onPress={() => alert("terms")}
            style={{ textDecorationLine: "underline" }}
          >
            the terms & conditions
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const item = this.props.items;
    console.log("item apasih", item);
    return (
      <Container>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../Images/background-blue.png")}
        >
          <Header style={styles.header}>
            <Left style={styles.left}>
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
            <Body style={styles.body}>
              <Text style={[Style.textWhite, Style.textMedium]}>
                {"Sign Up as Principal"}
              </Text>
            </Body>
            <Right style={styles.right}></Right>
          </Header>
          <ScrollView
            contentContainerStyle={{ paddingVertical: 10 }}
            scrollEnabled={this.state.isLoaded ? true : false}
          >
            {/* <View
                            style={[
                                styles.inputFieldStyles,
                                { justifyContent: "flex-start" }
                            ]}
                        > */}
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
                    width: "80%",
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
                        this.generateCaptcha();
                        this.setState({ capt: !this.state.capt });
                        this.textInputHolder.clear();
                        this.setState({
                          checked_imnot: !this.state.checked_imnot,
                        });
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* MODAL ALERT CAPTCHA NOT Matched */}
            <Modal
              visible={this.state.Alert_Visibility_captcha}
              transparent={true}
              animationType={"slide"}
              onRequestClose={() => {
                this.alertFillBlank_captcha(
                  !this.state.Alert_Visibility_captcha,
                  pesan_captcha
                );
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
                    width: "80%",
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
                    {this.state.pesan_captcha}
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
                        this.alertFillBlank_captcha(
                          !this.state.Alert_Visibility_captcha
                        );
                        this.generateCaptcha();
                        // this.setState({ capt: !this.state.capt });
                        // this.textInputHolder.clear();
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            {/* TUTUP MODAL */}
            <View>
              <View style={{ paddingBottom: 20 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Item floatingLabel style={styles.marginround}>
                  <Label style={{ color: "#fff", fontSize: 14 }}>
                    Principle Name
                  </Label>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    // placeholder='Full Name'
                    autoCapitalize="words"
                    placeholderTextColor={"#666"}
                    value={this.state.agencyname}
                    onChangeText={(val) => this.setState({ agencyname: val })}
                    style={styles.positionTextInput}
                    ref="agencyname"
                  />
                  {this.state.erroragencyname ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon name='close-circle' /> */}
                </Item>
                {this.state.erroragencyname ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Agency Name Required
                  </Text>
                ) : null}
              </View>

              <View style={{ paddingBottom: 20 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Item floatingLabel style={styles.marginround}>
                  <Label style={{ color: "#fff", fontSize: 14 }}>
                    Principle Company Name
                  </Label>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    // placeholder='Full Name'
                    autoCapitalize="words"
                    placeholderTextColor={"#666"}
                    value={this.state.companyname}
                    onChangeText={(val) => this.setState({ companyname: val })}
                    style={styles.positionTextInput}
                    ref="companyname"
                  />
                  {this.state.errorcompanyname ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon name='close-circle' /> */}
                </Item>
                {this.state.errorcompanyname ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Company Name Required
                  </Text>
                ) : null}
              </View>

              <View style={{ paddingBottom: 20 }}>
                <Label style={{ color: "#fff", fontSize: 14, paddingLeft: 15 }}>
                  Principle Company Address
                </Label>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Textarea
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  style={styles.inputAddress}
                  // style={styles.positionTextInput}
                  value={this.state.address}
                  onChangeText={(val) => this.setState({ address: val })}
                  placeholder="Company Address"
                  editable={true}
                  placeholderTextColor={"#666"}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  autoCapitalize="words"
                  returnKeyType="next"
                  ref="address"
                  bordered
                ></Textarea>
                {this.state.erroraddress ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Address Required
                  </Text>
                ) : null}
              </View>
              <View style={{ paddingBottom: 20 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Item floatingLabel style={styles.marginround}>
                  <Label style={{ color: "#fff", fontSize: 14 }}>
                    Office Phone
                  </Label>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    // placeholder='Full Name'
                    keyboardType="numeric"
                    placeholderTextColor={"#666"}
                    value={this.state.officephone}
                    onChangeText={(val) => this.setState({ officephone: val })}
                    style={styles.positionTextInput}
                    ref="officephone"
                  />
                  {this.state.errorofficephone ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon name='close-circle' /> */}
                </Item>
                {/* {this.state.errorofficephone ? (<Text
                                        style={{
                                            position: "absolute",
                                            bottom:10,
                                            left: 15,
                                            color: "red",
                                            fontSize: 12
                                        }}
                                    >
                                        Office Phone Required
                                    </Text>) : null} */}
              </View>
              <View style={{ paddingBottom: 20 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Item floatingLabel style={styles.marginround}>
                  <Label style={{ color: "#fff", fontSize: 14 }}>
                    Company NPWP
                  </Label>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    // placeholder='Full Name'
                    keyboardType="numeric"
                    placeholderTextColor={"#666"}
                    value={this.state.npwp}
                    onChangeText={(val) => this.setState({ npwp: val })}
                    style={styles.positionTextInput}
                    ref="npwp"
                  />
                  {this.state.errornpwp ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon name='close-circle' /> */}
                </Item>
                {this.state.errornpwp ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Company NPWP Required
                  </Text>
                ) : null}
              </View>
              <View style={{ paddingBottom: 20 }}>
                <View
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <Text
                    style={[
                      styles.overviewTitles_Bank,
                      {
                        color: this.state.bank_name ? "#B0C6DA" : "#fff",
                      },
                    ]}
                  >
                    Bank Name
                  </Text>
                </View>
                <Item
                  style={styles.marginround}
                  onPress={() => this.modalBankMaster()}
                >
                  {/* <Label style={{color: "#fff", fontSize: 14}}>Bank Name</Label> */}
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    placeholder="Choose Bank"
                    editable={false}
                    placeholderTextColor={"#666"}
                    value={this.state.bank_name}
                    onChangeText={(val) => this.setState({ bank_name: val })}
                    style={[
                      styles.positionTextInput_Bank,
                      {
                        fontFamily: this.state.bank_name
                          ? Fonts.type.proximaNovaReg
                          : Fonts.type.proximaNovaBoldWeb,
                        fontWeight: this.state.bank_name ? "100" : "200",
                      },
                    ]}
                    ref="bank_name"
                  />
                  {this.state.errorbank_name ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon></Icon> */}
                  {/* <Icon name='close-circle' /> */}
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("@Asset/images/icon/dropdown.png")}
                  ></Image>
                </Item>
                {this.state.errorbank_name ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Bank Name Required
                  </Text>
                ) : null}
              </View>

              <View style={{ paddingBottom: 20 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Item floatingLabel style={styles.marginround}>
                  <Label style={{ color: "#fff", fontSize: 14 }}>
                    Bank Account Number
                  </Label>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    // placeholder='Full Name'
                    keyboardType="numeric"
                    placeholderTextColor={"#666"}
                    value={this.state.acc_no}
                    onChangeText={(val) => this.setState({ acc_no: val })}
                    style={styles.positionTextInput}
                    ref="acc_no"
                  />
                  {this.state.erroracc_no ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon name='close-circle' /> */}
                </Item>
                {this.state.erroracc_no ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Account Number Required
                  </Text>
                ) : null}
              </View>
              <View style={{ paddingBottom: 20 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Item floatingLabel style={styles.marginround}>
                  <Label style={{ color: "#fff", fontSize: 14 }}>
                    Bank Account Name
                  </Label>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    // placeholder='Full Name'
                    autoCapitalize="words"
                    placeholderTextColor={"#666"}
                    value={this.state.acc_name}
                    onChangeText={(val) => this.setState({ acc_name: val })}
                    style={styles.positionTextInput}
                    ref="acc_name"
                  />
                  {this.state.erroracc_name ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon name='close-circle' /> */}
                </Item>
                {this.state.erroracc_name ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Account Name Required
                  </Text>
                ) : null}
              </View>

              <View style={{ paddingBottom: 20 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Item floatingLabel style={styles.marginround}>
                  <Label style={{ color: "#fff", fontSize: 14 }}>
                    Contact Person
                  </Label>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    // placeholder='Full Name'
                    placeholderTextColor={"#666"}
                    value={this.state.contactperson}
                    onChangeText={(val) =>
                      this.setState({ contactperson: val })
                    }
                    style={styles.positionTextInput}
                    ref="contactperson"
                  />
                  {this.state.errorcontactperson ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon name='close-circle' /> */}
                </Item>
                {this.state.errorcontactperson ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Contact Person Required
                  </Text>
                ) : null}
              </View>
              <View style={{ paddingBottom: 20 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Item floatingLabel style={styles.marginround}>
                  <Label style={{ color: "#fff", fontSize: 14 }}>
                    Contact Number
                  </Label>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    // placeholder='Full Name'
                    keyboardType="numeric"
                    placeholderTextColor={"#666"}
                    value={this.state.contactno}
                    onChangeText={(val) => this.setState({ contactno: val })}
                    style={styles.positionTextInput}
                    ref="contactperson"
                  />
                  {this.state.errorcontactno ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon name='close-circle' /> */}
                </Item>
                {this.state.errorcontactno ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Contact Number Required
                  </Text>
                ) : null}
              </View>
              <View style={{ paddingBottom: 20 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                <Item floatingLabel style={styles.marginround}>
                  <Label style={{ color: "#fff", fontSize: 14 }}>Email</Label>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                  <Input
                    // placeholder='Full Name'
                    placeholderTextColor={"#666"}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    style={styles.positionTextInput}
                    ref="fullname"
                  />
                  {this.state.erroremail ? (
                    <Icon
                      style={{
                        color: "red",
                        bottom: 3,
                        position: "absolute",
                        right: 0,
                      }}
                      name="close-circle"
                    />
                  ) : null}
                  {/* <Icon name='close-circle' /> */}
                </Item>
                {this.state.erroremail ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    Email Required
                  </Text>
                ) : null}
              </View>
              {/* KTP  */}
              <View style={{ paddingTop: 25 }}>
                {this.state.pictUrlKtp == null ||
                this.state.pictUrlKtp == "" ? (
                  <Item
                    regular
                    style={[
                      { borderRadius: 5, width: Metrics.WIDTH * 0.92 },
                      styles.inputAttach,
                    ]}
                    onPress={() => this.showAlert("pictUrlKtp")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    {/* <View style={{width: Metrics.WIDTH * 0.92,
                                       
                                        // borderBottomLeftRadius: 15,
                                        // borderBottomRightRadius: 15,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        alignSelf: "center",
                                        elevation: 3
                                         }}> */}
                    <Text
                      style={[
                        styles.textAttach,
                        { width: Metrics.WIDTH * 0.92 },
                      ]}
                    >
                      Attach KTP
                    </Text>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                    {/* </View> */}
                  </Item>
                ) : (
                  <Item
                    regular
                    style={[{ borderRadius: 5 }, styles.inputAttachLarge]}
                    onPress={() => this.showAlert("pictUrlKtp")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    <View style={[styles.containImageTop_no]}>
                      <Image
                        // resizeMode="cover"
                        style={{
                          width: 200,
                          height: 130,
                          alignContent: "center",
                        }}
                        source={this.state.pictUrlKtp}
                      />
                    </View>

                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                  </Item>
                )}
              </View>
              {/* NPWP */}
              <View style={{ paddingTop: 25 }}>
                {this.state.pictUrlNPWP == null ||
                this.state.pictUrlNPWP == "" ? (
                  <Item
                    regular
                    style={[{ borderRadius: 5 }, styles.inputAttach]}
                    onPress={() => this.showAlert("pictUrlNPWP")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    <Text style={styles.textAttach}>Attach Company NPWP</Text>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                  </Item>
                ) : (
                  <Item
                    regular
                    style={[{ borderRadius: 5 }, styles.inputAttachLarge]}
                    onPress={() => this.showAlert("pictUrlNPWP")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    <View style={[styles.containImageTop_no]}>
                      <Image
                        // resizeMode="cover"
                        style={{
                          width: 200,
                          height: 130,
                          alignContent: "center",
                        }}
                        source={this.state.pictUrlNPWP}
                      />
                    </View>

                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                  </Item>
                )}
              </View>
              {/* TDP */}
              <View style={{ paddingTop: 25 }}>
                {this.state.pictUrlTDP == null ||
                this.state.pictUrlTDP == "" ? (
                  <Item
                    regular
                    style={[{ borderRadius: 5 }, styles.inputAttach]}
                    onPress={() => this.showAlert("pictUrlTDP")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    <Text style={styles.textAttach}>Attach TDP</Text>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                  </Item>
                ) : (
                  <Item
                    regular
                    style={[{ borderRadius: 5 }, styles.inputAttachLarge]}
                    onPress={() => this.showAlert("pictUrlTDP")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    <View style={[styles.containImageTop_no]}>
                      <Image
                        // resizeMode="cover"
                        style={{
                          width: 200,
                          height: 130,
                          alignContent: "center",
                        }}
                        source={this.state.pictUrlTDP}
                      />
                    </View>

                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                  </Item>
                )}
              </View>
              {/* SIUP */}
              <View style={{ paddingTop: 25 }}>
                {this.state.pictUrlSIUP == null ||
                this.state.pictUrlSIUP == "" ? (
                  <Item
                    regular
                    style={[{ borderRadius: 5 }, styles.inputAttach]}
                    onPress={() => this.showAlert("pictUrlSIUP")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    <Text style={styles.textAttach}>Attach SIUP</Text>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                  </Item>
                ) : (
                  <Item
                    regular
                    style={[{ borderRadius: 5 }, styles.inputAttachLarge]}
                    onPress={() => this.showAlert("pictUrlSIUP")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    <View style={[styles.containImageTop_no]}>
                      <Image
                        // resizeMode="cover"
                        style={{
                          width: 200,
                          height: 130,
                          alignContent: "center",
                        }}
                        source={this.state.pictUrlSIUP}
                      />
                    </View>

                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                  </Item>
                )}
              </View>
              {/* APPP  */}
              <View style={{ paddingTop: 25 }}>
                {this.state.pictUrlAktePendirian == null ||
                this.state.pictUrlAktePendirian == "" ? (
                  <Item
                    regular
                    style={[{ borderRadius: 5 }, styles.inputAttach]}
                    onPress={() => this.showAlert("pictUrlAktePendirian")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    <Text style={styles.textAttach}>
                      Attach Deed of establish
                    </Text>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                  </Item>
                ) : (
                  <Item
                    regular
                    style={[{ borderRadius: 5 }, styles.inputAttachLarge]}
                    onPress={() => this.showAlert("pictUrlAktePendirian")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    <View style={[styles.containImageTop_no]}>
                      <Image
                        // resizeMode="cover"
                        style={{
                          width: 200,
                          height: 130,
                          alignContent: "center",
                        }}
                        source={this.state.pictUrlAktePendirian}
                      />
                    </View>

                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                      }}
                      source={require("@Asset/images/icon/image.png")}
                    ></Image>
                  </Item>
                )}
              </View>
            </View>
            {/* </View> */}
          </ScrollView>
          <View
            style={[
              pickerSelectStyles.checkBoxWrap,
              {
                flexDirection: "row",
                backgroundColor: "#fff",
                height: 30,
                marginTop: 8,
                marginBottom: 8,
                borderRadius: 10,
              },
            ]}
          >
            <CheckBox
              // title={`I have read and accept the terms & conditions`}
              // title={this.titleCheckbox}

              checked={this.state.checked}
              onPress={this.handleCheck}
              style={{ justifyContent: "center", alignItems: "center" }}
            />

            {this.state.files.map((val, key) => (
              <View
                key={key}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>I have read and accept </Text>
                  <Text
                    onPress={() => this.downloadFile(val)}
                    style={{ textDecorationLine: "underline" }}
                  >
                    the terms & conditions
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {!this.state.checked ? null : (
            <View>
              <View style={styles.captchaContainerView}>
                <View style={styles.captchaChildContainer}>
                  {this.state.randomNumberOne.length == 0 ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <View
                      style={{
                        height: 50,
                        width: 80,
                        backgroundColor: Colors.goldUrban,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 20, textAlign: "center" }}>
                        {this.state.randomNumberOne}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity onPress={this.generateCaptcha}>
                    <Icon name="ios-refresh" style={styles.iconCaptcha} />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", left: 25 }}>
                  <View style={styles.captchaChildContainerInput}>
                    <TextInput
                      placeholder="Enter Captcha"
                      onChangeText={(data) =>
                        this.setState({ textInputHolder: data })
                      }
                      style={styles.textInputStyle}
                      underlineColorAndroid="transparent"
                      ref={(data) => {
                        this.textInputHolder = data;
                      }}
                    />
                  </View>

                  {/* <View style={styles.captchaChildContainerButton}>
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 35,
                        borderRadius: 5,
                        backgroundColor: Colors.navyUrban,
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                      onPress={this.validateCaptchaCode}
                    >
                      <Text style={styles.text}>Im not robot</Text>
                    </TouchableOpacity>
                  </View> */}

                  <View style={styles.captchaChildContainerButton}>
                    <View
                      style={
                        // pickerSelectStyles.checkBoxWrap,
                        {
                          flexDirection: "row",
                          backgroundColor: "#fff",
                          height: 30,
                          marginTop: 8,
                          marginBottom: 8,
                          borderRadius: 10,
                          width: 140,
                        }
                      }
                    >
                      <CheckBox
                        checked={this.state.checked_imnot}
                        onPress={this.validateCaptchaCode}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 0,
                          margin: 0,
                        }}
                        // title={`Im not robot`}
                      />

                      <View
                        style={{
                          // flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          left: 50,
                          top: 5,
                        }}
                      >
                        <Text>I'm not robot </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* <Button onPress={this.handleBuy}  style={{alignSelf : 'center', marginTop : 20}}>
                        <Text style={{fontFamily :'Montserrat-Regular'}}>Accept</Text>
                    </Button> */}
          <View
            style={styles.signbtnSec}
            pointerEvents={this.state.isLoaded ? "auto" : "none"}
          >
            <Button
              style={[
                styles.signInBtn,
                {
                  backgroundColor: !this.state.capt ? "#cccccc" : "#0691ce",
                },
              ]}
              onPress={() => this.submit()}
              disabled={!this.state.capt}
              // disabled={!this.state.capt}
            >
              {!this.state.isLoaded ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signInBtnText}>Register Now</Text>
              )}
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
export default SignupPrinciple;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    ...styles.inputEmail,
    fontSize: 17,
  },
  textBox: {
    flex: 1,
    height: Dimensions.get("window").height * 0.6,
    backgroundColor: "#fff",
    marginHorizontal: 30,
    paddingHorizontal: 20,
    marginTop: 20,
    paddingTop: 10,
    borderColor: "#333",
    borderWidth: 1,
  },
  checkBoxWrap: {
    marginHorizontal: 10,
  },
});
