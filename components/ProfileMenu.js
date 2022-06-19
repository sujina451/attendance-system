import React,{Component} from 'react'
import { Button, Text, Divider, colors } from "react-native-elements";
import { Alert, Modal, StyleSheet, Pressable, View } from "react-native";
import styles from "../mobile/Style";
import { signout } from "../Storage/action";
import { logout } from "../services";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import {connect,Dispatch} from 'react-redux';
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as ApiStatus from '../helper/ApiStatus'
import { getSSID } from "../helper/function";
import { checkin, checkout } from "../Storage/action";
import { check_in } from "../services";
import { toastMessage } from "../helper/function";


class ProfileMenuComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
          modalVisible: false
        };
        
      }

      setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    checkout() {
        const token = this.props.token
        if(this.props.attendance != null){
          getSSID().then((ssid) => {
            if (ssid) {
              const data = {
                work_from_home: this.props.attendance.work_from_home,
                ssid,
              };
              check_in(data, token).then((response) => {
                if (response.code == ApiStatus.SUCCESS) {
                  this.props.dispatch(checkout());
                  this.logout()
                } else {
                  toastMessage("error",response.message);
                }
              });
            } else {
              toastMessage("error", "Please check if location is enabled.");
            }
          });
        }
        else{
          this.logout()
        }  
        
    }

    logout(){
      const token = this.props.token
      logout(token).then((response) => {
        console.log(response);
            this.props.dispatch(signout())
            this.props.navigation.navigate('Login')
      })
    }
   
    _menu = null;

    setMenuRef = ref => {
      this._menu = ref;
    };
  
    hideMenu = () => {
      this._menu.hide();
    };
  
    showMenu = () => {
      this._menu.show();
    };

    
    render(){
      const { modalVisible } = this.state;
    return (
        <>
       
            <Menu
              style={styles.drop_menu}
               ref={this.setMenuRef}
                anchor={<Text onPress={this.showMenu} >
                    <Ionicons name="ios-person-circle" size={62} color="white" />
                    </Text>}
                onRequestClose={this.hideMenu}
              >
                <MenuItem onPress={this.hideMenu}><FontAwesome5 name="user-edit" style={styles.dropdown_icon}/>
                  <Text style={styles.dropdown_text} >  Edit Profile</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem onPress={this.hideMenu}><FontAwesome5 name="unlock" style={styles.dropdown_icon}/>
                  <Text style={styles.dropdown_text} >   Change Password</Text> 
                </MenuItem>
                <MenuDivider />
                <MenuItem onPress={()=>this.setModalVisible(true)}><FontAwesome5 name="sign-out-alt" style={styles.dropdown_icon}/>
                  <Text style={styles.dropdown_text} >   Log out</Text> 
                </MenuItem>
              </Menu>
              
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <View style={modalstyles.centeredView}>
            <View style={modalstyles.modalView}>
              <Text style={modalstyles.modalText}>Are you sure you want to Log out?</Text>
              <View style={{flexDirection:'row'}}>
              <Pressable
                style={[modalstyles.button, modalstyles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={modalstyles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[modalstyles.button, modalstyles.buttonClose]}
                onPress={() => this.checkout()}
              >
                <Text style={modalstyles.textStyle}>Log out</Text>
              </Pressable>

              </View>
              
            </View>
          </View>
        </Modal>
        </>

    )
    }
}

function mapStateProps(state) {
    return{
      user:state.user,
      token:state.token,
      attendance: state.attendance,
      
    }
  }
  const ProfileMenu = connect(mapStateProps)(ProfileMenuComponent);
export default ProfileMenu

const modalstyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
   
  },
  modalView: {
    margin: 20,
    backgroundColor:"white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
     
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    marginHorizontal:5,
    marginVertical:10,
    borderRadius:5
    
  },
  buttonOpen: {
    backgroundColor: "#1E436C",
  },
  buttonClose: {
    backgroundColor: "#1E436C",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Comfortaa-Regular",
    fontSize:12,
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Comfortaa-Regular",
    fontSize:14,
  }
});

