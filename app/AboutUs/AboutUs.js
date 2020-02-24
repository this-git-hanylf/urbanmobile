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
    Clipboard
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
    Label
} from "native-base";

// import NavigationService from "@Service/Navigation";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts } from "../Themes";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from '@Component/numFormat'
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import moment from "moment";
// import ImageViewer from 'react-native-image-zoom-viewer';

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get('window')
let isMount = false;


class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
           
        };
      
        // console.log()
        isMount=true
      
        // this.showAlert = this.showAlert.bind(this);

      

    }

    async componentDidMount() {
        isMount = true;
       
        const data = {
          
        };
        console.log('data',data);

        this.setState(data, () => {
          
           
        });

       

    }

    componentWillUnmount(){
      // this.setState({isMount:false})
      isMount =false
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
                    <View style={{top:25, paddingBottom: 35}}>
                        <View style={{paddingLeft: 15,paddingTop: 15}}>
                            <Button
                                transparent
                                style={Style.actionBarBtn}
                                onPress={Actions.pop}
                                >
                                <Icon
                                    active
                                    name="arrow-left"
                                    // style={[Style.textWhite,{fontSize: 28}]}
                                    style={{color: Colors.navyUrban}}
                                    type="MaterialCommunityIcons"
                                />
                            </Button>
                        </View>
                    </View>
                    <View>
                        <Text 
                        style={{
                            fontWeight:'900', 
                            color: Colors.goldUrban ,
                            fontSize: 16,
                            textAlign: 'center',
                            fontFamily: Fonts.type.proximaNovaBold,
                            letterSpacing: 1
                                }}
                        // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
                        >
                            ABOUT US
                            
                            {/* {this.state.projectdesc} */}
                        </Text>
                        
                        {/* <Text>{jam}:{menit}</Text> */}
                    </View>
                    
                    <ScrollView>
                        <View >
                            <Image source={require("../Images/logo4.png")} style={Styles.styleLogo} >
                            {/* <Image source={require("../Images/logo.png")} style={Styles.styleLogo} > */}

                            </Image>
                            {/* <Text>tes</Text> */}
                        </View>

                        <View style={{alignSelf:'center', marginTop: 20}}>
                            <Text style={Styles.textContact}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>
                            <Text style={Styles.textContact}>
                                Lot 28, Jl. Jendral Sudirman Kav. 52-53,
                            </Text>
                            <Text style={Styles.textContact}>
                               Jakarta Selatan, 12190
                            </Text>
                            <View style={{flexDirection:'row',marginTop: 20,alignSelf:'center',}}>
                                <Text style={[Styles.textContactBold,{paddingRight: 5}]}>
                                    P.
                                </Text>
                                <Text style={Styles.textContact}>
                                    021 - 4011 1717
                                </Text>
                            </View>
                            

                            <View style={{flexDirection:'row',alignSelf:'center',}}>
                                <Text style={[Styles.textContactBold,{paddingRight: 5}]}>
                                    E.
                                </Text>
                                <Text style={Styles.textContact}>
                                    sales@ujp.co.id
                                </Text>
                            </View>
                            
                            
                        </View>

                    </ScrollView>
                    
               
              
               
           </Container>
        );
    }
}

//make this component available to the app
export default AboutUs;

