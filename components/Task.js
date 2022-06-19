import React from 'react'
import editstyles from '../mobile/EditStyle'
import styles from '../mobile/Style';
import { Button, Text, Divider } from "react-native-elements";
import Icon  from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, StyleSheet, View, TouchableOpacity, ImageBackground } from "react-native";
import DashboardTaskView from './DashboardTaskView';

function DashboardTask() {
    return (
        <>
            <View style={editstyles.task_wrap}>
                <DashboardTaskView />
            </View>
        </>
    )
}

export default DashboardTask;
