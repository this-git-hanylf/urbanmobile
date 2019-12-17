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
    Modal
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
    Label
    // CheckBox
} from "native-base";
import {SearchBar} from "react-native-elements";
import { CheckBox } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import { Style, Colors, Metrics } from "../Themes";
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
        value: "I"
    },
    {
        key: 2,
        label: "Member",
        value: "M"
    }
];

class SignupGuest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

            pictUrlKtp: '',
            pictUrlNPWP: '',
            pictUrlSuratAnggota: require("../../assets/images/ktp.png"),
            pictUrlBukuTabungan: require("../../assets/images/ktp.png"),
            pictUrl: require("../../assets/images/ktp.png"),

            selectedType: "",
            selectedProject: [],

            search: '',
            getPrin: [],
            principle_cd: '',
            modalVisible: false,

            // query: '',
            fullData: [],
            principle_name:'',
            itemPrinciple: '',
        };
    }

    componentDidMount() {
        const data = {
            fullname : this.props.datas_dari_regist.fullname,
            email: this.props.datas_dari_regist.email,
            nohp: this.props.datas_dari_regist.hp,
            principle_cd: this.props.datas_dari_regist.code,
            principle_name: this.props.resData[0].group_name
            // principle_cd: this.props.itemPrinciple
        }
        console.log('email', data.email);
        console.log('data dari regis', data);
        console.log('value principle', data.principle_cd);
        console.log('principle_name', data.principle_name);
        this.setState(data, () => {
            // this.getDataListProspect(this.props.datas)
        this.getProject();
        // this.getProject2();
        this.getPrinciples();
        // this.getData(this.props.meterId);XMLDocument
            // this.getDataFollowUp(this.props.datas)
            // this.getStatus()
        });

        this.mounted = true;
   
        
        isMount = true;
        // const { email } = this.state.email;
        // console.log("email",email);
    }

    chooseType = val => {
        this.setState({ selectedType: val });
    };


    


    renderRow = ({item}) => {
        console.log('item',item);
        return(
            // <TouchableOpacity >
            <ListItem style={{height: 10}} 
            // onValueChange={(val)=>this.alert(val)}
            onPress={()=>this.selectedItem(item)}
            // onPress={()=>alert(item.value)}
            // onPress={(val)=>{
            // //    const valvalue = this.state.getocupation.filter(item=>item.value==val)
            //     console.log('value', this.state.getlot.filter(item=>item.value==val));
            // //    this.setState({occupation:val,occupation:statuspros})
            // }}
            >
                <Text style={{fontFamily: "Montserrat-Regular",alignSelf:'flex-start',color: "#333",marginBottom: 5,fontSize: 15}}>
                {item.label}
                </Text>
            </ListItem>

            // </TouchableOpacity>
            
            // <Text>tes</Text>
        )

    }
    

    getProject = () => {
        fetch(urlApi + "c_auth/getProjects/", {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                console.log("res", res);
                if (!res.Error) {
                    this.setState({ dataProject: res.Data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    getPrinciples = () => {
        fetch(urlApi+"c_principal/zoomPrincipal/IFCAPB/", {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                console.log("principle", res);
                if (!res.Error) {
                    this.setState({ getPrin: res.Data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    selectedItem = (item)=>{
        console.log('item select principle',item);
        
        // alert(val);
        
        
        // alert(val);
        if(item){
            this.setState({principle_cd : item.value})
            this.setState({principle_name: item.label})
            // this.setModalVisible(!this.state.modalVisible)
        }
        this.setModalVisible(!this.state.modalVisible)
       
    }
    validating = validationData => {
        const keys = Object.keys(validationData);
        const errorKey = [];
        let isValid = false;

        keys.map((data, key) => {
            if (validationData[data].require) {
                let isError =
                    !this.state[data] || this.state[data].length == 0
                        ? true
                        : false;
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
        let filektp = RNFetchBlob.wrap(
            this.state.pictUrlKtp.uri.replace("file://", "")
        );
        let filenpwp = RNFetchBlob.wrap(
            this.state.pictUrlNPWP.uri.replace("file://", "")
        );
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
           
        } = this.state;

        const frmData = {
            // group_type: selectedType,
            group_type: 'M',
            npwp: npwp,
            user_email: email,
            full_name: fullname,
            nomor_induk: nik,
            phone_no: nohp,
            // pictUrl: pictUrl,
            projek: selectedProject[0].project_no,

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
            principlename: principle_name

        };
        

        const isValid = this.validating({
            email: { require: true },
            fullname: { require: true },
            nik: { require: true },
            nohp: { require: true },
            // selectedType: { require: true },
            // selectedProject: { require: true }
        });

        let fileNameKtp = "KTP_RegisAgent_"+nik+".png";
        console.log('filenamektp', nik);
        let fileNameNpwp = "npwp_RegisAgent_" + nik + ".png";
        // let fileNameBukuTabungan = "bukutabungan_RegisAgent_" + nik + ".png";
        // let fileNameSuratAnggota= "suratanggota_RegisAgent_" + nik + ".png";

       
        

        console.log('saveFormNUP', frmData);
        console.log('leng nik',this.state.nik.length);
        console.log('leng foto ktp',this.state.pictUrlKtp.length);
        // if(this.state.pictUrlKtp.length == 7 || filektp.length == 7){
        //     console.log(this.state.pictUrlKtp.length)
        //     alert('panjang 7')
        // }else{
        //     console.log(this.state.pictUrlKtp.length)
        //     alert('lebih dari 7')
        // }

        // let fileName = "KTP_RegisAgent.png";
        // let fileImg = "";

        
// 
        if ( isValid ) {
            // fileImg = RNFetchBlob.wrap(
            //     this.state.pictUrl.uri.replace("file://", "")
            // );

            RNFetchBlob.fetch(
                "POST",
                urlApi + "c_auth/SignUpAgent",
                {
                    "Content-Type": "multipart/form-data"
                },
                [
                    // { name: "photo", filename: fileName, data: fileImg },
                    { name: "photoktp", filename: fileNameKtp, data: filektp },
                    { name: "photonpwp", filename: fileNameNpwp, data: filenpwp },
                    // { name: "photobukutabungan", filename: fileNameBukuTabungan, data: filebukutabungan },
                    // { name: "photosuratanggota", filename: fileNameSuratAnggota, data: filesuratanggota},
                    { name: "data", data: JSON.stringify(frmData) }
                ]
            ).then(resp => {
                const res = JSON.parse(resp.data);
                // let res = JSON.stringify(resp.data);
                console.log("res", resp);
                
                if(!res.Error){
                    // Actions.pop()
                    this.setState({ isLogin: true }, () => {
                        alert(res.Pesan);
                        // Actions.pop()
                        Actions.Login()
                    });
                }else {
                    this.setState({ isLoaded: !this.state.isLoaded }, () => {
                        alert(res.Pesan);
                    });
                }
                // alert(res.Pesan); 
            });
            
        } else {
            alert("Please assign your ID Picture");
        }
    };

    handleCheck = data => {
        const { dataProject } = this.state;

        dataProject.forEach(datas => {
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
                item => item.checked
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
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    };

    fromCamera(key) {
        ImagePicker.openCamera({
            cropping: true,
            width: 600,
            height: 500
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ [key]: { uri: image.path } });
            })
            .catch(e => console.log("tag", e));
    }

    fromGallery(key) {
        ImagePicker.openPicker({
            multiple: false,
            width: 600,
            height: 500
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ [key]: { uri: image.path } });
            })
            .catch(e => console.log("tag", e));
    }

    updateSearch = text => {
        console.log('input search',text);
        this.setState({ search: text });
    };

    modalPrinciple(){
        Actions.modalPrinciple();
    }

    render() {
        return (
            <Container>
                <ImageBackground style={styles.backgroundImage} source={require("../Images/background-blue.png")}>
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
                    
                    <ScrollView contentContainerStyle={{ paddingVertical: 10 }} scrollEnabled={this.state.isLoaded ? true : false}>
                        <View pointerEvents={this.state.isLoaded ? "auto" : "none"}
                            style={[
                                styles.inputFieldStyles,
                                { justifyContent: "flex-start" }
                            ]}
                        >
                            <View>
                                <View style={{paddingBottom: 20}}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                                    <Item floatingLabel style={styles.marginround}>
                                        <Label style={{color: "#fff", fontSize: 14}}>Email</Label>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                                        <Input 
                                            // placeholder='Full Name' 
                                            placeholderTextColor={'#666'} 
                                            value={this.state.email} 
                                            onChangeText={(email) => this.setState({ email })} 
                                            style={styles.positionTextInput}
                                            ref="email" />
                                            {this.state.erroremail ? (
                                            <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                            ) : null}
                                        {/* <Icon name='close-circle' /> */}
                                    </Item>
                                    {this.state.erroremail ? (<Text
                                        style={{
                                            position: "absolute",
                                            bottom:10,
                                            left: 15,
                                            color: "red",
                                            fontSize: 12
                                        }}
                                    >
                                        Email Required
                                    </Text>) : null}
                                </View>
                                
                                
                                <View style={{paddingBottom: 20}}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                                    <Item floatingLabel style={styles.marginround}>
                                        <Label style={{color: "#fff", fontSize: 14}}>Full Name</Label>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                                        <Input 
                                            // placeholder='Full Name' 
                                            placeholderTextColor={'#666'} 
                                            value={this.state.fullname} 
                                            onChangeText={(fullname) => this.setState({ fullname })} 
                                            style={styles.positionTextInput}
                                            ref="fullname" />
                                            {this.state.errorfullname ? (
                                            <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                            ) : null}
                                        {/* <Icon name='close-circle' /> */}
                                    </Item>
                                    {this.state.errorfullname ? (<Text
                                        style={{
                                            position: "absolute",
                                            bottom:10,
                                            left: 15,
                                            color: "red",
                                            fontSize: 12
                                        }}
                                    >
                                        Full Name Required
                                    </Text>) : null}
                                </View>
                                <View style={{paddingBottom: 20}}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                                    <Item floatingLabel style={styles.marginround}>
                                        <Label style={{color: "#fff", fontSize: 14}}>NIK</Label>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                                        <Input 
                                            // placeholder='Full Name' 
                                            keyboardType="numeric"
                                            placeholderTextColor={'#666'} 
                                            value={this.state.nik} 
                                            onChangeText={val =>
                                                this.setState({ nik: val })
                                            }
                                            style={styles.positionTextInput}
                                            ref="nik" />
                                            {this.state.errornik ? (
                                            <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                            ) : null}
                                        {/* <Icon name='close-circle' /> */}
                                    </Item>
                                    {this.state.errornik ? (<Text
                                        style={{
                                            position: "absolute",
                                            bottom:10,
                                            left: 15,
                                            color: "red",
                                            fontSize: 12
                                        }}
                                    >
                                        NIK Required
                                    </Text>) : null}
                                </View>
                                <View style={{paddingBottom: 20}}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                                    <Item floatingLabel style={styles.marginround}>
                                        <Label style={{color: "#fff", fontSize: 14}}>NPWP</Label>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                                        <Input 
                                            // placeholder='Full Name' 
                                            keyboardType="numeric"
                                            placeholderTextColor={'#666'} 
                                            value={this.state.npwp} 
                                            onChangeText={val =>
                                                this.setState({ npwp: val })
                                            }
                                            style={styles.positionTextInput}
                                            ref="npwp" />
                                            {this.state.errornpwp ? (
                                            <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                            ) : null}
                                        {/* <Icon name='close-circle' /> */}
                                    </Item>
                                    {this.state.errornpwp ? (<Text
                                        style={{
                                            position: "absolute",
                                            bottom:10,
                                            left: 15,
                                            color: "red",
                                            fontSize: 12
                                        }}
                                    >
                                        NPWP Required
                                    </Text>) : null}
                                </View>
                                <View style={{paddingBottom: 20}}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                                    <Item floatingLabel style={styles.marginround}>
                                        <Label style={{color: "#fff", fontSize: 14}}>Bank Name</Label>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                                        <Input 
                                            // placeholder='Full Name' 
                                            placeholderTextColor={'#666'} 
                                            value={this.state.bank_name} 
                                            onChangeText={val =>
                                                this.setState({ bank_name: val })
                                            }
                                            style={styles.positionTextInput}
                                            ref="bank_name" />
                                            {this.state.errorbank_name ? (
                                            <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                            ) : null}
                                        {/* <Icon name='close-circle' /> */}
                                    </Item>
                                    {this.state.errorbank_name ? (<Text
                                        style={{
                                            position: "absolute",
                                            bottom:10,
                                            left: 15,
                                            color: "red",
                                            fontSize: 12
                                        }}
                                    >
                                        Bank Name Required
                                    </Text>) : null}
                                </View>
                                <View style={{paddingBottom: 20}}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                                    <Item floatingLabel style={styles.marginround}>
                                        <Label style={{color: "#fff", fontSize: 14}}>Account Name</Label>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                                        <Input 
                                            // placeholder='Full Name' 
                                            placeholderTextColor={'#666'} 
                                            value={this.state.acc_name} 
                                            onChangeText={val =>
                                                this.setState({ acc_name: val })
                                            }
                                            style={styles.positionTextInput}
                                            ref="acc_name" />
                                            {this.state.erroracc_name ? (
                                            <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                            ) : null}
                                        {/* <Icon name='close-circle' /> */}
                                    </Item>
                                    {this.state.erroracc_name ? (<Text
                                        style={{
                                            position: "absolute",
                                            bottom:10,
                                            left: 15,
                                            color: "red",
                                            fontSize: 12
                                        }}
                                    >
                                        Account Name Required
                                    </Text>) : null}
                                </View>
                                <View style={{paddingBottom: 20}}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                                    <Item floatingLabel style={styles.marginround}>
                                        <Label style={{color: "#fff", fontSize: 14}}>Account Number</Label>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                                        <Input 
                                            // placeholder='Full Name' 
                                            keyboardType="numeric"
                                            placeholderTextColor={'#666'} 
                                            value={this.state.acc_no} 
                                            onChangeText={val =>
                                                this.setState({ acc_no: val })
                                            }
                                            style={styles.positionTextInput}
                                            ref="acc_no" />
                                            {this.state.erroracc_no ? (
                                            <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                            ) : null}
                                        {/* <Icon name='close-circle' /> */}
                                    </Item>
                                    {this.state.erroracc_no? (<Text
                                        style={{
                                            position: "absolute",
                                            bottom:10,
                                            left: 15,
                                            color: "red",
                                            fontSize: 12
                                        }}
                                    >
                                        Account Number Required
                                    </Text>) : null}
                                </View>
                                {/* 
                                <View style={styles.containMid} pointerEvents={this.state.isLoaded ? "auto" : "none"}>
                                    <TouchableOpacity 
                                    onPress={() => this.modalPrinciple()}
                                    >
                                        <View>
                                            <Text>
                                                tes
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>   */}
                                <View style={{paddingBottom: 20}}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.overviewTitles}>Full Name</Text>
                                    </View> */}
                                    <Item floatingLabel style={styles.marginround}>
                                        <Label style={{color: "#fff", fontSize: 14}}>Handphone</Label>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                            <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                        </View> */}
                                        <Input 
                                            // placeholder='Full Name' 
                                            keyboardType="numeric"
                                            placeholderTextColor={'#666'} 
                                            value={this.state.nohp} 
                                            onChangeText={val =>
                                                this.setState({ nohp: val })
                                            }
                                            style={styles.positionTextInput}
                                            ref="acc_no" />
                                            {this.state.errornohp ? (
                                            <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                            ) : null}
                                        {/* <Icon name='close-circle' /> */}
                                    </Item>
                                    {this.state.errornohp? (<Text
                                        style={{
                                            position: "absolute",
                                            bottom:10,
                                            left: 15,
                                            color: "red",
                                            fontSize: 12
                                        }}
                                    >
                                        Handphone Required
                                    </Text>) : null}
                                </View>                             
                                <View>
                                    {this.state.dataProject.map((data, key) => {
                                        return (
                                            <View
                                                style={styles.checkboxWrap}
                                                key={key}
                                                pointerEvents={this.state.isLoaded ? "auto" : "none"}
                                            >
                                                <CheckBox
                                                    onPress={() =>
                                                        this.handleCheck(data)
                                                    }
                                                    checked={data.checked}
                                                    // checked={true}
                                                    title={data.descs}
                                                    iconType="material"
                                                    checkedIcon="check-circle"
                                                    uncheckedIcon="check-circle"
                                                    checkedColor="green"
                                                    
                                                />
                                                {/* <Text
                                                    style={{
                                                        fontSize: 16
                                                    }}
                                                >
                                                    {data.descs}
                                                </Text> */}
                                            </View>
                                        );
                                    })}
                                    {this.state.errorselectedProject ? (
                                        <Text
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 25,
                                                color: "red",
                                                fontSize: 12
                                            }}
                                        >
                                            ! Select Project Required
                                        </Text>
                                    ) : null}
                                </View>
                                <View style={{paddingTop: 25}}>
                                    <Label style={{color: "#fff", fontSize: 14, paddingLeft: 15}}>Upload Photo KTP</Label>
                                    <View style={[styles.containImageTop_no]}>
                                        <TouchableOpacity
                                            style={{
                                                padding: 2,
                                                borderWidth: 1,
                                                borderColor: "#d3d3d3",
                                                margin: 10
                                            }}
                                            onPress={() => this.showAlert("pictUrlKtp")}
                                            pointerEvents={this.state.isLoaded ? "auto" : "none"}
                                        >
                                            {/* <Image
                                                style={{ width: 200, height: 100 }}
                                                source={this.state.pictUrlKtp}
                                            /> */}
                                            {this.state.pictUrlKtp == null || this.state.pictUrlKtp == '' ?
                                                <View >
                                                {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                                                    <Image
                                                        style={{ width: 200, height: 130 }}
                                                        source={uri = require("../../assets/images/ktp.png")}
                                                    />
                                                </View>
                                                :
                                                <Image
                                                    // resizeMode="cover"
                                                    style={{ width: 200, height: 130 }}
                                                    source={
                                                        this.state.pictUrlKtp
                                                    }
                                                />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>  

                                <View style={{paddingTop: 25}}>
                                    <Label style={{color: "#fff", fontSize: 14, paddingLeft: 15}}>Upload Photo NPWP</Label>
                                    <View style={[styles.containImageTop_no]}>
                                        <TouchableOpacity
                                            style={{
                                                padding: 2,
                                                borderWidth: 1,
                                                borderColor: "#d3d3d3",
                                                margin: 10
                                            }}
                                            onPress={() => this.showAlert("pictUrlNPWP")}
                                            pointerEvents={this.state.isLoaded ? "auto" : "none"}
                                        >
                                            {/* <Image
                                                style={{ width: 200, height: 100 }}
                                                source={this.state.pictUrlKtp}
                                            /> */}
                                            {this.state.pictUrlNPWP == null || this.state.pictUrlNPWP == '' ?
                                                <View >
                                                {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                                                    <Image
                                                        style={{ width: 200, height: 130 }}
                                                        source={uri = require("../../assets/images/ktp.png")}
                                                    />
                                                </View>
                                                :
                                                <Image
                                                    // resizeMode="cover"
                                                    style={{ width: 200, height: 130 }}
                                                    source={
                                                        this.state.pictUrlNPWP
                                                    }
                                                />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>  
                               
                            </View>
                        </View>
                    </ScrollView>
                    <View
                        style={styles.signbtnSec}
                        pointerEvents={this.state.isLoaded ? "auto" : "none"}
                    >
                        <Button
                            style={[styles.signInBtn,{backgroundColor: Colors.goldUrban}]}
                            onPress={() => this.submit()}
                        >
                            {!this.state.isLoaded ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.signInBtnText}>
                                    Register Now
                                </Text>
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
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        ...styles.inputEmail,
        fontSize: 17
    }
});
