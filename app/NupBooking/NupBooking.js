//import liraries
import React from "react";
import {
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    Platform,
    SafeAreaView,
    View,
    FlatList,
    Modal,
    ListView
    // Picker
} from "react-native";
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    Text,
    Title,
    Left,
    Right,
    Body,
    Input,
    Item,
    Footer,
    FooterTab,
    Badge,
    Picker,
    Col,
    ListItem
} from "native-base";

// import NavigationService from "@Service/Navigation";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from '@Component/numFormat'
// import ImageViewer from 'react-native-image-zoom-viewer';

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get('window')
let isMount = false;


class NupBooking extends React.Component {
    constructor(props) {
        super(props);
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            // hd: null,
            // title: '',
            // project_no:''
            tower:[],
            unit:[],
            harga:[],
            descs_project:'',
            lot_type:'',
            UnitName:'',
            chooseUn: '',
            paramsUnit:'',
            // products: [],
            qty : 0,
            namaUnit:'',
            nup_amount:'',
            property_cd:'',
            // descNamaTower:'',
            PropName:'',

            // nama_unit:''
            // nama:[],
            // descNama:[]
            descNamaTower:[],

            descProp:[],
            towerDes:'',
            unitDes:'',

            inputValue: '',

            arrayTower:[],
    //   dataSource: ds.cloneWithRows([]),

        };
        // console.log()
        isMount=true
        console.log("props", this.props);
        this.handleBuyNow = this.handleBuyNow.bind(this);
        // this.onAdd = this.onAdd.bind(this);
        this.checkout = this.checkout.bind(this);

        // this.handleChange = this.handleChange.bind(this);
    // this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);

    }

    async componentDidMount() {
        isMount = true;
       

        const data = {
        //   towerDescs : this.props.items.towerDescs,
          title : this.props.items.project_descs,
          projectdesc: this.props.items.project_descs,
          project_no : this.props.items.project_no,
          entity: this.props.items.entity_cd,
          db_profile: this.props.items.db_profile,
        //   namtow : this.state.descNamaTower,
        //   harga_qty: this.state.harga[0].nup_amount
   
        //   picture_url: this.props.prevItems.picture_url,
          // towerDescs : item.towerDescs,
          // console.log('twr descs', towerDescs);
            // hd: new Headers({
            //     Token: await _getData("@Token")
            // })
        };
        console.log('data',data);

        this.setState(data, () => {
            this.getTower();
            this.getUnit();
            this.getHarga();
            this.getTowerDescs();
            this.getUnitDescs();
            // this.getDataAminities(this.props.items)
            // this.getDataGallery(this.props.items)
        });
    }

    componentWillUnmount(){
      // this.setState({isMount:false})
      isMount =false
    }

   
    getTower = () => {
        const item = this.props.items;
        // console.log('item tower', item);
        {
          isMount
            ? fetch(
                urlApi +
                  "c_product_info/getTowerMap/" +
                  item.db_profile +
                  "/" +
                  item.entity_cd +
                  "/" +
                  item.project_no,
                {
                  method: "GET",
                  headers: this.state.hd,
                //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
                }
              )
                .then(response => response.json())
                .then(res => {
                  if (!res.Error) {
                    const resData = res.Data;
                    this.setState({ tower: resData });
                  } else {
                    this.setState({ isLoaded: !this.state.isLoaded }, () => {
                      alert(res.Pesan);
                    });
                  }
                  console.log("getTower", res);
                })
                .catch(error => {
                  console.log(error);
                })
            : null;
        }
    };

    getUnit = (prop_cd) => {
    const item = this.props.items;
    // console.log('item tower', item);
    {
        isMount
        ? fetch(
            urlApi +
                "c_product_info/getUnitMap/" +
                item.db_profile +
                "/" +
                item.entity_cd +
                "/" +
                item.project_no +
                "/" +
                prop_cd,
            {
                method: "GET",
                headers: this.state.hd,
            //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
            }
            )
            .then(response => response.json())
            .then(res => {
                if (!res.Error) {
                const resData = res.Data;
                this.setState({ unit: resData });
                console.log("unit", resData);
                } else {
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    // alert(res.Pesan);
                    console.log('get unit',res.Pesan)
                });
                }
                console.log("getUnit", res);
            })
            .catch(error => {
                console.log(error);
            })
        : null;
    }
    };

    getTowerDescs = (prop_cd) => {
        const item = this.props.items;
        // console.log('item tower', item);
        {
            isMount
            ? fetch(
                urlApi +
                    "c_product_info/getTowerDescs/" +
                    item.db_profile +
                    "/" +
                    item.entity_cd +
                    "/" +
                    item.project_no +
                    "/" +
                    prop_cd,
                {
                    method: "GET",
                    headers: this.state.hd,
                //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
                }
                )
                .then(response => response.json())
                .then(res => {
                    if (!res.Error) {
                    const resData = res.Data;
                    this.setState({ towerDes: resData });
                    console.log("towerDes", resData);
                    } else {
                    this.setState({ isLoaded: !this.state.isLoaded }, () => {
                        // alert(res.Pesan);
                        console.log('towerDes',res.Pesan)
                    });
                    }
                    console.log("towerDes", res);
                })
                .catch(error => {
                    console.log(error);
                })
            : null;
        }
    };

    getUnitDescs = (choose_UN) => {
        const item = this.props.items;
        const prop_cd = this.state.property_cd;
        console.log('pr',prop_cd);
        // console.log('item tower', item);
        {
            isMount
            ? fetch(
                urlApi +
                    "c_product_info/getUnitDesc/" +
                    item.db_profile +
                    "/" +
                    item.entity_cd +
                    "/" +
                    item.project_no +
                    "/" +
                    prop_cd +
                    "/" +
                    choose_UN,
                {
                    method: "GET",
                    headers: this.state.hd,
                //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
                }
                )
                .then(response => response.json())
                .then(res => {
                    if (!res.Error) {
                    const resData = res.Data;
                    this.setState({ unitDes: resData });
                    console.log("unitDes", resData);
                    } else {
                    this.setState({ isLoaded: !this.state.isLoaded }, () => {
                        // alert(res.Pesan);
                        console.log('unitDes',res.Pesan)
                    });
                    }
                    console.log("unitDes", res);
                })
                .catch(error => {
                    console.log(error);
                })
            : null;
        }
    };

    chooseTower = (chooseTo)=>{
        console.log('tower change',chooseTo);
        // console.log('indexx',index);

        const prop_cd = chooseTo.property_cd;
        console.log('propto',prop_cd);

        if(chooseTo){
            this.setState({property_cd : prop_cd},()=>{
               
                this.getTowerDescs(prop_cd);
                this.getUnit(prop_cd);
                this.handleChange(prop_cd);
               
               
            })
        }
       
    }

    handleChange(prop_cd, index){
        console.log('choose to di handle', prop_cd)

        console.log('index',this.state.arrayTower[index]) 
        // this.state.arrayTower[index] = prop_cd.target.value
        // this.setState({arrayTower: this.state.arrayTower})
        

    }

    chooseUnit = (chooseUn)=>{
        console.log('unit change',chooseUn);
        // console.log('nama unnit',descNama);

        const choose_UN = chooseUn.lot_type;
        console.log('cho',choose_UN)

        // const nama = chooseUn.descNama.label;
        // console.log('nama',nama);

        // alert(val);
        if(choose_UN){
            this.setState({lot_type : choose_UN},()=>{
                // alert(selProv);
                this.getUnitDescs(choose_UN);
                this.getHarga(choose_UN);
                console.log('parmunnit',choose_UN);
                // console.log('con');
                // this.setState({UnitName: nama})
                
                // this.getComission(val,'')
            })
        }
       
    }
    
    getHarga = (choose_UN) => {
        console.log("choose",choose_UN);
       
        // console.log("chooseUnits",chooseUnits);
        // const chooseunittt = chooseUn.replace(/\s+/g, '_');

        const item = this.props.items;
        // console.log('item tower', item);
        {
            isMount
            ? fetch(
                urlApi +
                    "c_product_info/getHarga/" +
                    item.db_profile +
                    "/" +
                    item.entity_cd +
                    "/" +
                    item.project_no +
                    "/" +
                    choose_UN,
                    
                {
                    method: "GET",
                    headers: this.state.hd,
                    // method:'POST',
                    // body: JSON.stringify({entity_cd:item.entity_cd,project_no:item.project_no,paramsUnit:chooseUn})
                //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
                }
                )
                .then(response => response.json())
                .then(res => {
                    if (!res.Error) {
                    const resData = res.Data;
                    this.setState({ harga: resData });
                    } else {
                    this.setState({ isLoaded: !this.state.isLoaded }, () => {
                        // alert(res.Pesan);
                        // console.log(res.Pesan)
                        console.log('get harga',res.Pesan)
                    });
                    }
                    console.log("getHarga", res);
                })
                .catch(error => {
                    console.log(error);
                })
            : null;
        }
    };

    handleQty(type){
        let {qty} = this.state;
        
            type == "minus" ? 
                qty > 1 ? 
                    this.setState({qty : qty - 1}) 
                : null
            : 
            this.setState({qty : qty + 1});
            console.log('qty',qty);
    };

    handleBuyNow(){
        Actions.NUPTerm({nup : {...this.props.nup, ...this.state}});
    }

    afterAnimationComplete = () => {
        this.index += 1;
        this.setState({ disabled: false });
    }
    
    checkout = () =>{
        const total = this.state.harga[0].nup_amount * this.state.qty;
        console.log('tot',total);
        const {
            projectdesc,
            property_cd,
            towerDes,
            lot_type,
            unitDes,
            qty,
           
           
        } = this.state;

        const frmData = {
            project_descs: projectdesc,
            property_cd: property_cd,
            nama_tower: towerDes[0].descs,
            lot_type: lot_type,
            nama_unit: unitDes[0].descs,
            qty:qty,
            total: total,

        };
        if(frmData){
            _navigate("FormBooking", { prevItems: frmData }); 
        } 
        //   else {
        //     // _navigate("chooseZone", { items: this.props.items });
        //     _navigate("ChooseZoneModif", { items: this.props.items, prevItems: data});
        //   }

        console.log('save',frmData);

    }

    addItem(){
        this.setState({arrayTower: [...this.state.arrayTower, ""]})
    }



    // _handleTextChange = (value) => {
    //     const inputValue = value;
    //     this.setState(() => ({
    //       inputValue,
    //     }));
    //   }
    //   _handleSendButtonPress = () => {
    //     if (!this.state.inputValue) {
    //       return;
    //     }
    //     const textArray = this.state.dataSource._dataBlob.s1;
    //     textArray.push(this.state.inputValue);
    //     // textArray.push(this.state.property_cd);
    //     this.setState(() => ({
    //       dataSource: this.state.dataSource.cloneWithRows(textArray),
    //       inputValue: '',
    //     }));
    //   };
    //   _handleDeleteButtonPress = (id) => {
    //     this.setState((a) => {
    //       const newItem = a.dataSource._dataBlob.s1.filter((item, i) => (parseInt(id) !== i));
    //       return {
    //         dataSource: this.state.dataSource.cloneWithRows(newItem),
    //       }
    //     });
    //   };

   
    render() {
      
        return (
           <Container style={Style  .bgMain}>
                <StatusBar
                        backgroundColor={Colors.statusBarNavy}
                        animated
                        barStyle="light-content"
                    />
                {/* <Header style={[Style.navigation,{backgroundColor: 'transparent'}]}>
                    <StatusBar
                        backgroundColor={Colors.statusBarNavy}
                        animated
                        barStyle="light-content"
                    />

                    <View style={Style.actionBarLeft}>
                        <Button
                            transparent
                            style={Style.actionBarBtn}
                            onPress={Actions.pop}
                        >
                            <Icon
                                active
                                name="arrow-left"
                                style={Style.textWhite}
                                type="MaterialCommunityIcons"
                            />
                        </Button>
                    </View>
                    <View style={Style.actionBarMiddle}>
                        <Text style={Style.actionBarText}>
                         
                            {this.state.title}
                            
                        </Text>
                        <Text style={Style.actionBarText}>
                        
                            {this.state.towerDescs}
                            
                        </Text>
                        
                    </View>
                    <View style={Style.actionBarRight} />
                </Header> */}


                    <View style={{top:25, paddingBottom: 60}}>
                        <View style={{paddingLeft: 15,paddingTop: 15}}>
                            <Button
                            transparent
                            style={Style.actionBarBtn}
                            onPress={Actions.pop}
                        >
                            <Icon
                                active
                                name="arrow-left"
                                // style={[Style.textWhite,{fontSize: 28}]}
                                style={{color: '#000'}}
                                type="MaterialCommunityIcons"
                            />
                        </Button>
                        </View>
                        
                        <View>
                            <Text 
                            style={{
                                fontWeight:'900', 
                                color: Colors.goldUrban ,
                                fontSize: 16,
                                textAlign: 'center',
                                fontFamily: Fonts.type.proximaNovaBold,
                                letterSpacing: 1
                                 }}
                            // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
                            >
                                PRIORITY PASS
                                {/* {this.state.projectdesc} */}
                            </Text>
                        </View>

                        
                            
               
                    </View>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 50 }}>
                        <View >
                            <View style={Styles.viewRow}>
                                <Text style={Styles.textLeft}>PROJECT</Text>
                                <Text style={Styles.textRight}>{this.state.projectdesc}</Text>
                            </View>
                            <View style={Styles.viewRow}>
                                <Text style={[Styles.textLeft,{paddingTop:10}]}>TOWER</Text>
                                {/* <Text style={Styles.textRight}>{this.state.projectdesc}</Text> */}
                                <Item style={{height: 35,width: 180, marginBottom: 10,borderBottomColor:'#fff'}}>
                                    <Picker 
                                    placeholder="-"
                                    selectedValue={this.state.property_cd}
                                    style={{width: '100%'}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666',textAlign:"right"}}
                                    
                                        // onValueChange={(val)=>this.chooseTower({descs_project:val})}
                                        // onValueChange={(chooseTo)=>this.chooseTower(chooseTo)}
                                        onValueChange={(chooseTo)=> {
                                            const namaTower = this.state.tower.filter(item=>item.value==chooseTo)
                                            // const tes = namaTower.descs;
                                            // console.log('ngambil nama',tes);
                                            console.log(this.state.tower.filter(item=>item.value==chooseTo))
                                            this.chooseTower({property_cd:chooseTo,descNamaTower:namaTower})
                                        }}
                                    // onValueChange={(val)=>alert(val)}
                                
                                    >
                                        <Picker.Item label="" value="" style={{textAlign:"right"}}/>
                                            {this.state.tower.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                            // <Picker.Item key={key} label={data.label} value={data.value} onChange={(e)=>this.handleChange(e, key)} />
                                        )}
                                    </Picker>
                                </Item>
                            </View>

                            <View style={Styles.viewRowUnit}>
                                <Text style={[Styles.textLeft,{paddingTop:10}]}>UNIT TYPE</Text>
                                {/* <Text style={Styles.textRight}>{this.state.projectdesc}</Text>
                                 */}
                                 
                          

                                 
                                <Item style={{height: 35,marginBottom: 10,borderBottomColor:'#fff',alignItems: 'center'}}>
                                        
                                        <Picker 
                                        placeholder="-"
                                        selectedValue={this.state.lot_type}
                                        style={{textAlign: 'right',width: 170,right:0}} 
                                        textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'red',textAlign: 'right'}}
                                        // itemStyle={{color:"blue",position:'absolute',right:0}}
                                        // itemTextStyle={{color:"blue",position:'absolute',right:0}}
                                            // onValueChange={(chooseUn)=>this.setState({lot_type:chooseUn})}
                                            // onValueChange={(chooseUn)=>this.chooseUnit(chooseUn)}
                                            onValueChange={(chooseUn)=> {
                                                
                                                const namaUnit = this.state.unit.filter(item=>item.value==chooseUn)
                                                this.chooseUnit({lot_type:chooseUn,descNama:namaUnit})
                                            }}
                                            // onValueChange={(chooseUn)=> {
                                            //     const namaUnit = this.state.unit.filter(item=>item.value==chooseUn)
                                            //     this.chooseUnit({lot_type:chooseUn,tes:namaUnit})}}
                                            
                                        // onValueChange={(val)=>alert(val)}
                                    
                                        >
                                            <Picker.Item label="" value="" />
                                                {this.state.unit.map((data, key) =>
                                                <Picker.Item key={key} label={data.label} value={data.value} right="10"/>
                                            )}
                                        </Picker>
                                    </Item>
                                    
                                    
                            </View>

                           

                            {this.state.harga.length == null ?

                                null
                                :
                            // <Text>{this.state.harga.nup_amount}</Text>
                                this.state.harga.map((item,key)=>
                                <View style={Styles.viewRowHarga} key={key}>
                                    <Text style={Styles.textLeftAmt}>{"  "+numFormat(item.nup_amount)}</Text>
                                    <View style={{width: 100, borderRadius: 5, marginBottom: 5, top:-5}}>
                                        <View style={{justifyContent:'space-between',flexDirection:'row', borderWidth:1,borderColor:Colors.greyUrban,borderRadius:5}}>
                                            <TouchableOpacity onPress={()=>this.handleQty("minus")}>
                                                <View >
                                                    <Text style={{marginLeft:10,color:Colors.greyUrban}}>-</Text>
                                                </View>
                                            </TouchableOpacity>
                                            
                                            <Text style={{fontFamily: Fonts.type.proximaNovaBold,alignItems:'center',alignSelf:'center'}}>{this.state.qty.toString()}</Text>
                                            <TouchableOpacity onPress={()=>this.handleQty("plus")}>
                                                <View >
                                                    <Text style={{marginRight:10,color:Colors.greyUrban}}>+</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                   
                                </View>
                                )  
                            }

                            {this.state.arrayTower.map((item,index)=>
                            <View key={index} value={item}>
                                <View style={Styles.viewRow}>
                                    {/* <Input value={item}></Input> */}
                                    <Text style={[Styles.textLeft,{paddingTop:10}]}>TOWER</Text>
                                        <Item style={{height: 35,width: 180, marginBottom: 10,borderBottomColor:'#fff'}}>
                                        <Picker 
                                        placeholder="-"
                                        selectedValue={this.state.property_cd}
                                        style={{width: '100%'}} 
                                        textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666',textAlign:"right"}}
                                        key={index}
                                        
                                            // onValueChange={(val)=>this.chooseTower({descs_project:val})}
                                            // onValueChange={(chooseTo)=>this.chooseTower(chooseTo)}
                                            onValueChange={(chooseTo)=> {
                                                const namaTower = this.state.tower.filter(item=>item.value==chooseTo)
                                                // const tes = namaTower.descs;
                                                // console.log('ngambil nama',tes);
                                                // const arTow = this.state.arrayTower[index]
                                                // console.log('artow',arTow);
                                                console.log(this.state.tower.filter(item=>item.value==chooseTo))
                                                this.chooseTower({property_cd:chooseTo,descNamaTower:namaTower})
                                            }}
                                        // onValueChange={(val)=>alert(val)}
                                    
                                        >
                                            <Picker.Item label="" value="" style={{textAlign:"right"}}/>
                                                {this.state.tower.map((data, key) =>
                                                <Picker.Item key={key} label={data.label} value={data.value} />
                                                // <Picker.Item key={key} label={data.label} value={data.value} onChange={(e)=>this.handleChange(e, key)} />
                                            )}
                                        </Picker>
                                    </Item>
                                </View>
                                <View style={Styles.viewRow} >
                                    <Text style={[Styles.textLeft,{paddingTop:10}]}>UNIT TYPE</Text>
                                    {/* <Text style={Styles.textRight}>{this.state.projectdesc}</Text>
                                    */}
                                    <Item style={{height: 35,width: 170, marginBottom: 10,borderBottomColor:'#fff'}}>
                                            <Picker 
                                            placeholder="-"
                                            selectedValue={this.state.lot_type}
                                            style={{width: '100%',textAlign: 'right'}} 
                                            textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666',textAlign: 'right'}}
                                            
                                                // onValueChange={(chooseUn)=>this.setState({lot_type:chooseUn})}
                                                // onValueChange={(chooseUn)=>this.chooseUnit(chooseUn)}
                                                onValueChange={(chooseUn)=> {
                                                    const namaUnit = this.state.unit.filter(item=>item.value==chooseUn)
                                                    this.chooseUnit({lot_type:chooseUn,descNama:namaUnit})
                                                }}
                                                // onValueChange={(chooseUn)=> {
                                                //     const namaUnit = this.state.unit.filter(item=>item.value==chooseUn)
                                                //     this.chooseUnit({lot_type:chooseUn,tes:namaUnit})}}
                                                
                                            // onValueChange={(val)=>alert(val)}
                                        
                                            >
                                                <Picker.Item label="" value="" />
                                                    {this.state.unit.map((data, key) =>
                                                    <Picker.Item key={key} label={data.label} value={data.value} style={{textAlign: 'right'}}/>
                                                )}
                                            </Picker>
                                        </Item>
                                    
                                </View>
                                {this.state.harga.length == null ?

                                    null
                                    :
                                    // <Text>{this.state.harga.nup_amount}</Text>
                                    this.state.harga.map((item,key)=>
                                    <View style={Styles.viewRowHarga} key={key}>
                                        <Text style={Styles.textLeftAmt}>{"  "+numFormat(item.nup_amount)}</Text>
                                        <View style={{width: 100, borderRadius: 5, marginBottom: 5, top:-5}}>
                                            <View style={{justifyContent:'space-between',flexDirection:'row', borderWidth:1,borderColor:Colors.greyUrban,borderRadius:5}}>
                                                <TouchableOpacity onPress={()=>this.handleQty("minus")}>
                                                    <View >
                                                        <Text style={{marginLeft:10,color:Colors.greyUrban}}>-</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                
                                                <Text style={{fontFamily: Fonts.type.proximaNovaBold,alignItems:'center',alignSelf:'center'}}>{this.state.qty.toString()}</Text>
                                                <TouchableOpacity onPress={()=>this.handleQty("plus")}>
                                                    <View >
                                                        <Text style={{marginRight:10,color:Colors.greyUrban}}>+</Text>
                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                    
                                    </View>
                                    )  
                                    }

                            </View>
                               
                            )}

                            <View style={Styles.viewAddmore}>
                                <TouchableOpacity onPress={(prop_cd)=>this.addItem(prop_cd)}>
                                    <Text style={{textAlign:'center',width:75,alignItems:'center',fontSize:14,fontFamily:Fonts.type.proximaNovaBold, 
                                color:Colors.loginBlue,borderBottomWidth:1,borderColor:Colors.loginBlue}}>add more +</Text></TouchableOpacity>
                                {/* <Text style={{color: Colors.twitter}} onnP>add more +</Text> */}
                            </View>

                            {/* space buat harga */}

                            <View style={Styles.viewRowQty}>
                                <Text style={Styles.textLeftQty}>QUANTITY</Text>
                                {/* {this.state.} */}
                                <View style={{flexDirection:'column',marginBottom:10}}>
                                    {this.state.towerDes.length == 0 ?
                                        null :
                                    <Text style={{color:'#000',textAlign:'right',fontFamily:Fonts.type.proximaNovaBold}}>{this.state.towerDes[0].descs}</Text>}
                                    {this.state.unitDes.length == 0 ?
                                        null :
                                    <Text style={{color:'#000',textAlign:'right',fontFamily:Fonts.type.proximaNovaReg,}}>- {this.state.unitDes[0].descs} ({this.state.qty.toString()} ITEM)</Text>}
                                    
                                </View>
                                

                            </View>

                            <View style={Styles.viewRow}>
                                <Text style={Styles.textLeft}>TOTAL</Text>
                               
                                {this.state.harga.length !==0 ? 
                                <Text style={Styles.textRight}>{numFormat(this.state.harga[0].nup_amount * this.state.qty)}</Text>
                                :
                                null
                                }
                                
                                {/* <Text>res{this.state.harga[0].nup_amount}</Text> */}
                            </View>

                           
                        
                            <View style={{paddingTop: 50}} >
                                <Button style={Styles.btnMedium}
                                onPress={()=>this.checkout()}>
                                <Text style={{width: '100%', fontSize: 14, alignItems:'center',textAlign:'center', fontFamily: Fonts.type.proximaNovaBold, letterSpacing:1}}>
                                    Checkout
                                </Text>
                                </Button>
                            </View>   

                       
                           
                        </View>

                        
                        
                    </ScrollView>
                {/* <ScrollView style={{height: '100%'}}>
                    
                </ScrollView> */}
               
           </Container>
        );
    }
}

//make this component available to the app
export default NupBooking;

