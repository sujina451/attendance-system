import React, { useState, Component } from "react";
import { Button, Text, Divider } from "react-native-elements";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground, Image
} from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import styles from "../mobile/Style";
import { colors, width, height } from "../mobile/Theme";
import { dashboard_image, checkin_image, RemoteWork_image } from "../assets/images";




class ProgressBar extends Component{
    render(){
        return(
            <View style={styles.progressboxstyle}>
    <View style={{ flex: 1, flexDirection: "column", padding: 20 }}>
      <View>
      <View style={styles.progressbar_layout}>
      <View style={[styles.progress_bullet,{backgroundColor:'#fe9e38'}]}></View>
        <Text style={styles.progressbar_text}>Attendance</Text>
        <Text style={[styles.progressbar_text,{ textAlign:'right'}]}>7/25
        </Text>
      </View>
          
      <Progress.Bar
        progress={0.4}
        width={null}
        color={'#fe9e38'}
        unfilledColor={"#fcedda"}
        style={styles.progressbar}
      />
      </View>
      <View>
       <View style={styles.progressbar_layout}>
       <View style={[styles.progress_bullet,{backgroundColor:'#00c99d'}]}></View>
        <Text style={styles.progressbar_text}>Points</Text>
        <Text style={[styles.progressbar_text,{ textAlign:'right'}]}>12/25
        </Text>
      </View>
          
      <Progress.Bar
        progress={0.6}
        width={null}
        color={'#00c99d'}
        unfilledColor={"#c8f0e7"}
        style={styles.progressbar}
      />
      </View>
      <View>
       <View style={styles.progressbar_layout}>
       <View style={[styles.progress_bullet,{backgroundColor:'#195bab'}]}></View>
        <Text style={styles.progressbar_text}>Task Completed</Text>
        <Text style={[styles.progressbar_text,{ textAlign:'right'}]}>5/25
        </Text>
      </View>
          
      <Progress.Bar
        progress={0.3}
        width={null}
        color={'#195bab'}
        unfilledColor={"#CDDAEA"}
        style={styles.progressbar}
      />
      </View>
      <View>
       <View style={styles.progressbar_layout}>
         <View style={[styles.progress_bullet,{backgroundColor:'#fc574b'}]}></View>
        <Text style={styles.progressbar_text}>Leave</Text>
        <Text style={[styles.progressbar_text,{ textAlign:'right'}]}>5/25
        </Text>
      </View>
          
      <Progress.Bar
        progress={0.3}
        width={null}
        color={'#fc574b'}
        unfilledColor={"#fad9d7"}
        style={styles.progressbar}
      />
      </View>
    </View>
  </View>

        )
    }
}
export default ProgressBar