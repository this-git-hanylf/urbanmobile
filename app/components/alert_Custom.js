import React, { Component } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Modal,
  View,
  Text
} from "react-native";
import { Button } from "native-base";
import {
  Scene,
  Router,
  Actions,
  Stack,
  ActionConst
} from "react-native-router-flux";

import { _storeData, _getData } from "@Component/StoreAsync";
import { Style, Colors, Fonts } from "../Themes/index";

export default class alertCustom extends Component {
  constructor() {
    super();

    this.state = {
      Alert_Visibility: false
    };
    isMount = true;
  }

  Show_Custom_Alert(visible) {
    this.setState({ Alert_Visibility: visible });
  }

  render() {
    // if(!this.state.isLoaded){
    //   return(
    //       <ActivityIndicator />
    //   )
    // } else {
    return (
      <Modal
        visible={this.state.Alert_Visibility}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => {
          this.Show_Custom_Alert(!this.state.Alert_Visibility);
        }}
        // activeOpacity={1}
      >
        <View
          style={{
            // backgroundColor: "red",
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "70%",
              height: "20%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.type.proximaNovaReg,
                fontSize: 17,
                paddingBottom: 15
              }}
            >
              Please Sign in to Access
            </Text>
            <View>
              <Button
                style={{
                  backgroundColor: Colors.goldUrban,
                  height: 40,
                  width: 100,
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.Show_Custom_Alert(!this.state.Alert_Visibility);
                }}
                // activeOpacity={0.7}
              >
                <Text>OK</Text>
              </Button>
            </View>
            {/* <Button
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                    }}
                  >
                    <Text>Ok</Text>
                  </Button> */}
          </View>
        </View>
      </Modal>
    );
  }
}

// }

// export default alertCustom;
