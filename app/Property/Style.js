import { Platform, StyleSheet, Dimensions } from "react-native";
import { Fonts, Metrics, Colors } from "../Themes/";
const dh = Dimensions.get("window").height;
const dw = Dimensions.get("window").width;

export default {
  sectionTransparent: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: "transparent",
  },
  titleGold: {
    // color: colors.gold,
    color: Colors.goldUrban,
    fontFamily: Fonts.type.proximaNovaBoldWeb,
    letterSpacing: 1.5,
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 15,
  },
  titleWhiteSmall: {
    // color: colors.gold,
    color: Colors.white,
    fontFamily: Fonts.type.proximaNovaReg,
    letterSpacing: 1.5,
    alignItems: "center",
    textAlign: "center",
    paddingTop: 15,
    fontSize: 14,
    // textDecorationLine: 'underline',
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    marginHorizontal: 130,
    // width: 'auto'
  },
  signInBtnMedium: {
    backgroundColor: Colors.goldUrban,
    // height: Metrics.HEIGHT * 0.10,
    height: 40,
    width: 300,
    paddingLeft: 20,
    paddingRight: 20,
    // width: '100%',
    alignSelf: "center",
    elevation: 3,
    // shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    resizeMode: "contain",

    // backgroundColor: "#febe29"
  },
  scroll: {
    // flex: 1,
    width: Metrics.WIDTH,
    // height: Metrics.HEIGHT,
    // resizeMode: "contain",

    // backgroundColor: "#febe29"
  },
  layoutContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  shadow: {
    flex: 1,
    height: 20,
  },

  slider: {
    width: "100%",
  },
  sliderImg: {
    width: 200,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  coverImg: {
    flex: 1,
    height: 730,
  },

  section: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  price: {
    color: "#333",
    fontSize: 20,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  locationTop: {
    flexDirection: "row",
  },
  locationTopIcon: {
    color: "#999",
    fontSize: 20,
  },
  locationTopInfo: {
    color: "#999",
    fontSize: 12,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginTop: 3,
  },

  count: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#E6E4E4",
    width: dw,
  },
  countCol: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  countItem: {
    flexGrow: 1,
    borderRightWidth: 1,
    borderColor: "#E6E4E4",
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: dw * 0.333,
    alignItems: "center",
    justifyContent: "center",
  },
  countFirst: {
    paddingLeft: 20,
  },
  countNo: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  countText: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 12,
    color: "#999",
    flexWrap: "wrap",
    flex: 1,
    textAlign: "center",
  },
  countIcon: {
    marginRight: 10,
    fontSize: 24,
    width: null,
  },

  overview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  overview_location: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  overview_youtube: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  overviewTitle_youtube: {
    flex: 1,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 10,
    paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  overviewTitle: {
    flex: 1,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 10,
  },
  overviewTitle_surround: {
    flex: 1,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 10,

    paddingHorizontal: 10,
  },
  overviewDesc: {
    flex: 1,
    color: "#666",
    lineHeight: 20,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 13,
  },

  gallery: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#f0f0f0",
  },
  galleryTitle: {
    flex: 1,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 10,
    color: "#333",
  },
  galleryImg: {
    color: "#666",
    lineHeight: 20,
    minHeight: 200,
    marginTop: 24,
  },

  amenities: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  amenityTitle: {
    flex: 1,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 10,
    color: "#333",
  },

  amenity: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  amenityIcon: {
    // color: '#FCC300',
    // fontSize: 24,
    marginBottom: 5,
  },
  amenityItem: {
    color: "#666",
    fontSize: 12,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },

  location: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f0f0f0",
  },
  locationTitle: {
    flex: 1,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 10,
    color: "#333",
  },
  locationMap: {
    flex: 1,
    minHeight: 300,
  },

  owner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ownerTitle: {
    flex: 1,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 20,
    color: "#333",
  },
  ownerAvatar: {
    borderRadius: 80,
    borderWidth: 5,
    borderColor: "#DDD",
    padding: 5,
    alignItems: "center",
  },
  ownerAvatarImg: {
    borderRadius: 34,
  },
  ownerInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ownerName: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 16,
    color: "#333",
    marginTop: 20,
    marginBottom: 5,
    alignSelf: "center",
  },
  ownerLocation: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 12,
    color: "#999",
  },

  tabBorder: {
    // backgroundColor: '#DAD299',
    backgroundColor: Colors.blueUrban,
    borderWidth: 1,
    borderRadius: 20,
  },
  tabGrey: {
    backgroundColor: "#FFF",
    // backgroundColor: '#9CAEC6'
  },
  tabFeature: {
    // backgroundColor: '#FFF',
    backgroundColor: Colors.bluegreyUrban,
    // borderRadius: 20
  },
  tabGallery: {
    // backgroundColor: '#FFF',
    backgroundColor: Colors.bluegreyUrban,
    // borderRadius: 20
  },
  tabSimulasi: {
    // backgroundColor: '#FFF',
    backgroundColor: Colors.bluegreyUrban,
    // borderRadius: 20
  },
  tabText: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 12,
    color: Colors.greyUrban,
    // color: '#fff'
  },
  tabTextActive: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 12,
    color: "#333",
    // backgroundColor: '#DAD299',
    // height: 50
  },
  infoTab: {
    paddingVertical: 20,
  },
  infoItem: {
    alignItems: "flex-start",
    paddingVertical: 30,
  },
  infoItemLast: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoHeader: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: "#333",
    marginBottom: 5,
    fontSize: 12,
  },
  infoDesc: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: "#999",
    fontSize: 12,
  },

  formBg: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  col: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    borderBottomWidth: 0,
    borderColor: "#DDD",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  textInputHalf: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    borderBottomWidth: 0,
    borderColor: "#DDD",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: "48.5%",
    marginBottom: 10,
    borderRadius: 5,
  },
  textInputMulti: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    borderBottomWidth: 0,
    borderColor: "#DDD",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        height: 100,
        paddingTop: 20,
      },
      android: {
        textAlignVertical: "top",
      },
    }),
  },
  btn: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#FCC300",
    paddingVertical: 15,
    paddingLeft: 5,
  },
  btnText: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: "#333",
    fontSize: 14,
    alignSelf: "center",
  },

  formBtnText: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: "#333",
    fontSize: 12,
  },
  formBtnIcon: {
    color: "#333",
    fontSize: 24,
  },

  sectionGrey: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: "#f0f0f0",
  },
  flatList: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerBg: {
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  headerIcon: {
    fontSize: 24,
    color: "#333",
  },
  sHeader: {
    color: "#333",
    marginLeft: 3,
    fontSize: 14,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginTop: 5,
  },
  sBtn: {
    padding: 1,
    backgroundColor: "#e7e7e7",
    color: "#FFF",
  },
  sLink: {
    color: "#666",
    fontSize: 10,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  item: {
    width: 200,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    elevation: 10,
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  itemBoxAmen: {
    resizeMode: "cover",
    width: 165,
    height: 145,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.goldUrban,
    borderRadius: 5,
    elevation: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  itemBoxAmen_not_gold: {
    // resizeMode: 'cover',
    alignContent: 'center',
    
    width: 180,
    height: 170,
    marginBottom: 20,
    marginLeft: '15%',
    marginRight: 10,
    // backgroundColor: Colors.goldUrban,
    borderRadius: 5,
    // elevation: 10,
    shadowOffset: {
      width: 25,
      height: 15,
    },
    // shadowColor: "grey",
    // shadowOpacity: 0.1,
    // shadowRadius: 0,
  },
  itemImg: {
    marginBottom: 10,
    width: 200,
    height: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  itemAmen: {
    marginBottom: 10,
    width: "100%",
    height: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  itemAmen_not_gold: {
    marginBottom: 10,
    width: "90%",
    height: 160,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  itemFavorite: {
    position: "absolute",
    alignSelf: "flex-end",
    color: "#FF0000",
    marginTop: 10,
    paddingRight: 10,
  },
  itemPrice: {
    color: "#333",
    fontSize: 16,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    paddingHorizontal: 20,
  },
  itemTextAmenities: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.type.proximaNovaReg,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  itemLocation: {
    color: "#999",
    fontSize: 11,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 10,
    paddingHorizontal: 20,
    height: 30,
  },
  crv: {
    borderRadius: 8,
  },
  itemRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  itemOverview: {
    flexGrow: 1,
    flexDirection: "row",
  },
  itemIcon: {
    color: "#999",
    marginRight: 5,
    fontSize: 24,
  },
  itemNo: {
    color: "#333",
    marginRight: 5,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginTop: 5,
    fontSize: 14,
  },
  overviewHtml: {
    width: "100%",
    height: 400,
  },
  overviewWebView: {
    width: "100%",
    height: 400,
  },
  textMenu: { marginHorizontal: 8, flexDirection: "row", width: "60%" },
};
