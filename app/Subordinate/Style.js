import { Platform, StyleSheet, Dimensions } from "react-native";
// Screen Styles
import { Fonts, Metrics, Colors } from "../Themes";

const Style = {
  backgroundImage: {
    flex: 1,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    resizeMode: "contain"
    // backgroundColor: "#febe29"
  },
  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.2,
    // width: Metrics.WIDTH * 0.1,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
        marginTop: Fonts.moderateScale(25)
      }
    }),
    elevation: 0
  },
  body: {
    // flex: 1,
    alignItems: "center",
    // textAlign: "center",
    // width: "100%",
    // alignSelf: "center",
    backgroundColor: "transparent"
    // top: 30
    // left: 30
  },
  right: {
    flex: 0.6
  },
  left: {
    flex: 0.5,
    marginLeft: 10,
    backgroundColor: "transparent"
  },
  textHeaderGold: {
    fontWeight: "900",
    color: Colors.goldUrban,
    fontSize: 16,
    textAlign: "center",
    fontFamily: Fonts.type.proximaNovaBold,
    letterSpacing: 1
  },
  textHeaderGoldSmall: {
    // fontWeight: "900",
    paddingTop: 5,
    color: Colors.goldUrban,
    fontSize: 14,
    textAlign: "center",
    fontFamily: Fonts.type.proximaNovaReg,
    letterSpacing: 1,
    textTransform: "uppercase"
  }
};
export default Style;
