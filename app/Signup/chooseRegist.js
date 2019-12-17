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
    TextInput
    // Content
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
    Content,
    Label,
    Switch,
    InputGroup
    // CheckBox
} from "native-base";
import { CheckBox } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Sae } from 'react-native-textinput-effects';
// import FloatingLabelInput from "@Component/FloatingLabelInput";




class chooseRegist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         
            isLoaded: true,
            fullname: '',
            email: '',
            hp: '',
            code: '',
            group_name: ''
        };

    }

    componentDidMount() {
        
        // console.log('data', data);
        this.getCode();
        isMount = true;
        // this.getPDF()
        // this.getFile();
        // const { email } = this.state.email;
        // console.log("email",email);
        // console.log('statte', this.state.title);
    }

    getCode() {

    }

    // validate = (email) => {
    //     console.log(email);
    //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    //     if(reg.test(email) === false)
    //     {
    //     console.log("Email is Not Correct");
    //     this.setState({email:email})
    //     return false;
    //       }
    //     else {
    //       this.setState({email:email})
    //       console.log("Email is Correct");
    //     }
    // }

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

    btnNext(){
        const data_screen = {
            fullname: this.state.fullname,
            email: this.state.email,
            hp: this.state.hp,
            code: this.state.code,
            // grup_name: this.state.group_name
        }
    //    const data = this.state.code
        // data = JSON.stringify(code);
        const { code } = this.state;
        const data = {
            // fullname: this.state.fullname,
            // email: this.state.email,
            // hp: this.state.hp,
            code: code
            // email: this.state.email
        }

        console.log('data screen', data_screen);
        console.log('data api', data);

        const isValid = this.validating({
            fullname: { require: true },
            email: {require: true},
            hp: { require: true},
            code: { require: true}
          
         
        });

        if ( isValid ){

            fetch(urlApi + "c_auth/CheckRegist/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((res) => {
                    // alert(res.Pesan)
                    // console.log('res data', res.Error)
                   
                    if (!res.Error) {
                        const resData = res.Data
                        console.log('resData', resData)
                        const resdatagrup = res.Data[0].group_type
                        console.log('resdattaa', resdatagrup)
                        // alert('tidak true'+res.Pesan)
                        if (resdatagrup == 'P' ) {
                            // this.getTower(res);
                            Actions.SignupAgent({datas_dari_regist:data_screen, resData: resData});
                        } else {
                            this.setState({ isLoaded: !this.state.isLoaded });
                            // Actions.ResetPass({ email: res.Data.user });
                            Actions.SignupPrinciple({datas_dari_regist:data_screen, resData: resData});
                        }
                    } else if (res.Error){
                        console.log('res pesan');
                        alert(res.Pesan)
                        // this.setState({ isLoaded: !this.state.isLoaded }, () => {
                        //     alert(res.Pesan);
                        // });
                    }
                })
                .catch(error => {
                    console.log(error);
                    // this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    //     alert(error);
                    //     // alert(res.Pesan);
                    // });
                });
        } else {
            alert("Please fill the blank");
        }
        
        
            
       
        // Actions.SignupAgent({datas_dari_regist:data});
        // console.log('datas', datas);
        // alert('next');
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
                                {"Registration"}
                            </Text>
                        </Body>
                        <Right style={styles.right}></Right>
                    </Header>
  
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
                                <Text style={styles.overviewTitles}>Email</Text>
                            </View> */}
                            <Item floatingLabel style={styles.marginround}>
                                <Label style={{color: "#fff", fontSize: 14}}>Email</Label>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
                                <Input 
                                    // placeholder='Email' 
                                    placeholderTextColor={'#fff'} 
                                    value={this.state.email} 
                                    ref="email"
                                    // onChangeText={(email) => this.setState({ email })} 
                                    // onChangeText={(email) => this.validate(email)}
                                    onChangeText={(email) => this.setState({ email })} 
                                    style={styles.positionTextInput} />
                                    {this.state.erroremail ? (
                                    <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                    ) : null}
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
                                <Text style={styles.overviewTitles}>Handphone</Text>
                            </View> */}
                            <Item  floatingLabel style={styles.marginround}>
                                <Label style={{color: "#fff", fontSize: 14}}>Handphone</Label>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
                                <Input 
                                    // placeholder='Handphone' 
                                    placeholderTextColor={'#fff'} 
                                    value={this.state.hp} 
                                    keyboardType="numeric"
                                    onChangeText={(hp) => this.setState({ hp })} 
                                    style={styles.positionTextInput} />
                                    {this.state.errorhp ? (
                                    <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                    ) : null}
                            </Item>
                            {this.state.errorhp ? (<Text
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

                        <View style={{paddingBottom: 20}}>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={styles.overviewTitles}>Unique Code</Text>
                            </View> */}
                            <Item floatingLabel style={styles.marginround}>
                                <Label style={{color: "#fff", fontSize: 14}}>Unique Code</Label>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
                                <Input 
                                    // placeholder='Unique Code' 
                                    placeholderTextColor={'#fff'} 
                                    value={this.state.code} 
                                    onChangeText={(code) => this.setState({ code })} 
                                    style={styles.positionTextInput} />
                                    {this.state.errorcode ? (
                                    <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                    ) : null}
                            </Item>
                            {this.state.errorcode ? (<Text
                                style={{
                                    position: "absolute",
                                    bottom:10,
                                    left: 15,
                                    color: "red",
                                    fontSize: 12
                                }}
                            >
                                Unique Code Required
                            </Text>) : null}
                        </View>
                        <View style={{marginTop: 40}}>
                            
                            <Button
                                style={styles.signInBtnMedium}
                                onPress={() => this.btnNext()}
                            >
                                <Text style={styles.signInBtnText}>
                                    Next
                                </Text>
                                {/* {!this.state.isLoaded ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.signInBtnText}>
                                        Sign In
                                    </Text>
                                )} */}
                            </Button>

                        </View>
                        
                        
                    
                   
                </ImageBackground>
            </Container>
        );
    }
}
export default chooseRegist;

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

