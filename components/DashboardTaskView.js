import React, { Component } from "react";
import Accordion from "react-native-collapsible/Accordion";
import editstyles from "../mobile/EditStyle";
import { Button, Text, Divider, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { connect, Dispatch } from "react-redux";
import { task, tasks } from "../services/task";
import { Addtask } from "../Storage/action/task";
import * as ApiStatus from "../helper/ApiStatus";
import { toastMessage } from "../helper/function";
import { COMPLETED, HOLD, PENDING } from "../helper/TaskStatus";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "../mobile/Style";
import { taskstoggle } from "../services";

const SECTIONS = [
  {
    title: "Working on App Design",
    content: "This is First...",
    icon: "chevron-down",
  },
];

class DashboardTaskViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      taskstatus: PENDING,
      tasks: this.props,
      spent_time: "",
      hour: "",
      minute: "",
      daily_remarks: "",
      est_hour: "",
      est_minute: "",
      error:'',
      id:'',
    };
  }

  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  starttask = () => {
    this.setState({
      isLoading: false,
      taskstatus: HOLD,
      Addstatus: false,
    });
  };
  completetask = (id) => {
    const token = this.props.token;
    const { spent_time, hour, minute, daily_remarks } = this.state;
    const data = {
      spent_time: parseInt(hour) + parseInt(minute),
      status: COMPLETED,
      daily_remarks: daily_remarks,
    };
    console.log(data);
    taskstoggle(id,data, token).then((response) => {
      this.setState({
        isLoading: false,
        taskstatus: null,
        Addstatus: false,
        
      });
      console.log(response);
      if (response.code == ApiStatus.SUCCESS) {
        this.props.onChange(response.data.task);
        this.setState({id:response.data.id})
        console.log(response.data.id)
        toastMessage("success", response.message);
      } else {
        toastMessage("error", response.message);
      }
    });
  };
  holdtask = (id) => {
    const token = this.props.token;
    const { spent_time, hour, minute, daily_remarks } = this.state;
    const data = {
      spent_time: parseInt(hour) + parseInt(minute),
      daily_remarks: daily_remarks,
      status: HOLD
    };
    console.log(data);
    taskstoggle(id,data, token).then((response) => {
      this.setState({
        isLoading: false,
        taskstatus: PENDING,
        Addstatus: false,
      });
      console.log(response);
      if (response.code == ApiStatus.SUCCESS) {
        this.props.onChange(response.data.task);
        toastMessage("success", response.message);
      } else {
        toastMessage("error", response.message);
      }
    });
  };

  componentDidMount() {
    const estimate_time = this.props.tasks.estimated_time;
    const { est_hour, est_minute } = this.state;
    this.setState({
      est_hour: Math.floor(estimate_time / 60),
      est_minute: estimate_time % 60,
    });
    console.log(this.state.est_hour, est_hour), console.log(this.state.est_minute, est_minute);
  }

  _renderHeader = (section) => {
    return (
      <View style={editstyles.task_wrapTop}>
        <Text style={editstyles.task_heading}>{this.props.tasks.task}</Text>
        <Icon name={section.icon} style={editstyles.task_downIcon} />
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <>
        <View style={styles.loader}>
          <Spinner visible={this.state.isLoading} />
        </View>
        <View style={editstyles.taskContent}>
          <View style={editstyles.taskEstimatedTime}>
            {/* <Text style={editstyles.taskTitle}>{this.props.tasks.task}</Text> */}
            {/* <TextInput
              style={editstyles.taskInput}
              disabled="true"
              value="1"
              editable={false}
              selectTextOnFocus={false}
            /> */}
          </View>

          <View style={editstyles.taskform}>
            <View style={editstyles.taskEstimatedTime}>
              <Text style={editstyles.inputTopText}>Estimated Time:</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={editstyles.tasktimeInput}>{this.state.est_hour}</Text>
                <View style={editstyles.timeSeparator}></View>
                <Text style={editstyles.tasktimeInput}>
                  {this.state.est_minute}
                </Text>
              </View>
            </View>
          </View>
          <View style={editstyles.taskSpentTime}>
            <Text style={editstyles.inputTopText}>Spent Time:</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
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
                style={editstyles.tasktimeInput}
                editable={true}
                selectTextOnFocus={false}
                placeholder="Minutes"
                onChangeText={(minute) => {
                  this.setState({ minute: minute });
                }}
              />
              
            </View>
            {!!this.state.error && (
                <Text style={{color: 'red', fontSize:10, marginBottom:5}}>
                  {this.state.error}
                </Text>
              )}
          </View>
          <View>
            <Text style={editstyles.inputTopText}>Remarks</Text>
            <TextInput
              style={editstyles.taskInput}
              onChangeText={(daily_remarks) => {this.setState({ daily_remarks })}}
            />
            {!!this.state.error && (
                <Text style={{color: 'red', fontSize:10, marginBottom:5}}>
                  {this.state.error}
                </Text>
              )}
          </View>
          <View style={editstyles.taskButtonWrap}>
            {this.state.taskstatus == PENDING && (
              <TouchableOpacity
                style={editstyles.startButton}
                onPress={() => this.starttask()}
              >
                <Text style={editstyles.btnText}>Start</Text>
              </TouchableOpacity>
            )}
            {this.state.taskstatus == HOLD && (
              <TouchableOpacity
                style={editstyles.completeButton}
                onPress={() => {
                  if (this.state.hour === "" || this.state.minute === "") {
                    this.setState(() => ({ error: "required."}));
                  } else {
                    this.setState(() => this.completetask(this.props.tasks.id));
                  }
                }}
              >
                <Text style={editstyles.btnText}>Complete</Text>
              </TouchableOpacity>
            )}
            {this.state.taskstatus == HOLD && (
              <TouchableOpacity
                style={editstyles.holdButton}
                onPress={() => {
                  if (this.state.daily_remarks.trim() === "") {
                    this.setState(() => ({ error: "required."}));
                  } else {
                    this.setState(() => this.holdtask(this.props.tasks.id));
                  }
                }}
              >
                <Text style={editstyles.btnText}>Hold</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View style={editstyles.task_wrap}>
        <View
          style={
            this.state.taskstatus != PENDING
              ? editstyles.completestatusColor
              : editstyles.pendingstatusColor
          }
        ></View>
        <View style={editstyles.dashboardMainTaskWrap}>
          <Accordion
            style={editstyles.accordionEdit}
            sections={SECTIONS}
            enablePointerEvents={true}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            underlayColor={"#f9f9f9"}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          ></Accordion>
        </View>
      </View>
    );
  }
}

function mapStateProps(state) {
  return {
    data: state.data,
    token: state.token,
    task: state.task,
  };
}

const DashboardTaskView = connect(mapStateProps)(DashboardTaskViewComponent);

export default DashboardTaskView;
