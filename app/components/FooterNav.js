import React from "react";
import { Button, Text, Footer, FooterTab, Badge } from "native-base";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { Actions } from "react-native-router-flux";
import Icon_ from "react-native-vector-icons/FontAwesome";
import PushNotification from "react-native-push-notification";

export default class FooterNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      isLoaded: false,

      pushData: [],
    };

    console.log("pushData", this.state.pushData);
  }

  async componentDidMount() {
    const data = {
      token: await _getData("@Token"),
    };

    console.log("datra", data);

    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 2000);

    let self = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification here

        // required on iOS only
        // notification.finish(PushNotificationIOS.FetchResult.NoData);

        // process the notification
        self._addDataToList(notification);
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: "945884059945",
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
  _addDataToList(data) {
    let array = this.state.pushData;
    array.push(data);
    this.setState({
      pushData: array,
    });
    console.log("adddatatolist", this.state.pushData);
  }
  render() {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: "white" }}>
          <Button vertical onPress={() => Actions.home()}>
            <Icon_
              name="home"
              color="#b7b7b7"
              style={{ color: "#b7b7b7", fontSize: 24 }}
            />
            <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
              Home
            </Text>
          </Button>
          <Button vertical onPress={() => Actions.Menu()}>
            <Icon_
              name="newspaper-o"
              style={{ color: "#b7b7b7", fontSize: 24 }}
            />
            <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
              News
            </Text>
          </Button>
          {this.state.pushData != 0 ? (
            <Button badge vertical>
              <Badge style={{ top: 8 }}>
                <Text>{this.state.pushData.length}</Text>
              </Badge>

              <Icon_ name="bell" style={{ color: "#AB9E84", fontSize: 24 }} />
              <Text style={{ color: "#AB9E84", textTransform: "capitalize" }}>
                Notification
              </Text>
            </Button>
          ) : (
            <Button badge vertical>
              <Icon_ name="bell" style={{ color: "#AB9E84", fontSize: 24 }} />
              <Text style={{ color: "#AB9E84", textTransform: "capitalize" }}>
                Notification
              </Text>
            </Button>
          )}
          <Button vertical onPress={() => Actions.akun()}>
            <Icon_ name="user" style={{ color: "#b7b7b7", fontSize: 24 }} />
            <Text style={{ color: "#b7b7b7", textTransform: "capitalize" }}>
              Profile
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
