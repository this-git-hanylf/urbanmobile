import { Platform, StyleSheet, Dimensions } from "react-native";
// Screen Styles
import { Fonts, Metrics, Colors } from "../Themes";
const Styles = StyleSheet.create({
  styleLogo: {
    marginBottom: 15,
    shadowColor: "#000",
    // shadowOffset: { width: 5, height: 3 },
    // shadowRadius: 2,
    // shadowOpacity: 0.1,
    // flex: 1,
    width: "100%",
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10
  },
  textContact: {
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: "justify",
    fontFamily: Fonts.type.proximaNovaReg,
    color: Colors.navyUrban,
    fontSize: 15
  },
  textContactBold: {
    textAlign: "center",
    fontFamily: Fonts.type.proximaNovaBold,
    color: Colors.navyUrban,
    fontSize: 15
  }
});

export default Styles;
