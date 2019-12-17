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
        width: 300,
        height: 300
        // borderRadius: 50,
        // overflow: 'hidden'
        // borderBottomLeftRadius: 200,
        // borderBottomRightRadius: 200,
        // borderTopRightRadius: 200,
        // borderTopLeftRadius: 200,
        // overflow: 'hidden',



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
        shadowOffset: { width: 3, height: 2 },
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
        width: 90
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
        fontFamily: Fonts.type.sfuiDisplayMedium,
        color: Colors.navyUrban
    },
    title_urban: {
        fontFamily: Fonts.type.sfuiDisplayMedium,
        color: Colors.navyUrban,
        textAlign: 'center'
    },
    title_next: {
        fontFamily: Fonts.type.sfuiDisplayMedium,
        color: Colors.navyUrban,
        fontSize: 16,
        fontWeight: 'bold',
        right: 10
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
		height: Metrics.HEIGHT * 0.10
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
        fontFamily: Fonts.type.sfuiDisplaySemibold
        // fontFamily: Fonts.type.proximaNovaXBoldIt

    },
    forgotPassword: {
        color: Colors.white,
        fontSize: Fonts.moderateScale(15),
        height: Metrics.HEIGHT * 0.05,
        width: Metrics.WIDTH,
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: Colors.transparent,
        fontFamily: Fonts.type.sfuiDisplayMedium
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
        paddingLeft: Fonts.moderateScale(5),
        fontSize: Fonts.moderateScale(17),
        fontFamily: Fonts.type.sfuiDisplayMedium
    },
    eye: {
        position: "absolute",
        right: 10,
        top: 7
    },
    bottomButton: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      },
      fixedBackground: {
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height, position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, zIndex: -1
      }
});
export default styles;
