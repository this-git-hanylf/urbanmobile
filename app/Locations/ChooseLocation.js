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
class ChooseLocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hd: null,

            location: [],
            arrayholder: []
        };
        console.log("props", this.props);
    }

    async componentDidMount() {
        isMount = true;

        const data = {
            hd: new Headers({
                Token: await _getData("@Token")
            })
        };
        this.setState(data, () => {
            this.getLocation();
        });
    }

    getLocation = () => {
        // const item = this.props.items;
        {
            isMount
                ? fetch(
                      urlApi +
                          "c_location/getLocation/ifca3/",
                          
                      {
                          method: "GET",
                          headers: this.state.hd
                      }
                  )
                      .then(response => response.json())
                      .then(res => {
                          if (!res.Error) {
                              const resData = res.Data;
                              this.setState({ location: resData });
                          } else {
                              this.setState(
                                  { isLoaded: !this.state.isLoaded },
                                  () => {
                                      alert(res.Pesan);
                                  }
                              );
                          }
                          this.setState({arrayholder: res.Data}) ;
                          console.log("getLocation", res);
                      })
                      .catch(error => {
                          console.log(error);
                      })
                : null;
        }
    };

    searchFilterFunction = text => {
        console.log('text',text);
        const newData = this.state.arrayholder.filter(item => {const itemData = `${item.location.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1 ;
    });
        this.setState({location: newData});
    }

    selectedItem = (item)=>{
        console.log('item select location',item);
        
        
        // alert(val);
        
        
        // alert(val);
        if(item){
            Actions.ProjectLocation()
                setTimeout(() => {
                    Actions.refresh({location: item});
                }, 0);
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
                    <Item searchBar style={{height: 40,width: '93%', borderRadius: 10, backgroundColor: Colors.grey, color: Colors.greyUrban}} >
                        
                        <Input placeholder="Search" 
                        style={{color: Colors.navyUrban, fontSize: 16, marginLeft: 15, fontFamily: Fonts.type.proximaNovaReg,
                        letterSpacing: 1}} 
                        // onChangeText={this.handleSearch}
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                        />
                        <Icon name="ios-search" style={{color: Colors.greyUrban}}/>
                        {/* <Icon name="ios-card" style={{color: '#000'}} /> */}
                    </Item>
                </View>

                {this.state.location == 0 ? <ActivityIndicator color="#000" style={{paddingTop: 10}}/> :
                       <List>
                        <FlatList          
                           data={this.state.location}
                           style={Styles.item} 
                            keyExtractor={item => item.location}    
                             
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
                                                        {item.location}
                                                    </Text>
                                                </View>
                                                <View style={Styles.trash}>
                                                    <Icon
                                                        name="arrow-right"
                                                        type="MaterialCommunityIcons"
                                                        style={
                                                            Styles.itemIcon
                                                        }
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    
                                // </ListItem>
                                
                            )}          
                                                    
                        />            
                        </List>
                    }

                {/* <View style={Styles.section}>
                    <FlatList
                        data={this.state.location}
                        style={Styles.item}
                        keyExtractor={item => item.location}
                        renderItem={({ item, separators }) => (
                            <TouchableHighlight
                                underlayColor="transparent"
                                // onPress={() => this.goTo(item)}
                                onPress={() => this.selectedItem(item)}
                            >
                                <View style={Styles.record}>
                                    <View style={Styles.itemInfo}>
                                        <Text
                                            style={Styles.itemTitle}
                                        >
                                            {item.location}
                                        </Text>
                                    </View>
                                    <View style={Styles.trash}>
                                        <Icon
                                            name="arrow-right"
                                            type="MaterialCommunityIcons"
                                            style={
                                                Styles.itemIcon
                                            }
                                        />
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                        
                </View> */}

            </Content>

            {/* <Content
                style={Style.layoutInner}
                contentContainerStyle={Style.layoutContent}
            >
                <ImageBackground style={Styles.homeBg}>
                    <View style={Styles.section}>
                        {this.state.tower.length == 0 ? (
                            <ActivityIndicator />
                        ) : (
                            <FlatList
                                data={this.state.tower}
                                style={Styles.item}
                                keyExtractor={item => item.rowID}
                                renderItem={({ item, separators }) => (
                                    <TouchableHighlight
                                        underlayColor="transparent"
                                        onPress={() => this.goTo(item)}
                                    >
                                        <View style={Styles.record}>
                                            <Image
                                                source={{
                                                    uri: item.picture_url
                                                }}
                                                style={Styles.itemImg}
                                            />
                                            <View style={Styles.itemInfo}>
                                                <Text
                                                    style={Styles.itemTitle}
                                                >
                                                    {item.descs}
                                                </Text>
                                            </View>
                                            <View style={Styles.trash}>
                                                <Button
                                                    transparent
                                                    onPress={() => {
                                                        NavigationService.navigate(
                                                            "MemberFavorites"
                                                        );
                                                    }}
                                                >
                                                    <Icon
                                                        name="arrow-right"
                                                        type="FontAwesome"
                                                        style={
                                                            Styles.itemIcon
                                                        }
                                                    />
                                                </Button>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )}
                            />
                        )}
                    </View>
                </ImageBackground>
            </Content>
        */}
        </Container>
        );
    }
}

//make this component available to the app
export default ChooseLocation;
