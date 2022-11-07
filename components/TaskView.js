import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import editstyles from '../mobile/EditStyle'
import { Button, Text, Divider, Input } from "react-native-elements";
import Icon  from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";

const SECTIONS = [
  {
    title: 'Working on App Design',
    content: 'This is First...',
    icon: "chevron-down"
  }
];

class TaskView extends Component {
  state = {
    activeSections: [],
  };

  // _renderSectionIcon = (section) => {
  //   return (
  //      <View style={editstyles.task_downIconWrap} >
  //         <Icon name={section.icon} style={editstyles.task_downIcon} />
  //     </View>
  //   );
  // };

  _renderHeader = (section) => {
    return (
      <View style={editstyles.task_wrapTop}>
        <Text style={editstyles.task_heading}>{section.title}</Text>
        <Icon name={section.icon} style={editstyles.task_downIcon} />
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={editstyles.contentWrap}>
        {/* <Text>{section.content}</Text> */}
        <View style={editstyles.taskTimeWrap}>
            <View style={editstyles.taskEstimatedTime}>
                <Text style={editstyles.inputTopText}>Estimated Time:</Text>
                <TextInput style={editstyles.taskTimeInput} />
            </View>
            <View style={editstyles.timeSeparator}></View>
            <View style={editstyles.taskSpentTime}>
              <Text style={editstyles.inputTopText}>Spent Time:</Text>
              <TextInput style={editstyles.taskTimeInput} />
            </View>
        </View>
        <View style={editstyles.taskButtonWrap}>
          <TouchableOpacity touchSoundDisabled={false} hitSlop={{left:20, top:20}} style={editstyles.startButton}><Text style={editstyles.btnText}>Start</Text></TouchableOpacity>
          <TouchableOpacity style={editstyles.endButton} ><Text style={editstyles.btnText}>
            <Icon name="plus-square" style={editstyles.subTasksIcon} /> 
             Sub task</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <>
        <View style={editstyles.statusColor} />
        <View>
          <Accordion style={editstyles.accordionEdit}
              sections={SECTIONS}
              activeSections={this.state.activeSections}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
            >
            </Accordion>
        </View>
      </>
    );
  }
}

export default TaskView;


