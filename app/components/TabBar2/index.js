import * as React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Animated from "react-native-reanimated";
import { Colors, Fonts } from "../../Themes";

const dw = Dimensions.get("window").width;

export default class TabViewExample extends React.PureComponent {
  state = this.props.navState;

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 255 : 0
                )
              })
            ),
            0,
            0
          );

          const borderColor = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 255 : 0
                )
              })
            ),
            0,
            0
          );

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.View
                style={[styles.border, { borderColor: borderColor }]}
              >
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap(this.props.navScene);

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        // renderTabBar={this._renderTabBar}
        renderTabBar={props => (
          <TabBar
            {...props}
            activeColor={Colors.navyUrban}
            inactiveColor={"#888"}
            // inactiveStyle={{ backgroundColor: "#fff" }}
            indicatorStyle={{
              backgroundColor: Colors.goldUrban,
              fontFamily: Fonts.type.proximaNovaBoldWeb
            }}
            style={{
              backgroundColor: "#fff"
            }}
            contentContainerStyle={{ color: "red" }}
            renderLabel={({ route, focused, color }) => (
              <Text
                style={{
                  color,
                  fontFamily: Fonts.type.proximaNovaBoldWeb,
                  fontSize: 16
                }}
              >
                {route.title}
              </Text>
            )}
          />
        )}
        onIndexChange={this._handleIndexChange}
        style={{ color: "#fff", backgroundColor: "#fff" }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: "row"
    // paddingTop: 20,
  },
  tabItem: {
    // flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 1
    // backgroundColor: "#2323"
  },
  border: {
    padding: 8,
    borderBottomWidth: 2,
    // width : dw  * 0.2,
    alignItems: "center",
    // color: "#fff"
    borderColor: "#000"
  }
});
