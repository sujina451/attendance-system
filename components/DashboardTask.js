import React, { Component, useState } from "react";
import editstyles from "../mobile/EditStyle";
import styles from "../mobile/Style";
import { Button, Text, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import DashboardTaskView from "./DashboardTaskView";
import { tasklist, tasks } from "../services/tasks";
import { task } from "../services/task";
import * as ApiStatus from "../helper/ApiStatus";
import { toastMessage } from "../helper/function";
import { connect, Dispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { PENDING, COMPLETED } from "../helper/TaskStatus";

class DashboardTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      taskList: [],
      Addstatus: false,
      date: "",
      employetask: "",
      estimated_time: "",
      isLoading: true,
      isDateTimePickerVisible: false,
      taskstatus: PENDING,
      hour: "",
      minute: "",
    };
    this.update = this.update.bind(this)
  }
  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ date: moment(date).format("YYYY-MM-DD") });
    console.warn("A date has been picked: ", date);
    this._hideDateTimePicker();
  };

  onFocus = () => {
    this._handleDatePicked();
  };

  AddTaskComponent = () => {
    if (this.state.Addstatus == true) {
      this.setState({ Addstatus: false });
    } else {
      this.setState({ Addstatus: true });
    }
  };

  addtask = () => {
    const token = this.props.token;
    const {
      date,
      employetask,
      estimated_time,
      remarks,
      taskstatus,
      hour,
      minute,
    } = this.state;
    const data = {
      date: date,
      task: employetask,
      estimated_time: +hour + +minute,
      remarks: remarks,
      taskstatus: taskstatus,
    };
    console.log(data);
    task(data, token).then((response) => {
      this.setState({
        isLoading: false,
      });
      this.setState({ Addstatus: false });
      console.log(response);
      if (response.code == ApiStatus.SUCCESS) {
        this.update(response.data.task);
        toastMessage("success", response.message);
      } else {
        toastMessage("error", response.message);
      }
    });
  };
  componentDidMount() {
    const token = this.props.token;
    const data = data;
    tasks(data, token).then((response) => {
      console.log(response);
      if (response.code == ApiStatus.SUCCESS) {
        this.setState({ taskList: response.data.task });
        toastMessage("success", response.message);
      } else {
        toastMessage("error", response.message);
      }
    });
  }

  update(task) {
    let taskList = this.state.taskList;
    alert(taskList.length)
    if(task.status == COMPLETED){
      alert("bbb")
      taskList = taskList.filter((item) => item.id != task.id)
    }
    else{
      alert("aaa")
      taskList.push(task);
    }
    alert(taskList.length)
    this.setState({
      taskList,
    });
  } 

  render() {
    return (
      <>
        <View style={editstyles.taskWrapHead}>
          <Text style={editstyles.checkInPageHeading}>Pending Task</Text>
          <TouchableOpacity
            style={editstyles.addtaskButton}
            onPress={this.AddTaskComponent}
          >
            <Text style={editstyles.btnText}>
              <Icon name="plus" style={editstyles.subTasksIcon} /> Add task
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.Addstatus ? (
          <View style={editstyles.maintask_wrap}>
            {/* <View style={this.state.taskstatus!=PENDING ? editstyles.completestatusColor : editstyles.pendingstatusColor} /> */}
            <View style={editstyles.contentWrap}>
              <View style={editstyles.taskform}>
                <Text style={editstyles.inputTopText}>Date:</Text>
                <Text
                
                  style={editstyles.dateInput}
                  // editable={false}
                  // onChangeText={(date) => this.setState({ date })}
                  // value={this.state.date}
                  onPress={() => this._showDateTimePicker()}
                >
                  {this.state.date}
                </Text>

                <DateTimePickerModal
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={(date) => this._handleDatePicked(date)}
                  onCancel={this._hideDateTimePicker}
                  mode={"date"}
                  datePickerModeAndroid={"spinner"}
                />
              </View>
              <View style={editstyles.taskform}>
                <Text style={editstyles.inputTopText}>Task Title</Text>
                <TextInput
                clearButtonMode="always"
                  style={editstyles.taskInput}
                  onChangeText={(employetask) => this.setState({ employetask })}
                />
              </View>
              <View >
                <View style={editstyles.taskEstimatedTime}>
                  <Text style={editstyles.inputTopText}>Estimated Time:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextInput
                    clearButtonMode="always"
                      style={editstyles.tasktimeInput}
                      editable={true}
                      selectTextOnFocus={true}
                      placeholder="Hours"
                      onChangeText={(hour) => {
                        this.setState({ hour: hour * 60 });
                      }}
                    />
                    <View style={editstyles.timeSeparator}></View>
                    <TextInput
                    clearButtonMode="always"
                      style={editstyles.tasktimeInput}
                      editable={true}
                      selectTextOnFocus={false}
                      placeholder="Minutes"
                      onChangeText={(minute) => {
                        this.setState({ minute: minute });
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={editstyles.taskContent}>
                <Text style={editstyles.inputTopText}>Assign To:</Text>
                <TextInput
                clearButtonMode="always"
                  style={editstyles.taskInput}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
              <View style={editstyles.taskDescription}>
                <Text style={editstyles.inputTopText}>Description</Text>
                <TextInput
                clearButtonMode="always"
                  style={editstyles.taskInput}
                  onChangeText={(remarks) => this.setState({ remarks })}
                />
              </View>
              
              <View style={editstyles.taskButtonWrap}>
                <TouchableOpacity
                  style={editstyles.pendingButton}
                  onPress={() => this.addtask()}
                >
                  <Text style={editstyles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
        {this.state.taskList.length > 0 &&
          this.state.taskList.map((tasks, index) => (
            <DashboardTaskView tasks={tasks} key={tasks.index} onChange={this.update} />
          ))}
      </>
    );
  } 
}

function mapStateProps(state) {
  return {
    token: state.token,
  };
}

const DashboardTask = connect(mapStateProps)(DashboardTaskComponent);
export default DashboardTask;
