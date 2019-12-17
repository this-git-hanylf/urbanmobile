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




class modalPrinciple extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            getPrin: [],
            principle_cd: '',
            principle_name: '',       
            itemPrinciple: ''
         }
    }
    componentDidMount() {
        const data = {
            
        }
       
        this.setState(data, () => {
           
            this.getPrinciples();
            this.selectedItem();
            // this.getDataFollowUp(this.props.datas)
            // this.getStatus()
        });
        
        isMount = true;
        // const { email } = this.state.email;
        // console.log("email",email);
    }

    // getPrinciples = () => {
    //     fetch(urlApi+"c_principal/zoomPrincipal/IFCAPB/", {
    //         method: "GET"
    //     })
    //         .then(response => response.json())
    //         .then(res => {
    //             console.log("principle", res);
    //             if (!res.Error) {
    //                 this.setState({ getPrin: res.Data });
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };
    getPrinciples = () => {

        {isMount ?
            fetch(urlApi + 'c_principal/zoomPrincipal/IFCAPB/',{
                method:'GET',
                // body: JSON.stringify({salutation})
                // headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                   
                    console.log('principle',res);
                    this.setState({getPrin:resData});
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                // console.log('salutation',res);
            }).catch((error) => {
                console.log(error);
            })
            :null}

    }

    selectedItem = (itemPrinciple)=>{
        console.log('item select lot no',itemPrinciple);
        
        
        // alert(val);
        
        
        // alert(val);
        if(itemPrinciple){
            // setTimeout(()=> {Actions.refresh({dataItem: itemPrinciple})}, 500); Actions.pop();
            this.setState({principle_cd : props.itemPrinciple},()=>{
                Actions.pop({itemPrinciple : this.state.principle_cd })
            })
            // Actions.pop({itemPrinciple: itemPrinciple})
            // this.setState({principle_cd : item.value})
            // this.setState({principle_name: item.label})
            // this.setModalVisible(!this.state.modalVisible)
        }
        // this.setModalVisible(!this.state.modalVisible)
       
    }

    // selectedItem(e) {
    //     console.log('e',e)
    //     // this.setState({
    //     //   dataqr: e.data,
    //     //   status: "Coba Lagi"
    //     // });
    //     // Alert.alert(
    //     //   "QR Code",
    //     //   "Code : " + e.data,
    //     //   [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    //     //   { cancelable: false }
    //     // );
    //     // setTimeout(()=> {Actions.refresh({meterId: e.data})}, 500); Actions.pop();
    //   }


    

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
                                {"Choose Principle"}
                            </Text>
                        </Body>
                        <Right style={styles.right}></Right>
                    </Header>

                    <Content>
                        <ScrollView>
                        {this.state.getPrin.map((itemPrinciple,key)=>
                            <View key={key} >
                                <ListItem >
                                    <TouchableOpacity 
                                    onPress={() => this.selectedItem(itemPrinciple)}
                                    // onPress={this.selectedItem.bind(this)}
                                    >
                                        <Text style={{color: '#fff'}}>{itemPrinciple.label}</Text>
                                    </TouchableOpacity>
                                </ListItem>
                                {/* <Text>{item.value}</Text> */}
                            </View>
                        )}
                        </ScrollView>
                    </Content>

                </ImageBackground>
            </Container>
        );
    }
}
export default modalPrinciple;

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

