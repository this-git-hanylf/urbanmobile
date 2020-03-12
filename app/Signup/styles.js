import { Platform, StyleSheet, Dimensions } from "react-native";
// Screen Styles
import { Fonts, Metrics, Colors } from "../Themes";

const styles = {
  backgroundImage: {
    flex: 1,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    resizeMode: "contain"
    // backgroundColor: "#febe29"
  },
  backgroundImage2: {
    flex: 1,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    resizeMode: "contain"
    // backgroundColor: "#febe29"
  },
  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.15,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
        marginTop: Fonts.moderateScale(25)
      }
    }),
    elevation: 0
  },
  images: {
    top: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    width: 330,
    height: 120,
    borderRadius: 15
  },
  left: {
    flex: 0.5,
    backgroundColor: "transparent"
  },
  backArrow: {
    justifyContent: "center",
    alignItems: "center",
    width: 30
  },
  textRight: {
    justifyContent: "center",
    alignItems: "center",
    width: 90
  },
  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  textTitle: {
    color: Colors.white,
    fontSize: Fonts.moderateScale(16),
    alignSelf: "center",
    fontFamily: Fonts.type.sfuiDisplaySemibold
  },
  right: {
    flex: 0.5
  },

  inputFieldStyles: {
    height: Metrics.HEIGHT * 0.45,
    flex: 1,
    // justifyContent: "space-start",
    alignItems: "center"
  },

  containEmail: {
    backgroundColor: "#fff",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.92,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 0.18,
    borderBottomColor: "#f3f3f3"
  },
  containMid: {
    backgroundColor: "#fff",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.92,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 0.11,
    borderBottomColor: "#f3f3f3"
  },
  containMidPrincipleCode: {
    backgroundColor: "#fff",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.91,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 0.11,
    borderBottomColor: "#f3f3f3"
  },
  containMidLeadCode: {
    // backgroundColor: "#fff",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.52,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 0.18,
    borderBottomColor: "#f3f3f3",
    // backgroundColor: '#999',
    marginRight: 1
  },
  containMidAddress: {
    backgroundColor: "#fff",
    height: Metrics.HEIGHT * 0.2,
    width: Metrics.WIDTH * 0.92,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 0.18,
    borderBottomColor: "#f3f3f3"
  },
  inputEmail: {
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.84,
    color: "#000",
    paddingLeft: Fonts.moderateScale(10),
    fontFamily: Fonts.type.proximaNovaReg
  },
  inputAddress: {
    height: Metrics.HEIGHT * 0.2,
    width: Metrics.WIDTH * 0.9,
    // color: "#000",
    // paddingLeft: Fonts.moderateScale(10),
    fontFamily: Fonts.type.proximaNovaReg,
    // fontSize: 18,
    fontSize: 15,
    left: 15,
    // paddingBottom: 3,
    // backgroundColor: '#fff'
    color: "#fff"
  },
  inputEmailPrinciple: {
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.8,
    color: "#000",
    paddingLeft: Fonts.moderateScale(20),
    fontFamily: Fonts.type.proximaNovaReg
  },
  containPassword: {
    backgroundColor: "#fff",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.92,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3
  },
  containImageTop: {
    backgroundColor: "#fff",
    width: Metrics.WIDTH * 0.92,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3
  },
  containImageTop_no: {
    // backgroundColor: "#fff",
    width: Metrics.WIDTH * 0.92,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3
  },

  containImage: {
    backgroundColor: "#fff",
    width: Metrics.WIDTH * 0.92,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3
  },
  divider: {
    width: "100%",
    height: 0.5,
    // backgroundColor: "rgba(0,0,0,0.2)",
    left: 15,
    right: 15
  },
  signbtnSec: {
    width: "100%",
    backgroundColor: "#f3f3"
  },
  signInBtn: {
    // backgroundColor: Colors.loginBlue,
    height: Metrics.HEIGHT * 0.08,
    width: "100%",
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  signInBtnLarge: {
    backgroundColor: Colors.loginBlue,
    height: Metrics.HEIGHT * 0.1,
    paddingLeft: 20,
    paddingRight: 20,
    // width: '100%',
    alignSelf: "center",
    elevation: 3,
    // shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  signInBtnText: {
    color: "#fff",
    fontSize: Fonts.moderateScale(17),
    width: Metrics.WIDTH * 0.92,
    textAlign: "center",
    fontFamily: Fonts.type.proximaNovaReg
  },
  forgotPassword: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(15),
    height: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: Colors.transparent,
    fontFamily: Fonts.type.proximaNovaReg
  },
  socialSec: {
    height: Metrics.HEIGHT * 0.25,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: Fonts.moderateScale(20)
  },
  fbButton: {
    backgroundColor: "#3b5998",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.92,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3
  },
  fbButtonText: {
    color: Colors.snow,
    paddingLeft: Fonts.moderateScale(5),
    fontSize: Fonts.moderateScale(17),
    fontFamily: Fonts.type.proximaNovaReg
  },
  eye: {
    position: "absolute",
    right: 10,
    top: 9
  },
  checkboxWrap: {
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.84,
    color: "#000",
    paddingLeft: Fonts.moderateScale(10),
    fontFamily: Fonts.type.proximaNovaReg,
    alignItems: "center",
    flexDirection: "row",
    height: null,
    paddingTop: 8,
    paddingLeft: 0
  },
  iconSub: {
    fontSize: 6,
    color: "red",
    position: "absolute",
    left: 4,
    top: 3
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#333"
  },
  nbInput: {},
  marginround: {
    height: 45,
    marginBottom: 4,
    marginLeft: 12,
    marginRight: 12,
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: "#ffffff",
    textAlignVertical: "bottom"
  },
  inputAttach: {
    height: 40,
    // marginBottom: 4,
    paddingBottom: 15,
    marginLeft: 12,
    marginRight: 12,
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: "#ffffff"
    // textAlignVertical: 'bottom',
  },
  inputAttachLarge: {
    height: "auto",
    marginBottom: 4,
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 10,
    paddingTop: 10,
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: "#ffffff",
    textAlignVertical: "bottom"
  },
  textAttach: {
    color: "#777",
    fontFamily: Fonts.type.proximaNovaBoldWeb,
    position: "absolute",
    left: 10,
    fontSize: 13
  },
  marginrounderror: {
    height: 45,
    marginBottom: 4,
    marginLeft: 12,
    marginRight: 12,
    // backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderColor: "#ffffff",
    textAlignVertical: "bottom"
  },

  iconColor: {
    color: Colors.white,
    left: 15,
    fontSize: 20
  },
  positionTextInput: {
    fontSize: 15,
    left: 8,
    // paddingBottom: 3,
    // backgroundColor: '#fff'
    color: "#fff",
    fontFamily: Fonts.type.proximaNovaReg
  },
  positionTextInput_Bank: {
    fontSize: 15,
    left: 8,
    // paddingBottom: 3,
    // backgroundColor: '#fff'
    color: "#fff"
    // fontFamily: Fonts.type.proximaNovaReg
  },
  overviewTitles_Bank: {
    flex: 1,
    // fontFamily: Fonts.type.proximaNovaReg,
    left: 15,
    // color: '#fff'
    color: "#B0C6DA"
  },
  overviewTitles: {
    flex: 1,
    fontFamily: Fonts.type.proximaNovaReg,
    left: 15,
    color: "#ffffff"
  },
  marginfirst: {
    marginTop: 8
  },
  signInBtnSmall: {
    backgroundColor: Colors.loginBlue,
    // height: Metrics.HEIGHT * 0.10,
    height: 40,
    width: 80,
    paddingLeft: 20,
    paddingRight: 20,
    // width: '100%',
    alignSelf: "center",
    elevation: 3,
    // shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  signInBtnMedium: {
    backgroundColor: Colors.goldUrban,
    // height: Metrics.HEIGHT * 0.10,
    height: 50,
    width: 230,
    paddingLeft: 20,
    paddingRight: 20,
    // width: '100%',
    alignSelf: "center",
    elevation: 3,
    // shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  overview: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  textInput_medium: {
    // fontFamily: 'Montserrat-Regular',
    fontFamily: Fonts.type.proximaNovaReg,
    borderBottomWidth: 2,
    borderColor: "#ffffff",
    fontSize: 14,
    width: "100%",
    borderRadius: 5,
    textAlignVertical: "bottom",
    // paddingVertical: .5,
    // paddingHorizontal: 20,
    color: "#666666"
    // color: "black"
  },

  text: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },
  captchaContainerView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderColor: "#01579b",
    // width: '90%',
    height: 130,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "#e1f5fe"
  },
  captchaChildContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  captchaChildContainerInput: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  iconCaptcha: {
    width: 40,
    height: 35,
    //    resizeMode: 'contain',
    margin: 20
  },
  captchaChildContainerButton: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: "center"
    // alignItems: 'center'
  },
  textInputStyle: {
    textAlign: "center",
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: Colors.goldUrban,
    borderRadius: 7,
    justifyContent: "center"
  },
  button: {
    width: "80%",
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: "#ec407a",
    borderRadius: 3,
    marginTop: 20
  }
};
export default styles;
