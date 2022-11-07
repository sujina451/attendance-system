// import NetInfo from "@react-native-community/netinfo";
import { NativeModules } from "react-native";
import Toast from "react-native-toast-message";

export async function getSSID() {
  return new Promise(function (resolve, reject) {
    NativeModules.RNCNetInfo.getCurrentState("wifi").then((state) => {
      console.log(state);
      if (state.details != null) {
        resolve(state.details.ssid);
      } else {
        resolve(false);
      }
    });
  });
}

export function toastMessage(type, message) {
  Toast.show({
    type: type,
    position: "top",
    text1: "Message",
    text2: message,
    visibilityTime: 5000,
    autoHide: true,
  });
}

export const resetStackAndNavigate = (navigation, page) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: page})
    ]
  })
  navigation.dispatch(resetAction);
}
