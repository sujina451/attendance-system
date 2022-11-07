import React, { Component } from "react";
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
import Spinner from 'react-native-loading-spinner-overlay';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { leave } from "../services/";
import { CASUAL, OTHER, SICK } from "../helper";
import { FULL, FIRSTHALF,SECONDHALF } from "../helper";
import * as ApiStatus from "../helper/ApiStatus";
import { toastMessage } from "../helper/function";
import { connect, Dispatch } from "react-redux";




class LeaveComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,    
          SelectedValue_1:'',
          SelectedValue_2:'',
          mode: "date",
          isDateTimePickerVisible: false,
          chosenmode:true,
          from_date:'',
          to_date:'',
          leave_type:'',
          reasons:'',
          remarks:'',
          approve:'',
        };
      }

      UNSAFE_componentWillMount() {
        setTimeout(() => {
          this.setState({
            isLoading: false,
          });
        }, 1000);
      }
       showMode=(currentmode)=>{
        this.setState({isDateTimePickerVisible:true,
        mode:currentmode})
      }
      _showDateTimePicker = () => {this.showMode('date')};

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    if(this.state.chosenmode==true){
      this.setState({ from_date: moment(date).format("YYYY-MM-DD") }); 
    }else{
      this.setState({ to_date: moment(date).format("YYYY-MM-DD") });
    }  
    this._hideDateTimePicker();
  };
  

  onFocus = () => {
    
    this._handleDatePicked();
  };

  addleave = () =>{
    const token = this.props.token;
    const {
      from_date,
      to_date,
      leave_type,
      reasons,
      remarks,
    } = this.state;
    const data = {
      from_date: from_date,
      to_date: to_date,
      leave_type: leave_type,
      remarks: remarks,
      reasons: reasons,
    };
    console.log(data);
    leave(data, token).then((response) => {
      this.setState({
        isLoading: false,
      });
      this.setState({ Addstatus: false });
      console.log(response);
      if (response.code == ApiStatus.SUCCESS) {
        this.setState(response.data.leave);
        toastMessage("success", response.message);
      } else {
        toastMessage("error", response.message);
      }
    });
  }


  leaveapprove=()=>{
    const token = this.props.token;
    const {
      approve,
    } = this.state;
    const data = {
      approve: approve,
    };
    console.log(data);
    leave(data, token).then((response) => {
      this.setState({
        isLoading: false,
      });
      this.setState({ Addstatus: false });
      console.log(response);
      if (response.code == ApiStatus.SUCCESS) {
        this.setState(response.data.leave);
        toastMessage("success", response.message);
      } else {
        toastMessage("error", response.message);
      }
    });
  }
  
  

    render(){
      const{mode}=this.state
    return (
        <>
        <View style={styles.loader}>
          <Spinner visible={this.state.isLoading} />
        </View>
        <ProfileHeader navigation={this.props.navigation} />

        <ScrollView contentContainerStyle={Leavestyles.container}>
        <View style={styles.container}>
          <Text style={styles.leaveheading}>Leave Report :</Text>
            <View style={editstyles.leavereportBox}>
                <View style={editstyles.leavereportDate}>
                  <Text style={editstyles.inputTopText}>Leave Date:</Text>
                  <Text style={editstyles.textBold}>Jan 13</Text>
                </View>
                <View >
                <Text style={editstyles.inputTopText}>Status:</Text>
                  {/* <TouchableOpacity style={editstyles.checkoutButton}>
                      <Text style={editstyles.checkoutbtnText}>Rejected</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity style={editstyles.btnGreen}>
                      <Text style={editstyles.mainbtnText}>Approved</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>


            <View style={styles.container}>
        <Text style={styles.leaveheading}>Leave Reason :</Text>
            <View style={styles.leaveboxstyle}>
            <View style={editstyles.taskform}>
                <Text style={styles.leavesubtitle}>Reason :</Text>
                <View style={styles.Leaveinput}>
                <Picker
                clearButtonMode="always"
                    selectedValue={this.state.reasons}
                    mode="dropdown"
                    style={{marginTop:-10, }}
                    onValueChange={(itemValue, itemIndex) => this.setState({reasons:itemValue})}
                >
                    <Picker.Item label="--select--" value="--select--"/>
                    <Picker.Item label="Sick" value={SICK}  />
                    <Picker.Item label="Casual" value={CASUAL} />
                </Picker>
                 </View>
              </View>
            </View>
            <View style={styles.leaveboxstyle}>
            <View style={editstyles.taskform}>
                <Text style={styles.leavesubtitle}>Type :</Text>
                <View style={styles.Leaveinput}>
                <Picker
                    selectedValue={this.state.leave_type}
                    mode="dropdown"
                    style={{marginTop:-10, }}
                    onValueChange={(itemValue, itemIndex) => this.setState({leave_type:itemValue})}
                >
                    <Picker.Item label="--select--" value="--select--"/>
                    <Picker.Item label="Full" value={FULL}  />
                    <Picker.Item label="First Half" value={FIRSTHALF} />
                    <Picker.Item label="Second Half" value={SECONDHALF} />
                </Picker>
                </View>
                
              </View>
            </View>
            <View style={styles.leaveboxstyle}>
            <View style={editstyles.taskform}>
                <Text style={styles.leavesubtitle}>Duration :</Text>
                <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                 <Text
                 clearButtonMode="always"
                  style={editstyles.tasktimeInput}
                  onPress={() =>{ this._showDateTimePicker(); this.setState({chosenmode:true})}}
                >
                  {this.state.from_date}
                </Text>
                <View style={editstyles.timeSeparator}></View>
                 <Text
                 clearButtonMode="always"
                  style={editstyles.tasktimeInput}
                  onPress={() => { this._showDateTimePicker(); this.setState({chosenmode:false})}}
                >
                  {this.state.to_date}
                </Text>
                <DateTimePickerModal
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode={mode}
                  datePickerModeAndroid={"spinner"}
                /> 
                </View>
                </View>
                </View>
                <View style={styles.leaveboxstyle}>
            <View style={editstyles.taskform}>
                <Text style={styles.leavesubtitle}>Remarks :</Text>
                <TextInput
                clearButtonMode="always"
                  style={styles.Leaveinput}
                  onChangeText={(remarks) => this.setState({  remarks})}
                />
                </View>
                </View>
                <View style={styles.LeaveButtonWrap}>
                <TouchableOpacity
                  style={styles.leaveButton}
                  onPress={() => this.addleave()}
                >
                  <Text style={styles.leavebtnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
            
        </>
    )
}
}

function mapStateProps(state) {
  return {
    token: state.token,
  };
}

const Leave = connect(mapStateProps)(LeaveComponent);
export default Leave;


const Leavestyles=StyleSheet.create({
    container:{
        backgroundColor: colors.body_background,
    },
    
})
