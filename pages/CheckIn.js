import React, { Component, Fragment } from "react";
import { Button, Text, Divider } from "react-native-elements";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardTaskView from "../components/DashboardTask";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import styles from "../mobile/Style";
import { colors, width, height } from "../mobile/Theme";
import editstyles from "../mobile/EditStyle";
import ProfileMenu from "../components/ProfileMenu";
import ProfileHeader from "../components/ProfileHeader";
import { connect, Dispatch } from "react-redux";
import { checkout } from "../Storage/action";
import { check_in } from "../services";
import * as ApiStatus from "../helper/ApiStatus";
import moment from "moment";
import * as checkinStatus from "../helper/checkinStatus";
import { getSSID } from "../helper/function";
import { toastMessage } from "../helper/function";
import DashboardBottomIcon from "../assets/dashboardicon.png";
import TaskBottomIcon from "../assets/taskicon.png";
import AttendanceBottomIcon from "../assets/attendanceicon.png";
import LeaveBottomIcon from "../assets/leaveicon.png";
import Spinner from "react-native-loading-spinner-overlay";
import { resetStackAndNavigate } from "../helper/function";

class CheckInPageComponent extends Component {
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

  check_Out() {
    const token = this.props.token;
    this.setState({
      isLoading: true,
    });
    getSSID().then((ssid) => {
      if (ssid) {
        const data = {
          work_from_home: this.state.work_from_home,
          ssid,
        };

        check_in(data, token).then((response) => {
          this.setState({
            isLoading: false,
          });
          if (response.code == ApiStatus.SUCCESS) {
            this.props.dispatch(checkout());
            this.props.navigation.navigate("Dashboard");
            toastMessage("success", "Check Out Successfully");
          } else {
            toastMessage("error", response.message);
          }
        });
      } else {
        toastMessage("error", "Please check if location is enabled.");
      }
    });
  }

  render() {
    return (
      <Fragment>
        <View style={styles.loader}>
          <Spinner visible={this.state.isLoading} />
        </View>
        <ScrollView contentContainerStyle={dashstyles.container}>
          <ProfileHeader navigation={this.props.navigation} />
          <View style={styles.container}>
            <View style={styles.boxstyle}>
              <Text style={dashstyles.dashboard_options_header}>
                {moment().format("dddd, Do MMMM YYYY")}
              </Text>
              <View style={editstyles.checkInPageBox}>
                <View style={editstyles.checkInTimeWrap}>
                  <Text style={editstyles.checkInTimeTitle}>
                    Checked In Time:
                  </Text>
                  <Text style={editstyles.checkInTimeInfo}>
                    {this.props.attendance != null
                      ? this.props.attendance.check_in
                      : ""}
                  </Text>
                </View>
                <TouchableOpacity
                  style={editstyles.checkoutButton}
                  onPress={() => this.check_Out()}
                >
                  <Text style={editstyles.checkoutbtnText}>Check Out</Text>
                </TouchableOpacity>
              </View>
            </View>
            <DashboardTaskView/>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

function mapStateProps(state) {
  return {
    attendance: state.attendance,
    token: state.token,
    task: state.task,
  };
}

const CheckInPage = connect(mapStateProps)(CheckInPageComponent);
export default CheckInPage;

const dashstyles = StyleSheet.create({
  container: {
    backgroundColor: colors.body_background,
  },
  dashboard_image: {
    overflow: "hidden",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    height: 150,
    marginBottom: 30,
  },
  dashboard_top: {
    flex: 1,
    flexDirection: "row",
    width: width * 0.9,
    alignSelf: "center",
    margin: "auto",
    justifyContent: "space-between",
  },
  dashboard_content: {
    height: "100%",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  dashprofile: {
    alignSelf: "center",
  },
  dashheading: {
    fontSize: 20,
    fontFamily: "Comfortaa-Bold",
    color: colors.color_white,
    marginBottom: 8,
  },
  dashsmall: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 12,
    color: colors.color_white,
  },

  drop_menu: {
    left: 375,
    top: 100,
  },
  dropdown_icon: {
    fontSize: 15,
    color: colors.icon_color,
    paddingHorizontal: 10,
  },
  dropdown_text: {
    fontSize: 15,
    color: colors.text_color,
    paddingHorizontal: 10,
    fontFamily: "Comfortaa-Regular",
  },

  checkin_header: {
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
  progressbar: {
    height: 8,
    borderColor: "#fff",
    marginBottom: 15,
  },
  progressbar_layout: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  progressbar_text: {
    fontFamily: "Comfortaa-Regular",
    flex: 1,
    fontSize: 12,
    color: colors.text_color,
  },
  progress_bullet: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 8,
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
});
