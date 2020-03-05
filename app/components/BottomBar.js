import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text
} from "native-base";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
const TabIcon = ({ focused, iconName }) => {
  var color = focused ? "#AB9E84" : "#b7b7b7";
  var tintColor = focused ? "#AB9E84" : "#b7b7b7";
  return (
    <Icon
      name={iconName}
      color={color}
      size={24}
      style={{ marginTop: 8, color: tintColor }}
      textStyle={color}
    />
  );
};
export default class FooterTabsIconText extends Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {};
    // console.log()
    isMount = true;

    // this.camera = this.camera.bind(this);
  }

  render() {
    return (
      <Footer style={{ height: 50 }}>
        <FooterTab style={{ backgroundColor: "#fff", height: 50 }}>
          <Button vertical style={{ top: 5 }} icon={TabIcon}>
            {/* <Icon name="home" type="FontAwesome" style={{ fontSize: 24 }} /> */}

            <Text style={{ fontSize: 11, textTransform: "capitalize" }}>
              Home
            </Text>
          </Button>
          <Button
            vertical
            onPress={() => Actions.ListingProjectPage()}
            style={{ top: 5 }}
          >
            {/* onPress={()=>this.checkout()} */}
            <Icon
              name="building-o"
              type="FontAwesome"
              style={{ fontSize: 24 }}
            />
            <Text style={{ fontSize: 11, textTransform: "capitalize" }}>
              Progress
            </Text>
          </Button>
          <Button vertical style={{ top: 5 }}>
            <Icon
              active
              name="bars"
              type="FontAwesome"
              style={{ fontSize: 24 }}
            />
            <Text style={{ fontSize: 11, textTransform: "capitalize" }}>
              Menu
            </Text>
          </Button>
          <Button vertical style={{ top: 5 }}>
            <Icon name="bell" type="FontAwesome" style={{ fontSize: 24 }} />
            <Text
              style={{
                fontSize: 11,
                textTransform: "capitalize",
                width: 100,
                textAlign: "center"
              }}
            >
              Notification
            </Text>
          </Button>
          <Button vertical style={{ top: 5 }}>
            <Icon name="user" type="FontAwesome" style={{ fontSize: 24 }} />
            <Text style={{ fontSize: 11, textTransform: "capitalize" }}>
              Account
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
