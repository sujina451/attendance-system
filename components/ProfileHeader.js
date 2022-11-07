import React,{Component} from 'react'
import { Button, Text, Divider } from "react-native-elements";
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground, Image
  } from "react-native";
import styles from "../mobile/Style";
import { colors, width, height } from "../mobile/Theme";
import { dashboard_image, checkin_image, RemoteWork_image } from "../assets/images";
import ProfileMenu from "../components/ProfileMenu";
import {connect,Dispatch} from 'react-redux';
import * as ApiStatus from '../helper/ApiStatus'



class ProfileHeaderComponent extends Component{
    render(){
    return (
        <View style={styles.dashboard_image}>
        <ImageBackground
          source={dashboard_image}
          style={{ width: "100%", height: 150, resizeMode: "contain",}}
        >
          <View style={styles.dashboard_top}>
              <View style={styles.dashboard_content}>
                <Text style={styles.dashheading}>Hi, {this.props.user!=null?this.props.user.name:"user"}!</Text>
              <Text  style={styles.dashsmall}>{this.props.attendance!=null?"Welcome":"Where would you like to go next?"}</Text>
            </View>
              <View style={styles.dashprofile}>     
                <ProfileMenu style={styles.profileDropDown} navigation={this.props.navigation}/>
              </View>
            </View>
        </ImageBackground>
      </View>
    )
    
    }
}
function mapStateProps(state) {
    return{
      user:state.user,
      attendance: state.attendance,
      
    }
  }
  
  const ProfileHeader = connect(mapStateProps)(ProfileHeaderComponent);
export default ProfileHeader
