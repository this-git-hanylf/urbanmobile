import { Platform, StyleSheet, Dimensions } from "react-native";
// Screen Styles
import { Fonts, Metrics, Colors } from "../Themes";

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: Metrics.WIDTH,
        height: Metrics.HEIGHT,
        // backgroundColor: "#f7f0d7"
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
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        width: 330,
        height: 120,
        borderRadius: 15
    },
    images2: {
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        width: 500,
        height: 500,


    },
    images_urban: {
        // marginBottom: 20,
        // shadowColor: "#000",
        // shadowOffset: { width: 3, height: 2 },
        // shadowRadius: 2,
        // shadowOpacity: 0.1
        // width: '100%',
        // height: '100%',
        marginTop: 100,
        marginBottom: -100,
        width: 450,
        height: 450,
        // paddingBottom: -10,
        // borderRadius: 50,
        // overflow: 'hidden'
        // borderBottomLeftRadius: 200,
        // borderBottomRightRadius: 200,
        // borderTopRightRadius: 200,
        // borderTopLeftRadius: 200,
        // overflow: 'hidden',
        // paddingTop: 10,
        // marginTop: 10
        // alignItems: 'center',
        // alignSelf: 'center',
        // justifyContent: 'center'
        // justifyContent: 'space-around',
        // alignItems: 'center',
        // paddingTop: 10
        



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
    styleLogo: {
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 3 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        flex: 1,
        width: '100%',
        height: '100%', 
        resizeMode: 'contain'
    },
    textRight: {
        justifyContent: "center",
        alignItems: "center",
        // width: "100%"
    },
    body: {
        flex: 3,
        alignItems: "center",
        backgroundColor: "transparent"
    },
    textTitle: {
        color: Colors.redWine,
        fontSize: Fonts.moderateScale(16),
        alignSelf: "center",
        fontFamily: Fonts.type.sfuiDisplayMedium
        // fontFamily: Fonts.type.robotoRegular,
    },
    text_urban: {
        fontFamily: Fonts.type.proximaNovaReg,
        color: Colors.navyUrban,
        // marginHorizontal: 8
        // fontSize: 14
    },
    title_urban: {
        fontFamily: Fonts.type.proximaNovaBold,
        color: Colors.goldUrban,
        textAlign: 'center',
        justifyContent: 'flex-end',
        fontSize: 23
    },
    title_next: {
        fontFamily: Fonts.type.proximaNovaReg,
        color: Colors.navyUrban,
        fontSize: 18,
        // justifyContent: 'space-between',
        // fontWeight: 'bold',
        letterSpacing: 1,
        // right: 10,
        // alignItems: 'center',
        textAlign: 'center',
        // justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.navyUrban,
        color: Colors.navyUrban,   
    },
    bottom_next:{
        // flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, .3)',
        // backgroundColor: 'red',
        // width:'20%',
        // marginHorizontal: 140,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        
      
    },
   
    title_skip: {
        fontFamily: Fonts.type.sfuiDisplayMedium,
        color: Colors.navyUrban,
        fontSize: 16,
        fontWeight: 'bold',
        left: 10
    },
    title_done: {
        fontFamily: Fonts.type.sfuiDisplayMedium,
        color: Colors.navyUrban,
        fontSize: 16,
        fontWeight: 'bold'
    },

    right: {
        flex: 0.5
    },

    inputFieldStyles: {
		height: Metrics.HEIGHT * 0.35,
		// flex : 3,
        justifyContent: "flex-end",
        alignItems: "center"
    },

    containEmail: {
        backgroundColor: "#fff",
        opacity: 0.6,
        // height: Metrics.HEIGHT * 0.08,
        // width: Metrics.WIDTH * 0.92,
        height: Metrics.HEIGHT * 0.06,
        width: Metrics.WIDTH * 0.75,
        borderRadius: 15,
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        elevation: 3
    },
    inputEmail: {
        height: Metrics.HEIGHT * 0.08,
        width: Metrics.WIDTH * 0.84,
        color: "#000",
        paddingLeft: Fonts.moderateScale(30),
        top: 2,
        // paddingTop: Fonts.moderateScale(15),
        fontFamily: Fonts.type.sfuiDisplayRegular,
        // fontFamily: Fonts.type.proximaNovaXBoldIt,
        fontSize: 15
        
    },
    containPassword: {
        backgroundColor: "#fff",
        opacity: 0.6,
        // height: Metrics.HEIGHT * 0.08,
        // width: Metrics.WIDTH * 0.92,
        height: Metrics.HEIGHT * 0.06,
        width: Metrics.WIDTH * 0.75,
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
        borderRadius: 15,
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        elevation: 3,
        marginTop: 5
    },
    divider: {
        width: Metrics.WIDTH * 0.92,
        height: 0.6,
        backgroundColor: "rgba(0,0,0,0.1)",
        left: 15,
        right: 15
    },
    signbtnSec: {
        marginTop: Fonts.moderateScale(15),
        height: Metrics.HEIGHT * 0.10,
        marginBottom: 65
		// flex :1
    },
    signInGoogle: {
        alignItems: "center"
    },
    signInBtn: {
        // backgroundColor: Colors.loginBlue,
        backgroundColor: Colors.blueUrban,
        height: Metrics.HEIGHT * 0.08,
        width: Metrics.WIDTH * 0.92,
        borderRadius: 15,
        alignSelf: "center",
        elevation: 3,
        shadowColor: "#000",
        alignItems: "center",
        justifyContent: "center"
    },
    signInBtnSmall: {
        // backgroundColor: Colors.loginBlue,
        backgroundColor: Colors.blueUrban,
        height: Metrics.HEIGHT * 0.06,
        width: Metrics.WIDTH * 0.75,
        borderRadius: 15,
        alignSelf: "center",
        elevation: 3,
        shadowColor: "#000",
        alignItems: "center",
        justifyContent: "center"
    },
    signInBtnText: {
        color: "#fff",
        fontSize: Fonts.moderateScale(17),
        width: Metrics.WIDTH * 0.92,
        textAlign: "center",
        fontFamily: Fonts.type.proximaNovaBold
        // fontFamily: Fonts.type.proximaNovaXBoldIt

    },
    forgotPassword: {
        color: Colors.blueUrban,
        fontSize: Fonts.moderateScale(16),
        height: Metrics.HEIGHT * 0.05,
        width: Metrics.WIDTH,
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: Colors.transparent,
        fontFamily: Fonts.type.proximaNovaBoldWeb
    },
    socialSec: {
        // height: Metrics.HEIGHT * 0.07,
        paddingTop: Fonts.moderateScale(30),
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: Fonts.moderateScale(5)
    },
    skiplog: {
        // height: Metrics.HEIGHT * 0.07,
        paddingTop: Fonts.moderateScale(1),
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%"
        // paddingBottom: Fonts.moderateScale(20)
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
        color: Colors.white,
        // paddingLeft: Fonts.moderateScale(5),
        fontSize: Fonts.moderateScale(15),
        fontFamily: Fonts.type.proximaNovaBold,
        // fontWeight: '500',
        // textDecorationLine: 'underline',
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,

        width: "100%",

    },
    eye: {
        position: "absolute",
        right: 10,
        top: 7
    },
    // bottom_Button: {
    //     flex: 1,
    //     // backgroundColor: 'red',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width:'100%'
    //     // color: '#000',
        
    //   },
    //   bottom_text_Button:{
    //     paddingBottom: 0,
    //     width: 'auto',
    //     borderBottomWidth: 1,
    //     borderBottomColor: Colors.navyUrban,
    //     color: Colors.navyUrban
    //   },
      fixedBackground: {
        // width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height, 
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, 
        zIndex: -1
      },

      bottom_Spacer: {
          paddingBottom: 10
      },
      top_Spacer:{
          marginTop: 10
      }



     
});
export default styles;
