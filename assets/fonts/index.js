import * as Font from "expo-font";

export default async function useFonts() {
  await Font.loadAsync({
    "Comfortaa-Bold": require("./Comfortaa-Bold.ttf"),
    "Comfortaa-Regular": require("./Comfortaa-Regular.ttf"),
    "Comfortaa-Medium": require("./Comfortaa-Medium.ttf"),
    "Nunito-Regular": require("./Nunito-Regular.ttf"),
    "Nunito-Bold": require("./Nunito-Bold.ttf"),
    "Nunito-SemiBold": require("./Nunito-SemiBold.ttf"),
  });
}
