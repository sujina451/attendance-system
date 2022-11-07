import React, { useState, Component } from "react";
import { Button, Text, Divider } from "react-native-elements";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardTaskView from "../components/DashboardTask";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import styles from "../mobile/Style";
import { colors, width, height } from "../mobile/Theme";
import {
  dashboard_image,
  checkin_image,
  RemoteWork_image,
} from "../assets/images";
import { connect, Dispatch } from "react-redux";
import ProfileHeader from "../components/ProfileHeader";
import ProgressBar from "../components/ProgressBar";
import moment from "moment";
import * as ApiStatus from "../helper/ApiStatus";
import * as checkinStatus from "../helper/checkinStatus";
import { checkin, checkout } from "../Storage/action";
import { check_in } from "../services";
import editstyles from "../mobile/EditStyle";
import { getSSID } from "../helper/function";
import { toastMessage } from "../helper/function";
import DashboardBottomIcon from '../assets/dashboardicon.png';
import TaskBottomIcon from '../assets/taskicon.png';
import AttendanceBottomIcon from '../assets/attendanceicon.png';
import LeaveBottomIcon from '../assets/leaveicon.png';
import Spinner from 'react-native-loading-spinner-overlay';
import Leave from "./Leave";



class HomeScreenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      work_from_home: checkinStatus.CHECKIN,
    };
  }


  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  check_In(work_from_home) {
    const token = this.props.token;
    this.setState({
      isLoading: true
    })
    getSSID().then((ssid) => {
      if (ssid) {
        const data = {
          work_from_home,
          ssid: ssid,
        };
        
        check_in(data, token).then((response) => {
          this.setState({
            isLoading: false
          })
          if (response.code == ApiStatus.SUCCESS) {
            this.props.dispatch(checkin(response.data));
            this.props.navigation.navigate("CheckIn");
            toastMessage("success", response.message)
            this.setState({
              work_from_home,
            });
          } else {
            toastMessage("error",response.message);
          }
        })
      } else {
        toastMessage("error", "Please check if location is enabled.");
      }
    });
  }


  render() {
    return (
      <>
        <View style={styles.loader}>
        <Spinner
          visible={this.state.isLoading}
        />
        </View>
         
          <ScrollView contentContainerStyle={dashstyles.container} 
          >

            <ProfileHeader navigation={this.props.navigation} />

            <View style={styles.container}>
                <View style={styles.boxstyle}>
                  <Text style={dashstyles.dashboard_options_header}>
                    {moment().format("dddd, Do MMMM YYYY")}
                  </Text>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => this.check_In(checkinStatus.CHECKIN)}
                      style={dashstyles.checkin_section}
                    >
                      <Image
                        source={checkin_image}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: "contain",
                        }}
                      />
                      <Text style={dashstyles.checkin_text}>Check In</Text>
                    </TouchableOpacity>
                    <Divider orientation="vertical" width={1} />
                    <TouchableOpacity
                      onPress={() => this.check_In(checkinStatus.FROMHOME)}
                      style={dashstyles.checkin_section}
                    >
                      <Image
                        source={RemoteWork_image}
                        style={{
                          width: 110,
                          height: 100,
                          resizeMode: "contain",
                        }}
                      />
                      <Text style={dashstyles.checkin_text}>Work Remotely</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              

              <Text style={styles.heading}>Your Activities</Text>
              <ProgressBar />
              <DashboardTaskView />
            </View>
          </ScrollView>
      </>
    );
  }
}

function TaskScreen() {
  return (
    <View style={styles.container}>
      <Text>Task!</Text>
    </View>
  );
}
function AttendanceScreen() {
  return (
    <View style={styles.container}>
      <Text>Attendancde</Text>
    </View>
  );
}
function LeaveScreen() {
  return (
  
      <Leave/>
  );
}

const Tab = createBottomTabNavigator();

class DashboardPageComponent extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
            paddingBottom: 15,
            paddingTop: 10,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Dashboard",
            tabBarIcon: () => (
              <Image
                  source={DashboardBottomIcon}
                  style={{
                    width: 30,
                    resizeMode: "contain",
                  }}
                />
            ),
            tabBarActiveTintColor: "#1e436c",
            tabBarInactiveTintColor: "#888",
          }}
        />
        <Tab.Screen
          name="Task"
          component={TaskScreen}
          options={{
            tabBarLabel: "Task",
            tabBarIcon: () => (
              <Image
                  source={TaskBottomIcon}
                  style={{
                    width: 30,
                    resizeMode: "contain",
                  }}
                />
            ),
            tabBarActiveTintColor: "#1e436c",
            tabBarInactiveTintColor: "#888",
          }}
        />
        <Tab.Screen
          name="Attendance"
          component={AttendanceScreen}
          options={{
            tabBarLabel: "Attendance",
            tabBarIcon: () => (
              <Image
                  source={AttendanceBottomIcon}
                  style={{
                    width: 30,
                    resizeMode: "contain",
                  }}
                />
            ),
            tabBarActiveTintColor: "#1e436c",
            tabBarInactiveTintColor: "#888",
          }}
        />
        <Tab.Screen
          name="Leave"
          component={LeaveScreen}
          options={{
            tabBarLabel: "Leave",
            tabBarIcon: () => (
              <Image
                  source={LeaveBottomIcon}
                  style={{
                    width: 30,
                    resizeMode: "contain",
                  }}
                />
            ),
            tabBarActiveTintColor: "#1e436c",
            tabBarInactiveTintColor: "#888",
          }}
        />
      </Tab.Navigator>
    );
  }
}

function mapStateProps(state) {
  return {
    user: state.user,
    attendance: state.attendance,
    token: state.token,
  };
}

const DashboardPage = connect(mapStateProps)(DashboardPageComponent);
const HomeScreen = connect(mapStateProps)(HomeScreenComponent);

export { DashboardPage };

const dashstyles = StyleSheet.create({
  container: {
    backgroundColor: colors.body_background,
  },
  dashboard_options_header: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    backgroundColor: colors.primary_color,
    padding: 8,
    color: colors.color_white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
  },
  checkin_section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  checkin_text: {
    fontSize: 16,
    color: colors.primary_text,
    fontFamily: "Nunito-SemiBold",
    marginTop: 5,
  },
});
