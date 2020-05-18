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
  Label,
  Content,
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
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
// import AlertCustom from "@Component/alert_Custom";
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

class SignupGuest extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.state = {
      Alert_Visibility: false,
      pesan: "",
      dataProject: [],
      dataProject2: [],
      isLoaded: true,

      email: "",
      fullname: "",
      nik: "",
      npwp: "",
      bank_name: "",
      acc_name: "",
      acc_no: "",
      nohp: "",
      // pictUrlKtp: require("../../assets/images/ktp.png"),
      // pictUrlNPWP: require("../../assets/images/ktp.png"),
      // pictUrlSuratAnggota: require("../../assets/images/ktp.png"),
      // pictUrlBukuTabungan: require("../../assets/images/ktp.png"),

      pictUrlKtp: "",
      pictUrlNPWP: "",
      pictUrlSuratAnggota: require("../../assets/images/ktp.png"),
      pictUrlBukuTabungan: require("../../assets/images/ktp.png"),
      pictUrl: require("../../assets/images/ktp.png"),

      selectedType: "",
      selectedProject: [],

      search: "",
      getPrin: [],
      principle_cd: "",
      modalVisible: false,

      // query: '',
      fullData: [],
      principle_name: "",
      itemPrinciple: "",
      principles: "",
      filektp: "",
      // replaceFoto: require("/assets/images/download.png"),
      // replaceFoto: "assets/images/download.png",
      // replaceFoto: "",
      // /Users/hany/Documents/Project React/urbanmobile/assets/images/download.png
      replaceFoto: "file:///urbanAPI/images/noimage-min.png",

      files: [],
      checking: false,
      textInputHolder: 0,
      captchaHolder: 0,
      randomNumberOne: 0,
      capt: false,
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
    const data = {
      fullname: this.props.datas_dari_regist.fullname,
      email: this.props.datas_dari_regist.email,
      nohp: this.props.datas_dari_regist.hp,
      principle_cd: this.props.datas_dari_regist.code,
      principle_name: this.props.resData[0].group_name,
      // principle_cd: this.props.itemPrinciple
    };
    console.log("email", data.email);
    console.log("data dari regis", data);
    console.log("value principle", data.principle_cd);
    console.log("principle_name", data.principle_name);
    this.setState(data, () => {
      // this.getDataListProspect(this.props.datas)
      this.getProject();
      // this.getProject2();
      this.getPrinciples();
      this.getFile();
      this.generateCaptcha();

      // this.getData(this.props.meterId);XMLDocument
      // this.getDataFollowUp(this.props.datas)
      // this.getStatus()
    });

    this.mounted = true;

    isMount = true;
    // const { email } = this.state.email;
    // console.log("email",email);
  }

  chooseType = (val) => {
    this.setState({ selectedType: val });
  };

  renderRow = ({ item }) => {
    console.log("item", item);
    return (
      // <TouchableOpacity >
      <ListItem
        style={{ height: 10 }}
        // onValueChange={(val)=>this.alert(val)}
        onPress={() => this.selectedItem(item)}
        // onPress={()=>alert(item.value)}
        // onPress={(val)=>{
        // //    const valvalue = this.state.getocupation.filter(item=>item.value==val)
        //     console.log('value', this.state.getlot.filter(item=>item.value==val));
        // //    this.setState({occupation:val,occupation:statuspros})
        // }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Regular",
            alignSelf: "flex-start",
            color: "#333",
            marginBottom: 5,
            fontSize: 15,
          }}
        >
          {item.label}
        </Text>
      </ListItem>

      // </TouchableOpacity>

      // <Text>tes</Text>
    );
  };

  getProject = () => {
    fetch(urlApi + "c_auth/getProjects/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res", res);
        if (!res.Error) {
          this.setState({ dataProject: res.Data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPrinciples = () => {
    fetch(urlApi + "c_principal/zoomPrincipal/IFCAPB/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("principle", res);
        if (!res.Error) {
          this.setState({ getPrin: res.Data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  selectedItem = (item) => {
    console.log("item select principle", item);

    // alert(val);

    // alert(val);
    if (item) {
      this.setState({ principle_cd: item.value });
      this.setState({ principle_name: item.label });
      // this.setModalVisible(!this.state.modalVisible)
    }
    this.setModalVisible(!this.state.modalVisible);
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

  submit = () => {
    this.setState({ isLoaded: !this.state.isLoaded });
    // const { email } = this.state.email;
    // console.log("email",email);

    // const tes ='';

    let filektp = "";
    let filenpwp = "";
    // RNFetchBlob.wrap(
    //     this.state.pictUrlKtp.uri.replace("file://", "")
    // );

    if (this.state.pictUrlKtp.length == 0) {
      // alert('nnul')
      console.log("replace", this.state.replaceFoto);
      // filektp = "@Asset/images/icon/dropdown.png";
      filektp = "./img/noimage.png";
      // "file:///data/user/0/com.ifcasoftware.urban/cache/react-native-image-crop-picker/image-7db81647-c261-4066-8e0e-46a4417e15e24941063510417621352.jpg"
      // "RNFetchBlob-file:///data/user/0/com.ifcasoftware.urban/cache/react-native-image-crop-picker/image-7db81647-c261-4066-8e0e-46a4417e15e24941063510417621352.jpg"
      // filektp = this.state.replaceFoto;
      // filektp = RNFetchBlob.wrap(
      //     this.state.replaceFoto
      // );
      console.log("pic nul", this.state.pictUrlKtp);
      // this.state.replaceFoto.uri.replace("file://", "")
    } else {
      // alert('not null')
      filektp = RNFetchBlob.wrap(
        this.state.pictUrlKtp.uri.replace("file://", "")
      );
      console.log("pic not nul", this.state.pictUrlKtp);
      // this.state.pictUrlKtp.uri.replace("file://", "")
    }

    if (this.state.pictUrlNPWP.length == 0) {
      console.log("replace", this.state.replaceFoto);
      filenpwp = "./img/noimage.png";
      console.log("pic nul", this.state.pictUrlKtp);
    } else {
      filenpwp = RNFetchBlob.wrap(
        this.state.pictUrlNPWP.uri.replace("file://", "")
      );
      console.log("pic not nul", this.state.pictUrlNPWP);
    }

    // Do something

    // let filenpwp = RNFetchBlob.wrap(
    //     this.state.pictUrlNPWP.uri.replace("file://", "")
    // );

    // let filebukutabungan = RNFetchBlob.wrap(
    //     this.state.pictUrlBukuTabungan.uri.replace("file://", "")
    // );
    // let filesuratanggota = RNFetchBlob.wrap(
    //     this.state.pictUrlSuratAnggota.uri.replace("file://", "")
    // );

    const {
      selectedType,
      email,
      fullname,
      principle_name,
      nik,
      nohp,
      // pictUrl,
      selectedProject,
      principle_cd,
      bank_name,
      acc_name,
      acc_no,

      npwp,
      project_no,
      pictUrlKtp,
      pictUrlNPWP,
    } = this.state;

    const frmData = {
      // group_type: selectedType,
      group_type: "M",
      npwp: npwp,
      user_email: email,
      full_name: fullname,
      nomor_induk: nik,
      phone_no: nohp,
      // pictUrl: pictUrl,
      // projek: selectedProject[0].project_no,
      projek: "1104",

      //---------foto attachment
      pictUrlKtp: filektp, //ktp
      pictUrlNPWP: filenpwp,
      // pictUrlBukuTabungan: filebukutabungan,
      // pictUrlSuratAnggota: filesuratanggota,
      //---------end foto attachment

      bankname: bank_name,
      accname: acc_name,
      accno: acc_no,

      principle: principle_cd,
      principlename: principle_name,
    };

    const isValid = this.validating({
      email: { require: true },
      fullname: { require: true },
      nik: { require: true },
      nohp: { require: true },
      //   nik
      // selectedType: { require: true },
      // selectedProject: { require: true }
    });

    let fileNameKtp = "";
    if (this.state.pictUrlKtp.length == 0) {
      console.log(this.state.pictUrlKtp.length);
      fileNameKtp = "./img/noimage.png";
    } else {
      fileNameKtp = "KTP_RegisAgent_" + nik + ".png";
    }

    let fileNameNpwp = "";
    if (this.state.pictUrlNPWP.length == 0) {
      console.log(this.state.pictUrlNPWP.length);
      fileNameNpwp = "./img/noimage.png";
    } else {
      fileNameNpwp = "npwp_RegisAgent_" + nik + ".png";
    }

    // console.log('filenamektp', nik);

    // let fileNameBukuTabungan = "bukutabungan_RegisAgent_" + nik + ".png";
    // let fileNameSuratAnggota= "suratanggota_RegisAgent_" + nik + ".png";

    console.log("saveFormNUP", frmData);
    // console.log('leng nik',this.state.nik.length);
    console.log("leng foto ktp", this.state.pictUrlKtp.length);
    // if(this.state.pictUrlKtp.length == 7 || filektp.length == 7){
    //     console.log(this.state.pictUrlKtp.length)
    //     alert('panjang 7')
    // }else{
    //     console.log(this.state.pictUrlKtp.length)
    //     alert('lebih dari 7')
    // }

    // let fileName = "KTP_RegisAgent.png";
    // let fileImg = "";
    // console.log('pic ktp', pictUrlKtp);
    // if ( pictUrlKtp || pictUrlNPWP ) {
    //     // console.log('pic ktp', pictUrlKtp)
    //         this.setState({ errors: false })
    //         alert('gak error');
    //         console.log('gak error');

    //     } else {
    //         this.setState({ errors: true })
    //         alert("Please upload attachments")
    //         console.log('error')
    //     }

    // if(filektp != "" || filektp != null){
    //     console.log('filektp', filektp)
    // }
    //
    if (isValid) {
      RNFetchBlob.fetch(
        "POST",
        urlApi + "c_auth/SignUpAgent",
        {
          "Content-Type": "multipart/form-data",
        },
        [
          // { name: "photo", filename: fileName, data: fileImg },
          { name: "photoktp", filename: fileNameKtp, data: filektp },
          { name: "photonpwp", filename: fileNameNpwp, data: filenpwp },
          // { name: "photobukutabungan", filename: fileNameBukuTabungan, data: filebukutabungan },
          // { name: "photosuratanggota", filename: fileNameSuratAnggota, data: filesuratanggota},
          { name: "data", data: JSON.stringify(frmData) },
        ]
      ).then((resp) => {
        console.log("res_if", resp);
        const res = JSON.parse(resp.data);
        console.log("res", res);
        // const res = JSON.stringify(resp.data);

        if (!res.Error) {
          // Actions.pop()
          this.setState({ isLogin: true }, () => {
            const pesan = res.Pesan;
            // alert(res.Pesan);
            this.alertFillBlank(true, pesan);
            // Actions.pop()
            Actions.Login();
          });
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            const pesan = res.Pesan;
            // alert(res.Pesan);
            this.alertFillBlank(true, pesan);
            // console.log('url',this.state.pickUrlKtp.uri)
          });
        }
        // this.setState({ isLoaded: !this.state.isLoaded }, () => {
        //   alert(res.Pesan);
        //   // console.log('url',this.state.pickUrlKtp.uri)
        // });
        const pesan = res.Pesan;
        this.alertFillBlank(true, pesan);
        // alert(res.Pesan);
      });
    } else {
      this.setState({ isLoaded: this.state.isLoaded }, () => {
        const pesan = "Please fill the blank";
        this.alertFillBlank(true, pesan);
        // alert("Please upload image");
        // alert(res.Pesan);
        // console.log('url',this.state.pickUrlKtp.uri)
      });
      // alert("Please assign your ID Picture");
      // console.log('url else',this.state.pickUrlKtp.uri)
    }
  };

  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  handleCheck = (data) => {
    const { dataProject } = this.state;

    dataProject.forEach((datas) => {
      if (datas.project_no === data.project_no) {
        if (datas.checked) {
          datas.checked = false;
        } else {
          datas.checked = true;
        }
      }
    });

    this.setState({ dataProject }, () => {
      const selectedProject = this.state.dataProject.filter(
        (item) => item.checked
      );
      this.setState({ selectedProject });
    });
  };

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
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path } });
      })
      .catch((e) => console.log("tag", e));
  }

  updateSearch = (text) => {
    console.log("input search", text);
    this.setState({ search: text });
  };

  modalPrinciple() {
    Actions.modalPrinciple();
  }

  modalBankMaster() {
    Actions.modalBankMaster();
  }

  // componentWillReceiveProps(props){
  //     const itemPrinciple = props.itemPrinciple;
  //     console.log('props getback',itemPrinciple);
  //     if(itemPrinciple){
  //         this.setState({principles: itemPrinciple.value});
  //         // console.log('principle_cd', principle_cd);

  //         // this.CallFunction();
  //         // console.log("TEST 111");
  //     }

  // }
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

  handleCheckbox() {
    // alert(!this.state.checked);
    this.setState({ checking: !this.state.checking });
    // Actions.pagePDF();
    // Actions.pagePDF({item : item})
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
      this.setState({ capt: this.state.textInputHolder });
      //   Alert.alert("Captcha Matched");
    } else {
      //Captcha not match
      Alert.alert("Captcha not matched");
      this.generateCaptcha();
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

  render() {
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
                {"Sign Up as Agent"}
              </Text>
            </Body>
            <Right style={styles.right}></Right>
          </Header>

          {/* <Content style={{paddingVertical: 10}}> */}
          <ScrollView
            contentContainerStyle={{ paddingVertical: 10 }}
            scrollEnabled={this.state.isLoaded ? true : false}
          >
            {/* <AlertCustom /> */}
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
                      }}
                      // activeOpacity={0.7}
                    >
                      <Text style={{ color: Colors.white }}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={{ paddingBottom: 20 }}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
              <Item floatingLabel style={styles.marginround}>
                <Label style={{ color: "#fff", fontSize: 14 }}>Full Name</Label>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                <Input
                  // placeholder='Full Name'
                  autoCapitalize="words"
                  placeholderTextColor={"#666"}
                  value={this.state.fullname}
                  onChangeText={(fullname) => this.setState({ fullname })}
                  style={styles.positionTextInput}
                  ref="fullname"
                />
                {this.state.errorfullname ? (
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
              {this.state.errorfullname ? (
                <Text
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 15,
                    color: "red",
                    fontSize: 12,
                  }}
                >
                  Full Name Required
                </Text>
              ) : null}
            </View>

            <View style={{ paddingBottom: 20 }}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
              <Item floatingLabel style={styles.marginround}>
                <Label style={{ color: "#fff", fontSize: 14 }}>
                  Mobile Phone
                </Label>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                <Input
                  // placeholder='Full Name'
                  keyboardType="numeric"
                  placeholderTextColor={"#666"}
                  value={this.state.nohp}
                  onChangeText={(val) => this.setState({ nohp: val })}
                  style={styles.positionTextInput}
                  ref="acc_no"
                />
                {this.state.errornohp ? (
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
              {this.state.errornohp ? (
                <Text
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 15,
                    color: "red",
                    fontSize: 12,
                  }}
                >
                  Handphone Required
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
                  ref="email"
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
            <View style={{ paddingBottom: 20 }}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
              <Item floatingLabel style={styles.marginround}>
                <Label style={{ color: "#fff", fontSize: 14 }}>NIK</Label>
                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                <Input
                  // placeholder='Full Name'
                  keyboardType="numeric"
                  placeholderTextColor={"#666"}
                  value={this.state.nik}
                  onChangeText={(val) => this.setState({ nik: val })}
                  style={styles.positionTextInput}
                  ref="nik"
                />
                {this.state.errornik ? (
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
            </View>
            <View style={{ paddingBottom: 20 }}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
              <Item floatingLabel style={styles.marginround}>
                <Label style={{ color: "#fff", fontSize: 14 }}>NPWP</Label>
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
            </View>

            <View style={{ paddingBottom: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
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
                  // onPress={() => this.modalBankMaster()}
                  // placeholderTextColor={'#666'}
                  // placeholderStyle={styles.textAttach}

                  value={this.state.bank_name}
                  editable={false}
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
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("@Asset/images/icon/dropdown.png")}
                ></Image>
                {/* <Icon name='close-circle' /> */}
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

            {/* KTP */}
            <View style={{ paddingTop: 10 }}>
              {this.state.pictUrlKtp == null || this.state.pictUrlKtp == "" ? (
                <Item
                  regular
                  style={[{ borderRadius: 5 }, styles.inputAttach]}
                  onPress={() => this.showAlert("pictUrlKtp")}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Text style={styles.textAttach}>Attach KTP</Text>
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
            <View style={{ paddingTop: 25, paddingBottom: 10 }}>
              {this.state.pictUrlNPWP == null ||
              this.state.pictUrlNPWP == "" ? (
                <Item
                  regular
                  style={[{ borderRadius: 5 }, styles.inputAttach]}
                  onPress={() => this.showAlert("pictUrlNPWP")}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Text style={styles.textAttach}>Attach NPWP</Text>
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
            {/* </Content> */}
          </ScrollView>

          {/* term condition */}

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

              checked={this.state.checking}
              onPress={this.handleCheckbox}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            />

            {this.state.files.map((val, key) => (
              // <View key={key}>
              //   <Text>tes</Text>
              // </View>
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
                  {/* <Text>tes</Text> */}
                </View>
              </View>
            ))}
          </View>
          {!this.state.checking ? null : (
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

                  <View style={styles.captchaChildContainerButton}>
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
                  </View>
                </View>
              </View>
            </View>
          )}
          {/* button */}
          {/* <View
            style={styles.signbtnSec}
            pointerEvents={this.state.isLoaded ? "auto" : "none"}
          >
            <Button
              style={[styles.signInBtn, { backgroundColor: Colors.goldUrban }]}
              onPress={() => this.submit()}
            >
              {!this.state.isLoaded ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signInBtnText}>Register Now</Text>
              )}
            </Button>
          </View> */}
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
export default SignupGuest;

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
