const React = require("react-native");
import { StyleSheet, Dimensions } from "react-native";
const { Platform } = React;
import { Fonts, Metrics, Colors } from "../Themes/";
const dh = Dimensions.get("window").height;
const dw = Dimensions.get("window").width;

export default {
  slider_unit: {
    // marginTop: 8,
    marginTop: 10, //marginn top paralax
    overflow: "visible" // for custom animations
  },
  item_unit: {
    width: dw - 60,
    height: dw / 2
  },
  newsTitleText_small: {
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: 16,
    // fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 4
  },
  newsTitle: {
    position: "absolute",
    borderRadius: 5,
    left: 0,
    bottom: 0,
    // width : dw - 60,
    width: 250,
    // height: 30,
    backgroundColor: Colors.goldUrban,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain"
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    width: 250 //Untuk mengecilkan parallax tower
  },
  itemBoxAmen_not_gold: {
    // resizeMode: 'cover',
    width: 145,
    height: 145,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: Colors.goldUrban,
    borderRadius: 5,
    // elevation: 10,
    shadowOffset: {
      width: 15,
      height: 15
    }
    // shadowColor: "grey",
    // shadowOpacity: 0.1,
    // shadowRadius: 0,
  },
  itemAmen_not_gold: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  layoutContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  homeBg: {
    flex: 1,
    paddingBottom: 30
  },

  section: {
    flex: 1,
    paddingLeft: 0,
    alignItems: "center",
    width: "100%"
  },
  trash: {
    justifyContent: "center"
  },

  item: {
    width: "100%",
    flexDirection: "column"
  },
  record: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DDD",
    marginLeft: 0,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    justifyContent: "center"
  },
  recordLast: {
    flexDirection: "row",
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingVertical: 15
  },
  itemImg: {
    width: 100,
    height: 68,
    borderRadius: 5
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 15
  },
  itemTitle: {
    color: "#333",
    fontSize: 14,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginTop: 32,
    lineHeight: 16
  },
  itemLocation: {
    color: "#666",
    fontSize: 11,
    fontFamily: Fonts.type.sfuiDisplaySemibold,

    marginBottom: 5,
    lineHeight: 16
  },
  itemDate: {
    color: "#999",
    fontSize: 10,
    fontFamily: Fonts.type.sfuiDisplaySemibold
  },
  itemRow: {
    flexDirection: "row"
  },
  itemOverview: {
    flexGrow: 1,
    flexDirection: "row"
  },
  overview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  titleGold: {
    // color: colors.gold,
    color: Colors.goldUrban,
    fontFamily: Fonts.type.proximaNovaBoldWeb,
    letterSpacing: 1.5,
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 15
  },
  slider: {
    width: "100%"
  },
  sliderImg: {
    width: 200,
    height: 150,
    marginRight: 10,
    borderRadius: 5
  },
  itemIcon: {
    color: "#999",
    marginRight: 5,
    fontSize: 18
  },
  itemNo: {
    color: "#333",
    marginRight: 5,
    fontFamily: Fonts.type.sfuiDisplaySemibold,

    marginTop: 5,
    fontSize: 12
  },

  crv: {
    borderRadius: 8
  },
  sHeader: {
    color: "#333",
    fontSize: 14,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginTop: 5,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  cHeader: {
    color: "#333",
    fontSize: 14,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginTop: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    marginRight: 100
  },
  sBtn: {
    padding: 1,
    // backgroundColor: "#fb5f26",
    backgroundColor: Colors.blueUrban,
    color: "#FFF",
    width: 120
  },
  sLink: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: Fonts.type.sfuiDisplaySemibold
  },
  headerUnit: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingTop: 16
  },
  city: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },
  btnCity: {
    width: "30%",
    height: 75,
    marginBottom: 10,
    marginTop: 16,
    backgroundColor: "#DFE3EE",
    borderRadius: 10,
    shadowColor: "#eee",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 2,
    shadowRadius: 2,
    elevation: 1
  },
  btnCityImg: {
    flex: 1
  },
  btnCityLocation: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: 75,
    justifyContent: "center",
    alignItems: "center"
  },
  btnCityText: {
    color: "#8B9DC3",
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 12
  },

  flatCity: {
    paddingLeft: 20
  },
  itemCity: {
    width: 150,
    marginLeft: 5,
    marginRight: 5
  },
  itemCityCount: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 64
  },
  itemCityLocation: {
    color: "#FFF",
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 13
  },
  itemCityImg: {
    marginBottom: 10,
    width: 150,
    height: 64,
    borderRadius: 5,
    textAlign: "center"
  }
};
