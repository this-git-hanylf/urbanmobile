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
  TextInput,
  FlatList
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
  InputGroup,
  List
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

class modalBankMaster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      getbank: [],
      itemBank: "",
      isLoaded: true,
      // fullData: [],
      arrayholder: []
    };
    //  this.arrayholder = [];
  }
  componentDidMount() {
    const data = {};

    this.setState(data, () => {
      this.getBank();
      this.selectedItem();
      this.searchFilterFunction();
      // this.getDataFollowUp(this.props.datas)
      // this.getStatus()
    });

    isMount = true;
    // const { email } = this.state.email;
    // console.log("email",email);
  }

  searchFilterFunction = text => {
    console.log("text", text);
    const newData = this.state.arrayholder.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ getbank: newData });
  };

  getBank = () => {
    {
      isMount
        ? fetch(urlApi + "c_bank_master/zoomBank/IFCAMOBILE/", {
            method: "GET"
            // body: JSON.stringify({salutation})
            // headers : this.state.hd,
          })
            .then(response => response.json())
            .then(res => {
              if (!res.Error) {
                const resData = res.Data;

                console.log("bank name", res);

                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  // alert(res.Pesan)
                  this.setState({ getbank: resData });
                });
              } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                  alert(res.Pesan);
                });
              }
              this.setState({ arrayholder: res.Data });
              // console.log('array',arrayholder);
              // console.log('salutation',res);
            })
            .catch(error => {
              console.log(error);
            })
        : null;
    }
  };

  selectedItem = item => {
    console.log("item select bank", item);

    // alert(val);

    // alert(val);
    if (item) {
      Actions.pop();
      setTimeout(() => {
        Actions.refresh({ itemBank: item });
      }, 0);
    }
    // this.setModalVisible(!this.state.modalVisible)
  };

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
                {"Choose Bank Name"}
              </Text>
            </Body>
            <Right style={styles.right}></Right>
          </Header>
          <StatusBar
            backgroundColor={Colors.statusBarNavy}
            animated
            barStyle="light-content"
          />

          <View
            style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 10 }}
          >
            <Item searchBar rounded style={{ height: 40 }}>
              <Icon name="ios-search" style={{ color: "#fff" }} />
              <Input
                placeholder="Search"
                style={{ color: "#fff", fontSize: 14 }}
                // onChangeText={this.handleSearch}
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
              />
              <Icon name="ios-card" style={{ color: "#fff" }} />
            </Item>
          </View>

          {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList          
                            data={this.state.getbank}    
                            keyExtractor={item => item.rowID}      
                            renderItem={({ item }) => ( 
                                <ListItem>
                                    <TouchableOpacity 
                                        >
                                            <View onPress={() => this.selectedItem(item)}>
                                                <Text style={{color: '#fff'}}>{item.label}</Text>
                                            </View>
                                           
                                        </TouchableOpacity>
                                    
                                </ListItem>
                                
                            )}          
                                                    
                        />            
                        </List> */}
          {this.state.getbank == 0 ? (
            <ActivityIndicator color="#fff" style={{ paddingTop: 10 }} />
          ) : (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.getbank}
                keyExtractor={item => item.label}
                renderItem={({ item }) => (
                  <ListItem>
                    <TouchableOpacity
                      onPress={() => this.selectedItem(item)}
                      style={{ width: "100%" }}
                    >
                      <View>
                        <Text style={{ color: "#fff" }}>{item.label}</Text>
                      </View>
                    </TouchableOpacity>
                  </ListItem>
                )}
              />
            </List>
          )}

          {/* <Content>
                          
                    {this.state.getbank == 0 ? <ActivityIndicator color="#fff" /> :
                        <ScrollView>
                        {this.state.getbank.map((itemBank,key)=>
                            <View key={key} style={{paddingRight: 15}}>
                               
                                 <ListItem >
                                    <TouchableOpacity 
                                    onPress={() => this.selectedItem(itemBank)}
                                    // onPress={this.selectedItem.bind(this)}
                                    >
                                        <Text style={{color: '#fff'}}>{itemBank.label}</Text>
                                    </TouchableOpacity>
                                </ListItem>
                                
                               
                            </View>
                        )}
                        </ScrollView>
                    }
                    </Content> */}
        </ImageBackground>
      </Container>
    );
  }
}
export default modalBankMaster;

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
