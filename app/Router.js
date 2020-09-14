import React, { Component, useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import {
  Scene,
  Router,
  Actions,
  Stack,
  ActionConst,
} from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Container, Content, Badge, View, Text } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";

// import Routes from "Router";

import Home from "./Home/Home";
import Login from "./Intro/Intro";
import SkipLoginBlank from "./Intro/SkipLoginBlank";
import SkipLoginBlank2 from "./Intro/SkipLoginBlank2";
import SignupGuest from "./Signup/SignupGuest";
import SignupAgent from "./Signup/SignupAgent";
import chooseRegist from "./Signup/chooseRegist";
import SignupPrinciple from "./Signup/SignupPrinciple";
import modalPrinciple from "./Signup/modalPrinciple";
import modalBankMaster from "./Signup/modalBankMaster";
import forgotPass from "./Signup/forgotPass";
import pagePDF from "./Signup/pagePDF";
import Reset from "./ResetPass/Reset";
import Search from "./Find/Search";
import Calcu from "./Calcu/Calcu";
//notif
import Notif from "./Notif/Notif";
import ScreenNotif from "./Notif/ScreenNotif";
// import ListNotification from "./Notif/ListNotification";
// import ListView from "./Notif/ListView";
import Akun from "./Akun/Akun";
import AkunHome from "./Akun/AkunHome";
import PageTerm from "./Akun/PageTerm";
import PDFViewer from "./components/PDFViewer/index";

import PropertyDetail from "./Property/PropertyDetail";
import DetailAmenitiesDining from "./Property/DetailAmenitiesDining";
import DetailAmenitiesMall from "./Property/DetailAmenitiesMall";
import DetailAmenitiesGym from "./Property/DetailAmenitiesGym";
import DetailAmenitiesLRT from "./Property/DetailAmenitiesLRT";
import DetailAmenitiesPool from "./Property/DetailAmenitiesPool";
import DetailAmenitiesPlay from "./Property/DetailAmenitiesPlay";

import Categoris from "./Categoris/Categoris";
import Unitgoris from "./Categoris/Unitgoris";
import Unittype from "./Categoris/Unittype";
import UnitDetail from "./Categoris/UnitDetail";

import { Tab } from "native-base";
import ChouseFloor from "./Categoris/ChouseFloor";
import ChooseTower from "./Categoris/ChooseTower";
import ChouseUnit from "./Categoris/ChouseUnit";
import ChooseZone from "./Categoris/ChooseZone";
import ChooseZoneModif from "./Categoris/ChooseZoneModif";
import UnitInfo from "./Categoris/UnitInfo";
import UnitEnquiry from "./Categoris/UnitEnquiry";

//Reservation
import MyReservationProjectPage from "./Reservation/myReservation";

//Unit
import MyUnitPage from "./MyUnit/myUnit";
import MyUnitDetailPage from "./MyUnit/myUnitDetail";

//Billing
import MyBillingPage from "./MyBilling/myBilling";

//Profile
import Profile from "./Profile";

//Feed
import Feed from "./Feed/Feed";

//News And Promo
import NewsPage from "./NewsAndPromo/news";

//Booking
import BookingPage from "./Booking/Booking";

//Project
import Project from "./Project/Search";

//Download
import DownloadPage from "./Download/Download";

//Download
import NewsAndPromoDetail from "./NewsAndPromo/NewsAndPromoDetail";

//Report
import ReportPage from "./Reports/Reports";

//Report New
import ReportNew from "./ReportNew/ReportNew";

//Comission
import Comission from "./Comission/Comission";

// NUP
// import NUPPage from "./NUP";
// import NUPPay from "./NUP/NUP_Pay";
// import NUPDetail from "./NUP/NUPDetail";
// import NUPTerm from "./NUP/NUPTerm";

import Dashboard from "./Reports/Dashboard";

import { _storeData, _getData } from "@Component/StoreAsync";

import Menu from "./Menu/Menu";

//prospect
import ProspectPage from "./Prospect/Prospect";
import AddProspect from "./Prospect/AddProspect";
import ListProspect from "./Prospect/ListProspect";

import FollowupProspect from "./Prospect/FollowupProspect";
import DetailProspect from "./Prospect/Detail";
import DetailPage from "./Prospect/DetailPage";
import InterestProjectProspect from "./Prospect/InterestProjectProspect";
import AddProject from "./Prospect/AddProject";
import AddFollowUp from "./Prospect/AddFollowUp";
import DetailFollowUp from "./Prospect/DetailFollowUp";

//interest project
import AddInterest from "./Interest/AddInterest";
import DetailInterest from "./Interest/DetailInterest";

//attachment
import AddAttachment from "./Prospect/AddAttachment";

//ChooseLocation
import ChooseLocation from "./Locations/ChooseLocation";
import ProjectLocation from "./Locations/ProjectLocation";

//NupBooking
import NupBooking from "./NupBooking/NupBooking";
import NupBooking_tower from "./NupBooking/NupBooking_tower";
import FormBooking from "./NupBooking/FormBooking";
import FormPayment from "./NupBooking/FormPayment";
import UploadBukti from "./NupBooking/UploadBukti";

//New_NupBooking
import New_NupBooking from "./NupBooking/New_NupBooking";
import New_NupBookingBlock from "./NupBooking/New_NupBookingBlock";

//ContactUs
import ContactUs from "./ContactUs/ContactUs";

//AboutUs
import AboutUs from "./AboutUs/AboutUs";

//mybooking
import MyBooking from "./MyBooking/MyBooking";
import DetailBooking from "./MyBooking/DetailBooking";
import DetailRejectBooking from "./MyBooking/DetailRejectBooking";
import DetailApproveBooking from "./MyBooking/DetailApproveBooking";

//mybookingsegment
import MyBooking_segment from "./MyBooking_segment/MyBooking_segment";

import Event from "./Event/Event";
import EventDetail from "./Event/EventDetail";

import Subordinate from "./Subordinate/Subordinate";
import SubOfficeAgents from "./Subordinate/SubOfficeAgents";
import SubAgents from "./Subordinate/SubAgents";
import SubWebView from "./Subordinate/SubWebView";

//edit agent
import EditAgent from "./EditAgent/index";

// import ComingSoon from "./"

//select unit
import SelectUnit from "./SelectUnit/SelectUnit";

//footer
import FooterNav from "./components/FooterNav";

import { urlApi } from "@Config/services";

import PushNotification from "react-native-push-notification";
import NotifService from "@Component/NotifService";

const TabIcon = ({ focused, iconName }) => {
  var color = focused ? "#AB9E84" : "#b7b7b7";
  var tintColor = focused ? "#AB9E84" : "#b7b7b7";
  return (
    <Icon
      name={iconName}
      color={color}
      size={24}
      style={{ marginTop: 8, color: tintColor }}
      textStyle={color}
    />
  );
};

const TabIconBadge = ({
  focused,
  iconName,
  halo,
  cntNo,
  props,
  get,
  datacnt,
  lempar_number,
}) => {
  console.log("cntNp", cntNo);
  //
  async function f() {
    let getdata = await _getData("@CountNotif");
    console.log("getdata", getdata);
    let array_getdata = getdata[0].jumlahnotif;
    console.log("array_getdata", array_getdata);
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(array_getdata), 1000);
    });
    let result = await promise; // wait until the promise resolves (*)
    // // console.log("result", result);
    // // var ambil_result = result;
    return result;
    // alert(result); // "done!"
  }

  // var data = ''
  // Promise.resolve(your_promise).then(value => {
  //   console.log('value:', value)
  //   data = value;
  // })

  // let cnt = 0;

  // var cnt = Number(
  //   PushNotification.setApplicationIconBadgeNumber(lempar_number)
  // );

  // let lempar_int = 0;
  // var lempar_int = lempar;
  // console.log("lempar number", value_cnt);
  var cnt_lempar_number = lempar_number;
  console.log("cnt lempar number", cnt_lempar_number);
  if (cnt_lempar_number > 0) {
    var cnt_number = Number(cnt_lempar_number);
    console.log("cnt integer", cnt_number);
  }

  // var number_cnt = numbers;
  // if (cnt == 1) {
  //   var cnt_jumlah = cnt + cnt;
  //   console.log("cnt_", cnt_jumlah);
  // } else {
  //   var cnt_jumlah = cnt_lempar_number;
  // }
  // // console.log("lempar_int", lempar_int);
  // console.log("cntt", cnt);

  var color = focused ? "#AB9E84" : "#b7b7b7";
  var tintColor = focused ? "#AB9E84" : "#b7b7b7";

  var myPromise = Promise.resolve(f());

  myPromise.then((value) => {
    console.log("get value._55", value);
  });
  // var data = "";
  // var data = Promise.resolve(f()).then((value) => {
  //   console.log("value", value);
  //   // data = value;
  //   return value;
  // });

  // console.log(
  //   "data_value",
  //   myPromise.then((value) => {
  //     return value;
  //     // console.log("get value._55", value);
  //     // const value_promise = value;
  //   })
  // );

  return (
    <View style={{ flexDirection: "row" }}>
      <Icon
        name={iconName}
        color={color}
        size={24}
        style={{ marginTop: 5, color: tintColor, flex: -1 }}
        textStyle={color}
      />

      <Badge
        style={{
          backgroundColor: "red",
          height: 22,
          position: "absolute",
          top: -2,
          right: -18,
          // flex: 2,
        }}
      >
        {cntNo == null || cntNo == "undefined" ? (
          <Text
            style={{
              alignItems: "center",
              alignSelf: "center",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            0
          </Text>
        ) : (
          <Text
            style={{
              alignItems: "center",
              alignSelf: "center",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {cntNo}
          </Text>
        )}
      </Badge>
    </View>
  );
};

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLogin: false,
      isLoaded: false,
      halo: [],
      // tes: this.props.lempardata,
      // cntNotif: "",
    };
  }

  // componentDidUpdate() {
  //   console.log("update");
  // }

  componentWillMount() {
    console.log("update");
  }

  async componentDidMount() {
    try {
      console.log("notify_length", this.props.notify_length);
      // this.notif.getScheduledLocalNotifications((notify) =>
      //   console.log(notify)
      // );
      // const tes = this.props.data;
      // console.log("tes dari notif ke rout", tes);
      const isLogin = await _getData("@isLogin");
      this.getCountBadge();
      // const jumlahnotif = await _getData("@CountNotif");
      // console.log("jumlahnotifroutes", jumlahnotif);
      console.log("isLoginnn: ", isLogin);

      if (isLogin) {
        this.setState({ hasLogin: true, isLoaded: true });

        // const jumlahnotif = await _getData("@CountNotif");
        // this.setState({
        //   cntNotif: jumlahnotif[0].jumlahnotif,
        // });
        // let cntNotif = "";
        // let cn
      } else {
        this.setState({ hasLogin: null, isLoaded: true });
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }
  getCountBadge = async () => {
    const email = await _getData("@User");
    fetch(urlApi + "c_notification/getNotificationBadge/IFCAMOBILE/" + email, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res notif di notif", res);
        if (res.Error === false) {
          let resData = res.Data;
          let data = [];
          console.log("resdata getCountBadge", resData);
          let resData_map = resData[0].cnt;
          console.log("resdata_map", resData_map);
          this.setState({ cnt_badge: resData_map });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillReceiveProps(props) {
    // const jumlahnotif = await _getData("@CountNotif");
    console.log("halo terima", props.lemparDataCnt);
    // // props dari B
    // console.log("props back di routes", props.count_notif_dari_home);
    // const count_notif_dari_home = props.lemparDataCnt[0].jumlahnotif;
    // console.log("count_notif_dari_home", count_notif_dari_home);
    // // Actions.refresh("tabbar", { lemparDataCnt: cntno });
    // setTimeout(() => {
    //   Actions.refresh("tabbar", { lemparDataTabbar: count_notif_dari_home });
    // }, 0);
  }

  render() {
    if (!this.state.isLoaded) {
      return <ActivityIndicator />;
    } else {
      return (
        <Router>
          <Scene key="root" headerLayoutPreset="center">
            <Scene
              key="Login"
              initial={!this.state.hasLogin}
              component={Login}
              hideNavBar={true}
              title=""
            />
            {/* <Scene
              key="footer"
              // initial={this.state.hasLogin}
              hideNavBar
              translucent={true}
              tabs={true}
              activeTintColor="#AB9E84"
            // type="reset"
            /> */}
            {/* <Scene
              key="footer"
              // initial={this.state.hasLogin}
              navTransparent={true}
              hideNavBar={true}
              component={FooterNav}
              // type="reset"
            /> */}
            {/* <Scene
              key="tabbar"
              gestureEnabled={false}
              // hideNavBar
              // translucent={true}
              activeBackgroundColor="#ddd"
              tabs
              tabBarComponent={FooterNav}
            >
              <Scene
                key="home"
                component={Home}
                navTransparent={true}
                hideNavBar={true}
                title=""
                tabBarLabel="Home"
                color="#000000"
                tabBarStyle={{ color: "#000000" }}
                titleStyle={{ color: "#000" }}
                // labelStyle={{color: "#ad1819"}}
                // activeTintColor="#ad1819"
                // inactiveTintColor="#fff"
                iconName="home"
                icon={TabIcon}
                // color="#ad1819"
                // tintColor="#ad1819"
                // type="reset"
              />
              <Scene
                // key="SkipLoginBlank"
                // component={SkipLoginBlank}
                key="ListingProjectPage"
                component={Search}
                navTransparent={true}
                hideNavBar={true}
                title=""
                tabBarLabel="Progress"
                iconName="building-o"
                icon={TabIcon}
              />
              <Scene
                // key="SkipLoginBlank"
                // component={SkipLoginBlank}
                key="Menu"
                component={Menu}
                navTransparent={true}
                hideNavBar={true}
                title=""
                tabBarLabel="News"
                iconName="newspaper-o"
                icon={TabIcon}
              />
              <Scene
                key="notif"
                // key="IndexNotif"
                // component={SkipLoginBlank2}
                // key="notif"
                component={Notif}
                // component={ScreenNotif}
                navTransparent={true}
                hideNavBar={true}
                title=""
                tabBarLabel="Notification"
                iconName="bell"
                icon={TabIconBadge}
                // get={getdata}
                // icon={TabIcon}
                cntNo={this.state.cnt_badge}
                // cntNo={this.props.lemparDataCnt}
                // tes={this.handleClick.bind(this)}
                // number={this.state.num}
                // halo={this.getCountBadge.bind(this)}
              />
              <Scene
                key="akun"
                component={AkunHome}
                navTransparent={true}
                hideNavBar={true}
                title=""
                tabBarLabel="Profile"
                iconName="user"
                icon={TabIcon}
              />
            </Scene> */}

            <Scene
              key="home"
              component={Home}
              navTransparent={true}
              // hideNavBar={true}
              title=""
              tabBarLabel="Home"
              color="#000000"
              tabBarStyle={{ color: "#000000" }}
              titleStyle={{ color: "#000" }}
              // labelStyle={{color: "#ad1819"}}
              // activeTintColor="#ad1819"
              // inactiveTintColor="#fff"
              iconName="home"
              icon={TabIcon}
              initial={this.state.hasLogin}
              hideNavBar
              translucent={true}
              tabs={true}
              // color="#ad1819"
              // tintColor="#ad1819"
              // type="reset"
            />
            <Scene
              // key="SkipLoginBlank"
              // component={SkipLoginBlank}
              key="ListingProjectPage"
              component={Search}
              navTransparent={true}
              hideNavBar={true}
              title=""
              tabBarLabel="Progress"
              iconName="building-o"
              icon={TabIcon}
            />
            <Scene
              // key="SkipLoginBlank"
              // component={SkipLoginBlank}
              key="Menu"
              component={Menu}
              navTransparent={true}
              hideNavBar={true}
              title=""
              tabBarLabel="News"
              iconName="newspaper-o"
              icon={TabIcon}
            />
            <Scene
              key="notif"
              // key="IndexNotif"
              // component={SkipLoginBlank2}
              // key="notif"
              component={Notif}
              // component={ScreenNotif}
              navTransparent={true}
              hideNavBar={true}
              title=""
              tabBarLabel="Notification"
              iconName="bell"
              icon={TabIconBadge}
              // get={getdata}
              // icon={TabIcon}
              cntNo={this.state.cnt_badge}
              // cntNo={this.props.lemparDataCnt}
              // tes={this.handleClick.bind(this)}
              // number={this.state.num}
              // halo={this.getCountBadge.bind(this)}
            />
            <Scene
              key="akun"
              component={AkunHome}
              navTransparent={true}
              hideNavBar={true}
              title=""
              tabBarLabel="Profile"
              iconName="user"
              icon={TabIcon}
            />
            {/* </Scene> */}
            <Scene
              key="propertydetail"
              component={PropertyDetail}
              hideNavBar={true}
              title=""
              translucent={true}
              tabs={true}
            />
            <Scene
              key="categoris"
              component={Categoris}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="SkipLoginBlank"
              component={SkipLoginBlank}
              hideNavBar={true}
              title=""
              translucent={true}
              // initial={this.state.hasLogin}
              // hideNavBar={true}
            />
            <Scene
              key="SkipLoginBlank2"
              component={SkipLoginBlank2}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="unitgoris"
              component={Unitgoris}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="unittype"
              component={Unittype}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="unitdetail"
              component={UnitDetail}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="chousefloor"
              component={ChouseFloor}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="ProductProjectPage"
              component={ChooseTower}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="chouseunit"
              component={ChouseUnit}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="chooseZone"
              component={ChooseZone}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="ChooseZoneModif"
              component={ChooseZoneModif}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="unitinfo"
              component={UnitInfo}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="UnitEnquiryProjectPage"
              component={UnitEnquiry}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="profile"
              component={Profile}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="MyReservationProjectPage"
              component={MyReservationProjectPage}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="MyUnitPage"
              component={MyUnitPage}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="MyUnitDetailPage"
              component={MyUnitDetailPage}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="SimulasiPage"
              component={Calcu}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="NewsPage"
              component={NewsPage}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="BookingPage"
              component={BookingPage}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="project"
              component={Project}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="TWPBillProjectPage"
              component={MyBillingPage}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="ProjectDownloadPage"
              component={DownloadPage}
              hideNavBar={true}
              title=""
            />
            {/* //!! Sementara diubah Dulu */}
            <Scene
              key="ReportProject"
              component={ReportNew}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="Dashboard"
              component={Dashboard}
              hideNavBar={false}
              title=""
            />
            <Scene
              key="NewsAndPromoDetail"
              component={NewsAndPromoDetail}
              hideNavBar={true}
              title=""
            />
            {/*//! Sementara diubah  */}
            <Scene
              key="ReportNew"
              component={ReportPage}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="ComissionPage"
              component={Comission}
              hideNavBar={true}
              title=""
            />
            {/* <Scene
              key="NUPPage"
              component={NUPPage}
              hideNavBar={true}
              title=""
            /> */}
            <Scene
              key="SignupGuest"
              component={SignupGuest}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="SignupAgent"
              component={SignupAgent}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="chooseRegist"
              component={chooseRegist}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="SignupPrinciple"
              component={SignupPrinciple}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="modalPrinciple"
              component={modalPrinciple}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="modalBankMaster"
              component={modalBankMaster}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="forgotPass"
              component={forgotPass}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="pagePDF"
              component={pagePDF}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="ResetPass"
              component={Reset}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="PDFViewer"
              component={PDFViewer}
              hideNavBar={true}
              title=""
            />
            <Scene key="menu" component={Akun} hideNavBar={true} title="" />
            <Scene key="Feed" component={Feed} hideNavBar={true} title="" />
            {/* <Scene key="NUPPay" component={NUPPay} hideNavBar={true} title="" /> */}
            {/* <Scene
              key="NUPDetail"
              component={NUPDetail}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="NUPTerm"
              component={NUPTerm}
              hideNavBar={true}
              title=""
            /> */}
            <Scene
              key="ProspectPage"
              component={ProspectPage}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="AddProspect"
              component={AddProspect}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="ListProspect"
              component={ListProspect}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="FollowupProspect"
              component={FollowupProspect}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="Detail"
              component={DetailProspect}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="DetailPage"
              component={DetailPage}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="InterestProjectProspect"
              component={InterestProjectProspect}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="AddProject"
              component={AddProject}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="AddFollowUp"
              component={AddFollowUp}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="DetailFollowUp"
              component={DetailFollowUp}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="AddInterest"
              component={AddInterest}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="DetailInterest"
              component={DetailInterest}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="AddAttachment"
              component={AddAttachment}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="ChooseLocation"
              component={ChooseLocation}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="ProjectLocation"
              component={ProjectLocation}
              hideNavBar={true}
              title=""
            />
            <Scene
              key="NupBooking"
              component={NupBooking}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="NupBooking_tower"
              component={NupBooking_tower}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="FormBooking"
              component={FormBooking}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="FormPayment"
              component={FormPayment}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="UploadBukti"
              component={UploadBukti}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="DetailAmenitiesDining"
              component={DetailAmenitiesDining}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="DetailAmenitiesMall"
              component={DetailAmenitiesMall}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="DetailAmenitiesGym"
              component={DetailAmenitiesGym}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="DetailAmenitiesLRT"
              component={DetailAmenitiesLRT}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="DetailAmenitiesPool"
              component={DetailAmenitiesPool}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="DetailAmenitiesPlay"
              component={DetailAmenitiesPlay}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="PageTerm"
              component={PageTerm}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="ContactUs"
              component={ContactUs}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="AboutUs"
              component={AboutUs}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="MyBooking"
              component={MyBooking}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="DetailBooking"
              component={DetailBooking}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="DetailRejectBooking"
              component={DetailRejectBooking}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="DetailApproveBooking"
              component={DetailApproveBooking}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="MyBooking_segment"
              component={MyBooking_segment}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="Event"
              component={Event}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="EventDetail"
              component={EventDetail}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="Subordinate"
              component={Subordinate}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="SubOfficeAgents"
              component={SubOfficeAgents}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="SubAgents"
              component={SubAgents}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="SubWebView"
              component={SubWebView}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="EditAgent"
              component={EditAgent}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="New_NupBooking"
              component={New_NupBooking}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="New_NupBookingBlock"
              component={New_NupBookingBlock}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
            <Scene
              key="SelectUnit"
              component={SelectUnit}
              title=""
              hideNavBar
              translucent={true}
              tabs={true}
            />
          </Scene>
        </Router>
      );
    }
  }
}

export default Routes;
