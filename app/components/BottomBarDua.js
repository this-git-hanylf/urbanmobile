import React, { Component } from "react";
import { SafeAreaView,ActivityIndicator } from "react-native";
import {
  Scene,
  Router,
  Actions,
  Stack,
  ActionConst
} from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

import Home from "../Home/Home";
// import Login from "../Intro/Intro";
import Search from "../Find/Search";
import Notif from "../Notif/Notif";
import AkunHome from "../Akun/AkunHome";


import {_storeData,_getData} from '@Component/StoreAsync';

import Menu from '../Menu/Menu';

const TabIcon = ({ focused, iconName }) => {
  
  var color = focused ? "#AB9E84" : "#b7b7b7";
  var tintColor = focused ? "#AB9E84" : "#b7b7b7";
  return (
    <Icon name={iconName} color={color} size={24} style={{ marginTop: 8, color: tintColor }} textStyle={color} />
    
  );
};

class BottomBarDua extends Component{

  constructor(){
    super()

    this.state = {
      hasLogin : false,
      isLoaded : false
    }
  }

//   async componentDidMount() {
//     try {
//       const isLogin = await _getData('@isLogin')
//       console.log('isLogin: ', isLogin)
//       if (isLogin) {
//           this.setState({hasLogin:true,isLoaded:true})
//       } else {
//           this.setState({hasLogin:null,isLoaded:true})
//       }
//     } catch (err) {
//       console.log('error: ', err)
//     }
//   }

  render(){
    // if(!this.state.isLoaded){
    //   return(
    //       <ActivityIndicator />
    //   )
    // } else {
      return (
        <Router>
          <Scene key="root">
            {/* <Scene key="Login" initial={!this.state.hasLogin} component={Login} hideNavBar={true} title="" /> */}
            <Scene key="tabbar" hideNavBar  tabs={true}
                activeTintColor="#AB9E84">
              
              <Scene
                key="home"
                component={Home}
                navTransparent={true}
                hideNavBar={true}
                title=""
                tabBarLabel="Home"
                color='#000000'
                tabBarStyle={{color:"#000000"}}
                titleStyle={{color:"#000"}}
                
                iconName="home"
                icon={TabIcon}
               
                
              />
              <Scene
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
                key="Menu"
                component={Menu}
                navTransparent={true}
                hideNavBar={true}
                title=""
                tabBarLabel="Menu"
                iconName="bars"
                icon={TabIcon}
              />
              <Scene
                key="notif"
                component={Notif}
                navTransparent={true}
                hideNavBar={true}
                title=""
                tabBarLabel="Notification"
                iconName="bell"
                icon={TabIcon}
              />
              <Scene
                key="akun"
                component={AkunHome}
                navTransparent={true}
                hideNavBar={true}
                title=""
                tabBarLabel="Account"
                iconName="user"
                icon={TabIcon}
              />
            </Scene>
            
                
                

          </Scene>
        </Router>
      );
    }
    
  }

// }

export default BottomBarDua;
