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
import styles from "./Style";
import { Style, Colors, Fonts } from "../Themes";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import TabBarGold from "@Component/TabBarGold";
import SubOfficeAgents from "./SubOfficeAgents";
import SubAgents from "./SubAgents";
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Sae } from 'react-native-textinput-effects';
// import FloatingLabelInput from "@Component/FloatingLabelInput";

class Subordinate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: true,
      angka: "",
      nam: "",
      agent_name: "",
      navState: {
        index: 0,
        routes: [
          {
            key: "subofficeagent",
            title: "OFFICE AGENTS (0)"
            // angka: `${angka}`
          },
          { key: "subagent", title: "AGENTS (0)" }
        ]
      },

      navScene: {
        subofficeagent: SubOfficeAgents,
        subagent: SubAgents
      }
      // fullData: [],
    };
    //  this.arrayholder = [];
  }
  async componentDidMount() {
    // const agent_name = await _getData("@Name");
    // console.log("agentname", agent_name);

    const data = {
      agent_name: await _getData("@Name")
      //   angka: 1
    };

    this.setState(data, () => {
      // this.getDataFollowUp(this.props.datas)
      // this.getStatus()
    });
    this.setState({ angka: 1 });
    console.log("angka", this.state.angka);

    isMount = true;
    // const { email } = this.state.email;
    // console.log("email",email);
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
            {/* <Body style={styles.body}>
              <Text
                style={[
                  Style.textWhite,
                  Style.textMedium,
                  { textAlign: "center" }
                ]}
              >
                {"Subordinate"}
              </Text>
            </Body> */}
            <Right style={styles.right}></Right>
          </Header>
          <StatusBar
            backgroundColor="transparent"
            animated
            barStyle="light-content"
          />

          <Content>
            <ScrollView>
              <View style={{ textAlign: "center" }}>
                <Text style={styles.textHeaderGold}>
                  {this.state.agent_name}
                </Text>
                <Text style={styles.textHeaderGoldSmall}>Subordinate</Text>
                <Text>{this.state.nam}</Text>
              </View>

              <TabBarGold
                navState={this.state.navState}
                navScene={this.state.navScene}
                style={{ paddingTop: 10 }}
              />
            </ScrollView>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
export default Subordinate;
