const React = require("react-native");
// import { Platform, StyleSheet, Dimensions } from 'react-native';
const { Platform } = React;
import { Fonts, Metrics, Colors } from '../Themes/';
import {StatusBar,Dimensions} from 'react-native';
// const dh = Dimensions.get("window").height;
// const dw = Dimensions.get("window").width;

export default {
    section: {
        flex: 1,
        paddingLeft: 0,
        alignItems: "center",
        width: "100%",
        paddingTop: 20
      },
    navigation: {
        shadowOpacity: 0,
        elevation: 0,
        shadowOffset: {
            height: 0,
        },
        shadowRadius: 0,
        // backgroundColor: 'transparent',
        width: '100%',
        borderBottomWidth: 0,
        // borderColor: Colors.statusBarNavy,
        backgroundColor: Colors.statusBarNavy,
        // backgroundColor: 'transparent',
        marginTop: StatusBar.currentHeight,
    },
    layoutInner: {
        width: '100%',
    },
    layoutContent:{
        color: '#fff'
    },
    homeBg: {
        flex: 1,
        paddingBottom: 30,
    },
    item: {
        width: "100%",
        flexDirection: "column"
    },
    record: {
        flexDirection: "row",
        // borderBottomWidth: 1,
        // borderColor: "#DDD",
        marginLeft: 0,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        justifyContent: "center"
    },
    itemImg: {
        width: 100,
        height: 68,
        borderRadius: 5
      },
    itemInfo: {
        flex: 1,
        paddingHorizontal: 15,
    },
    itemTitle: {
        color: "#333",
        fontSize: 16,
        fontFamily: Fonts.type.proximaNovaBold,
        letterSpacing: 2,
        marginTop: 5,
        // lineHeight: 16,
      },
      trash: {
        justifyContent: "center"
      },
      itemIcon: {
        color: Colors.navyUrban,
        marginRight: 15,
        fontSize: 25
      },
      marginround :{
        height: 35, 
        marginBottom: 4,
        marginLeft: 12, 
        marginRight: 12, 
        backgroundColor: '#333',
        // borderBottomWidth: 1,
        // borderColor: "#ffffff",
        textAlignVertical: 'bottom',
        borderRadius: 13

    },
};