import React, { Component, Fragment, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardPage, Login } from "../../pages";
import CheckInPage from "../../pages/CheckIn";
import { connect, Dispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { colors } from "../../mobile/Theme";
import Leave from "../../pages/Leave";

const Stack = createNativeStackNavigator();
export class RootNavigatorComponent extends Component {
  render (){
    return (
    <Fragment>
      <NavigationContainer>
        {this.props.token == null && (
          <Stack.Navigator screenOptions={{ headerShown: false ,
            contentStyle:{backgroundColor:colors.body_background}
          }}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
        {this.props.token != null && (
          <Stack.Navigator screenOptions={{ 
            headerShown: false,
            contentStyle:{backgroundColor:colors.body_background, fontFamily: "Comfortaa-Regular",}
          }}>
            <Stack.Screen name="Dashboard" component={DashboardPage} />
            <Stack.Screen name="CheckIn" component={CheckInPage} />
            <Stack.Screen name="Leave" component={Leave} />
          </Stack.Navigator>
        )}
       
      </NavigationContainer>
      <Toast
        style={{
          elevation: 5,
          shadowColor: "transparent",
          zIndex: 999,
        }}
        ref={(ref) => Toast.setRef(ref)}
      />
    </Fragment>
    )
  }
}

function mapStateProps(state) {
  return {
    token: state.token,
    attendance: state.attendance,
  };
}

const RootNavigator = connect(mapStateProps)(RootNavigatorComponent);
export { RootNavigator}