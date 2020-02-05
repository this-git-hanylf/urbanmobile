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
    FlatList
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
    List,
    ListItem
} from "native-base";

import NavigationService from "@Service/Navigation";

// import PROPERTIES from "./Properties";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    "window"
);
let isMount = false;

// create a component
class ProjectLocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hd: null,

            chooselocation: [],
            arrayholder: [],
            // location:'bekasi'
        };
        console.log("props", this.props);
    }

    async componentDidMount() {
        isMount = true;
        
        // console.log('Data Project',await _getData('@UserProject'));
   

        const data = {
            hd: new Headers({
                Token: await _getData("@Token")
            }),
            loc: this.props.location.location,
            email :  await _getData('@User'),
            // name : await _getData('@Name'),
            // dataTower : await _getData('@UserProject'),
        };
        console.log('data',data)
        this.setState(data, () => {
            this.chooseLocation();
        });
    }

    chooseLocation = () => {
        const item = this.props.location;
        console.log('itemchoose',item)
        {
            isMount
                ? fetch(
                      urlApi +
                          "c_location/chooseLocation/IFCAMOBILE/"+item.location,
 
                      {
                          method: "GET",
                          headers: this.state.hd
                      }
                  )
                      .then(response => response.json())
                      .then(res => {
                          if (!res.Error) {
                              const resData = res.Data;
                              this.setState({ chooselocation: resData });
                          } else {
                              this.setState(
                                  { isLoaded: !this.state.isLoaded },
                                  () => {
                                      alert(res.Pesan);
                                  }
                              );
                          }
                        //   this.setState({arrayholder: res.Data}) ;
                          console.log("chooseLocation", res);
                      })
                      .catch(error => {
                          console.log(error);
                      })
                : null;
        }
    };
    componentWillReceiveProps(props){
        // props dari B
        const chooseloc = props.location; // props dari B
        console.log('props chooseloc',chooseloc);
        if(chooseloc){
            this.setState({location: chooseloc.value});
        }
    }
   

    // searchFilterFunction = text => {
    //     console.log('text',text);
    //     const newData = this.state.arrayholder.filter(item => {const itemData = `${item.location.toUpperCase()}`;
    //     const textData = text.toUpperCase();
    //     return itemData.indexOf(textData) > -1 ;
    // });
    //     this.setState({location: newData});
    // }

    selectedItem = (item)=>{
        console.log('item select location',item);
        
        
        // alert(val);
        
        
        // alert(val);
        // onPress={()=>Actions.propertydetail({items:item})}
        if(item){
            Actions.propertydetail({items:item})
                // setTimeout(() => {
                //     Actions.refresh({itemBank: item});
                // }, 0);
        }
        // this.setModalVisible(!this.state.modalVisible)
       
    }

    // goTo(item) {
    //     const data = this.props.items;
    //     data['zoneCd'] = item.zone_cd;
    //     if(item.zone_cd == 'NA'){
    //         alert('Not available unit');
    //     }else{
    //         _navigate("categoris", { items: data });
    //     }
        
    // }

    render() {
        // let loc = this.state.location;
        // console.log('loc',loc);
        return (
            <Container style={Style.bgMain}>
            <StatusBar
                backgroundColor={Colors.statusBarNavy}
                animated
                barStyle="light-content"
            />
            {/* <Header style={Style.navigation}>
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
                        {"Unit Group".toUpperCase()}
                    </Text>
                </View>
                <View style={Style.actionBarRight} />
            </Header> */}

            <Content style={Style.layoutInner}
                contentContainerStyle={Style.layoutContent}>
                <View style={[Style.actionBarLeft,{paddingTop: 35,paddingLeft:20}]}>
                    <Button
                        transparent
                        style={Style.actionBarBtn}
                        onPress={Actions.pop}
                    >
                        <Icon
                            active
                            name="arrow-left"
                            style={[Style.textBlack,{fontSize: 25}]}
                            type="MaterialCommunityIcons"
                        />
                    </Button>
                </View>

                <View style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 10,paddingTop: 30, justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Item searchBar style={{height: 40,width: '93%', borderRadius: 10, backgroundColor: Colors.grey, color: Colors.greyUrban}} 
                    onPress={()=>Actions.pop()}>
                        
                        <Input 
                        // placeholder="Search" 
                        style={{color: Colors.navyUrban, fontSize: 16, marginLeft: 15, fontFamily: Fonts.type.proximaNovaReg,
                        letterSpacing: 1}}
                        value={this.state.loc} 
                        // onChangeText={val =>
                        //     this.setState({ location: val })
                        // }
                        editable={false}
                        ref="location"
                        // onChangeText={this.handleSearch}
                        // onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                        />
                        <Icon name="ios-close" style={{color: Colors.greyUrban,fontSize: 28,marginRight: 10}} onPress={()=>Actions.pop()}/>
                        {/* <Icon name="ios-card" style={{color: '#000'}} /> */}
                    </Item>
                </View>

                {this.state.chooselocation == 0 ? <ActivityIndicator color="#000" style={{paddingTop: 10}}/> :
                    <List>
                    <FlatList          
                        data={this.state.chooselocation}
                        style={Styles.item} 
                        keyExtractor={item => item.RowID}    
                            
                        renderItem={({ item }) => ( 
                            // <ListItem  >
                                <TouchableOpacity onPress={() => this.selectedItem(item)} style={{width: '100%'}}>
                                        {/* <View >
                                            <Text style={{color: '#000'}}>{item.location}</Text>
                                        </View> */}
                                        <View style={Styles.record}>
                                            <View style={Styles.itemInfo}>
                                                <Text
                                                    style={Styles.itemTitle}
                                                >
                                                    {item.project_descs}
                                                </Text>
                                                <Text
                                                    style={Styles.itemTitle}
                                                >
                                                    {item.location}
                                                </Text>
                                            </View>
                                            
                                        </View>
                                    </TouchableOpacity>
                                
                            // </ListItem>
                            
                        )}          
                                                
                    />            
                    </List>
                }
               
            </Content>

           
        </Container>
        );
    }
}

//make this component available to the app
export default ProjectLocation;
