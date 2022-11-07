import loginReducer from "./reducer/user";
import { createStore, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isLoggedReducer from "./reducer/isLogged";
import tokenReducer from "./reducer/token";
import userReducer from "./reducer/user";
import AttendanceReducer from "./reducer/attendance";
import TaskReducer from "./reducer/task";

const rootReducers = combineReducers({
  isLogged: isLoggedReducer,
  token: tokenReducer,
  user: userReducer,
  attendance: AttendanceReducer,
  task: TaskReducer,
});
const persistConfig = {
  key: "root",
  version: 0,
  storage: AsyncStorage,
  whitelist: ["isLogged", "token", "user", "attendance","task"],
};
const mainReducers = persistReducer(persistConfig, rootReducers);
const store = createStore(
  mainReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store);
const persistence = () => {
  return {
    store,
    persistor,
  };
};
export default persistence;
